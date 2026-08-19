export const VSGH_SANITY_PROJECT_ID = "9fys33s1";
export const VSGH_SANITY_DATASET = "production";
export const VSGH_SANITY_API_VERSION = "2026-08-19";

export function resolveSanityProjectId(
  studioProjectId = process.env.SANITY_STUDIO_PROJECT_ID,
  publicProjectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
): string {
  return studioProjectId || publicProjectId || VSGH_SANITY_PROJECT_ID;
}

export function resolveSanityDataset(
  dataset = process.env.NEXT_PUBLIC_SANITY_DATASET,
): string {
  return dataset || VSGH_SANITY_DATASET;
}
