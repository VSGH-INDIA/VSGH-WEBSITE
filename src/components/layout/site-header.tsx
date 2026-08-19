"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { isPrimaryNavCurrent, PRIMARY_NAV } from "@/lib/navigation";
import { cn } from "@/lib/cn";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  const closeMenu = useCallback((restoreFocus = false) => {
    setOpen(false);
    if (restoreFocus) {
      menuButtonRef.current?.focus();
    }
  }, []);

  useEffect(() => {
    if (!open) {
      document.body.style.overflow = "";
      return;
    }
    document.body.style.overflow = "hidden";
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeMenu(true);
      }
    };
    const onClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) {
        return;
      }
      if (target.closest("a[href]")) {
        closeMenu(false);
      }
    };
    window.addEventListener("keydown", onKey);
    document.addEventListener("click", onClick);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("click", onClick);
      document.body.style.overflow = "";
    };
  }, [open, closeMenu]);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 80rem)");
    const onChange = () => {
      if (media.matches) {
        closeMenu(false);
      }
    };
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, [closeMenu]);

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background">
      <div
        className="mx-auto flex max-w-[var(--vsgh-content-wide)] items-center justify-between gap-4 py-3"
        style={{ paddingInline: "var(--vsgh-gutter)" }}
      >
        <Link
          href="/"
          className="flex min-h-[var(--vsgh-control)] items-center gap-3 no-underline"
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

        <nav
          className="hidden max-w-[min(100%,44rem)] flex-wrap items-center justify-end gap-x-1 xl:flex"
          aria-label="Primary"
        >
          {PRIMARY_NAV.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              prefetch={false}
              className="inline-flex min-h-11 items-center px-2 text-[length:var(--vsgh-text-nav)] text-muted no-underline transition-colors duration-[var(--vsgh-duration)] hover:text-foreground"
              aria-current={
                isPrimaryNavCurrent(item.href, pathname) ? "page" : undefined
              }
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <button
          ref={menuButtonRef}
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
        aria-label="Primary"
      >
        <ul className="flex flex-col gap-1">
          {PRIMARY_NAV.map((item) => (
            <li key={item.label}>
              <Link
                href={item.href}
                prefetch={false}
                className={cn(
                  "flex min-h-11 items-center py-3 text-[length:var(--vsgh-text-body)] text-foreground no-underline",
                )}
                aria-current={
                  isPrimaryNavCurrent(item.href, pathname) ? "page" : undefined
                }
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
