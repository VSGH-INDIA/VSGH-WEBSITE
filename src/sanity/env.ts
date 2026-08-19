import {
  resolveSanityDataset,
  resolveSanityProjectId,
  VSGH_SANITY_API_VERSION,
} from "@/sanity/project";

const PROJECT_ID_PATTERN = /^[a-z0-9]{8}$/;

export function isSanityConfigured(
  projectId = resolveSanityProjectId(),
  dataset = resolveSanityDataset(),
): boolean {
  return Boolean(
    projectId &&
    PROJECT_ID_PATTERN.test(projectId) &&
    dataset &&
    /^[a-z0-9_-]+$/i.test(dataset),
  );
}

export function getSanityEnv() {
  const projectId = resolveSanityProjectId();
  const dataset = resolveSanityDataset();
  const apiVersion = process.env.SANITY_API_VERSION ?? VSGH_SANITY_API_VERSION;
  const readToken = process.env.SANITY_API_READ_TOKEN;
  return { projectId, dataset, apiVersion, readToken };
}
