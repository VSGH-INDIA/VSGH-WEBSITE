export type InsightArticleBlock = {
  title?: string;
  body: string;
};

export type InsightArticle = {
  slug: string;
  title: string;
  category: string;
  summary: string;
  publicationDate: string | null;
  author: string | null;
  lifecycle?: string;
  status: "draft" | "published";
  body: InsightArticleBlock[];
  mediaLabel: string;
  seoTitle: string;
  description: string;
};

const SLUG = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

function asText(value: unknown, max = 400): string {
  if (typeof value !== "string") {
    return "";
  }
  return value.trim().slice(0, max);
}

function asBlocks(value: unknown): InsightArticleBlock[] {
  if (!Array.isArray(value)) {
    return [];
  }
  return value.flatMap((item) => {
    if (typeof item !== "object" || item === null) {
      return [];
    }
    const block = item as { title?: unknown; body?: unknown };
    const body = asText(block.body, 4000);
    if (!body) {
      return [];
    }
    return [{ title: asText(block.title, 160) || undefined, body }];
  });
}

export function normalizeInsightArticle(
  incoming: unknown,
  mode: "published" | "preview",
): InsightArticle | null {
  if (typeof incoming !== "object" || incoming === null) {
    return null;
  }
  const row = incoming as Record<string, unknown>;
  const slug = asText(row.slug, 96);
  const title = asText(row.title, 160);
  const lifecycle = asText(row.lifecycle, 32);
  if (!slug || !SLUG.test(slug) || !title) {
    return null;
  }
  if (lifecycle === "archived") {
    return null;
  }
  if (mode === "published" && lifecycle !== "published") {
    return null;
  }
  const status: InsightArticle["status"] =
    mode === "published" || lifecycle === "published" ? "published" : "draft";
  return {
    slug,
    title,
    category: asText(row.category, 80),
    summary: asText(row.summary, 400),
    publicationDate:
      typeof row.publicationDate === "string" ? row.publicationDate : null,
    author: asText(row.author, 80) || null,
    lifecycle: lifecycle || undefined,
    status,
    body: asBlocks(row.body),
    mediaLabel: asText(row.mediaLabel, 120),
    seoTitle: asText(row.seoTitle, 70) || title,
    description: asText(row.description, 180) || asText(row.summary, 180),
  };
}

export function normalizeInsightArticles(
  incoming: unknown,
  mode: "published" | "preview",
): InsightArticle[] {
  if (!Array.isArray(incoming)) {
    return [];
  }
  return incoming.flatMap((item) => {
    const article = normalizeInsightArticle(item, mode);
    return article ? [article] : [];
  });
}

export const insightArticles: InsightArticle[] = [];
