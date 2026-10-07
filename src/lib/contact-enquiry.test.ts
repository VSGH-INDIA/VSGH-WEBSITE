import { describe, expect, it } from "vitest";
import { ENQUIRY_TYPES } from "@/content/contact-enquiry";
import {
  contactEnquirySchema,
  hasValidFormTiming,
  isSameSiteContactRequest,
  MAX_CONTACT_BODY_BYTES,
} from "@/lib/contact-validation";

const validPayload = {
  name: "Aviation Contact",
  organization: "Example Manufacturing",
  email: "contact@example.com",
  country: "India",
  enquiryType: ENQUIRY_TYPES[0],
  partner: "",
  message: "We would like to discuss an approved business opportunity.",
  consent: true,
  website: "",
  formStartedAt: Date.now() - 1_000,
  turnstileToken: "",
};

describe("contact enquiry validation", () => {
  it("accepts a bounded, consented business enquiry", () => {
    expect(contactEnquirySchema.safeParse(validPayload).success).toBe(true);
    expect(hasValidFormTiming(validPayload.formStartedAt)).toBe(true);
  });

  it("rejects invalid email, honeypot content, and unconsented data", () => {
    expect(
      contactEnquirySchema.safeParse({ ...validPayload, email: "not-an-email" })
        .success,
    ).toBe(false);
    expect(
      contactEnquirySchema.safeParse({
        ...validPayload,
        website: "bot.example",
      }).success,
    ).toBe(false);
    expect(
      contactEnquirySchema.safeParse({ ...validPayload, consent: false })
        .success,
    ).toBe(false);
  });

  it("accepts an optional partner context only when it is a safe slug", () => {
    expect(
      contactEnquirySchema.safeParse({
        ...validPayload,
        partner: "example-industries",
      }).success,
    ).toBe(true);
    expect(
      contactEnquirySchema.safeParse({
        ...validPayload,
        partner: "example industries",
      }).success,
    ).toBe(false);
  });

  it("requires a realistic form interaction interval", () => {
    expect(hasValidFormTiming(Date.now())).toBe(false);
    expect(hasValidFormTiming(Date.now() - 86_400_001)).toBe(false);
  });

  it("accepts only same-site browser origins", () => {
    expect(
      isSameSiteContactRequest(
        new Request("https://vsghindia.com/api/contact", {
          headers: { origin: "https://vsghindia.com" },
        }),
      ),
    ).toBe(true);
    expect(
      isSameSiteContactRequest(
        new Request("https://vsghindia.com/api/contact", {
          headers: { origin: "https://evil.example" },
        }),
      ),
    ).toBe(false);
  });

  it("keeps the contact body budget intentionally small", () => {
    expect(MAX_CONTACT_BODY_BYTES).toBeLessThanOrEqual(16_384);
  });
});
