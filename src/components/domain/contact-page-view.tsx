import { DomainJsonLd } from "@/components/domain/domain-json-ld";
import { MediaPlaceholder } from "@/components/home/media-placeholder";
import { Button, ButtonLink } from "@/components/ui/button";
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
            <ButtonLink href="/careers" variant="secondary">
              Careers
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
            {page.categories.map((item) => (
              <li
                key={item.id}
                className="grid gap-3 py-6 md:grid-cols-[minmax(0,16rem)_minmax(0,1fr)] md:items-baseline"
              >
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
      <Section tone="surface" className="vsgh-reveal">
        <Container
          wide
          className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]"
        >
          <div className="space-y-4">
            <Badge>Reserved form</Badge>
            <Heading as="h2" variant="h2">
              Future integration shape
            </Heading>
            <Text className="text-muted">{page.notice}</Text>
          </div>
          <form
            className="border border-border bg-background p-6 md:p-8"
            aria-describedby="contact-channel-status"
          >
            <p
              id="contact-channel-status"
              className="font-mono text-[length:var(--vsgh-text-meta)] text-muted"
            >
              Status: channel not connected. Submit is disabled.
            </p>
            <fieldset disabled className="mt-6 space-y-6">
              <legend className="sr-only">
                Reserved enquiry fields. Not collected and not transmitted.
              </legend>
              <div className="space-y-2">
                <label
                  htmlFor="inquiry-type"
                  className="block font-mono text-[length:var(--vsgh-text-meta)] text-muted"
                >
                  Enquiry type
                </label>
                <select
                  id="inquiry-type"
                  name="inquiryType"
                  defaultValue=""
                  className="min-h-[var(--vsgh-control)] w-full min-w-0 border border-border bg-surface px-3 text-[length:var(--vsgh-text-nav)] text-foreground"
                >
                  <option value="" disabled>
                    Select a class
                  </option>
                  {page.categories.map((item) => (
                    <option key={item.id} value={item.id}>
                      {item.title}
                    </option>
                  ))}
                </select>
              </div>
              {page.fields.map((field) =>
                field.id === "message" ? (
                  <div key={field.id} className="space-y-2">
                    <label
                      htmlFor={field.id}
                      className="block font-mono text-[length:var(--vsgh-text-meta)] text-muted"
                    >
                      {field.label}
                    </label>
                    <textarea
                      id={field.id}
                      name={field.id}
                      rows={5}
                      placeholder={field.hint}
                      className="w-full min-w-0 border border-border bg-surface px-3 py-2 text-[length:var(--vsgh-text-nav)] text-foreground"
                    />
                  </div>
                ) : (
                  <div key={field.id} className="space-y-2">
                    <label
                      htmlFor={field.id}
                      className="block font-mono text-[length:var(--vsgh-text-meta)] text-muted"
                    >
                      {field.label}
                    </label>
                    <input
                      id={field.id}
                      name={field.id}
                      type="text"
                      autoComplete="off"
                      placeholder={field.hint}
                      className="min-h-[var(--vsgh-control)] w-full min-w-0 border border-border bg-surface px-3 text-[length:var(--vsgh-text-nav)] text-foreground"
                    />
                  </div>
                ),
              )}
              <Button type="button" disabled>
                Submit unavailable
              </Button>
            </fieldset>
          </form>
        </Container>
      </Section>
      <Section className="vsgh-reveal">
        <Container wide className="space-y-6">
          <h2 className="font-mono text-[length:var(--vsgh-text-label)] font-normal uppercase tracking-[var(--vsgh-tracking-label)] text-muted">
            Related
          </h2>
          <ul className="divide-y divide-border border-y border-border">
            {page.related.map((item) => (
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
            title="This page does not send messages."
            body="When an approved enquiry channel exists, these fields can connect to it. Until then, nothing entered here is stored or transmitted."
            actions={
              <>
                <ButtonLink href="/sustainability" variant="primary">
                  Sustainability
                </ButtonLink>
                <ButtonLink href="/insights" variant="secondary">
                  Insights
                </ButtonLink>
              </>
            }
          />
        </Container>
      </Section>
    </main>
  );
}
