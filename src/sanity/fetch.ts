import type { AboutPageContent } from "@/content/about";
import type { CareerVacancy } from "@/content/careers";
import { contactPage } from "@/content/contact";
import {
  normalizeInsightArticles,
  type InsightArticle,
} from "@/content/insight-articles";
import type { CapabilityPageContent } from "@/content/types";
import {
  getPreviewSanityClient,
  getPublishedSanityClient,
} from "@/sanity/client";
import { isSanityConfigured } from "@/sanity/env";
import { isRevalidatablePath } from "@/sanity/revalidate";
import {
  ABOUT_PAGE_PREVIEW_QUERY,
  ABOUT_PAGE_QUERY,
  CAPABILITY_PAGE_PREVIEW_QUERY,
  CAPABILITY_PAGE_QUERY,
  CAREER_VACANCIES_PREVIEW_QUERY,
  CAREER_VACANCIES_QUERY,
  CONTACT_PAGE_PREVIEW_QUERY,
  CONTACT_PAGE_QUERY,
  HOMEPAGE_PREVIEW_QUERY,
  HOMEPAGE_QUERY,
  INSIGHT_ARTICLES_PREVIEW_QUERY,
  INSIGHT_ARTICLES_QUERY,
} from "@/sanity/queries";
import type { SanityClient } from "@sanity/client";

async function queryWithClient<T>(
  client: SanityClient | null,
  groq: string,
  params: Record<string, string> = {},
): Promise<T | null> {
  if (!client) {
    return null;
  }
  try {
    return (await client.fetch<T>(groq, params)) ?? null;
  } catch {
    return null;
  }
}

async function cachedPublishedQuery<T>(
  groq: string,
  params: Record<string, string> = {},
): Promise<T | null> {
  if (!isSanityConfigured()) {
    return null;
  }
  const client = getPublishedSanityClient();
  if (!client) {
    return null;
  }
  try {
    return (
      (await client.fetch<T>(groq, params, {
        useCdn: false,
        next: { revalidate: 3600, tags: ["sanity"] },
      })) ?? null
    );
  } catch {
    return null;
  }
}

function previewQuery<T>(
  groq: string,
  params: Record<string, string> = {},
): Promise<T | null> {
  return queryWithClient<T>(getPreviewSanityClient(), groq, params);
}

export function fetchPublishedCapabilityPage(
  path: string,
): Promise<Partial<CapabilityPageContent> | null> {
  if (!isRevalidatablePath(path)) {
    return Promise.resolve(null);
  }
  return cachedPublishedQuery(CAPABILITY_PAGE_QUERY, { path });
}

export function fetchPreviewCapabilityPage(
  path: string,
): Promise<Partial<CapabilityPageContent> | null> {
  if (!isRevalidatablePath(path)) {
    return Promise.resolve(null);
  }
  return previewQuery(CAPABILITY_PAGE_PREVIEW_QUERY, { path });
}

export function fetchPublishedAboutPage(
  path: string,
): Promise<Partial<AboutPageContent> | null> {
  if (!isRevalidatablePath(path)) {
    return Promise.resolve(null);
  }
  return cachedPublishedQuery(ABOUT_PAGE_QUERY, { path });
}

export function fetchPreviewAboutPage(
  path: string,
): Promise<Partial<AboutPageContent> | null> {
  if (!isRevalidatablePath(path)) {
    return Promise.resolve(null);
  }
  return previewQuery(ABOUT_PAGE_PREVIEW_QUERY, { path });
}

export function fetchPublishedHomepage(): Promise<Record<
  string,
  unknown
> | null> {
  return cachedPublishedQuery(HOMEPAGE_QUERY);
}

export function fetchPreviewHomepage(): Promise<Record<
  string,
  unknown
> | null> {
  return previewQuery(HOMEPAGE_PREVIEW_QUERY);
}

export function fetchPublishedContactPage(): Promise<Partial<
  typeof contactPage
> | null> {
  return cachedPublishedQuery(CONTACT_PAGE_QUERY);
}

export function fetchPreviewContactPage(): Promise<Partial<
  typeof contactPage
> | null> {
  return previewQuery(CONTACT_PAGE_PREVIEW_QUERY);
}

export async function fetchPublishedInsightArticles(): Promise<
  InsightArticle[]
> {
  const incoming = await cachedPublishedQuery<unknown>(INSIGHT_ARTICLES_QUERY);
  return normalizeInsightArticles(incoming, "published");
}

export async function fetchPreviewInsightArticles(): Promise<InsightArticle[]> {
  const incoming = await previewQuery<unknown>(INSIGHT_ARTICLES_PREVIEW_QUERY);
  return normalizeInsightArticles(incoming, "preview");
}

export async function fetchPublishedCareerVacancies(): Promise<
  CareerVacancy[]
> {
  return (
    (await cachedPublishedQuery<CareerVacancy[]>(CAREER_VACANCIES_QUERY)) ?? []
  );
}

export async function fetchPreviewCareerVacancies(): Promise<CareerVacancy[]> {
  return (
    (await previewQuery<CareerVacancy[]>(CAREER_VACANCIES_PREVIEW_QUERY)) ?? []
  );
}
