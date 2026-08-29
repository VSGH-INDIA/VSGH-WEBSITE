import { InsightArticleView } from "@/components/domain/insight-article-view";
import { resolveInsightArticle } from "@/content/resolve";
import { previewRobotsMetadata } from "@/lib/indexing";
import { pageMetadata } from "@/lib/seo";
import { fetchPublishedInsightArticles } from "@/sanity/fetch";
import { isPreviewSession } from "@/sanity/preview-session";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const articles = await fetchPublishedInsightArticles();
  return articles.map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await resolveInsightArticle(slug);
  if (!article) {
    return { robots: previewRobotsMetadata() };
  }
  const metadata = pageMetadata({
    title: article.seoTitle,
    description: article.description,
    path: `/insights/${article.slug}`,
  });
  if (article.status !== "published" || (await isPreviewSession())) {
    return {
      ...metadata,
      robots: previewRobotsMetadata(),
    };
  }
  return metadata;
}

export default async function InsightArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await resolveInsightArticle(slug);
  if (!article) {
    notFound();
  }
  const preview = await isPreviewSession();
  return <InsightArticleView article={article} preview={preview} />;
}
