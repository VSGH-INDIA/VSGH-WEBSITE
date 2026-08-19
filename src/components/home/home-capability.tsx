import {
  Badge,
  Container,
  Heading,
  Section,
  Text,
} from "@/components/ui/primitives";
import { homeContent } from "@/content/home";

export function HomeCapability() {
  const { capability } = homeContent;

  return (
    <Section id="capability" className="vsgh-reveal">
      <Container
        wide
        className="grid gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]"
      >
        <div className="space-y-4 lg:sticky lg:top-24 lg:self-start">
          <Badge>{capability.eyebrow}</Badge>
          <Heading as="h2" variant="h1">
            {capability.title}
          </Heading>
          <Text className="text-muted">{capability.body}</Text>
        </div>
        <ul className="divide-y divide-border border-y border-border">
          {capability.items.map((item) => (
            <li
              key={item.title}
              className="grid gap-3 py-6 md:grid-cols-[5rem_minmax(0,12rem)_minmax(0,1fr)] md:items-baseline"
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
  );
}
