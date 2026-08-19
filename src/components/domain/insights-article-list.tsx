import { Heading, Text } from "@/components/ui/primitives";
import type { InsightArticle } from "@/content/insight-articles";

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
            {article.title}
          </Heading>
          {article.summary ? (
            <Text size="small" className="text-muted">
              {article.summary}
            </Text>
          ) : null}
          {article.body.map((block, index) => (
            <article key={`${article.slug}-${index}`} className="space-y-2">
              {block.title ? (
                <Heading as="h3" variant="h3">
                  {block.title}
                </Heading>
              ) : null}
              <Text size="small" className="text-muted">
                {block.body}
              </Text>
            </article>
          ))}
        </li>
      ))}
    </ul>
  );
}
