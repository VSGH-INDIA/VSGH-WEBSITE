import { ButtonLink } from "@/components/ui/button";
import {
  Badge,
  Container,
  Heading,
  Section,
  Text,
} from "@/components/ui/primitives";
import { homeContent } from "@/content/home";

export function HomeResearch() {
  const { research } = homeContent;

  return (
    <Section id="research" className="vsgh-reveal">
      <Container wide className="space-y-10">
        <div className="max-w-3xl space-y-4">
          <Badge>{research.eyebrow}</Badge>
          <Heading as="h2" variant="h1">
            {research.title}
          </Heading>
          <Text className="text-muted">{research.body}</Text>
          <ButtonLink href="/research/overview" variant="secondary">
            Research
          </ButtonLink>
        </div>
        <div className="grid gap-px bg-border md:grid-cols-2">
          {research.items.map((item) => (
            <article key={item.title} className="bg-background p-6 md:p-8">
              <Heading as="h3" variant="h3">
                {item.title}
              </Heading>
              <Text size="small" className="mt-3 text-muted">
                {item.body}
              </Text>
            </article>
          ))}
        </div>
      </Container>
    </Section>
  );
}
