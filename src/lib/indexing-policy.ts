/**
 * Production indexing gate.
 * Authorized with robots Allow and a published-route sitemap.
 * Preview, draft APIs, and the preview proxy remain noindex.
 */
export const PUBLIC_INDEXING_ENABLED = true;

export const PREVIEW_ROBOTS_HEADER = "noindex, nofollow, noarchive";
