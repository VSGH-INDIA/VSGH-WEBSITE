import { Heading, Text } from "@/components/ui/primitives";
import type { InsightArticle } from "@/content/insight-articles";
import Link from "next/link";

export function InsightsArticleList({
  articles,
}: {
  articles: readonly InsightArticle[];
}) {
  if (articles.length === 0) {
    return null;
  }

  return (
    <ul className="divide-y divide-border border-y border-border">
      {articles.map((article) => (
        <li key={article.slug} id={article.slug} className="space-y-3 py-8">
          <p className="font-mono text-[length:var(--vsgh-text-meta)] text-muted">
            {article.category || "Insight"}
            {article.status === "draft" ? " · preview" : ""}
          </p>
          <Heading as="h3" variant="h3">
            <Link
              href={`/insights/${article.slug}`}
              prefetch={article.status === "published"}
              className="text-foreground no-underline hover:underline"
            >
              {article.title}
            </Link>
          </Heading>
          {article.summary ? (
            <Text size="small" className="text-muted">
              {article.summary}
            </Text>
          ) : null}
        </li>
      ))}
    </ul>
  );
}
