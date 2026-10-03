import { DomainJsonLd } from "@/components/domain/domain-json-ld";
import { ContactEnquiryForm } from "@/components/domain/contact-enquiry-form";
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
import { contactPage } from "@/content/contact";
import { isPublishedPath } from "@/lib/navigation";
import { isSafeHref } from "@/lib/safe-url";
import Link from "next/link";

export function ContactPageView({
  page = contactPage,
}: {
  page?: typeof contactPage;
}) {
  return (
    <main id="main">
      <DomainJsonLd
        title={page.seoTitle}
        description={page.description}
        path={page.path}
        navLabel="Contact"
        parentName="Contact"
        parentPath="/"
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
            <ButtonLink href="/about/company" variant="primary">
              Company
            </ButtonLink>
            <ButtonLink href="/business" variant="secondary">
              Business
            </ButtonLink>
          </>
        }
      />
      <Section className="vsgh-reveal">
        <Container wide className="space-y-8">
          <Badge>Enquiry classes</Badge>
          <Heading as="h2" variant="h2">
            Legitimate public enquiry
          </Heading>
          <ul className="divide-y divide-border border-y border-border">
            {page.categories.map((item, index) => (
              <li
                key={item.id}
                className="grid gap-4 py-7 md:grid-cols-[4rem_minmax(0,16rem)_minmax(0,1fr)] md:items-baseline"
              >
                <p className="font-mono text-[length:var(--vsgh-text-meta)] text-[#9fb7cf]">
                  /{String(index + 1).padStart(2, "0")}
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
      <Section className="vsgh-reveal">
        <Container wide>
          <ContactEnquiryForm />
        </Container>
      </Section>
      <Section tone="surface" className="vsgh-reveal">
        <Container wide className="space-y-8">
          <div className="max-w-3xl space-y-4">
            <Badge>Company locations</Badge>
            <Heading as="h2" variant="h2">
              Published addresses for company correspondence.
            </Heading>
            <Text className="text-muted">
              <span className="font-medium text-foreground">
                {page.leadership.role}
              </span>{" "}
              · {page.leadership.name}
            </Text>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {page.locations.map((location, index) => (
              <address
                key={location.region}
                className="grid min-h-48 grid-cols-[3rem_minmax(0,1fr)] gap-5 border border-border bg-background p-6 not-italic md:p-8"
              >
                <span className="font-mono text-[length:var(--vsgh-text-meta)] text-[#9fb7cf]">
                  /{String(index + 1).padStart(2, "0")}
                </span>
                <span className="space-y-4">
                  <span className="block font-display text-2xl font-semibold tracking-[-.035em] text-foreground">
                    {location.region}
                  </span>
                  <span className="block text-[length:var(--vsgh-text-body)] leading-7 text-muted">
                    {location.address.map((line) => (
                      <span key={line} className="block">
                        {line}
                      </span>
                    ))}
                  </span>
                </span>
              </address>
            ))}
          </div>
        </Container>
      </Section>
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
      <Section className="vsgh-reveal">
        <Container wide>
          <CtaBlock
            title="Start with the right VSGH route."
            body="For aerospace supply, machinery trade, or strategic partnership context, review the Business page alongside the published company locations."
            actions={
              <>
                <ButtonLink href="/business" variant="primary">
                  Business
                </ButtonLink>
                <ButtonLink href="/about/company" variant="secondary">
                  Company
                </ButtonLink>
              </>
            }
          />
        </Container>
      </Section>
    </main>
  );
}
