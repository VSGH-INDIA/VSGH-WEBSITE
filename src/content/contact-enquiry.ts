export const ENQUIRY_TYPES = [
  "aerospace-systems-components",
  "advanced-materials",
  "technology-r-and-d",
  "machinery-imports-exports",
  "global-partnership-programme",
  "media-corporate",
  "careers",
  "other",
] as const;

export type EnquiryType = (typeof ENQUIRY_TYPES)[number];

export const ENQUIRY_TYPE_LABELS: Record<EnquiryType, string> = {
  "aerospace-systems-components": "Aerospace systems & components",
  "advanced-materials": "Advanced materials",
  "technology-r-and-d": "Technology / R&D",
  "machinery-imports-exports": "Machinery imports & exports",
  "global-partnership-programme": "Global partnership / programme",
  "media-corporate": "Media / corporate",
  careers: "Careers",
  other: "Other",
};

export function isEnquiryType(value: string | null): value is EnquiryType {
  return Boolean(value && (ENQUIRY_TYPES as readonly string[]).includes(value));
}
