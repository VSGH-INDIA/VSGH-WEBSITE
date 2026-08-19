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
    <div
      className={cn(
        "vsgh-grid-bg flex flex-col justify-center border-b border-border",
        compact ? "min-h-0" : "min-h-[var(--vsgh-hero-min)]",
        align === "center" && "text-center",
      )}
    >
      <div
        className={cn(
          "mx-auto grid w-full max-w-[var(--vsgh-content-wide)] items-center gap-12",
          compact ? "py-14 md:py-16" : "py-20",
          media ? "lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]" : "",
          align === "center" && "justify-items-center",
        )}
        style={{ paddingInline: "var(--vsgh-gutter)" }}
      >
        <div
          className={cn(
            "flex flex-col gap-8",
            align === "center" && "items-center",
          )}
        >
          <Badge>{eyebrow}</Badge>
          <Heading as="h1" variant={heading} className="max-w-5xl">
            {headline}
            {emphasis ? (
              <>
                {" "}
                <span className="text-accent">{emphasis}</span>
              </>
            ) : null}
          </Heading>
          <Text className="max-w-2xl text-muted">{body}</Text>
          <div
            className={cn(
              "flex flex-col gap-3 sm:flex-row sm:flex-wrap",
              align === "center" && "justify-center",
            )}
          >
            {actions}
          </div>
        </div>
        {media ? <div className="min-w-0">{media}</div> : null}
      </div>
    </div>
  );
}
