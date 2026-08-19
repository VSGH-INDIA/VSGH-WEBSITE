import { safeHref, safeInternalPath } from "@/lib/safe-url";
import type { PageCta, RelatedLink } from "@/content/types";

export function overlayPublishedContent<T extends object>(
  fallback: T,
  incoming: Partial<T> | null,
): T {
  if (!incoming) {
    return fallback;
  }
  const next = { ...fallback };
  for (const key of Object.keys(fallback) as (keyof T)[]) {
    if (String(key).startsWith("_")) {
      continue;
    }
    const value = incoming[key];
    if (value !== undefined && value !== null) {
      next[key] = value as T[keyof T];
    }
  }
  return sanitizeCmsUrls(next, fallback);
}

export function sanitizeCmsUrls<T extends object>(page: T, fallback: T): T {
  const result = { ...page } as T & {
    cta?: PageCta;
    related?: RelatedLink[];
    path?: string;
    parentPath?: string;
  };
  const source = fallback as T & {
    cta?: PageCta;
    related?: RelatedLink[];
    path?: string;
    parentPath?: string;
  };

  if (typeof result.path === "string") {
    result.path = safeInternalPath(result.path, source.path ?? "/");
  }
  if (typeof result.parentPath === "string") {
    result.parentPath = safeInternalPath(
      result.parentPath,
      source.parentPath ?? "/",
    );
  }

  if (result.cta && source.cta) {
    result.cta = {
      ...result.cta,
      primary: {
        ...result.cta.primary,
        href: safeHref(result.cta.primary?.href, source.cta.primary.href),
      },
      secondary: {
        ...result.cta.secondary,
        href: safeHref(result.cta.secondary?.href, source.cta.secondary.href),
      },
    };
  }

  if (Array.isArray(result.related)) {
    result.related = result.related.map((item, index) => ({
      ...item,
      href: safeHref(item.href, source.related?.[index]?.href ?? "/"),
    }));
  }

  return result;
}
