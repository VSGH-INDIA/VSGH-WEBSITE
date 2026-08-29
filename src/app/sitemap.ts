import type { MetadataRoute } from "next";
import { PUBLIC_INDEXING_ENABLED } from "@/lib/indexing";
import { publishedSitemapUrls } from "@/lib/sitemap-entries";
import { fetchPublishedInsightArticles } from "@/sanity/fetch";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  if (!PUBLIC_INDEXING_ENABLED) {
    return [];
  }

  const articles = await fetchPublishedInsightArticles();
  const extra = articles
    .filter((article) => article.status === "published")
    .map((article) => `/insights/${article.slug}`);

  return publishedSitemapUrls(extra).map(({ url, path }) => ({
    url,
    changeFrequency: path === "/" ? "weekly" : "monthly",
    priority: path === "/" ? 1 : 0.7,
  }));
}
