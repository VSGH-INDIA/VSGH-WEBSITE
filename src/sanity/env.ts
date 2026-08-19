const PROJECT_ID_PATTERN = /^[a-z0-9]{8}$/;

export function isSanityConfigured(
  projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset = process.env.NEXT_PUBLIC_SANITY_DATASET,
): boolean {
  return Boolean(
    projectId &&
    PROJECT_ID_PATTERN.test(projectId) &&
    dataset &&
    /^[a-z0-9_-]+$/i.test(dataset),
  );
}

export function getSanityEnv() {
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? "";
  const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";
  const apiVersion = process.env.SANITY_API_VERSION ?? "2026-08-19";
  const readToken = process.env.SANITY_API_READ_TOKEN;
  return { projectId, dataset, apiVersion, readToken };
}
