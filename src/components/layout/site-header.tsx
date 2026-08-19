"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  isPrimaryNavCurrent,
  isPublishedPath,
  PRIMARY_NAV,
} from "@/lib/navigation";
import { cn } from "@/lib/cn";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (!open) {
      return;
    }
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 80rem)");
    const onChange = () => {
      if (media.matches) {
        setOpen(false);
      }
    };
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background">
      <div
        className="mx-auto flex max-w-[var(--vsgh-content-wide)] items-center justify-between gap-4 py-3"
        style={{ paddingInline: "var(--vsgh-gutter)" }}
      >
        <Link
          href="/"
          className="flex items-center gap-3 no-underline"
          aria-label="VSGH home"
        >
          <span
            aria-hidden
            className="flex h-9 w-9 items-center justify-center border border-border font-display text-sm font-semibold"
          >
            V
          </span>
          <span className="leading-tight" aria-hidden>
            <span className="block text-[length:var(--vsgh-text-nav)] font-semibold tracking-wide">
              VSGH
            </span>
            <span className="block font-mono text-[length:var(--vsgh-text-meta)] text-muted">
              Materials technology
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-4 xl:flex" aria-label="Primary">
          {PRIMARY_NAV.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              prefetch={isPublishedPath(item.href)}
              className="text-[length:var(--vsgh-text-nav)] text-muted no-underline transition-colors duration-[var(--vsgh-duration)] hover:text-foreground"
              aria-current={
                isPrimaryNavCurrent(item.href, pathname) ? "page" : undefined
              }
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          className="inline-flex size-[var(--vsgh-control)] items-center justify-center border border-border xl:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((value) => !value)}
        >
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          {open ? (
            <span aria-hidden className="font-mono text-lg leading-none">
              ×
            </span>
          ) : (
            <span aria-hidden className="flex flex-col gap-1">
              <span className="block h-px w-4 bg-foreground" />
              <span className="block h-px w-4 bg-foreground" />
              <span className="block h-px w-4 bg-foreground" />
            </span>
          )}
        </button>
      </div>

      <nav
        id="mobile-nav"
        hidden={!open}
        className="border-t border-border bg-surface px-[var(--vsgh-gutter)] py-4 xl:hidden"
        aria-label="Mobile"
      >
        <ul className="flex flex-col gap-1">
          {PRIMARY_NAV.map((item) => (
            <li key={item.label}>
              <Link
                href={item.href}
                prefetch={isPublishedPath(item.href)}
                className={cn(
                  "block py-3 text-[length:var(--vsgh-text-body)] text-foreground no-underline",
                )}
                aria-current={
                  isPrimaryNavCurrent(item.href, pathname) ? "page" : undefined
                }
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
