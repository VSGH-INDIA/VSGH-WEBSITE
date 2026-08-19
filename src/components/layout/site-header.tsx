"use client";

import Link from "next/link";
import { useState } from "react";
import { PRIMARY_NAV } from "@/lib/navigation";
import { cn } from "@/lib/cn";
import { ButtonLink } from "@/components/ui/button";

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/90 backdrop-blur-sm">
      <div
        className="mx-auto flex max-w-[var(--vsgh-content-wide)] items-center justify-between gap-4 py-3"
        style={{ paddingInline: "var(--vsgh-gutter)" }}
      >
        <Link href="/" className="flex items-center gap-3 no-underline">
          <span className="flex h-9 w-9 items-center justify-center border border-border font-display text-sm font-semibold">
            V
          </span>
          <span className="leading-tight">
            <span className="block text-[length:var(--vsgh-text-nav)] font-semibold tracking-wide">
              VSGH
            </span>
            <span className="block font-mono text-[length:var(--vsgh-text-meta)] text-muted">
              Design system · Rev A
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-5 lg:flex" aria-label="Primary">
          {PRIMARY_NAV.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-[length:var(--vsgh-text-nav)] text-muted no-underline transition-colors duration-[var(--vsgh-duration)] hover:text-foreground"
              title="Route not implemented — design-system foundation only"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ButtonLink
            href="#ds-cta"
            variant="primary"
            size="sm"
            className="hidden sm:inline-flex"
          >
            Contact
          </ButtonLink>
          <button
            type="button"
            className="inline-flex min-h-11 min-w-11 items-center justify-center border border-border lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((value) => !value)}
          >
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            <span aria-hidden className="font-mono text-sm">
              {open ? "×" : "☰"}
            </span>
          </button>
        </div>
      </div>

      {open ? (
        <nav
          id="mobile-nav"
          className="border-t border-border bg-surface px-[var(--vsgh-gutter)] py-4 lg:hidden"
          aria-label="Mobile"
        >
          <ul className="flex flex-col gap-1">
            {PRIMARY_NAV.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className={cn(
                    "block py-3 text-[length:var(--vsgh-text-body)] text-foreground no-underline",
                  )}
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
