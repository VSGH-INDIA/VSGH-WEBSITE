export function PreviewBanner() {
  return (
    <div
      role="status"
      className="border-b border-border bg-surface px-4 py-2 text-center font-mono text-[length:var(--vsgh-text-meta)] text-muted"
    >
      Preview — not public.{" "}
      <a href="/api/draft/disable" className="text-foreground underline">
        Exit preview
      </a>
    </div>
  );
}
