import { ProcessFlow } from "@/components/domain/process-flow";
import { ButtonLink } from "@/components/ui/button";
import { CtaBlock } from "@/components/ui/card";
import { Hero } from "@/components/ui/hero";
import { PublicMedia } from "@/components/ui/media-asset";
import { Container, Heading, Section, Text } from "@/components/ui/primitives";
import type { PageBuilderBlock } from "@/content/page-builder";
import { isPublishedPath } from "@/lib/navigation";
import { isSafeHref } from "@/lib/safe-url";
import Link from "next/link";

export function PageBuilder({
  blocks,
}: {
  blocks: readonly PageBuilderBlock[];
}) {
  if (blocks.length === 0) {
    return null;
  }
  return (
    <>
      {blocks.map((block, index) => (
        <PageBuilderSection key={`${block.type}-${index}`} block={block} />
      ))}
    </>
  );
}

function PageBuilderSection({ block }: { block: PageBuilderBlock }) {
  switch (block.type) {
    case "heroBlock":
      return (
        <Hero
          compact
          heading="hero"
          eyebrow={block.eyebrow ?? ""}
          headline={block.title ?? ""}
          emphasis={block.emphasis}
          body={block.body ?? ""}
          actions={null}
          media={
            <PublicMedia
              media={block.media}
              label={block.mediaLabel ?? "Media"}
              className="aspect-[16/10] lg:aspect-[4/5]"
            />
          }
        />
      );
    case "introBlock":
      return (
        <Section className="vsgh-reveal">
          <Container
            wide
            className="grid gap-6 md:grid-cols-[5rem_minmax(0,1fr)] md:items-start"
          >
            <p className="font-mono text-[length:var(--vsgh-text-meta)] text-[#9fb7cf]">
              /NOTE
            </p>
            <div className="max-w-3xl space-y-4">
              {block.eyebrow ? (
                <p className="font-mono text-[length:var(--vsgh-text-label)] uppercase tracking-[var(--vsgh-tracking-label)] text-muted">
                  {block.eyebrow}
                </p>
              ) : null}
              {block.title ? (
                <Heading as="h2" variant="h2">
                  {block.title}
                </Heading>
              ) : null}
              {block.body ? (
                <Text className="text-muted">{block.body}</Text>
              ) : null}
            </div>
          </Container>
        </Section>
      );
    case "richTextBlock":
      return (
        <Section className="vsgh-reveal">
          <Container wide className="space-y-0">
            {block.title ? (
              <Heading as="h2" variant="h2">
                {block.title}
              </Heading>
            ) : null}
            {block.paragraphs?.map((paragraph, index) => (
              <article
                key={`${paragraph.title ?? "p"}-${index}`}
                className="grid gap-4 border-t border-border py-8 last:border-b md:grid-cols-[5rem_minmax(0,1fr)]"
              >
                <p className="font-mono text-[length:var(--vsgh-text-meta)] text-[#9fb7cf]">
                  /{String(index + 1).padStart(2, "0")}
                </p>
                <div className="max-w-3xl space-y-3">
                  {paragraph.title ? (
                    <Heading as="h3" variant="h3">
                      {paragraph.title}
                    </Heading>
                  ) : null}
                  <Text className="text-muted">{paragraph.body}</Text>
                </div>
              </article>
            ))}
          </Container>
        </Section>
      );
    case "mediaBlock":
      return (
        <Section className="vsgh-reveal">
          <Container wide className="max-w-4xl space-y-4">
            <PublicMedia
              media={block.media}
              label={block.mediaLabel ?? "Media"}
            />
            {block.body ? (
              <Text size="small" className="text-muted">
                {block.body}
              </Text>
            ) : null}
          </Container>
        </Section>
      );
    case "processBlock":
      return (
        <Section tone="surface" className="vsgh-reveal">
          <Container wide>
            <ProcessFlow
              stages={block.stages ?? []}
              heading={block.title ?? "Sequence"}
            />
          </Container>
        </Section>
      );
    case "relatedContentBlock":
      return (
        <Section className="vsgh-reveal">
          <Container wide className="space-y-6">
            <h2 className="font-mono text-[length:var(--vsgh-text-label)] font-normal uppercase tracking-[var(--vsgh-tracking-label)] text-muted">
              {block.title ?? "Related"}
            </h2>
            <ul className="divide-y divide-border border-y border-border">
              {block.related
                ?.filter((item) => isSafeHref(item.href))
                .map((item) => (
                  <li
                    key={item.href}
                    className="group grid gap-2 py-6 md:grid-cols-[minmax(0,1fr)_auto] md:items-center"
                  >
                    <Link
                      href={item.href}
                      prefetch={isPublishedPath(item.href)}
                      className="text-[length:var(--vsgh-text-h3)] text-foreground no-underline transition-colors group-hover:text-[#b9d9ff]"
                    >
                      {item.label}
                    </Link>
                    {item.body ? (
                      <Text
                        size="small"
                        className="mt-2 text-muted md:col-start-1"
                      >
                        {item.body}
                      </Text>
                    ) : null}
                    <span
                      aria-hidden
                      className="hidden font-mono text-lg text-muted md:block"
                    >
                      ↗
                    </span>
                  </li>
                ))}
            </ul>
          </Container>
        </Section>
      );
    case "ctaSectionBlock":
      if (
        !block.title ||
        !block.body ||
        !block.primaryLabel ||
        !block.primaryHref
      ) {
        return null;
      }
      return (
        <Section className="vsgh-reveal">
          <Container wide>
            <CtaBlock
              title={block.title}
              body={block.body}
              actions={
                <>
                  <ButtonLink href={block.primaryHref} variant="primary">
                    {block.primaryLabel}
                  </ButtonLink>
                  {block.secondaryLabel && block.secondaryHref ? (
                    <ButtonLink href={block.secondaryHref} variant="secondary">
                      {block.secondaryLabel}
                    </ButtonLink>
                  ) : null}
                </>
              }
            />
          </Container>
        </Section>
      );
    default:
      return null;
  }
}
