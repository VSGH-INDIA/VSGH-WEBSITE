import type { PageStage } from "@/content/types";
import { Heading, Text } from "@/components/ui/primitives";

export function ProcessFlow({
  stages,
  heading = "Sequence",
}: {
  stages: readonly PageStage[];
  heading?: string;
}) {
  return (
    <div className="space-y-6">
      <p className="font-mono text-[length:var(--vsgh-text-label)] uppercase tracking-[var(--vsgh-tracking-label)] text-muted">
        {heading}
      </p>
      <ol className="grid gap-px bg-border sm:grid-cols-2 xl:grid-cols-7">
        {stages.map((stage, index) => (
          <li
            key={stage.title}
            className="flex flex-col gap-3 bg-background p-5"
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
            {index < stages.length - 1 ? (
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
    </div>
  );
}
