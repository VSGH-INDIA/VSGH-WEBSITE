import Link from "next/link";
import { BusinessConnectionExplorer } from "@/components/domain/business-connection-explorer";
import { DomainJsonLd } from "@/components/domain/domain-json-ld";
import { MediaPlaceholder } from "@/components/home/media-placeholder";
import { ButtonLink } from "@/components/ui/button";
import { CtaBlock } from "@/components/ui/card";
import { Hero } from "@/components/ui/hero";
import { Container, Heading, Section, Text } from "@/components/ui/primitives";
import {
  businessLineRelated,
  type BusinessLineContent,
} from "@/content/business-lines";

export function BusinessLinePageView({ line }: { line: BusinessLineContent }) {
  const related = businessLineRelated(line);

  return (
    <main id="main">
      <DomainJsonLd
        title={line.seoTitle}
        description={line.description}
        path={line.path}
        navLabel={line.navLabel}
        parentName="Business"
        parentPath="/business"
      />
      <Hero
        compact
        heading="hero"
        eyebrow={line.eyebrow}
        headline={line.headline}
        body={line.lede}
        media={
          <MediaPlaceholder
            label={line.mediaLabel}
            className="aspect-[16/10] lg:aspect-[4/5]"
          />
        }
        actions={
          <>
            <ButtonLink href={line.cta.primary.href} variant="primary">
              {line.cta.primary.label}
            </ButtonLink>
            <ButtonLink href="/business" variant="secondary">
              All business lines
            </ButtonLink>
          </>
        }
      />
      <Section className="vsgh-reveal">
        <Container wide className="space-y-8">
          <div className="max-w-3xl space-y-3">
            <p className="font-mono text-[length:var(--vsgh-text-label)] uppercase tracking-[var(--vsgh-tracking-label)] text-muted">
              Where VSGH adds connection
            </p>
            <Heading as="h2" variant="h2">
              The public business context comes first.
            </Heading>
          </div>
          <ol className="divide-y divide-border border-y border-border">
            {line.focus.map((item) => (
              <li
                key={item.index}
                className="grid gap-4 py-7 md:grid-cols-[5rem_minmax(0,15rem)_minmax(0,1fr)] md:items-start"
              >
                <p className="font-mono text-[length:var(--vsgh-text-meta)] text-[#9fb7cf]">
                  /{item.index}
                </p>
                <Heading as="h3" variant="h3">
                  {item.title}
                </Heading>
                <Text size="small" className="max-w-2xl text-muted">
                  {item.body}
                </Text>
              </li>
            ))}
          </ol>
        </Container>
      </Section>
      <Section tone="surface" className="vsgh-reveal">
        <Container wide>
          <BusinessConnectionExplorer stages={line.connectionFlow} />
        </Container>
      </Section>
      <Section className="vsgh-reveal">
        <Container wide className="space-y-6">
          <p className="font-mono text-[length:var(--vsgh-text-label)] uppercase tracking-[var(--vsgh-tracking-label)] text-muted">
            Other VSGH business lines
          </p>
          <div className="grid gap-px border border-border bg-border md:grid-cols-2">
            {related.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group bg-background p-6 no-underline transition-colors hover:bg-surface-elevated sm:p-8"
              >
                <Heading
                  as="h2"
                  variant="h3"
                  className="transition-colors group-hover:text-[#b9d9ff]"
                >
                  {item.label}
                </Heading>
                <Text size="small" className="mt-3 text-muted">
                  {item.body}
                </Text>
                <span className="mt-8 block font-mono text-[length:var(--vsgh-text-meta)] text-[#9fb7cf]">
                  Explore this line
                </span>
              </Link>
            ))}
          </div>
        </Container>
      </Section>
      <Section tone="surface" className="vsgh-reveal">
        <Container wide>
          <CtaBlock
            title={line.cta.title}
            body={line.cta.body}
            actions={
              <>
                <ButtonLink href={line.cta.primary.href} variant="primary">
                  {line.cta.primary.label}
                </ButtonLink>
                <ButtonLink href={line.cta.secondary.href} variant="secondary">
                  {line.cta.secondary.label}
                </ButtonLink>
              </>
            }
          />
        </Container>
      </Section>
    </main>
  );
}
