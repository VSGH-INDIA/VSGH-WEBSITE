const DEFAULT_HOSTED_STUDIO_ORIGIN = "https://vsgh-india-cms.sanity.studio";

function asOrigin(value: string | undefined): string | null {
  if (!value) return null;
  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:"
      ? url.origin
      : null;
  } catch {
    return null;
  }
}

/**
 * Origins allowed to embed a draft-only Presentation preview. This is purposefully
 * separate from the public preview URL so a misconfigured public origin can never
 * silently broaden who may frame the site.
 */
export function approvedStudioOrigins(
  configuredOrigin = process.env.SANITY_STUDIO_ORIGIN,
  isDevelopment = process.env.NODE_ENV === "development",
): readonly string[] {
  const configured = asOrigin(configuredOrigin);
  const origins = [configured ?? DEFAULT_HOSTED_STUDIO_ORIGIN];
  if (isDevelopment) origins.push("http://localhost:3333");
  return [...new Set(origins)];
}

export function isApprovedStudioOrigin(
  origin: string | undefined,
  configuredOrigin = process.env.SANITY_STUDIO_ORIGIN,
  isDevelopment = process.env.NODE_ENV === "development",
): boolean {
  return Boolean(
    origin &&
    approvedStudioOrigins(configuredOrigin, isDevelopment).includes(origin),
  );
}
