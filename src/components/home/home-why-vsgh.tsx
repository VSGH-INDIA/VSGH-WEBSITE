import {
  Badge,
  Container,
  Heading,
  Section,
  Text,
} from "@/components/ui/primitives";
import type { HomeContent } from "@/content/home";

export function HomeWhyVSGH({ content }: { content: HomeContent }) {
  const { whyVSGH } = content;

  return (
    <Section id="why-vsgh" className="vsgh-reveal">
      <Container
        wide
        className="grid gap-12 lg:grid-cols-[minmax(0,.78fr)_minmax(0,1.22fr)]"
      >
        <div className="max-w-xl space-y-4 lg:sticky lg:top-36 lg:h-fit">
          <Badge>{whyVSGH.eyebrow}</Badge>
          <Heading as="h2" variant="h1">
            {whyVSGH.title}
          </Heading>
          <Text className="text-muted">{whyVSGH.body}</Text>
        </div>
        <ol className="divide-y divide-border border-y border-border">
          {whyVSGH.points.map((point) => (
            <li
              key={point.title}
              className="grid gap-4 py-7 md:grid-cols-[4rem_minmax(0,15rem)_minmax(0,1fr)] md:items-start"
            >
              <p className="font-mono text-[length:var(--vsgh-text-meta)] text-[#9fb7cf]">
                /{point.index}
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
      </Container>
    </Section>
  );
}
