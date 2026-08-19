import { AboutSubnav } from "@/components/about/about-subnav";
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
import type { AboutPageContent } from "@/content/about";

function PageCta({ page }: { page: AboutPageContent }) {
  return (
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
  );
}

function StandardBody({ page }: { page: AboutPageContent }) {
  return (
    <>
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
      {page.principles ? (
        <Section tone="surface" className="vsgh-reveal">
          <Container wide className="space-y-8">
            <Badge>Principles</Badge>
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
    </>
  );
}

function LeadershipBody({ page }: { page: AboutPageContent }) {
  return (
    <Section className="vsgh-reveal">
      <Container wide className="space-y-10">
        {page.sections.map((section) => (
          <article key={section.title} className="max-w-3xl space-y-3">
            <Heading as="h2" variant="h2">
              {section.title}
            </Heading>
            <Text className="text-muted">{section.body}</Text>
          </article>
        ))}
        <p className="font-mono text-[length:var(--vsgh-text-meta)] text-muted">
          {page.leadershipNote}
        </p>
        <ul className="grid gap-6 md:grid-cols-3">
          {["[01]", "[02]", "[03]"].map((index) => (
            <li key={index} className="space-y-4">
              <MediaPlaceholder
                label={`Leadership portrait ${index} · placeholder`}
                className="aspect-[3/4]"
              />
              <p className="font-mono text-[length:var(--vsgh-text-meta)] text-muted">
                {index} · Profile reserved
              </p>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}

function FacilitiesBody({ page }: { page: AboutPageContent }) {
  const [featured, ...rest] = page.facilities ?? [];

  return (
    <>
      <Section className="vsgh-reveal">
        <Container wide className="space-y-8">
          {page.sections.map((section) => (
            <article key={section.title} className="max-w-3xl space-y-3">
              <Heading as="h2" variant="h2">
                {section.title}
              </Heading>
              <Text className="text-muted">{section.body}</Text>
            </article>
          ))}
          {featured ? (
            <article className="grid gap-8 border border-border p-6 lg:grid-cols-2 lg:p-10">
              <MediaPlaceholder label={featured.mediaLabel} />
              <div className="flex flex-col justify-center gap-3">
                <p className="font-mono text-[length:var(--vsgh-text-meta)] text-muted">
                  {featured.index}
                </p>
                <Heading as="h2" variant="h2">
                  {featured.title}
                </Heading>
                <Text className="text-muted">{featured.body}</Text>
              </div>
            </article>
          ) : null}
        </Container>
      </Section>
      {rest.length > 0 ? (
        <Section tone="surface" className="vsgh-reveal">
          <Container wide>
            <ul className="divide-y divide-border border-y border-border">
              {rest.map((item) => (
                <li
                  key={item.title}
                  className="grid gap-6 py-8 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] md:items-center"
                >
                  <MediaPlaceholder
                    label={item.mediaLabel}
                    className="aspect-[16/10]"
                  />
                  <div className="space-y-3">
                    <p className="font-mono text-[length:var(--vsgh-text-meta)] text-muted">
                      {item.index}
                    </p>
                    <Heading as="h3" variant="h3">
                      {item.title}
                    </Heading>
                    <Text size="small" className="text-muted">
                      {item.body}
                    </Text>
                  </div>
                </li>
              ))}
            </ul>
          </Container>
        </Section>
      ) : null}
    </>
  );
}

export function AboutPageView({ page }: { page: AboutPageContent }) {
  return (
    <main id="main">
      <DomainJsonLd
        title={page.seoTitle}
        description={page.description}
        path={page.path}
        navLabel={page.navLabel}
        parentName="About"
        parentPath="/about/company"
      />
      <AboutSubnav currentPath={page.path} />
      <Hero
        compact
        heading="hero"
        eyebrow={page.eyebrow}
        headline={page.headline}
        emphasis={page.emphasis}
        body={page.lede}
        media={
          page.variant === "standard" ? (
            <MediaPlaceholder
              label={page.mediaLabel}
              className="aspect-[16/10] lg:aspect-[4/5]"
            />
          ) : undefined
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
      {page.variant === "leadership" ? (
        <LeadershipBody page={page} />
      ) : page.variant === "facilities" ? (
        <FacilitiesBody page={page} />
      ) : (
        <StandardBody page={page} />
      )}
      <PageCta page={page} />
    </main>
  );
}
