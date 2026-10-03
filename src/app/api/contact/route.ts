import { NextResponse } from "next/server";
import {
  contactEnquirySchema,
  contactRequestId,
  deliverContactEnquiry,
  hasValidFormTiming,
  isSameSiteContactRequest,
  logContactEvent,
  MAX_CONTACT_BODY_BYTES,
  rateLimitContact,
  verifyTurnstile,
} from "@/lib/contact-enquiry";

export const runtime = "nodejs";

function response(
  body: { ok: boolean; error?: string },
  status: number,
  requestId: string,
) {
  return NextResponse.json(body, {
    status,
    headers: { "Cache-Control": "no-store", "X-Request-Id": requestId },
  });
}

export function GET() {
  return NextResponse.json({ ok: false }, { status: 405 });
}

export async function POST(request: Request) {
  const requestId = contactRequestId();
  const startedAt = Date.now();
  const contentLength = Number(request.headers.get("content-length"));
  if (
    Number.isFinite(contentLength) &&
    contentLength > MAX_CONTACT_BODY_BYTES
  ) {
    logContactEvent({ requestId, event: "rejected", status: 413, startedAt });
    return response(
      { ok: false, error: "Request is too large." },
      413,
      requestId,
    );
  }
  if (!isSameSiteContactRequest(request)) {
    logContactEvent({ requestId, event: "rejected", status: 403, startedAt });
    return response(
      { ok: false, error: "Unable to submit this enquiry." },
      403,
      requestId,
    );
  }
  let raw: string;
  try {
    raw = await request.text();
  } catch {
    logContactEvent({ requestId, event: "rejected", status: 400, startedAt });
    return response(
      { ok: false, error: "Unable to read this enquiry." },
      400,
      requestId,
    );
  }
  if (raw.length > MAX_CONTACT_BODY_BYTES) {
    logContactEvent({ requestId, event: "rejected", status: 413, startedAt });
    return response(
      { ok: false, error: "Request is too large." },
      413,
      requestId,
    );
  }
  let payload: unknown;
  try {
    payload = JSON.parse(raw) as unknown;
  } catch {
    logContactEvent({ requestId, event: "rejected", status: 400, startedAt });
    return response(
      { ok: false, error: "Please check the form and try again." },
      400,
      requestId,
    );
  }
  const parsed = contactEnquirySchema.safeParse(payload);
  if (
    !parsed.success ||
    !hasValidFormTiming(parsed.data.formStartedAt) ||
    parsed.data.website
  ) {
    logContactEvent({ requestId, event: "rejected", status: 400, startedAt });
    return response(
      { ok: false, error: "Please check the form and try again." },
      400,
      requestId,
    );
  }
  const rateLimit = await rateLimitContact(request);
  if (!rateLimit.ok) {
    const status = rateLimit.reason === "limited" ? 429 : 503;
    logContactEvent({
      requestId,
      event: "rejected",
      enquiryType: parsed.data.enquiryType,
      status,
      startedAt,
    });
    return response(
      {
        ok: false,
        error:
          rateLimit.reason === "limited"
            ? "Too many requests. Please try again later."
            : "Enquiries are not configured yet.",
      },
      status,
      requestId,
    );
  }
  if (!(await verifyTurnstile(parsed.data.turnstileToken, request))) {
    logContactEvent({
      requestId,
      event: "rejected",
      enquiryType: parsed.data.enquiryType,
      status: 400,
      startedAt,
    });
    return response(
      { ok: false, error: "Please check the form and try again." },
      400,
      requestId,
    );
  }
  const delivery = await deliverContactEnquiry(parsed.data);
  if (!delivery.ok) {
    const status = delivery.reason === "unconfigured" ? 503 : 502;
    logContactEvent({
      requestId,
      event: "delivery_failed",
      enquiryType: parsed.data.enquiryType,
      status,
      startedAt,
    });
    return response(
      {
        ok: false,
        error:
          delivery.reason === "unconfigured"
            ? "Enquiries are not configured yet. Please use the published company locations."
            : "We could not send your enquiry. Please try again later.",
      },
      status,
      requestId,
    );
  }
  logContactEvent({
    requestId,
    event: "accepted",
    enquiryType: parsed.data.enquiryType,
    status: 200,
    startedAt,
  });
  return response({ ok: true }, 200, requestId);
}
