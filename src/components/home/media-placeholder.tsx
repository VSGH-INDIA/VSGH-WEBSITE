import { MediaFrame } from "@/components/ui/card";

export function MediaPlaceholder({
  label,
  className,
}: {
  label: string;
  className?: string;
}) {
  return (
    <MediaFrame label={label} className={className}>
      <div
        aria-hidden
        className="vsgh-grid-bg pointer-events-none absolute inset-0"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-6 border border-border"
      />
    </MediaFrame>
  );
}
