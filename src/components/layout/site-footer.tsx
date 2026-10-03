import Link from "next/link";
import { PRIMARY_NAV } from "@/lib/navigation";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-border bg-[#070b11]">
      <div
        className="mx-auto flex max-w-[var(--vsgh-content-wide)] flex-col gap-12 py-12 md:py-16"
        style={{ paddingInline: "var(--vsgh-gutter)" }}
      >
        <div className="grid gap-10 border-b border-border pb-12 md:grid-cols-[minmax(0,1.25fr)_minmax(15rem,.75fr)] md:items-end">
          <div className="max-w-3xl space-y-4">
            <p className="font-mono text-[length:var(--vsgh-text-label)] uppercase tracking-[var(--vsgh-tracking-label)] text-[#9fb7cf]">
              VSGH / India Pvt Ltd
            </p>
            <h2 className="font-display text-[clamp(2.5rem,6vw,5.5rem)] font-semibold leading-[.92] tracking-[-.055em]">
              Material thinking for demanding flight.
            </h2>
          </div>
          <p className="font-mono text-[length:var(--vsgh-text-meta)] leading-6 text-muted">
            Engineered material capability from recovered resource to
            application. Public overview only.
          </p>
        </div>
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <nav aria-label="Footer navigation" className="max-w-2xl">
            <ul className="grid grid-cols-2 gap-x-8 gap-y-1 sm:grid-cols-3">
              {PRIMARY_NAV.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    prefetch={false}
                    className="group inline-flex min-h-11 items-center gap-2 py-2 text-[length:var(--vsgh-text-nav)] text-muted no-underline transition-colors duration-[var(--vsgh-duration)] hover:text-foreground"
                  >
                    {item.label}
                    <span
                      aria-hidden
                      className="opacity-0 transition-opacity group-hover:opacity-100"
                    >
                      ↗
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <p className="font-mono text-[length:var(--vsgh-text-meta)] text-muted">
            © {new Date().getFullYear()} VSGH. Public overview only.
          </p>
        </div>
      </div>
    </footer>
  );
}
