import "server-only";
import { createClient, type SanityClient } from "@sanity/client";
import { isConfiguredSecret } from "@/lib/security-headers";
import { getSanityEnv, isSanityConfigured } from "@/sanity/env";

export function getPublishedSanityClient(): SanityClient | null {
  if (!isSanityConfigured()) {
    return null;
  }
  const { projectId, dataset, apiVersion } = getSanityEnv();
  return createClient({
    projectId,
    dataset,
    apiVersion,
    // Public website content must reflect the CMS publication lifecycle after
    // webhook/tag revalidation. The CDN can retain an empty list response when
    // a new partner profile is first published.
    useCdn: false,
    perspective: "published",
    stega: false,
  });
}

export function getPreviewSanityClient(): SanityClient | null {
  if (!isSanityConfigured()) {
    return null;
  }
  const { projectId, dataset, apiVersion, readToken } = getSanityEnv();
  if (!isConfiguredSecret(readToken)) {
    return null;
  }
  return createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: false,
    perspective: "previewDrafts",
    token: readToken,
    stega: false,
  });
}

/**
 * Server-only reader for explicitly approved published content. This keeps the
 * viewer token out of browser bundles while supporting deployments whose
 * Content Lake public-read policy does not return published records.
 */
export function getPublishedServerSanityClient(): SanityClient | null {
  if (!isSanityConfigured()) {
    return null;
  }
  const { projectId, dataset, apiVersion, readToken } = getSanityEnv();
  if (!isConfiguredSecret(readToken)) {
    return null;
  }
  return createClient({
    projectId,
    dataset,
    apiVersion,
    useCdn: false,
    perspective: "published",
    token: readToken,
    stega: false,
  });
}
