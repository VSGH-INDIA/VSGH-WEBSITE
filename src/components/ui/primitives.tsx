import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function Container({
  children,
  wide = false,
  className,
}: {
  children: ReactNode;
  wide?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "mx-auto w-full",
        wide
          ? "max-w-[var(--vsgh-content-wide)]"
          : "max-w-[var(--vsgh-content)]",
        className,
      )}
      style={{ paddingInline: "var(--vsgh-gutter)" }}
    >
      {children}
    </div>
  );
}

export function Section({
  children,
  className,
  tone = "default",
  id,
}: {
  children: ReactNode;
  className?: string;
  tone?: "default" | "surface" | "inverse";
  id?: string;
}) {
  return (
    <section
      id={id}
      className={cn(
        tone === "surface" && "bg-surface",
        tone === "inverse" && "bg-inverse text-inverse-fg",
        className,
      )}
      style={{ paddingBlock: "var(--vsgh-section-y)" }}
    >
      {children}
    </section>
  );
}

export function Divider({ className }: { className?: string }) {
  return (
    <hr className={cn("m-0 border-0 border-t border-border", className)} />
  );
}

export function Badge({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cn(
        "font-mono text-[length:var(--vsgh-text-label)] uppercase text-muted",
        className,
      )}
      style={{ letterSpacing: "var(--vsgh-tracking-label)" }}
    >
      {children}
    </p>
  );
}

type HeadingLevel = "display" | "hero" | "h1" | "h2" | "h3";

const headingClass: Record<HeadingLevel, string> = {
  display:
    "font-display font-semibold text-[length:var(--vsgh-text-display)] leading-[var(--vsgh-leading-display)] tracking-[var(--vsgh-tracking-display)]",
  hero: "font-display font-semibold text-[length:var(--vsgh-text-hero)] leading-[var(--vsgh-leading-display)] tracking-[var(--vsgh-tracking-display)]",
  h1: "font-display font-semibold text-[length:var(--vsgh-text-h1)] tracking-tight",
  h2: "font-display font-semibold text-[length:var(--vsgh-text-h2)] tracking-tight",
  h3: "font-display font-medium text-[length:var(--vsgh-text-h3)]",
};

export function Heading({
  as: Tag = "h2",
  variant,
  children,
  className,
}: {
  as?: "h1" | "h2" | "h3" | "p";
  variant: HeadingLevel;
  children: ReactNode;
  className?: string;
}) {
  return <Tag className={cn(headingClass[variant], className)}>{children}</Tag>;
}

export function Text({
  children,
  size = "body",
  className,
  as: Tag = "p",
}: {
  children: ReactNode;
  size?: "body" | "small" | "meta" | "nav";
  className?: string;
  as?: "p" | "span";
}) {
  const sizeClass = {
    body: "text-[length:var(--vsgh-text-body)] leading-[var(--vsgh-leading-body)]",
    small:
      "text-[length:var(--vsgh-text-body-small)] leading-[var(--vsgh-leading-body)]",
    meta: "font-mono text-[length:var(--vsgh-text-meta)] text-muted",
    nav: "text-[length:var(--vsgh-text-nav)] tracking-wide",
  }[size];

  return <Tag className={cn(sizeClass, className)}>{children}</Tag>;
}

export function TextLink({
  href,
  children,
  className,
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <a
      href={href}
      className={cn(
        "underline-offset-4 transition-[color,text-decoration] duration-[var(--vsgh-duration)] ease-[var(--vsgh-ease)] hover:underline",
        className,
      )}
    >
      {children}
    </a>
  );
}
