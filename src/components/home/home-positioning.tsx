import {
  Badge,
  Container,
  Heading,
  Section,
  Text,
} from "@/components/ui/primitives";
import { homeContent } from "@/content/home";
import { MediaPlaceholder } from "@/components/home/media-placeholder";

export function HomePositioning() {
  const { positioning } = homeContent;

  return (
    <Section id="positioning" className="vsgh-reveal">
      <Container
        wide
        className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] lg:items-center"
      >
        <div className="space-y-6">
          <Badge>{positioning.eyebrow}</Badge>
          <Heading as="h2" variant="h1">
            {positioning.title}
          </Heading>
          <Text className="max-w-2xl text-muted">{positioning.body}</Text>
          <ol className="space-y-6 border-l border-border pl-6">
            {positioning.points.map((point) => (
              <li key={point.index} className="space-y-2">
                <p className="font-mono text-[length:var(--vsgh-text-meta)] text-muted">
                  {point.index}
                </p>
                <Heading as="h3" variant="h3">
                  {point.title}
                </Heading>
                <Text size="small" className="text-muted">
                  {point.body}
                </Text>
              </li>
            ))}
          </ol>
        </div>
        <MediaPlaceholder label="Positioning visual · placeholder frame" />
      </Container>
    </Section>
  );
}
