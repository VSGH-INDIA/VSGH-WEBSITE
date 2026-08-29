import { isSafeHref, isSafeInternalPath } from "@/lib/safe-url";

const ALLOWED_TYPES = [
  "heroBlock",
  "introBlock",
  "richTextBlock",
  "mediaBlock",
  "processBlock",
  "relatedContentBlock",
  "ctaSectionBlock",
] as const;

export type PageBuilderType = (typeof ALLOWED_TYPES)[number];

export type PageBuilderParagraph = {
  title?: string;
  body: string;
};

export type PageBuilderStage = {
  index: string;
  title: string;
  body: string;
};

export type PageBuilderRelated = {
  href: string;
  label: string;
  body: string;
};

export type PageBuilderBlock = {
  type: PageBuilderType;
  eyebrow?: string;
  title?: string;
  emphasis?: string;
  body?: string;
  mediaLabel?: string;
  media?: unknown;
  paragraphs?: PageBuilderParagraph[];
  stages?: PageBuilderStage[];
  related?: PageBuilderRelated[];
  primaryLabel?: string;
  primaryHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
};

function asText(value: unknown, max: number): string {
  if (typeof value !== "string") {
    return "";
  }
  return value.trim().slice(0, max);
}

function asType(value: unknown): PageBuilderType | null {
  return typeof value === "string" &&
    (ALLOWED_TYPES as readonly string[]).includes(value)
    ? (value as PageBuilderType)
    : null;
}

export function normalizePageBuilder(incoming: unknown): PageBuilderBlock[] {
  if (!Array.isArray(incoming)) {
    return [];
  }
  return incoming.flatMap((item) => {
    if (typeof item !== "object" || item === null) {
      return [];
    }
    const row = item as Record<string, unknown>;
    const type = asType(row._type ?? row.type);
    if (!type) {
      return [];
    }
    const paragraphs = Array.isArray(row.paragraphs)
      ? row.paragraphs.flatMap((paragraph) => {
          if (typeof paragraph !== "object" || paragraph === null) {
            return [];
          }
          const block = paragraph as { title?: unknown; body?: unknown };
          const body = asText(block.body, 4000);
          if (!body) {
            return [];
          }
          return [
            {
              title: asText(block.title, 160) || undefined,
              body,
            },
          ];
        })
      : undefined;
    const stages = Array.isArray(row.stages)
      ? row.stages.flatMap((stage) => {
          if (typeof stage !== "object" || stage === null) {
            return [];
          }
          const block = stage as {
            index?: unknown;
            title?: unknown;
            body?: unknown;
          };
          const title = asText(block.title, 80);
          const body = asText(block.body, 400);
          if (!title || !body) {
            return [];
          }
          return [
            {
              index: asText(block.index, 12),
              title,
              body,
            },
          ];
        })
      : undefined;
    const related = Array.isArray(row.related)
      ? row.related.flatMap((link) => {
          if (typeof link !== "object" || link === null) {
            return [];
          }
          const block = link as {
            href?: unknown;
            label?: unknown;
            body?: unknown;
          };
          const href = asText(block.href, 180);
          const label = asText(block.label, 80);
          if (!href || !label || !isSafeHref(href)) {
            return [];
          }
          return [
            {
              href,
              label,
              body: asText(block.body, 240),
            },
          ];
        })
      : undefined;
    const primaryHref = asText(row.primaryHref, 180);
    const secondaryHref = asText(row.secondaryHref, 180);
    return [
      {
        type,
        eyebrow: asText(row.eyebrow, 120) || undefined,
        title: asText(row.title, 160) || undefined,
        emphasis: asText(row.emphasis, 80) || undefined,
        body: asText(row.body, 1200) || undefined,
        mediaLabel: asText(row.mediaLabel, 120) || undefined,
        media: row.media,
        paragraphs,
        stages,
        related,
        primaryLabel: asText(row.primaryLabel, 40) || undefined,
        primaryHref:
          primaryHref && isSafeInternalPath(primaryHref)
            ? primaryHref
            : undefined,
        secondaryLabel: asText(row.secondaryLabel, 40) || undefined,
        secondaryHref:
          secondaryHref && isSafeInternalPath(secondaryHref)
            ? secondaryHref
            : undefined,
      },
    ];
  });
}
