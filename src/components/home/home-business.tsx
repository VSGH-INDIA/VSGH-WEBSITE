import { ButtonLink } from "@/components/ui/button";
import {
  Badge,
  Container,
  Heading,
  Section,
  Text,
} from "@/components/ui/primitives";
import type { HomeContent } from "@/content/home";

export function HomeBusiness({ content }: { content: HomeContent }) {
  const { business } = content;

  return (
    <Section
      id="business"
      tone="surface"
      className="vsgh-reveal border-b border-border"
    >
      <Container wide className="space-y-10">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(16rem,.8fr)] lg:items-end">
          <div className="max-w-4xl space-y-4">
            <Badge>{business.eyebrow}</Badge>
            <Heading as="h2" variant="display" className="max-w-4xl">
              {business.title}
            </Heading>
          </div>
          <Text className="border-l border-border pl-5 text-muted">
            {business.body}
          </Text>
        </div>
        <ol className="grid gap-px overflow-hidden border border-border bg-border lg:grid-cols-3">
          {business.lines.map((line) => (
            <li
              key={line.title}
              className="group flex min-h-80 flex-col bg-background p-6 transition-colors hover:bg-surface-elevated sm:p-8"
            >
              <p className="font-mono text-[length:var(--vsgh-text-meta)] text-[#9fb7cf]">
                /{line.index}
              </p>
              <Heading as="h3" variant="h3" className="mt-12 max-w-xs">
                {line.title}
              </Heading>
              <Text size="small" className="mt-4 max-w-sm text-muted">
                {line.body}
              </Text>
              <ButtonLink
                href={line.href}
                variant="ghost"
                size="sm"
                className="mt-auto w-fit border-b border-border px-0 hover:bg-transparent"
              >
                {line.action}
              </ButtonLink>
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  );
}
