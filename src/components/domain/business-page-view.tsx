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
import { businessPage } from "@/content/business";

export function BusinessPageView() {
  return (
    <main id="main">
      <DomainJsonLd
        title={businessPage.seoTitle}
        description={businessPage.description}
        path={businessPage.path}
        navLabel="Business"
        parentName="Business"
        parentPath="/business"
      />
      <Hero
        compact
        heading="hero"
        eyebrow={businessPage.eyebrow}
        headline={businessPage.headline}
        body={businessPage.lede}
        media={
          <MediaPlaceholder
            label={businessPage.mediaLabel}
            className="aspect-[16/10] lg:aspect-[4/5]"
          />
        }
        actions={
          <>
            <ButtonLink href="/contact" variant="primary">
              Contact VSGH
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
            {businessPage.lines.map((line) => (
              <li
                key={line.id}
                className="grid gap-5 py-8 md:grid-cols-[5rem_minmax(0,20rem)_minmax(0,1fr)] md:gap-8"
              >
                <p className="font-mono text-[length:var(--vsgh-text-meta)] text-[#9fb7cf]">
                  /{line.index}
                </p>
                <Heading as="h3" variant="h3">
                  {line.title}
                </Heading>
                <Text className="max-w-2xl text-muted">{line.body}</Text>
              </li>
            ))}
          </ol>
        </Container>
      </Section>
      <Section tone="surface" className="vsgh-reveal">
        <Container wide>
          <CtaBlock
            title={businessPage.cta.title}
            body={businessPage.cta.body}
            actions={
              <>
                <ButtonLink href="/contact" variant="primary">
                  View company locations
                </ButtonLink>
                <ButtonLink href="/materials/overview" variant="secondary">
                  Materials capability
                </ButtonLink>
              </>
            }
          />
        </Container>
      </Section>
    </main>
  );
}
