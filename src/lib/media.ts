const SANITY_CDN = /^https:\/\/cdn\.sanity\.io\/images\//;
const SLUG_LIKE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export const MEDIA_USAGES = [
  "hero",
  "editorial",
  "og",
  "inline",
  "gallery",
] as const;

export const MEDIA_APPROVAL = ["draft", "review", "approved"] as const;

export const MEDIA_VISIBILITY = ["internal", "public"] as const;

export const MEDIA_ASPECTS = ["16/9", "4/5", "4/3", "1/1", "21/9"] as const;

export const MEDIA_CROPS = ["cover", "contain", "focal"] as const;

export type MediaUsage = (typeof MEDIA_USAGES)[number];
export type MediaApproval = (typeof MEDIA_APPROVAL)[number];
export type MediaVisibility = (typeof MEDIA_VISIBILITY)[number];
export type MediaAspect = (typeof MEDIA_ASPECTS)[number];
export type MediaCrop = (typeof MEDIA_CROPS)[number];

export type MediaAsset = {
  src: string;
  altText: string;
  caption?: string;
  credit?: string;
  focalPoint?: { x: number; y: number };
  aspectRatio: MediaAspect;
  cropMode: MediaCrop;
  usage: MediaUsage;
  approvalStatus: MediaApproval;
  visibility: MediaVisibility;
  decorative: boolean;
  width?: number;
  height?: number;
};

function asTrimmed(value: unknown, max: number): string {
  if (typeof value !== "string") {
    return "";
  }
  return value.trim().slice(0, max);
}

function asEnum<T extends string>(
  value: unknown,
  allowed: readonly T[],
  fallback: T,
): T {
  return typeof value === "string" &&
    (allowed as readonly string[]).includes(value)
    ? (value as T)
    : fallback;
}

function asPositiveInt(value: unknown): number | undefined {
  return typeof value === "number" && Number.isFinite(value) && value > 0
    ? Math.round(value)
    : undefined;
}

function asFocalPoint(value: unknown): MediaAsset["focalPoint"] {
  if (typeof value !== "object" || value === null) {
    return undefined;
  }
  const point = value as { x?: unknown; y?: unknown };
  if (typeof point.x !== "number" || typeof point.y !== "number") {
    return undefined;
  }
  if (
    !Number.isFinite(point.x) ||
    !Number.isFinite(point.y) ||
    point.x < 0 ||
    point.x > 1 ||
    point.y < 0 ||
    point.y > 1
  ) {
    return undefined;
  }
  return { x: point.x, y: point.y };
}

function asSrc(value: unknown): string {
  const src = asTrimmed(value, 500);
  if (!src || src.startsWith("//") || src.includes("..")) {
    return "";
  }
  if (src.startsWith("/") && !src.startsWith("//")) {
    return src;
  }
  if (SANITY_CDN.test(src)) {
    return src;
  }
  return "";
}

export function normalizeMediaAsset(incoming: unknown): MediaAsset | null {
  if (typeof incoming !== "object" || incoming === null) {
    return null;
  }
  const row = incoming as Record<string, unknown>;
  const src = asSrc(row.src ?? row.url);
  const altText = asTrimmed(row.altText ?? row.alt, 160);
  const decorative = row.decorative === true;
  if (!src || (!altText && !decorative)) {
    return null;
  }
  const caption = asTrimmed(row.caption, 160) || undefined;
  const credit = asTrimmed(row.credit, 120) || undefined;
  return {
    src,
    altText,
    caption,
    credit,
    focalPoint: asFocalPoint(row.focalPoint ?? row.hotspot),
    aspectRatio: asEnum(row.aspectRatio, MEDIA_ASPECTS, "16/9"),
    cropMode: asEnum(row.cropMode, MEDIA_CROPS, "cover"),
    usage: asEnum(row.usage, MEDIA_USAGES, "editorial"),
    approvalStatus: asEnum(row.approvalStatus, MEDIA_APPROVAL, "draft"),
    visibility: asEnum(row.visibility, MEDIA_VISIBILITY, "internal"),
    decorative,
    width: asPositiveInt(row.width),
    height: asPositiveInt(row.height),
  };
}

export function isPublicMedia(
  asset: MediaAsset | null | undefined,
): asset is MediaAsset {
  return Boolean(
    asset &&
    asset.visibility === "public" &&
    asset.approvalStatus === "approved" &&
    asset.src &&
    (asset.altText || asset.decorative),
  );
}

export function publicMediaOrNull(incoming: unknown): MediaAsset | null {
  const asset = normalizeMediaAsset(incoming);
  return isPublicMedia(asset) ? asset : null;
}

export function mediaObjectPosition(asset: MediaAsset): string | undefined {
  if (asset.cropMode !== "focal" || !asset.focalPoint) {
    return undefined;
  }
  return `${Math.round(asset.focalPoint.x * 100)}% ${Math.round(asset.focalPoint.y * 100)}%`;
}

export function isMediaUsage(value: string): value is MediaUsage {
  return (
    (MEDIA_USAGES as readonly string[]).includes(value) && SLUG_LIKE.test(value)
  );
}
