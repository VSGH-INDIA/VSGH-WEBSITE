import { contactPage } from "@/content/contact";
import type { AboutPageContent } from "@/content/about";
import { overlayPublishedContent } from "@/content/sanitize-cms";
import type { CapabilityPageContent } from "@/content/types";
import {
  fetchPreviewAboutPage,
  fetchPreviewCapabilityPage,
  fetchPreviewContactPage,
  fetchPreviewHomepage,
  fetchPublishedAboutPage,
  fetchPublishedCapabilityPage,
  fetchPublishedContactPage,
  fetchPublishedHomepage,
} from "@/sanity/fetch";
import { isPreviewSession } from "@/sanity/preview-session";

async function resolveWithPreview<T extends object>(
  fallback: T,
  previewFetch: () => Promise<Partial<T> | null>,
  publishedFetch: () => Promise<Partial<T> | null>,
  isUsable: (incoming: Partial<T> | null) => boolean,
): Promise<T> {
  if (await isPreviewSession()) {
    const draft = await previewFetch();
    if (isUsable(draft)) {
      return overlayPublishedContent(fallback, draft);
    }
  }
  const incoming = await publishedFetch();
  if (!isUsable(incoming)) {
    return fallback;
  }
  return overlayPublishedContent(fallback, incoming);
}

export async function resolveCapabilityPage(
  fallback: CapabilityPageContent,
): Promise<CapabilityPageContent> {
  return resolveWithPreview(
    fallback,
    () => fetchPreviewCapabilityPage(fallback.path),
    () => fetchPublishedCapabilityPage(fallback.path),
    (incoming) => Boolean(incoming?.headline && incoming.cta),
  );
}

export async function resolveAboutPage(
  fallback: AboutPageContent,
): Promise<AboutPageContent> {
  return resolveWithPreview(
    fallback,
    () => fetchPreviewAboutPage(fallback.path),
    () => fetchPublishedAboutPage(fallback.path),
    (incoming) => Boolean(incoming?.headline && incoming.cta),
  );
}

export async function resolveContactPage(
  fallback: typeof contactPage,
): Promise<typeof contactPage> {
  return resolveWithPreview(
    fallback,
    () => fetchPreviewContactPage(),
    () => fetchPublishedContactPage(),
    (incoming) => Boolean(incoming?.headline),
  );
}

export async function resolveHomepage<T extends object>(
  fallback: T,
): Promise<T> {
  return resolveWithPreview(
    fallback,
    () => fetchPreviewHomepage() as Promise<Partial<T> | null>,
    () => fetchPublishedHomepage() as Promise<Partial<T> | null>,
    (incoming) =>
      Boolean(
        incoming &&
        typeof (incoming as { hero?: unknown }).hero === "object" &&
        (incoming as { hero?: unknown }).hero !== null,
      ),
  );
}
