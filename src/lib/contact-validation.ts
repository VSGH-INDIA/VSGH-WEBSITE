import { z } from "zod";
import { ENQUIRY_TYPES } from "@/content/contact-enquiry";

export const MAX_CONTACT_BODY_BYTES = 16_384;
const MIN_FORM_AGE_MS = 800;
const MAX_FORM_AGE_MS = 86_400_000;

export const contactEnquirySchema = z
  .object({
    name: z.string().trim().min(2).max(100),
    organization: z.string().trim().min(2).max(120),
    email: z.string().trim().email().max(254),
    country: z.string().trim().max(80).optional().default(""),
    enquiryType: z.enum(ENQUIRY_TYPES),
    message: z.string().trim().min(20).max(4_000),
    consent: z.literal(true),
    website: z.string().max(0).optional().default(""),
    formStartedAt: z.number().int().positive(),
    turnstileToken: z.string().trim().max(4_096).optional().default(""),
  })
  .strict();

export type ContactEnquiry = z.infer<typeof contactEnquirySchema>;

export function isSameSiteContactRequest(request: Request): boolean {
  const origin = request.headers.get("origin");
  if (!origin) return false;
  try {
    const requestUrl = new URL(request.url);
    const host = request.headers.get("x-forwarded-host")?.split(",")[0]?.trim();
    const protocol = request.headers
      .get("x-forwarded-proto")
      ?.split(",")[0]
      ?.trim();
    const forwardedOrigin =
      host && protocol ? `${protocol}://${host}` : undefined;
    return origin === requestUrl.origin || origin === forwardedOrigin;
  } catch {
    return false;
  }
}

export function hasValidFormTiming(formStartedAt: number): boolean {
  const age = Date.now() - formStartedAt;
  return age >= MIN_FORM_AGE_MS && age <= MAX_FORM_AGE_MS;
}
