import {
  Badge,
  Container,
  Heading,
  Section,
  Text,
} from "@/components/ui/primitives";
import { homeContent } from "@/content/home";

export function HomeTransformation() {
  const { transformation } = homeContent;

  return (
    <Section id="technology" tone="surface" className="vsgh-reveal">
      <Container wide className="space-y-10">
        <div className="max-w-3xl space-y-4">
          <Badge>{transformation.eyebrow}</Badge>
          <Heading as="h2" variant="h1">
            {transformation.title}
          </Heading>
          <Text className="text-muted">{transformation.body}</Text>
        </div>
        <ol className="grid grid-cols-1 gap-px bg-border sm:grid-cols-2 xl:grid-cols-[repeat(auto-fit,minmax(9.5rem,1fr))]">
          {transformation.stages.map((stage, index) => (
            <li
              key={stage.title}
              className="flex flex-col gap-3 bg-surface p-5"
            >
              <p className="font-mono text-[length:var(--vsgh-text-meta)] text-muted">
                {stage.index}
              </p>
              <Heading as="h3" variant="h3">
                {stage.title}
              </Heading>
              <Text size="small" className="text-muted">
                {stage.body}
              </Text>
              {index < transformation.stages.length - 1 ? (
                <p
                  className="mt-auto font-mono text-[length:var(--vsgh-text-meta)] text-muted"
                  aria-hidden
                >
                  <span className="xl:hidden">↓</span>
                  <span className="hidden xl:inline">→</span>
                </p>
              ) : null}
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  );
}
