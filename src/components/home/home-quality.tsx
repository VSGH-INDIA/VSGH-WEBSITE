import { ButtonLink } from "@/components/ui/button";
import {
  Badge,
  Container,
  Heading,
  Section,
  Text,
} from "@/components/ui/primitives";
import type { HomeContent } from "@/content/home";

export function HomeQuality({ content }: { content: HomeContent }) {
  const { quality } = content;

  return (
    <Section id="quality" tone="surface" className="vsgh-reveal">
      <Container wide className="grid gap-12 lg:grid-cols-2">
        <div className="space-y-4">
          <Badge>{quality.eyebrow}</Badge>
          <Heading as="h2" variant="h1">
            {quality.title}
          </Heading>
          <Text className="text-muted">{quality.body}</Text>
          <ButtonLink href="/about/scientific-integrity" variant="secondary">
            How VSGH builds trust
          </ButtonLink>
        </div>
        <ul className="border-y border-border">
          {quality.items.map((item) => (
            <li
              key={item.title}
              className="grid gap-3 border-border py-6 first:border-t md:grid-cols-[minmax(0,1fr)_auto] md:items-end"
            >
              <div>
                <Heading as="h3" variant="h3">
                  {item.title}
                </Heading>
                <Text size="small" className="mt-2 text-muted">
                  {item.body}
                </Text>
              </div>
              <ButtonLink
                href={item.href}
                variant="ghost"
                size="sm"
                className="w-fit border-b border-border px-0 hover:bg-transparent"
              >
                {item.action}
              </ButtonLink>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
