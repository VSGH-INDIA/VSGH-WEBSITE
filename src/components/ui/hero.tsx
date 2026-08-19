import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Badge, Heading, Text } from "@/components/ui/primitives";

export function Hero({
  eyebrow,
  headline,
  emphasis,
  body,
  actions,
  align = "start",
}: {
  eyebrow: string;
  headline: string;
  emphasis?: string;
  body: string;
  actions: ReactNode;
  align?: "start" | "center";
}) {
  return (
    <div
      className={cn(
        "vsgh-grid-bg flex min-h-[var(--vsgh-hero-min)] flex-col justify-center border-b border-border",
        align === "center" && "text-center",
      )}
    >
      <div
        className={cn(
          "mx-auto flex w-full max-w-[var(--vsgh-content)] flex-col gap-8 py-20",
          align === "center" && "items-center",
        )}
        style={{ paddingInline: "var(--vsgh-gutter)" }}
      >
        <Badge>{eyebrow}</Badge>
        <Heading as="h1" variant="display" className="max-w-5xl">
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
    </div>
  );
}
