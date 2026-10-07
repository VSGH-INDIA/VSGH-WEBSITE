import "server-only";

import { createHash, randomUUID } from "node:crypto";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { Resend } from "resend";
import {
  ENQUIRY_TYPE_LABELS,
  type EnquiryType,
} from "@/content/contact-enquiry";
import type { ContactEnquiry } from "@/lib/contact-validation";

export {
  contactEnquirySchema,
  hasValidFormTiming,
  isSameSiteContactRequest,
  MAX_CONTACT_BODY_BYTES,
} from "@/lib/contact-validation";

type RateLimitResult =
  { ok: true } | { ok: false; reason: "limited" | "unconfigured" };

let rateLimiter: Ratelimit | null | undefined;

function getRateLimiter(): Ratelimit | null {
  if (rateLimiter !== undefined) return rateLimiter;
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) {
    rateLimiter = null;
    return rateLimiter;
  }
  rateLimiter = new Ratelimit({
    redis: new Redis({ url, token }),
    limiter: Ratelimit.slidingWindow(5, "10 m"),
    prefix: "vsgh-contact",
    analytics: false,
  });
  return rateLimiter;
}

function requestIp(request: Request): string {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown"
  );
}

export async function rateLimitContact(
  request: Request,
): Promise<RateLimitResult> {
  const limiter = getRateLimiter();
  if (!limiter) return { ok: false, reason: "unconfigured" };
  const key = createHash("sha256").update(requestIp(request)).digest("hex");
  const result = await limiter.limit(key);
  return result.success ? { ok: true } : { ok: false, reason: "limited" };
}

export async function verifyTurnstile(
  token: string,
  request: Request,
): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true;
  if (!token) return false;
  const body = new URLSearchParams({
    secret,
    response: token,
    remoteip: requestIp(request),
  });
  try {
    const response = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      { method: "POST", body, cache: "no-store" },
    );
    const result = (await response.json()) as { success?: unknown };
    return result.success === true;
  } catch {
    return false;
  }
}

function cleanHeader(value: string): string {
  return value.replace(/[\r\n\u0000]/g, " ").trim();
}

function cleanMessage(value: string): string {
  return value
    .replace(/\u0000/g, "")
    .replace(/\r\n/g, "\n")
    .trim();
}

function contactConfiguration():
  { to: string; from: string; apiKey: string } | undefined {
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;
  const apiKey = process.env.RESEND_API_KEY;
  if (
    process.env.CONTACT_EMAIL_PROVIDER !== "resend" ||
    !to ||
    !from ||
    !apiKey
  ) {
    return undefined;
  }
  return { to, from, apiKey };
}

export async function deliverContactEnquiry(
  enquiry: ContactEnquiry,
): Promise<{ ok: true } | { ok: false; reason: "unconfigured" | "failed" }> {
  const configuration = contactConfiguration();
  if (!configuration) return { ok: false, reason: "unconfigured" };
  const resend = new Resend(configuration.apiKey);
  const category = ENQUIRY_TYPE_LABELS[enquiry.enquiryType as EnquiryType];
  const { error } = await resend.emails.send({
    from: configuration.from,
    to: [configuration.to],
    replyTo: enquiry.email,
    subject: `[VSGH enquiry] ${cleanHeader(category)}`,
    text: [
      `Name: ${cleanHeader(enquiry.name)}`,
      `Organisation: ${cleanHeader(enquiry.organization)}`,
      `Work email: ${cleanHeader(enquiry.email)}`,
      `Country / region: ${cleanHeader(enquiry.country || "Not supplied")}`,
      `Enquiry type: ${cleanHeader(category)}`,
      `Partner profile: ${cleanHeader(enquiry.partner || "Not supplied")}`,
      "",
      "Message:",
      cleanMessage(enquiry.message),
    ].join("\n"),
  });
  return error ? { ok: false, reason: "failed" } : { ok: true };
}

export function contactRequestId(): string {
  return randomUUID();
}

export function logContactEvent(input: {
  requestId: string;
  event: "accepted" | "rejected" | "delivery_failed";
  enquiryType?: EnquiryType;
  status: number;
  startedAt: number;
}) {
  console.info(
    JSON.stringify({
      event: `contact.${input.event}`,
      requestId: input.requestId,
      enquiryType: input.enquiryType,
      status: input.status,
      latencyMs: Date.now() - input.startedAt,
    }),
  );
}
