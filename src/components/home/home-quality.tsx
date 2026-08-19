import {
  Badge,
  Container,
  Heading,
  Section,
  Text,
} from "@/components/ui/primitives";
import { homeContent } from "@/content/home";

export function HomeQuality() {
  const { quality } = homeContent;

  return (
    <Section id="quality" tone="surface" className="vsgh-reveal">
      <Container wide className="grid gap-12 lg:grid-cols-2">
        <div className="space-y-4">
          <Badge>{quality.eyebrow}</Badge>
          <Heading as="h2" variant="h1">
            {quality.title}
          </Heading>
          <Text className="text-muted">{quality.body}</Text>
        </div>
        <ul>
          {quality.items.map((item) => (
            <li
              key={item.title}
              className="border-t border-border py-5 last:border-b"
            >
              <Heading as="h3" variant="h3">
                {item.title}
              </Heading>
              <Text size="small" className="mt-2 text-muted">
                {item.body}
              </Text>
            </li>
          ))}
        </ul>
      </Container>
    </Section>
  );
}
