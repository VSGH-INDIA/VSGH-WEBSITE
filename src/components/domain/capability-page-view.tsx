import { DomainJsonLd } from "@/components/domain/domain-json-ld";
import { DomainSubnav } from "@/components/domain/domain-subnav";
import { InsightsArticleList } from "@/components/domain/insights-article-list";
import { ProcessFlow } from "@/components/domain/process-flow";
import { MediaPlaceholder } from "@/components/home/media-placeholder";
import { ButtonLink } from "@/components/ui/button";
import { CtaBlock } from "@/components/ui/card";
import { Hero } from "@/components/ui/hero";
import { Container, Heading, Section, Text } from "@/components/ui/primitives";
import type { InsightArticle } from "@/content/insight-articles";
import type { CapabilityPageContent } from "@/content/types";
import { isPublishedPath } from "@/lib/navigation";
import { isSafeHref } from "@/lib/safe-url";
import Link from "next/link";

export function CapabilityPageView({
  page,
  nav = [],
  articles,
}: {
  page: CapabilityPageContent;
  nav?: readonly { label: string; href: string }[];
  articles?: readonly InsightArticle[];
}) {
  return (
    <main id="main">
      <DomainJsonLd
        title={page.seoTitle}
        description={page.description}
        path={page.path}
        navLabel={page.navLabel}
        parentName={page.domain}
        parentPath={page.parentPath}
      />
      {nav.length > 0 ? (
        <DomainSubnav label={page.domain} items={nav} currentPath={page.path} />
      ) : null}
      <Hero
        compact
        heading="hero"
        eyebrow={page.eyebrow}
        headline={page.headline}
        emphasis={page.emphasis}
        body={page.lede}
        media={
          <MediaPlaceholder
            label={page.mediaLabel}
            className="aspect-[16/10] lg:aspect-[4/5]"
          />
        }
        actions={
          <>
            <ButtonLink href={page.cta.primary.href} variant="primary">
              {page.cta.primary.label}
            </ButtonLink>
            <ButtonLink href={page.cta.secondary.href} variant="secondary">
              {page.cta.secondary.label}
            </ButtonLink>
          </>
        }
      />
      <Section className="vsgh-reveal">
        <Container wide className="max-w-3xl space-y-10">
          {page.sections.map((section) => (
            <article key={section.title} className="space-y-3">
              <Heading as="h2" variant="h2">
                {section.title}
              </Heading>
              <Text className="text-muted">{section.body}</Text>
            </article>
          ))}
        </Container>
      </Section>
      {articles && articles.length > 0 ? (
        <Section tone="surface" className="vsgh-reveal">
          <Container wide className="space-y-6">
            <h2 className="font-mono text-[length:var(--vsgh-text-label)] font-normal uppercase tracking-[var(--vsgh-tracking-label)] text-muted">
              Articles
            </h2>
            <InsightsArticleList articles={articles} />
          </Container>
        </Section>
      ) : null}
      {page.stages ? (
        <Section tone="surface" className="vsgh-reveal">
          <Container wide>
            <ProcessFlow stages={page.stages} />
          </Container>
        </Section>
      ) : null}
      {page.principles ? (
        <Section
          tone={page.stages ? "default" : "surface"}
          className="vsgh-reveal"
        >
          <Container wide className="space-y-8">
            <h2 className="font-mono text-[length:var(--vsgh-text-label)] font-normal uppercase tracking-[var(--vsgh-tracking-label)] text-muted">
              Disciplines
            </h2>
            <ul className="divide-y divide-border border-y border-border">
              {page.principles.map((item) => (
                <li
                  key={item.title}
                  className="grid gap-3 py-6 md:grid-cols-[5rem_minmax(0,14rem)_minmax(0,1fr)] md:items-baseline"
                >
                  <p className="font-mono text-[length:var(--vsgh-text-meta)] text-muted">
                    {item.index}
                  </p>
                  <Heading as="h3" variant="h3">
                    {item.title}
                  </Heading>
                  <Text size="small" className="text-muted">
                    {item.body}
                  </Text>
                </li>
              ))}
            </ul>
          </Container>
        </Section>
      ) : null}
      {page.statuses ? (
        <Section className="vsgh-reveal">
          <Container wide className="space-y-8">
            <h2 className="font-mono text-[length:var(--vsgh-text-label)] font-normal uppercase tracking-[var(--vsgh-tracking-label)] text-muted">
              Status of public statements
            </h2>
            <ol className="grid gap-px bg-border md:grid-cols-2">
              {page.statuses.map((item) => (
                <li key={item.label} className="bg-background p-6">
                  <p className="font-mono text-[length:var(--vsgh-text-meta)] text-muted">
                    {item.label}
                  </p>
                  <Heading as="h3" variant="h3" className="mt-3">
                    {item.title}
                  </Heading>
                  <Text size="small" className="mt-2 text-muted">
                    {item.body}
                  </Text>
                </li>
              ))}
            </ol>
          </Container>
        </Section>
      ) : null}
      {page.emptyState && !articles?.length ? (
        <Section tone="surface" className="vsgh-reveal">
          <Container wide>
            <div className="border border-border p-8 md:p-12">
              <p className="font-mono text-[length:var(--vsgh-text-label)] uppercase tracking-[var(--vsgh-tracking-label)] text-muted">
                {page.emptyState.eyebrow}
              </p>
              <Heading as="h2" variant="h2" className="mt-4">
                {page.emptyState.title}
              </Heading>
              <Text className="mt-3 max-w-2xl text-muted">
                {page.emptyState.body}
              </Text>
            </div>
          </Container>
        </Section>
      ) : null}
      {page.related ? (
        <Section className="vsgh-reveal">
          <Container wide className="space-y-6">
            <h2 className="font-mono text-[length:var(--vsgh-text-label)] font-normal uppercase tracking-[var(--vsgh-tracking-label)] text-muted">
              Related
            </h2>
            <ul className="divide-y divide-border border-y border-border">
              {page.related
                .filter((item) => isSafeHref(item.href))
                .map((item) => (
                  <li key={item.href} className="py-5">
                    <Link
                      href={item.href}
                      prefetch={isPublishedPath(item.href)}
                      className="text-foreground no-underline hover:underline"
                    >
                      {item.label}
                    </Link>
                    <Text size="small" className="mt-2 text-muted">
                      {item.body}
                    </Text>
                  </li>
                ))}
            </ul>
          </Container>
        </Section>
      ) : null}
      <Section className="vsgh-reveal">
        <Container wide>
          <CtaBlock
            title={page.cta.title}
            body={page.cta.body}
            actions={
              <>
                <ButtonLink href={page.cta.primary.href} variant="primary">
                  {page.cta.primary.label}
                </ButtonLink>
                <ButtonLink href={page.cta.secondary.href} variant="secondary">
                  {page.cta.secondary.label}
                </ButtonLink>
              </>
            }
          />
        </Container>
      </Section>
    </main>
  );
}
