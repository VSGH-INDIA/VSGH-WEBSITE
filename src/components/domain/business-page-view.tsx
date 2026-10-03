import { DomainJsonLd } from "@/components/domain/domain-json-ld";
import { MediaPlaceholder } from "@/components/home/media-placeholder";
import { ButtonLink } from "@/components/ui/button";
import { CtaBlock } from "@/components/ui/card";
import { Hero } from "@/components/ui/hero";
import {
  Badge,
  Container,
  Heading,
  Section,
  Text,
} from "@/components/ui/primitives";
import { businessPage, type BusinessPageContent } from "@/content/business";

const enquiryByBusinessLine: Record<string, string> = {
  "aerospace-systems": "aerospace-systems-components",
  "imports-exports": "machinery-imports-exports",
  "global-programmes": "global-partnership-programme",
};

export function BusinessPageView({
  page = businessPage,
}: {
  page?: BusinessPageContent;
}) {
  return (
    <main id="main">
      <DomainJsonLd
        title={page.seoTitle}
        description={page.description}
        path={page.path}
        navLabel="Business"
        parentName="Business"
        parentPath="/business"
      />
      <Hero
        compact
        heading="hero"
        eyebrow={page.eyebrow}
        headline={page.headline}
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
            <ButtonLink href="/about/company" variant="secondary">
              Company
            </ButtonLink>
          </>
        }
      />
      <Section className="vsgh-reveal">
        <Container wide className="space-y-8">
          <div className="max-w-3xl space-y-4">
            <Badge>Business lines</Badge>
            <Heading as="h2" variant="h2">
              Three ways we create industrial connection.
            </Heading>
          </div>
          <ol className="divide-y divide-border border-y border-border">
            {page.lines.map((line) => (
              <li
                key={line.id}
                id={line.id}
                className="scroll-mt-32 grid gap-5 py-8 md:grid-cols-[5rem_minmax(0,20rem)_minmax(0,1fr)] md:gap-8"
              >
                <p className="font-mono text-[length:var(--vsgh-text-meta)] text-[#9fb7cf]">
                  /{line.index}
                </p>
                <Heading as="h3" variant="h3">
                  {line.title}
                </Heading>
                <div className="space-y-5">
                  <Text className="max-w-2xl text-muted">{line.body}</Text>
                  <ButtonLink
                    href={`/contact?enquiry=${enquiryByBusinessLine[line.id] ?? "other"}`}
                    variant="ghost"
                    size="sm"
                    className="border-b border-border px-0 hover:bg-transparent"
                  >
                    Discuss this business line
                  </ButtonLink>
                </div>
              </li>
            ))}
          </ol>
        </Container>
      </Section>
      <Section tone="surface" className="vsgh-reveal">
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
