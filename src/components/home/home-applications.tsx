import { ButtonLink } from "@/components/ui/button";
import {
  Badge,
  Container,
  Heading,
  Section,
  Text,
} from "@/components/ui/primitives";
import { homeContent } from "@/content/home";
import { MediaPlaceholder } from "@/components/home/media-placeholder";

export function HomeApplications() {
  const { applications } = homeContent;

  return (
    <Section id="applications" tone="surface" className="vsgh-reveal">
      <Container wide className="space-y-10">
        <div className="max-w-3xl space-y-4">
          <Badge>{applications.eyebrow}</Badge>
          <Heading as="h2" variant="h1">
            {applications.title}
          </Heading>
        </div>
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,0.7fr)]">
          <article className="flex flex-col gap-6 border border-border p-6 md:p-10">
            <MediaPlaceholder label="Aerospace application visual · placeholder" />
            <p className="font-mono text-[length:var(--vsgh-text-meta)] text-muted">
              [01]
            </p>
            <Heading as="h3" variant="h2">
              {applications.featured.title}
            </Heading>
            <Text className="text-muted">{applications.featured.body}</Text>
            <div>
              <ButtonLink href="/applications/aerospace" variant="secondary">
                Aerospace applications
              </ButtonLink>
            </div>
          </article>
          <ul className="flex flex-col justify-between gap-0 border border-border">
            {applications.others.map((item, index) => (
              <li
                key={item.title}
                className="flex flex-1 flex-col justify-center gap-3 border-b border-border p-6 last:border-b-0"
              >
                <p className="font-mono text-[length:var(--vsgh-text-meta)] text-muted">
                  {`[0${index + 2}]`}
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
        </div>
      </Container>
    </Section>
  );
}
