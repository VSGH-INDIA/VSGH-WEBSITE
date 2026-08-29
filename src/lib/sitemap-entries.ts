import { IMPLEMENTED_ROUTES } from "@/lib/navigation";
import { absoluteUrl } from "@/lib/seo";
import { isSafeInternalPath } from "@/lib/safe-url";

const INSIGHT_ARTICLE_PATH = /^\/insights\/[a-z0-9]+(?:-[a-z0-9]+)*$/;
const CAREER_VACANCY_PATH = /^\/careers\/[a-z0-9]+(?:-[a-z0-9]+)*$/;

export function isInsightArticlePath(path: string): boolean {
  return INSIGHT_ARTICLE_PATH.test(path);
}

export function isCareerVacancyPath(path: string): boolean {
  return CAREER_VACANCY_PATH.test(path);
}

export function publishedSitemapPaths(
  extraPublishedPaths: readonly string[] = [],
): string[] {
  const extras = extraPublishedPaths.filter(
    (path) =>
      isSafeInternalPath(path) &&
      (isInsightArticlePath(path) || isCareerVacancyPath(path)),
  );
  return [...IMPLEMENTED_ROUTES, ...extras];
}

export function publishedSitemapUrls(
  extraPublishedPaths: readonly string[] = [],
): { url: string; path: string }[] {
  return publishedSitemapPaths(extraPublishedPaths).map((path) => ({
    path,
    url: path === "/" ? absoluteUrl("") : absoluteUrl(path),
  }));
}
