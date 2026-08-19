import Link from "next/link";
import { cn } from "@/lib/cn";

export function DomainSubnav({
  label,
  items,
  currentPath,
}: {
  label: string;
  items: readonly { label: string; href: string }[];
  currentPath: string;
}) {
  return (
    <nav aria-label={label} className="border-b border-border bg-surface">
      <ul
        className="mx-auto flex max-w-[var(--vsgh-content-wide)] gap-1 overflow-x-auto py-2"
        style={{ paddingInline: "var(--vsgh-gutter)" }}
      >
        {items.map((item) => {
          const current = currentPath === item.href;
          return (
            <li key={item.href} className="shrink-0">
              <Link
                href={item.href}
                prefetch
                className={cn(
                  "inline-flex min-h-11 items-center px-3 py-2 text-[length:var(--vsgh-text-nav)] no-underline transition-colors duration-[var(--vsgh-duration)]",
                  current
                    ? "text-foreground"
                    : "text-muted hover:text-foreground",
                )}
                aria-current={current ? "page" : undefined}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
