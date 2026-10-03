"use client";

import Link from "next/link";
import { useId, useState, type KeyboardEvent } from "react";
import { Heading, Text } from "@/components/ui/primitives";
import { isPublishedPath } from "@/lib/navigation";
import { isSafeHref } from "@/lib/safe-url";

export type CapabilityNavigatorStage = {
  index: string;
  title: string;
  body: string;
  href: string;
};

export function CapabilityNavigator({
  stages,
}: {
  stages: readonly CapabilityNavigatorStage[];
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const id = useId();
  const activeStage = stages[activeIndex];

  if (!activeStage) {
    return null;
  }

  const selectWithKeyboard = (event: KeyboardEvent<HTMLButtonElement>) => {
    let nextIndex: number | null = null;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      nextIndex = (activeIndex + 1) % stages.length;
    } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      nextIndex = (activeIndex - 1 + stages.length) % stages.length;
    } else if (event.key === "Home") {
      nextIndex = 0;
    } else if (event.key === "End") {
      nextIndex = stages.length - 1;
    }

    if (nextIndex === null) {
      return;
    }
    event.preventDefault();
    setActiveIndex(nextIndex);
    document.getElementById(`${id}-tab-${nextIndex}`)?.focus();
  };

  return (
    <div className="grid overflow-hidden border border-border lg:grid-cols-[minmax(0,0.78fr)_minmax(0,1.22fr)]">
      <div
        aria-label="Capability stages"
        className="divide-y divide-border bg-background"
        role="tablist"
      >
        {stages.map((stage, index) => {
          const active = index === activeIndex;
          return (
            <button
              aria-controls={`${id}-panel-${index}`}
              aria-selected={active}
              className="group flex w-full items-center gap-4 px-5 py-5 text-left transition-colors duration-[var(--vsgh-duration)] hover:bg-surface focus-visible:relative sm:px-6"
              id={`${id}-tab-${index}`}
              key={stage.title}
              onClick={() => setActiveIndex(index)}
              onKeyDown={selectWithKeyboard}
              role="tab"
              tabIndex={active ? 0 : -1}
              type="button"
            >
              <span
                aria-hidden
                className="font-mono text-[length:var(--vsgh-text-meta)] text-muted"
              >
                {stage.index}
              </span>
              <span className="flex min-w-0 flex-1 items-center justify-between gap-4">
                <span className="text-[length:var(--vsgh-text-body)] font-medium text-foreground">
                  {stage.title}
                </span>
                <span
                  aria-hidden
                  className="font-mono text-muted transition-transform duration-[var(--vsgh-duration)] group-aria-selected:translate-x-1 group-aria-selected:text-foreground"
                >
                  →
                </span>
              </span>
            </button>
          );
        })}
      </div>
      <div
        aria-labelledby={`${id}-tab-${activeIndex}`}
        className="relative flex min-h-[22rem] flex-col justify-between overflow-hidden bg-surface p-6 sm:p-8 lg:min-h-full"
        id={`${id}-panel-${activeIndex}`}
        role="tabpanel"
        tabIndex={0}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[linear-gradient(var(--vsgh-grid-line)_1px,transparent_1px),linear-gradient(90deg,var(--vsgh-grid-line)_1px,transparent_1px)] bg-[size:var(--vsgh-grid-size)_var(--vsgh-grid-size)]"
        />
        <div className="relative max-w-xl space-y-5">
          <p className="font-mono text-[length:var(--vsgh-text-label)] uppercase tracking-[var(--vsgh-tracking-label)] text-muted">
            Selected stage {activeStage.index}
          </p>
          <Heading as="h3" variant="h2">
            {activeStage.title}
          </Heading>
          <Text className="text-muted">{activeStage.body}</Text>
        </div>
        <div className="relative mt-10 flex items-end justify-between gap-6 border-t border-border pt-5">
          <p className="max-w-xs font-mono text-[length:var(--vsgh-text-meta)] text-muted">
            Explore the sequence. Each step is a public capability description,
            not a process disclosure.
          </p>
          {isSafeHref(activeStage.href) ? (
            <Link
              className="shrink-0 border border-border px-4 py-3 text-[length:var(--vsgh-text-nav)] font-medium text-foreground no-underline transition-colors hover:bg-inverse hover:text-inverse-fg"
              href={activeStage.href}
              prefetch={isPublishedPath(activeStage.href)}
            >
              View stage
            </Link>
          ) : null}
        </div>
      </div>
    </div>
  );
}
