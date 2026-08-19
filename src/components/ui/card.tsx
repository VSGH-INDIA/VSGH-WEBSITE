import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Heading, Text } from "@/components/ui/primitives";

export function Card({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-[var(--vsgh-radius)] border border-border bg-surface p-6",
        className,
      )}
    >
      {children}
    </div>
  );
}

export function FeatureCard({
  index,
  title,
  children,
}: {
  index: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <article className="flex flex-col gap-4 border border-border bg-surface p-6 transition-[border-color] duration-[var(--vsgh-duration)] hover:border-foreground">
      <p className="font-mono text-[length:var(--vsgh-text-meta)] text-muted">
        {index}
      </p>
      <Heading as="h3" variant="h3">
        {title}
      </Heading>
      <Text size="small" className="text-muted">
        {children}
      </Text>
    </article>
  );
}

export function Metric({
  index,
  value,
  label,
}: {
  index: string;
  value: string;
  label: string;
}) {
  return (
    <div className="flex flex-col gap-2 border-border py-6 md:border-r md:px-6 md:py-0 md:last:border-r-0 md:first:pl-0">
      <p className="font-mono text-[length:var(--vsgh-text-meta)] text-muted">
        {index}
      </p>
      <p className="font-display text-[length:var(--vsgh-text-h1)] font-semibold tracking-tight">
        {value}
      </p>
      <p className="text-[length:var(--vsgh-text-meta)] text-muted">{label}</p>
    </div>
  );
}

export function CtaBlock({
  title,
  body,
  actions,
}: {
  title: string;
  body: string;
  actions: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-6 border border-border bg-surface-elevated p-8 md:flex-row md:items-end md:justify-between">
      <div className="max-w-xl space-y-3">
        <Heading as="h2" variant="h2">
          {title}
        </Heading>
        <Text className="text-muted">{body}</Text>
      </div>
      <div className="flex flex-wrap gap-3">{actions}</div>
    </div>
  );
}

export function MediaFrame({
  label,
  className,
}: {
  label: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex aspect-[16/9] items-end border border-border bg-surface-elevated p-4",
        className,
      )}
      role="img"
      aria-label={label}
    >
      <p className="font-mono text-[length:var(--vsgh-text-meta)] text-muted">
        {label}
      </p>
    </div>
  );
}
