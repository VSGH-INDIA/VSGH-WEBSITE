import { isConfiguredSecret } from "@/lib/security-headers";
import { isRevalidatablePath, secretsEqual } from "@/sanity/revalidate";

export type PreviewAuthResult =
  { ok: true; path: string } | { ok: false; status: 400 | 401 | 501 };

export function previewSecretFromRequest(request: Request, url: URL): string {
  const header = request.headers.get("x-vsgh-preview-secret") ?? "";
  if (header) {
    return header;
  }
  const bearer = request.headers.get("authorization");
  if (bearer?.startsWith("Bearer ")) {
    return bearer.slice("Bearer ".length).trim();
  }
  return url.searchParams.get("secret") ?? "";
}

export function authorizePreviewAccess(
  providedSecret: string,
  expectedSecret: string | undefined,
  path: string,
): PreviewAuthResult {
  if (!isConfiguredSecret(expectedSecret)) {
    return { ok: false, status: 501 };
  }
  if (!secretsEqual(providedSecret, expectedSecret)) {
    return { ok: false, status: 401 };
  }
  if (!isRevalidatablePath(path)) {
    return { ok: false, status: 401 };
  }
  return { ok: true, path };
}

export function sameOriginPathUrl(
  requestUrl: string,
  path: string,
): URL | null {
  const url = new URL(requestUrl);
  const destination = new URL(path, url.origin);
  if (destination.origin !== url.origin) {
    return null;
  }
  return destination;
}

export function previewExitUrl(requestUrl: string): URL {
  return new URL("/", new URL(requestUrl).origin);
}
