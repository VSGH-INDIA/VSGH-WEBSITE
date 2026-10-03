import { validatePreviewUrl } from "@sanity/preview-url-secret";
import { draftMode } from "next/headers";
import { NextResponse } from "next/server";
import { previewSecurityHeaders } from "@/lib/security-headers";
import { getPreviewSanityClient } from "@/sanity/client";
import { isRevalidatablePath } from "@/sanity/revalidate";
import { isApprovedStudioOrigin } from "@/sanity/studio-origin";

const privateHeaders = {
  "Cache-Control": "private, no-store",
  "X-Robots-Tag": "noindex, nofollow, noarchive",
};

function error(status: number) {
  return NextResponse.json({ ok: false }, { status, headers: privateHeaders });
}

/**
 * Sanity Presentation Tool draft-mode handshake. The Studio issues a short-lived
 * secret; the server validates it against Sanity before enabling Next draft mode.
 * No user-controlled redirect origin is accepted.
 */
export async function GET(request: Request) {
  const client = getPreviewSanityClient();
  if (!client) return error(501);

  const preview = await validatePreviewUrl(client, request.url);
  if (
    !preview.isValid ||
    !isApprovedStudioOrigin(preview.studioOrigin) ||
    !isRevalidatablePath(preview.redirectTo ?? "/")
  ) {
    return error(401);
  }

  const studioOrigin = preview.studioOrigin;
  if (!studioOrigin) return error(401);

  const destination = new URL(preview.redirectTo ?? "/", request.url);
  if (destination.origin !== new URL(request.url).origin) return error(401);

  const draft = await draftMode();
  draft.enable();
  const response = NextResponse.redirect(destination, {
    headers: privateHeaders,
  });
  response.headers.delete("X-Frame-Options");
  response.headers.set(
    "Content-Security-Policy",
    previewSecurityHeaders(studioOrigin),
  );
  return response;
}
