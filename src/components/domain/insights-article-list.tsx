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
        <li
          key={article.slug}
          id={article.slug}
          className="group grid gap-4 py-8 md:grid-cols-[10rem_minmax(0,1fr)_auto] md:items-center"
        >
          <p className="font-mono text-[length:var(--vsgh-text-meta)] uppercase tracking-[.12em] text-muted">
            {article.category || "Insight"}
            {article.status === "draft" ? " · preview" : ""}
          </p>
          <div className="space-y-3">
            <Heading
              as="h3"
              variant="h3"
              className="text-[clamp(1.35rem,2.4vw,2rem)]"
            >
              <Link
                href={`/insights/${article.slug}`}
                prefetch={article.status === "published"}
                className="text-foreground no-underline transition-colors group-hover:text-[#b9d9ff]"
              >
                {article.title}
              </Link>
            </Heading>
            {article.summary ? (
              <Text size="small" className="text-muted">
                {article.summary}
              </Text>
            ) : null}
          </div>
          <span
            aria-hidden
            className="font-mono text-lg text-muted transition-transform group-hover:translate-x-1 group-hover:text-foreground"
          >
            ↗
          </span>
        </li>
      ))}
    </ul>
  );
}
