import { contactPage } from "@/content/contact";
import { businessPage, type BusinessPageContent } from "@/content/business";
import {
  businessLineForSlug,
  isBusinessLineSlug,
  type BusinessLineContent,
} from "@/content/business-lines";
import { siteSettings, type SiteSettings } from "@/content/site-settings";
import type { CareerVacancy } from "@/content/careers";
import type { AboutPageContent } from "@/content/about";
import type { InsightArticle } from "@/content/insight-articles";
import { normalizePageBuilder } from "@/content/page-builder";
import { overlayPublishedContent } from "@/content/sanitize-cms";
import type { CapabilityPageContent } from "@/content/types";
import {
  fetchPreviewAboutPage,
  fetchPreviewBusinessPage,
  fetchPreviewBusinessLine,
  fetchPreviewCapabilityPage,
  fetchPreviewCareerVacancies,
  fetchPreviewContactPage,
  fetchPreviewGlobalProgrammePartners,
  fetchPreviewHomepage,
  fetchPreviewInsightArticle,
  fetchPreviewInsightArticles,
  fetchPublishedAboutPage,
  fetchPublishedBusinessPage,
  fetchPublishedBusinessLine,
  fetchPublishedCapabilityPage,
  fetchPublishedCareerVacancies,
  fetchPublishedContactPage,
  fetchPublishedGlobalProgrammePartners,
  fetchPublishedHomepage,
  fetchPublishedInsightArticle,
  fetchPublishedInsightArticles,
  fetchPublishedSiteSettings,
} from "@/sanity/fetch";
import type { GlobalProgrammePartner } from "@/content/global-programme-partners";
import { isPreviewSession } from "@/sanity/preview-session";

function withPageBuilder<T extends object>(
  page: T,
  incoming: Partial<T> | null,
): T {
  const pageBuilder = normalizePageBuilder(
    (incoming as { pageBuilder?: unknown } | null)?.pageBuilder,
  );
  return pageBuilder.length ? ({ ...page, pageBuilder } as T) : page;
}

async function resolveWithPreview<T extends object>(
  fallback: T,
  previewFetch: () => Promise<Partial<T> | null>,
  publishedFetch: () => Promise<Partial<T> | null>,
  isUsable: (incoming: Partial<T> | null) => boolean,
): Promise<T> {
  if (await isPreviewSession()) {
    const draft = await previewFetch();
    if (isUsable(draft)) {
      return withPageBuilder(overlayPublishedContent(fallback, draft), draft);
    }
  }
  const incoming = await publishedFetch();
  if (!isUsable(incoming)) {
    return fallback;
  }
  return withPageBuilder(overlayPublishedContent(fallback, incoming), incoming);
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

export async function resolveBusinessPage(): Promise<BusinessPageContent> {
  return resolveWithPreview(
    businessPage,
    fetchPreviewBusinessPage,
    fetchPublishedBusinessPage,
    (incoming) =>
      Boolean(
        incoming?.headline && incoming?.cta && incoming?.lines?.length === 3,
      ),
  );
}

export async function resolveBusinessLine(
  slug: string,
): Promise<BusinessLineContent | null> {
  const fallback = businessLineForSlug(slug);
  if (!fallback) {
    return null;
  }
  return resolveWithPreview(
    fallback,
    () => fetchPreviewBusinessLine(fallback.slug),
    () => fetchPublishedBusinessLine(fallback.slug),
    (incoming) =>
      Boolean(
        incoming?.headline &&
        incoming?.cta &&
        incoming?.focus?.length === 3 &&
        incoming?.connectionFlow?.length === 3 &&
        (!incoming.relatedSlugs ||
          (incoming.relatedSlugs.length === 2 &&
            incoming.relatedSlugs.every(isBusinessLineSlug))),
      ),
  );
}

export async function resolveGlobalProgrammePartners(): Promise<
  GlobalProgrammePartner[]
> {
  if (await isPreviewSession()) {
    return fetchPreviewGlobalProgrammePartners();
  }
  return fetchPublishedGlobalProgrammePartners();
}

export async function resolveSiteSettings(): Promise<SiteSettings> {
  const incoming = await fetchPublishedSiteSettings();
  if (
    !incoming?.companyName ||
    !incoming.shortName ||
    !incoming.defaultDescription ||
    !incoming.titleSuffix
  ) {
    return siteSettings;
  }
  return { ...siteSettings, ...incoming };
}

export async function resolveInsightArticles(): Promise<InsightArticle[]> {
  if (await isPreviewSession()) {
    return fetchPreviewInsightArticles();
  }
  return fetchPublishedInsightArticles();
}

export async function resolveInsightArticle(
  slug: string,
): Promise<InsightArticle | null> {
  if (await isPreviewSession()) {
    const draft = await fetchPreviewInsightArticle(slug);
    if (draft) {
      return draft;
    }
  }
  return fetchPublishedInsightArticle(slug);
}

export async function resolveCareerVacancies(): Promise<CareerVacancy[]> {
  if (await isPreviewSession()) {
    return fetchPreviewCareerVacancies();
  }
  return fetchPublishedCareerVacancies();
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
