import Image from "next/image";
import { cn } from "@/lib/cn";

function fallbackImage(label: string) {
  const normalized = label.toLowerCase();
  if (
    normalized.includes("aerospace") ||
    normalized.includes("application") ||
    normalized.includes("space") ||
    normalized.includes("defense")
  ) {
    return "/images/vsgh-aerospace-assembly-v1.png";
  }
  if (
    normalized.includes("facility") ||
    normalized.includes("company") ||
    normalized.includes("leadership") ||
    normalized.includes("contact")
  ) {
    return "/images/vsgh-materials-laboratory-v1.png";
  }
  return "/images/vsgh-material-macro-v1.png";
}

export function MediaPlaceholder({
  label,
  className,
}: {
  label: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "group relative isolate aspect-[16/9] overflow-hidden border border-border bg-surface-elevated",
        className,
      )}
      role="img"
      aria-label={label}
    >
      <Image
        src={fallbackImage(label)}
        alt=""
        fill
        sizes="(min-width: 1024px) 50vw, 100vw"
        className="object-cover transition-transform duration-700 ease-out motion-safe:group-hover:scale-[1.035]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,rgba(5,8,13,.08),rgba(5,8,13,.56))]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-40 [background-image:linear-gradient(rgba(255,255,255,.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.08)_1px,transparent_1px)] [background-size:4.5rem_4.5rem]"
      />
    </div>
  );
}
