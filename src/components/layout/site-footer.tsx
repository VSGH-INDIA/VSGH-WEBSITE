import Link from "next/link";
import { isPublishedPath, PRIMARY_NAV } from "@/lib/navigation";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-border">
      <div
        className="mx-auto flex max-w-[var(--vsgh-content-wide)] flex-col gap-8 py-10"
        style={{ paddingInline: "var(--vsgh-gutter)" }}
      >
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm space-y-2">
            <p className="text-[length:var(--vsgh-text-nav)] font-semibold tracking-wide">
              VSGH
            </p>
            <p className="font-mono text-[length:var(--vsgh-text-meta)] text-muted">
              Engineered material capability from recovered resource to
              application. Public overview only.
            </p>
          </div>
          <nav aria-label="Footer">
            <ul className="grid grid-cols-2 gap-x-8 gap-y-2 sm:grid-cols-3">
              {PRIMARY_NAV.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    prefetch={isPublishedPath(item.href)}
                    className="text-[length:var(--vsgh-text-nav)] text-muted no-underline transition-colors duration-[var(--vsgh-duration)] hover:text-foreground"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <p className="font-mono text-[length:var(--vsgh-text-meta)] text-muted">
          © {new Date().getFullYear()} VSGH. Public overview only.
        </p>
      </div>
    </footer>
  );
}
