import Image from "next/image";
import { MediaPlaceholder } from "@/components/home/media-placeholder";
import { MediaFrame } from "@/components/ui/card";
import type { MediaAsset } from "@/lib/media";
import { mediaObjectPosition, publicMediaOrNull } from "@/lib/media";
import { cn } from "@/lib/cn";

export function PublicMedia({
  media,
  label,
  className,
  priority = false,
}: {
  media?: unknown;
  label: string;
  className?: string;
  priority?: boolean;
}) {
  const asset = publicMediaOrNull(media);
  if (!asset) {
    return <MediaPlaceholder label={label} className={className} />;
  }
  return (
    <MediaAssetView
      asset={asset}
      label={label}
      className={className}
      priority={priority}
    />
  );
}

export function MediaAssetView({
  asset,
  label,
  className,
  priority = false,
}: {
  asset: MediaAsset;
  label?: string;
  className?: string;
  priority?: boolean;
}) {
  const position = mediaObjectPosition(asset);
  const fit = asset.cropMode === "contain" ? "object-contain" : "object-cover";

  return (
    <MediaFrame label={label ?? asset.altText} className={className}>
      <Image
        src={asset.src}
        alt={asset.altText}
        fill
        sizes="(max-width: 64rem) 100vw, 40rem"
        className={cn("vsgh-image-reveal absolute inset-0", fit)}
        style={position ? { objectPosition: position } : undefined}
        loading={priority ? "eager" : "lazy"}
      />
      {asset.caption || asset.credit ? (
        <p className="relative mt-auto font-mono text-[length:var(--vsgh-text-meta)] text-muted">
          {[asset.caption, asset.credit].filter(Boolean).join(" · ")}
        </p>
      ) : null}
    </MediaFrame>
  );
}
