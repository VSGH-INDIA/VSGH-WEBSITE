export const PUBLIC_CONTENT_GUIDANCE =
  "PUBLIC WEBSITE CONTENT ONLY. Do not enter confidential technical data, unsupported performance claims, customer names, certifications, environmental metrics, restricted research, formulations, or internal engineering documents. Media uploaded here is treated as publication-safe.";

export const LIFECYCLE_VALUES = [
  "draft",
  "review",
  "approved",
  "published",
  "archived",
] as const;

export type ContentLifecycle = (typeof LIFECYCLE_VALUES)[number];
