import { PageBuilder } from "@/components/cms/page-builder";
import { InsightArticleJsonLd } from "@/components/domain/insight-article-json-ld";
import { PreviewBanner } from "@/components/layout/preview-banner";
import { ButtonLink } from "@/components/ui/button";
import { PublicMedia } from "@/components/ui/media-asset";
import { Container, Heading, Section, Text } from "@/components/ui/primitives";
import type { InsightArticle } from "@/content/insight-articles";

export function InsightArticleView({
  article,
  preview = false,
}: {
  article: InsightArticle;
  preview?: boolean;
}) {
  return (
    <main id="main">
      {preview ? <PreviewBanner /> : null}
      <InsightArticleJsonLd article={article} />
      <Section className="vsgh-reveal border-b border-border bg-surface">
        <Container wide className="max-w-4xl space-y-6 py-4">
          <p className="font-mono text-[length:var(--vsgh-text-meta)] text-muted">
            {article.category || "Insight"}
            {article.status === "draft" ? " · preview" : ""}
            {article.publicationDate ? ` · ${article.publicationDate}` : ""}
            {article.author ? ` · ${article.author}` : ""}
          </p>
          <Heading
            as="h1"
            variant="display"
            className="text-[clamp(2.7rem,6.8vw,6.5rem)] leading-[.92]"
          >
            {article.title}
          </Heading>
          {article.summary ? (
            <Text className="text-muted">{article.summary}</Text>
          ) : null}
        </Container>
      </Section>
      {article.mediaLabel || article.media ? (
        <Section className="vsgh-reveal">
          <Container wide className="max-w-4xl">
            <PublicMedia
              media={article.media}
              label={article.mediaLabel || article.title}
              priority
            />
          </Container>
        </Section>
      ) : null}
      {article.body.length > 0 ? (
        <Section className="vsgh-reveal">
          <Container wide className="max-w-4xl space-y-0">
            {article.body.map((block, index) => (
              <article
                key={`${article.slug}-${index}`}
                className="grid gap-4 border-t border-border py-8 last:border-b md:grid-cols-[5rem_minmax(0,1fr)]"
              >
                <p className="font-mono text-[length:var(--vsgh-text-meta)] text-[#9fb7cf]">
                  /{String(index + 1).padStart(2, "0")}
                </p>
                <div className="max-w-3xl space-y-3">
                  {block.title ? (
                    <Heading as="h2" variant="h2">
                      {block.title}
                    </Heading>
                  ) : null}
                  <Text className="text-muted">{block.body}</Text>
                </div>
              </article>
            ))}
          </Container>
        </Section>
      ) : null}
      <PageBuilder blocks={article.pageBuilder} />
      <Section className="vsgh-reveal">
        <Container wide>
          <ButtonLink href="/insights" variant="secondary">
            All insights
          </ButtonLink>
        </Container>
      </Section>
    </main>
  );
}
