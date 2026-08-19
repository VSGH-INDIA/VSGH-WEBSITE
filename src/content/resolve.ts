import { contactPage } from "@/content/contact";
import type { AboutPageContent } from "@/content/about";
import { overlayPublishedContent } from "@/content/sanitize-cms";
import type { CapabilityPageContent } from "@/content/types";
import {
  fetchPublishedAboutPage,
  fetchPublishedCapabilityPage,
  fetchPublishedContactPage,
  fetchPublishedHomepage,
} from "@/sanity/fetch";

export async function resolveCapabilityPage(
  fallback: CapabilityPageContent,
): Promise<CapabilityPageContent> {
  const incoming = await fetchPublishedCapabilityPage(fallback.path);
  if (!incoming?.headline || !incoming.cta) {
    return fallback;
  }
  return overlayPublishedContent(fallback, incoming);
}

export async function resolveAboutPage(
  fallback: AboutPageContent,
): Promise<AboutPageContent> {
  const incoming = await fetchPublishedAboutPage(fallback.path);
  if (!incoming?.headline || !incoming.cta) {
    return fallback;
  }
  return overlayPublishedContent(fallback, incoming);
}

export async function resolveContactPage(
  fallback: typeof contactPage,
): Promise<typeof contactPage> {
  const incoming = await fetchPublishedContactPage();
  if (!incoming?.headline) {
    return fallback;
  }
  return overlayPublishedContent(fallback, incoming);
}

export async function resolveHomepage<T extends object>(
  fallback: T,
): Promise<T> {
  const incoming = await fetchPublishedHomepage();
  if (
    !incoming ||
    typeof incoming.hero !== "object" ||
    incoming.hero === null
  ) {
    return fallback;
  }
  return overlayPublishedContent(fallback, incoming as Partial<T>);
}
