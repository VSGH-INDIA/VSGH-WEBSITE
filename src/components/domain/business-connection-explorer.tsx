"use client";

import { useId, useState } from "react";
import type { PageStage } from "@/content/types";
import { Heading, Text } from "@/components/ui/primitives";

export function BusinessConnectionExplorer({
  stages,
}: {
  stages: readonly PageStage[];
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const groupId = useId();
  const active = stages[activeIndex] ?? stages[0];

  if (!active) return null;

  return (
    <section aria-labelledby={`${groupId}-heading`} className="space-y-6">
      <div className="max-w-2xl space-y-3">
        <p className="font-mono text-[length:var(--vsgh-text-label)] uppercase tracking-[var(--vsgh-tracking-label)] text-muted">
          Explore the connection path
        </p>
        <Heading as="h2" variant="h2" id={`${groupId}-heading`}>
          A business conversation, step by step.
        </Heading>
        <Text className="text-muted">
          Select a stage to see how VSGH frames the public route into a focused
          conversation.
        </Text>
      </div>
      <div className="grid overflow-hidden border border-border lg:grid-cols-[minmax(15rem,.8fr)_minmax(0,1.2fr)]">
        <div
          role="tablist"
          aria-label="Connection stages"
          className="bg-surface"
        >
          {stages.map((stage, index) => {
            const selected = index === activeIndex;
            return (
              <button
                key={stage.index}
                type="button"
                role="tab"
                id={`${groupId}-tab-${index}`}
                aria-controls={`${groupId}-panel-${index}`}
                aria-selected={selected}
                tabIndex={selected ? 0 : -1}
                onClick={() => setActiveIndex(index)}
                className={`flex min-h-20 w-full items-center gap-4 border-b border-border px-5 py-4 text-left transition-colors last:border-b-0 ${
                  selected
                    ? "bg-[#102033] text-foreground"
                    : "text-muted hover:bg-surface-elevated hover:text-foreground"
                }`}
              >
                <span className="font-mono text-[length:var(--vsgh-text-meta)] text-[#9fb7cf]">
                  /{stage.index}
                </span>
                <span className="font-display text-[length:var(--vsgh-text-h3)] font-medium">
                  {stage.title}
                </span>
              </button>
            );
          })}
        </div>
        <div
          role="tabpanel"
          id={`${groupId}-panel-${activeIndex}`}
          aria-labelledby={`${groupId}-tab-${activeIndex}`}
          className="relative min-h-72 overflow-hidden bg-[#0d1620] p-7 md:p-10"
        >
          <div
            aria-hidden
            className="absolute inset-0 bg-[radial-gradient(circle_at_84%_15%,rgba(64,154,255,.22),transparent_28%),linear-gradient(135deg,transparent,rgba(255,255,255,.025))]"
          />
          <div className="relative max-w-xl space-y-5">
            <p className="font-mono text-[length:var(--vsgh-text-label)] uppercase tracking-[var(--vsgh-tracking-label)] text-[#9fb7cf]">
              /{active.index} · connection stage
            </p>
            <Heading as="h3" variant="h2">
              {active.title}
            </Heading>
            <Text className="text-muted">{active.body}</Text>
          </div>
        </div>
      </div>
    </section>
  );
}
