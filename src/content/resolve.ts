import { contactPage } from "@/content/contact";
import type { AboutPageContent } from "@/content/about";
import type { CapabilityPageContent } from "@/content/types";
import {
  fetchPublishedAboutPage,
  fetchPublishedCapabilityPage,
  fetchPublishedContactPage,
  fetchPublishedHomepage,
} from "@/sanity/fetch";

function overlay<T extends object>(
  fallback: T,
  incoming: Partial<T> | null,
): T {
  if (!incoming) {
    return fallback;
  }
  return { ...fallback, ...incoming };
}

export async function resolveCapabilityPage(
  fallback: CapabilityPageContent,
): Promise<CapabilityPageContent> {
  const incoming = await fetchPublishedCapabilityPage(fallback.path);
  if (!incoming?.headline || !incoming.cta) {
    return fallback;
  }
  return overlay(fallback, incoming);
}

export async function resolveAboutPage(
  fallback: AboutPageContent,
): Promise<AboutPageContent> {
  const incoming = await fetchPublishedAboutPage(fallback.path);
  if (!incoming?.headline || !incoming.cta) {
    return fallback;
  }
  return overlay(fallback, incoming);
}

export async function resolveContactPage(
  fallback: typeof contactPage,
): Promise<typeof contactPage> {
  const incoming = await fetchPublishedContactPage();
  if (!incoming?.headline) {
    return fallback;
  }
  return overlay(fallback, incoming) as typeof contactPage;
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
  return overlay(fallback, incoming as Partial<T>);
}
