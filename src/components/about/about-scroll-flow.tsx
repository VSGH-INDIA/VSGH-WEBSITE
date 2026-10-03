"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { MediaPlaceholder } from "@/components/home/media-placeholder";
import type { AboutPageContent } from "@/content/about";

function ChapterBody({ page }: { page: AboutPageContent }) {
  if (page.variant === "leadership") {
    return (
      <div className="space-y-8">
        {page.sections.map((section) => (
          <article key={section.title} className="max-w-3xl space-y-3">
            <h3 className="font-display text-[clamp(1.5rem,2.7vw,2.5rem)] font-medium tracking-tight">
              {section.title}
            </h3>
            <p className="max-w-2xl text-[length:var(--vsgh-text-body)] leading-[var(--vsgh-leading-body)] text-muted">
              {section.body}
            </p>
          </article>
        ))}
        <p className="border-l border-border pl-5 font-mono text-[length:var(--vsgh-text-meta)] leading-6 text-muted">
          {page.leadershipNote}
        </p>
        <div className="grid gap-4 sm:grid-cols-3">
          {["01", "02", "03"].map((index) => (
            <div key={index} className="space-y-3">
              <MediaPlaceholder
                label={`Leadership profile ${index}`}
                className="aspect-[4/5]"
              />
              <p className="font-mono text-[10px] uppercase tracking-[.16em] text-muted">
                /{index} · profile reserved
              </p>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (page.variant === "facilities") {
    return (
      <div className="space-y-8">
        {page.sections.map((section) => (
          <article key={section.title} className="max-w-3xl space-y-3">
            <h3 className="font-display text-[clamp(1.5rem,2.7vw,2.5rem)] font-medium tracking-tight">
              {section.title}
            </h3>
            <p className="max-w-2xl text-[length:var(--vsgh-text-body)] leading-[var(--vsgh-leading-body)] text-muted">
              {section.body}
            </p>
          </article>
        ))}
        <ol className="grid gap-px bg-border sm:grid-cols-2">
          {page.facilities?.map((facility) => (
            <li
              key={facility.title}
              className="group bg-background p-5 transition-colors hover:bg-surface-elevated"
            >
              <p className="font-mono text-[length:var(--vsgh-text-meta)] text-[#9fb7cf]">
                {facility.index}
              </p>
              <h3 className="mt-7 font-display text-[length:var(--vsgh-text-h3)] font-medium group-hover:text-[#b9d9ff]">
                {facility.title}
              </h3>
              <p className="mt-3 text-[length:var(--vsgh-text-body-small)] leading-[var(--vsgh-leading-body)] text-muted">
                {facility.body}
              </p>
            </li>
          ))}
        </ol>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      <div className="space-y-0">
        {page.sections.map((section, index) => (
          <article
            key={section.title}
            className="grid gap-4 border-t border-border py-7 last:border-b md:grid-cols-[4rem_minmax(0,.8fr)_minmax(0,1.2fr)] md:items-start"
          >
            <p className="font-mono text-[length:var(--vsgh-text-meta)] text-[#9fb7cf]">
              /{String(index + 1).padStart(2, "0")}
            </p>
            <h3 className="font-display text-[clamp(1.35rem,2.3vw,2rem)] font-medium tracking-tight">
              {section.title}
            </h3>
            <p className="text-[length:var(--vsgh-text-body-small)] leading-[var(--vsgh-leading-body)] text-muted">
              {section.body}
            </p>
          </article>
        ))}
      </div>
      {page.principles ? (
        <ol className="grid gap-px bg-border sm:grid-cols-2">
          {page.principles.map((principle) => (
            <li
              key={principle.title}
              className="group min-h-52 bg-background p-5 transition-colors hover:bg-surface-elevated"
            >
              <p className="font-mono text-[length:var(--vsgh-text-meta)] text-[#9fb7cf]">
                {principle.index}
              </p>
              <h3 className="mt-7 font-display text-[length:var(--vsgh-text-h3)] font-medium group-hover:text-[#b9d9ff]">
                {principle.title}
              </h3>
              <p className="mt-3 text-[length:var(--vsgh-text-body-small)] leading-[var(--vsgh-leading-body)] text-muted">
                {principle.body}
              </p>
            </li>
          ))}
        </ol>
      ) : null}
    </div>
  );
}

export function AboutScrollFlow({
  pages,
}: {
  pages: readonly AboutPageContent[];
}) {
  const [activeSlug, setActiveSlug] = useState(pages[0]?.slug ?? "company");

  useEffect(() => {
    const setSlugFromHash = () => {
      const slug = window.location.hash.slice(1);
      if (pages.some((page) => page.slug === slug)) {
        setActiveSlug(slug);
      }
    };
    setSlugFromHash();
    window.addEventListener("hashchange", setSlugFromHash);

    const observer = new IntersectionObserver(
      (entries) => {
        const current = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!current) return;
        const slug = current.target.id;
        setActiveSlug(slug);
      },
      { rootMargin: "-28% 0px -58% 0px", threshold: [0.05, 0.3, 0.6] },
    );

    const chapters = pages
      .map((page) => document.getElementById(page.slug))
      .filter((element): element is HTMLElement => element !== null);
    chapters.forEach((chapter) => observer.observe(chapter));

    return () => {
      window.removeEventListener("hashchange", setSlugFromHash);
      observer.disconnect();
    };
  }, [pages]);

  if (pages.length === 0) return null;

  return (
    <main id="main">
      <nav
        aria-label="About chapters"
        className="sticky top-[4.31rem] z-30 border-b border-border bg-[#0b1119]/95 backdrop-blur-md"
      >
        <div
          className="mx-auto flex max-w-[var(--vsgh-content-wide)] gap-1 overflow-x-auto py-2"
          style={{ paddingInline: "var(--vsgh-gutter)" }}
        >
          {pages.map((page, index) => {
            const active = page.slug === activeSlug;
            return (
              <a
                key={page.slug}
                href={`#${page.slug}`}
                aria-current={active ? "step" : undefined}
                className={`shrink-0 border-b px-3 py-2 font-mono text-[10px] uppercase tracking-[.12em] no-underline transition-colors ${
                  active
                    ? "border-[#8ec0ff] text-[#b9d9ff]"
                    : "border-transparent text-muted hover:text-foreground"
                }`}
              >
                <span className="mr-2 opacity-60">
                  /{String(index + 1).padStart(2, "0")}
                </span>
                {page.navLabel}
              </a>
            );
          })}
        </div>
      </nav>

      {pages.map((page, index) => {
        const nextPage = pages[index + 1];
        const ChapterHeading = index === 0 ? "h1" : "h2";
        return (
          <section
            id={page.slug}
            data-about-section
            key={page.slug}
            className="scroll-mt-36 border-b border-border"
          >
            <div className="relative overflow-hidden bg-background">
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 opacity-70 [background-image:linear-gradient(var(--vsgh-grid-line)_1px,transparent_1px),linear-gradient(90deg,var(--vsgh-grid-line)_1px,transparent_1px)] [background-size:var(--vsgh-grid-size)_var(--vsgh-grid-size)]"
              />
              <div
                className="relative mx-auto grid min-h-[min(44rem,82svh)] max-w-[var(--vsgh-content-wide)] gap-10 py-16 lg:grid-cols-[minmax(0,1.1fr)_minmax(20rem,.9fr)] lg:items-end lg:py-24"
                style={{ paddingInline: "var(--vsgh-gutter)" }}
              >
                <div className="max-w-4xl space-y-7">
                  <p className="font-mono text-[length:var(--vsgh-text-label)] uppercase tracking-[var(--vsgh-tracking-label)] text-[#9fb7cf]">
                    /{String(index + 1).padStart(2, "0")} · {page.eyebrow}
                  </p>
                  <ChapterHeading className="font-display text-[clamp(3rem,6.8vw,7rem)] font-semibold leading-[.92] tracking-[-.06em]">
                    {page.headline}{" "}
                    {page.emphasis ? (
                      <span className="text-[#9fb7cf]">{page.emphasis}</span>
                    ) : null}
                  </ChapterHeading>
                  <p className="max-w-2xl border-l border-border pl-5 text-[length:var(--vsgh-text-body)] leading-[var(--vsgh-leading-body)] text-muted">
                    {page.lede}
                  </p>
                </div>
                <div className="relative before:absolute before:-inset-3 before:border before:border-border before:content-['']">
                  <MediaPlaceholder
                    label={page.mediaLabel}
                    className="aspect-[16/10] lg:aspect-[4/5]"
                  />
                </div>
              </div>
            </div>
            <div
              className="mx-auto grid max-w-[var(--vsgh-content-wide)] gap-10 py-[var(--vsgh-section-y)] lg:grid-cols-[minmax(12rem,.35fr)_minmax(0,1fr)]"
              style={{ paddingInline: "var(--vsgh-gutter)" }}
            >
              <div className="lg:sticky lg:top-36 lg:h-fit">
                <p className="font-mono text-[length:var(--vsgh-text-label)] uppercase tracking-[var(--vsgh-tracking-label)] text-muted">
                  Chapter /{String(index + 1).padStart(2, "0")}
                </p>
                <p className="mt-3 text-[length:var(--vsgh-text-body-small)] leading-6 text-muted">
                  {page.navLabel}
                </p>
                {nextPage ? (
                  <a
                    href={`#${nextPage.slug}`}
                    className="mt-8 inline-flex items-center gap-2 border-b border-border pb-2 font-mono text-[10px] uppercase tracking-[.12em] text-foreground no-underline hover:border-[#8ec0ff] hover:text-[#b9d9ff]"
                  >
                    Continue to {nextPage.navLabel} <span aria-hidden>↓</span>
                  </a>
                ) : (
                  <Link
                    href="/contact"
                    className="mt-8 inline-flex items-center gap-2 border-b border-border pb-2 font-mono text-[10px] uppercase tracking-[.12em] text-foreground no-underline hover:border-[#8ec0ff] hover:text-[#b9d9ff]"
                  >
                    Start a conversation <span aria-hidden>↗</span>
                  </Link>
                )}
              </div>
              <ChapterBody page={page} />
            </div>
          </section>
        );
      })}
    </main>
  );
}
