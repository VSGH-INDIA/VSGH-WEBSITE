import { Divider } from "@/components/ui/primitives";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-border">
      <div
        className="mx-auto flex max-w-[var(--vsgh-content-wide)] flex-col gap-4 py-8 md:flex-row md:items-center md:justify-between"
        style={{ paddingInline: "var(--vsgh-gutter)" }}
      >
        <p className="font-mono text-[length:var(--vsgh-text-meta)] text-muted">
          VSGH · Design system demonstration · not a production homepage
        </p>
        <p className="font-mono text-[length:var(--vsgh-text-meta)] text-muted">
          WEB-081 navigation · pages not implemented
        </p>
      </div>
      <Divider />
    </footer>
  );
}
