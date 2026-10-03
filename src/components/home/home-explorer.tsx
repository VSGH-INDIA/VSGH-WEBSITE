import {
  Badge,
  Container,
  Heading,
  Section,
  Text,
} from "@/components/ui/primitives";
import {
  CapabilityNavigator,
  type CapabilityNavigatorStage,
} from "@/components/home/capability-navigator";
import type { HomeContent } from "@/content/home";

export function HomeExplorer({ content }: { content: HomeContent }) {
  const { explorer } = content;

  return (
    <Section
      id="explorer"
      tone="surface"
      className="vsgh-reveal border-b border-border"
    >
      <Container wide className="space-y-10">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,1.3fr)_minmax(16rem,.7fr)] lg:items-end">
          <div className="max-w-4xl space-y-4">
            <Badge>{explorer.eyebrow}</Badge>
            <Heading as="h2" variant="display" className="max-w-3xl">
              {explorer.title}
            </Heading>
          </div>
          <Text className="border-l border-border pl-5 text-muted">
            {explorer.body}
          </Text>
        </div>
        <CapabilityNavigator
          stages={explorer.stages as readonly CapabilityNavigatorStage[]}
        />
      </Container>
    </Section>
  );
}
