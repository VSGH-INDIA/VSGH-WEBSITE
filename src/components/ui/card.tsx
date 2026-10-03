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
    <div className={cn("border border-border bg-surface p-6", className)}>
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
    <article className="vsgh-card-hover group flex flex-col gap-4 border border-border bg-surface p-6 hover:-translate-y-1 hover:border-[#8ec0ff] hover:bg-surface-elevated">
      <p className="font-mono text-[length:var(--vsgh-text-meta)] text-muted">
        {index}
      </p>
      <Heading
        as="h3"
        variant="h3"
        className="transition-colors group-hover:text-[#b9d9ff]"
      >
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
    <div className="relative isolate flex flex-col gap-8 overflow-hidden border border-border bg-[#0d1620] p-8 md:flex-row md:items-end md:justify-between md:p-12">
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_88%_12%,rgba(142,192,255,.17),transparent_27%),linear-gradient(135deg,transparent_0%,rgba(255,255,255,.025)_100%)]"
      />
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
  children,
}: {
  label: string;
  className?: string;
  children?: ReactNode;
}) {
  return (
    <figure
      className={cn(
        "group relative flex aspect-[16/9] items-end overflow-hidden border border-border bg-surface-elevated p-4",
        className,
      )}
    >
      {children}
      <span className="sr-only">{label}</span>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,transparent_55%,rgba(5,8,13,.45))]"
      />
    </figure>
  );
}
