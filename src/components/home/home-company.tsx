import {
  Badge,
  Container,
  Heading,
  Section,
  Text,
} from "@/components/ui/primitives";
import { homeContent } from "@/content/home";
import { MediaPlaceholder } from "@/components/home/media-placeholder";

export function HomeCompany() {
  const { company } = homeContent;

  return (
    <Section id="company" tone="surface" className="vsgh-reveal">
      <Container
        wide
        className="grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-center"
      >
        <div className="space-y-4">
          <Badge>{company.eyebrow}</Badge>
          <Heading as="h2" variant="h1">
            {company.title}
          </Heading>
          <Text className="text-muted">{company.body}</Text>
        </div>
        <MediaPlaceholder label="Company / facilities visual · placeholder" />
      </Container>
    </Section>
  );
}
