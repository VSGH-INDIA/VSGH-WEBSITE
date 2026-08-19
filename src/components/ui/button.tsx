import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

const variants = {
  primary:
    "bg-inverse text-inverse-fg hover:opacity-90 disabled:bg-accent-muted disabled:text-background disabled:opacity-100",
  secondary:
    "border border-border bg-transparent text-foreground hover:border-foreground disabled:opacity-40",
  ghost:
    "bg-transparent text-foreground hover:bg-surface-elevated disabled:opacity-40",
} as const;

export function Button({
  variant = "primary",
  size = "md",
  loading = false,
  className,
  children,
  disabled,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: keyof typeof variants;
  size?: "sm" | "md";
  loading?: boolean;
  children: ReactNode;
}) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-[var(--vsgh-radius)] font-medium transition-[background-color,border-color,opacity,transform] duration-[var(--vsgh-duration)] ease-[var(--vsgh-ease)] active:scale-[0.99]",
        size === "md" &&
          "min-h-[var(--vsgh-control)] px-5 py-2.5 text-[length:var(--vsgh-text-nav)]",
        size === "sm" &&
          "min-h-9 px-3 py-1.5 text-[length:var(--vsgh-text-meta)]",
        variants[variant],
        className,
      )}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      {...props}
    >
      {loading ? "Working…" : children}
    </button>
  );
}

export function ButtonLink({
  href,
  variant = "primary",
  size = "md",
  className,
  children,
}: {
  href: string;
  variant?: keyof typeof variants;
  size?: "sm" | "md";
  className?: string;
  children: ReactNode;
}) {
  const classNames = cn(
    "inline-flex items-center justify-center gap-2 rounded-[var(--vsgh-radius)] font-medium no-underline transition-[background-color,border-color,opacity] duration-[var(--vsgh-duration)] ease-[var(--vsgh-ease)]",
    size === "md" &&
      "min-h-[var(--vsgh-control)] px-5 py-2.5 text-[length:var(--vsgh-text-nav)]",
    size === "sm" && "min-h-9 px-3 py-1.5 text-[length:var(--vsgh-text-meta)]",
    variants[variant],
    className,
  );

  if (href.startsWith("#")) {
    return (
      <a href={href} className={classNames}>
        {children}
      </a>
    );
  }

  return (
    <Link href={href} prefetch={href === "/"} className={classNames}>
      {children}
    </Link>
  );
}
