import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Badge, Heading, Text } from "@/components/ui/primitives";

export function Hero({
  eyebrow,
  headline,
  emphasis,
  body,
  actions,
  media,
  align = "start",
  compact = false,
  heading = "display",
}: {
  eyebrow: string;
  headline: string;
  emphasis?: string;
  body: string;
  actions: ReactNode;
  media?: ReactNode;
  align?: "start" | "center";
  compact?: boolean;
  heading?: "display" | "hero";
}) {
  return (
    <section
      className={cn(
        "relative isolate overflow-hidden border-b border-border bg-background",
        compact ? "min-h-[min(44rem,78svh)]" : "min-h-[var(--vsgh-hero-min)]",
        align === "center" && "text-center",
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-70 [background-image:linear-gradient(var(--vsgh-grid-line)_1px,transparent_1px),linear-gradient(90deg,var(--vsgh-grid-line)_1px,transparent_1px)] [background-size:var(--vsgh-grid-size)_var(--vsgh-grid-size)]"
      />
      <div
        className={cn(
          "relative mx-auto grid w-full max-w-[var(--vsgh-content-wide)] items-end gap-10",
          compact ? "py-16 md:py-24" : "py-20",
          media ? "lg:grid-cols-[minmax(0,1.13fr)_minmax(20rem,.87fr)]" : "",
          align === "center" && "justify-items-center",
        )}
        style={{ paddingInline: "var(--vsgh-gutter)" }}
      >
        <div
          className={cn(
            "flex flex-col gap-7",
            align === "center" && "items-center",
          )}
        >
          <Badge>{eyebrow}</Badge>
          <Heading
            as="h1"
            variant={heading}
            className="max-w-5xl text-[clamp(2.75rem,6vw,6.5rem)] leading-[.94]"
          >
            {headline}
            {emphasis ? (
              <>
                {" "}
                <span className="text-accent">{emphasis}</span>
              </>
            ) : null}
          </Heading>
          <Text className="max-w-2xl border-l border-border pl-5 text-muted">
            {body}
          </Text>
          <div
            className={cn(
              "flex flex-col gap-3 sm:flex-row sm:flex-wrap",
              align === "center" && "justify-center",
            )}
          >
            {actions}
          </div>
        </div>
        {media ? (
          <div className="min-w-0 lg:pb-1">
            <div className="relative before:absolute before:-inset-3 before:border before:border-border before:content-['']">
              {media}
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
