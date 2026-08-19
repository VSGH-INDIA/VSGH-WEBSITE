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
    useCdn: true,
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
