"use client";

import { useEffect } from "react";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Keep the browser console useful in development. Production error details
    // are intentionally reduced by Next.js to avoid disclosing server data.
    console.error(error);
  }, [error]);

  return (
    <main id="main" className="vsgh-grid-bg flex flex-1 items-center">
      <section
        className="mx-auto w-full max-w-[var(--vsgh-content-wide)] py-24 md:py-36"
        style={{ paddingInline: "var(--vsgh-gutter)" }}
      >
        <p className="font-mono text-[length:var(--vsgh-text-label)] uppercase tracking-[var(--vsgh-tracking-label)] text-accent">
          Service recovery
        </p>
        <h1 className="mt-5 max-w-4xl font-display text-[clamp(3rem,9vw,7rem)] font-semibold leading-[.88] tracking-[-.06em]">
          This page could not be prepared.
        </h1>
        <p className="mt-8 max-w-xl text-lg leading-8 text-muted">
          Please try the request again. If the issue continues, use the public
          contact route and provide the reference below.
        </p>
        {error.digest ? (
          <p className="mt-4 font-mono text-sm text-muted">
            Reference: {error.digest}
          </p>
        ) : null}
        <button
          type="button"
          onClick={reset}
          className="mt-10 inline-flex min-h-11 items-center bg-inverse px-5 text-sm font-medium text-inverse-fg"
        >
          Try again
        </button>
      </section>
    </main>
  );
}
