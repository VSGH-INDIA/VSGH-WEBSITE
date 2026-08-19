import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { Button, ButtonLink } from "@/components/ui/button";
import {
  Card,
  CtaBlock,
  FeatureCard,
  MediaFrame,
  Metric,
} from "@/components/ui/card";
import { Hero } from "@/components/ui/hero";
import {
  Badge,
  Container,
  Divider,
  Heading,
  Section,
  Text,
  TextLink,
} from "@/components/ui/primitives";

export default function DesignSystemPage() {
  return (
    <>
      <SiteHeader />
      <main id="main">
        <div className="border-b border-border bg-surface py-3">
          <Container>
            <p className="font-mono text-[length:var(--vsgh-text-meta)] text-muted">
              Design-system demonstration surface · replaceable by the future
              approved homepage · WEB-081 routes are not built
            </p>
          </Container>
        </div>

        <Hero
          eyebrow="[ V-S-G-H ] · design system · rev a · implementation draft"
          headline="Precision materials language for"
          emphasis="aerospace programmes."
          body="Safe demonstration copy only. Capability, materials philosophy, and research direction — without process parameters, formulations, or unpublished data."
          actions={
            <>
              <ButtonLink href="#ds-components" variant="primary">
                View components
              </ButtonLink>
              <ButtonLink href="#ds-cta" variant="secondary">
                Contact pattern
              </ButtonLink>
            </>
          }
        />

        <Container>
          <div className="grid border-x border-border md:grid-cols-4">
            <Metric index="[01]" value="Rev A" label="Design-system draft" />
            <Metric
              index="[02]"
              value="WCAG 2.2"
              label="Accessibility target AA"
            />
            <Metric index="[03]" value="WEB-081" label="Navigation authority" />
            <Metric index="[04]" value="Demo" label="Not production claims" />
          </div>
        </Container>

        <Divider />

        <Section id="ds-type">
          <Container className="space-y-8">
            <Badge>Typography</Badge>
            <Heading as="h2" variant="h1">
              Editorial hierarchy
            </Heading>
            <Text className="max-w-2xl text-muted">
              Display and hero sizes are reserved for programme-level
              statements. Body copy stays readable. Meta and labels use mono for
              a technical register.
            </Text>
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <Heading as="h3" variant="h3">
                  Heading three
                </Heading>
                <Text size="small" className="mt-3 text-muted">
                  Supporting paragraph at body-small.{" "}
                  <TextLink href="#ds-components">Inline link</TextLink>
                </Text>
              </Card>
              <Card>
                <Text size="meta">[ META / TECHNICAL ]</Text>
                <Text className="mt-3">Standard body on surface.</Text>
              </Card>
            </div>
          </Container>
        </Section>

        <Section id="ds-components" tone="surface">
          <Container className="space-y-10">
            <div className="space-y-3">
              <Badge>Components</Badge>
              <Heading as="h2" variant="h2">
                Actions, cards, media
              </Heading>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button>Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="ghost">Ghost</Button>
              <Button disabled>Disabled</Button>
              <Button loading>Loading</Button>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              <FeatureCard index="[01]" title="Materials">
                Placeholder capability card. No proprietary specifications.
              </FeatureCard>
              <FeatureCard index="[02]" title="Technology">
                Placeholder capability card. Process windows are not disclosed.
              </FeatureCard>
              <FeatureCard index="[03]" title="Applications">
                Placeholder sectors only: aerospace, defense, space, industrial.
              </FeatureCard>
            </div>
            <MediaFrame label="Media frame · no stock imagery in this foundation" />
          </Container>
        </Section>

        <Section id="ds-cta">
          <Container>
            <CtaBlock
              title="Next conversation, not a live form"
              body="Contact backend, email provider, CAPTCHA, and CRM remain not selected. This block is a layout pattern only."
              actions={
                <>
                  <ButtonLink href="/" variant="primary">
                    Primary CTA
                  </ButtonLink>
                  <ButtonLink href="/" variant="secondary">
                    Secondary CTA
                  </ButtonLink>
                </>
              }
            />
          </Container>
        </Section>
      </main>
      <SiteFooter />
    </>
  );
}
