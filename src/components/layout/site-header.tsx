"use client";

import Image from "next/image";
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

  const leftNav = PRIMARY_NAV.slice(0, 3);
  const rightNav = PRIMARY_NAV.slice(-2);

  return (
    <header className="sticky top-0 z-[var(--vsgh-z-header)] bg-background/95">
      <div
        className="mx-auto flex max-w-[var(--vsgh-content-wide)] items-center justify-between gap-4 border-b border-border py-3"
        style={{ paddingInline: "var(--vsgh-gutter)" }}
      >
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {leftNav.map((item) => (
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
        <Link
          href="/"
          className="flex min-h-[var(--vsgh-control)] items-center gap-3.5 no-underline lg:absolute lg:left-1/2 lg:-translate-x-1/2"
          aria-label="VSGH India Pvt Ltd home"
        >
          <span
            aria-hidden
            className="relative h-10 w-12 shrink-0 overflow-hidden"
          >
            <Image
              src="/images/vsgh-india-logo.png"
              alt=""
              width={124}
              height={124}
              sizes="124px"
              className="absolute left-1/2 top-[-7px] max-w-none -translate-x-1/2"
            />
          </span>
          <span aria-hidden className="h-8 w-px bg-[#315b82]" />
          <span className="leading-[1.15]" aria-hidden>
            <span className="block font-display text-[11px] font-semibold uppercase tracking-[.18em] text-foreground">
              VSGH
            </span>
            <span className="mt-1 block font-mono text-[9px] uppercase tracking-[.15em] text-[#9fb7cf]">
              India Pvt Ltd
            </span>
          </span>
        </Link>

        <nav
          className="ml-auto hidden items-center gap-1 lg:flex"
          aria-label="Primary"
        >
          {rightNav.map((item) => (
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
          className="inline-flex size-[var(--vsgh-control)] items-center justify-center border border-border transition-colors hover:bg-surface-elevated"
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
        className="fixed inset-x-0 bottom-0 top-[4.31rem] overflow-y-auto border-b border-border bg-[#080c14]/95 px-[var(--vsgh-gutter)] py-8 backdrop-blur-xl"
        aria-label="Primary"
      >
        <div className="mx-auto flex max-w-[var(--vsgh-content-wide)] flex-col gap-10">
          <div className="flex items-center justify-between font-mono text-[length:var(--vsgh-text-label)] uppercase tracking-[var(--vsgh-tracking-label)] text-muted">
            <span>Explore VSGH</span>
            <span>Materials · technology · application</span>
          </div>
          <ul className="flex flex-col">
            {PRIMARY_NAV.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  prefetch={false}
                  className={cn(
                    "group flex min-h-14 items-center justify-between border-t border-border py-4 font-display text-[clamp(1.75rem,7vw,4rem)] leading-none tracking-tight text-foreground no-underline",
                  )}
                  aria-current={
                    isPrimaryNavCurrent(item.href, pathname)
                      ? "page"
                      : undefined
                  }
                >
                  {item.label}
                  <span
                    aria-hidden
                    className="font-mono text-sm text-muted transition-transform group-hover:translate-x-1"
                  >
                    ↗
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <p className="max-w-md font-mono text-[length:var(--vsgh-text-meta)] leading-6 text-muted">
            Public programme overview. Technical discussions begin with context,
            not a catalogue.
          </p>
        </div>
      </nav>
    </header>
  );
}
