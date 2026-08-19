import {
  Badge,
  Container,
  Heading,
  Section,
  Text,
} from "@/components/ui/primitives";
import { homeContent } from "@/content/home";

const chain = [
  "Resource recovery",
  "Material recovery",
  "Engineering",
  "Higher-value material",
  "Advanced application",
] as const;

export function HomeSustainability() {
  const { sustainability } = homeContent;

  return (
    <Section id="sustainability" className="vsgh-reveal">
      <Container wide className="space-y-10">
        <div className="max-w-3xl space-y-4">
          <Badge>{sustainability.eyebrow}</Badge>
          <Heading as="h2" variant="h1">
            {sustainability.title}
          </Heading>
          <Text className="text-muted">{sustainability.body}</Text>
        </div>
        <ol className="grid gap-4 md:grid-cols-5">
          {chain.map((step, index) => (
            <li key={step} className="border border-border p-4">
              <p className="font-mono text-[length:var(--vsgh-text-meta)] text-muted">
                {`[0${index + 1}]`}
              </p>
              <p className="mt-3 text-[length:var(--vsgh-text-body-small)]">
                {step}
              </p>
            </li>
          ))}
        </ol>
      </Container>
    </Section>
  );
}
