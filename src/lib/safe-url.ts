const INTERNAL_PATH = /^\/[a-z0-9/_-]*$/i;
const FRAGMENT = /^#[a-z0-9_-]+$/i;
const QUERY_PAIR = /^[a-z0-9_-]+=[a-z0-9_-]+$/i;

export function isSafeInternalPath(path: string): boolean {
  if (typeof path !== "string" || path.length === 0 || path.length > 180) {
    return false;
  }
  if (!path.startsWith("/") || path.startsWith("//")) {
    return false;
  }
  if (
    path.includes("\\") ||
    path.includes("..") ||
    path.includes("://") ||
    (path.match(/\?/g)?.length ?? 0) > 1 ||
    (path.match(/#/g)?.length ?? 0) > 1
  ) {
    return false;
  }
  if (/^[a-z][a-z0-9+.-]*:/i.test(path)) {
    return false;
  }
  const [pathAndQuery, fragment] = path.split("#", 2);
  if (
    !pathAndQuery ||
    (fragment !== undefined && !FRAGMENT.test(`#${fragment}`))
  ) {
    return false;
  }
  const [pathname, query] = pathAndQuery.split("?", 2);
  if (!pathname || !INTERNAL_PATH.test(pathname)) {
    return false;
  }
  return (
    query === undefined ||
    (query.length > 0 &&
      query.split("&").every((pair) => QUERY_PAIR.test(pair)))
  );
}

export function isSafeHref(href: string): boolean {
  if (typeof href !== "string" || href.length === 0 || href.length > 180) {
    return false;
  }
  if (href.startsWith("#")) {
    return FRAGMENT.test(href);
  }
  return isSafeInternalPath(href);
}

export function safeInternalPath(
  path: string | undefined,
  fallback: string,
): string {
  return path && isSafeInternalPath(path) ? path : fallback;
}

export function safeHref(href: string | undefined, fallback: string): string {
  return href && isSafeHref(href) ? href : fallback;
}
