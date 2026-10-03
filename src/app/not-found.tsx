import Link from "next/link";

export default function NotFound() {
  return (
    <main id="main" className="vsgh-grid-bg flex flex-1 items-center">
      <section
        className="mx-auto w-full max-w-[var(--vsgh-content-wide)] py-24 md:py-36"
        style={{ paddingInline: "var(--vsgh-gutter)" }}
      >
        <p className="font-mono text-[length:var(--vsgh-text-label)] uppercase tracking-[var(--vsgh-tracking-label)] text-accent">
          404 / route unavailable
        </p>
        <h1 className="mt-5 max-w-4xl font-display text-[clamp(3rem,9vw,7rem)] font-semibold leading-[.88] tracking-[-.06em]">
          This page is not part of the public platform.
        </h1>
        <p className="mt-8 max-w-xl text-lg leading-8 text-muted">
          The requested address may be out of date or unavailable. Use the
          public navigation to continue.
        </p>
        <div className="mt-10 flex flex-wrap gap-4">
          <Link
            href="/"
            className="inline-flex min-h-11 items-center bg-inverse px-5 text-sm font-medium text-inverse-fg no-underline"
          >
            Return to home
          </Link>
          <Link
            href="/business"
            className="inline-flex min-h-11 items-center border border-border px-5 text-sm font-medium text-foreground no-underline transition-colors hover:border-accent"
          >
            Explore business
          </Link>
        </div>
      </section>
    </main>
  );
}
