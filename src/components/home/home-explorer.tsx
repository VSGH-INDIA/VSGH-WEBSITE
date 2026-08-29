import {
  Badge,
  Container,
  Heading,
  Section,
  Text,
} from "@/components/ui/primitives";
import { homeContent } from "@/content/home";
import { isPublishedPath } from "@/lib/navigation";
import { isSafeHref } from "@/lib/safe-url";
import Link from "next/link";

export function HomeExplorer() {
  const { explorer } = homeContent;

  return (
    <Section id="explorer" tone="surface" className="vsgh-reveal">
      <Container wide className="space-y-10">
        <div className="max-w-3xl space-y-4">
          <Badge>{explorer.eyebrow}</Badge>
          <Heading as="h2" variant="h1">
            {explorer.title}
          </Heading>
          <Text className="text-muted">{explorer.body}</Text>
        </div>
        <ol className="grid grid-cols-1 gap-px bg-border sm:grid-cols-2 xl:grid-cols-4">
          {explorer.stages.map((stage, index) => (
            <li
              key={stage.title}
              className="vsgh-card-hover vsgh-process-step flex flex-col gap-4 bg-background p-6"
            >
              <p className="font-mono text-[length:var(--vsgh-text-meta)] text-muted">
                {stage.index}
              </p>
              {isSafeHref(stage.href) ? (
                <Heading as="h3" variant="h3">
                  <Link
                    href={stage.href}
                    prefetch={isPublishedPath(stage.href)}
                    className="text-foreground no-underline hover:underline"
                  >
                    {stage.title}
                  </Link>
                </Heading>
              ) : (
                <Heading as="h3" variant="h3">
                  {stage.title}
                </Heading>
              )}
              <Text size="small" className="text-muted">
                {stage.body}
              </Text>
              {index < explorer.stages.length - 1 ? (
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
