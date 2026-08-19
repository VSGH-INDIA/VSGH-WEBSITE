import { unstable_cache } from "next/cache";
import type { AboutPageContent } from "@/content/about";
import type { CareerVacancy } from "@/content/careers";
import { contactPage } from "@/content/contact";
import type { InsightArticle } from "@/content/insights";
import type { CapabilityPageContent } from "@/content/types";
import { getPublishedSanityClient } from "@/sanity/client";
import { isSanityConfigured } from "@/sanity/env";
import { isRevalidatablePath } from "@/sanity/revalidate";
import {
  ABOUT_PAGE_QUERY,
  CAPABILITY_PAGE_QUERY,
  CAREER_VACANCIES_QUERY,
  CONTACT_PAGE_QUERY,
  HOMEPAGE_QUERY,
  INSIGHT_ARTICLES_QUERY,
} from "@/sanity/queries";

async function querySanity<T>(
  groq: string,
  params: Record<string, string> = {},
): Promise<T | null> {
  const client = getPublishedSanityClient();
  if (!client) {
    return null;
  }
  try {
    return (await client.fetch<T>(groq, params)) ?? null;
  } catch {
    return null;
  }
}

async function cachedQuery<T>(
  key: string[],
  groq: string,
  params: Record<string, string> = {},
): Promise<T | null> {
  if (!isSanityConfigured()) {
    return null;
  }
  return unstable_cache(async () => querySanity<T>(groq, params), key, {
    revalidate: 3600,
    tags: ["sanity"],
  })();
}

export function fetchPublishedCapabilityPage(
  path: string,
): Promise<Partial<CapabilityPageContent> | null> {
  if (!isRevalidatablePath(path)) {
    return Promise.resolve(null);
  }
  return cachedQuery(["sanity-capability", path], CAPABILITY_PAGE_QUERY, {
    path,
  });
}

export function fetchPublishedAboutPage(
  path: string,
): Promise<Partial<AboutPageContent> | null> {
  if (!isRevalidatablePath(path)) {
    return Promise.resolve(null);
  }
  return cachedQuery(["sanity-about", path], ABOUT_PAGE_QUERY, { path });
}

export function fetchPublishedHomepage(): Promise<Record<
  string,
  unknown
> | null> {
  return cachedQuery(["sanity-homepage"], HOMEPAGE_QUERY);
}

export function fetchPublishedContactPage(): Promise<Partial<
  typeof contactPage
> | null> {
  return cachedQuery(["sanity-contact"], CONTACT_PAGE_QUERY);
}

export async function fetchPublishedInsightArticles(): Promise<
  InsightArticle[]
> {
  return (
    (await cachedQuery<InsightArticle[]>(
      ["sanity-insights"],
      INSIGHT_ARTICLES_QUERY,
    )) ?? []
  );
}

export async function fetchPublishedCareerVacancies(): Promise<
  CareerVacancy[]
> {
  return (
    (await cachedQuery<CareerVacancy[]>(
      ["sanity-careers"],
      CAREER_VACANCIES_QUERY,
    )) ?? []
  );
}
