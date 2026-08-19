import { draftMode } from "next/headers";
import { NextResponse } from "next/server";
import {
  authorizePreviewAccess,
  previewSecretFromRequest,
  sameOriginPathUrl,
} from "@/sanity/preview-auth";

const privateHeaders = {
  "Cache-Control": "private, no-store",
  "X-Robots-Tag": "noindex, nofollow, noarchive",
};

function jsonError(status: number) {
  return NextResponse.json({ ok: false }, { status, headers: privateHeaders });
}

async function enablePreview(request: Request, pathFromBody?: string) {
  const url = new URL(request.url);
  const path = pathFromBody ?? url.searchParams.get("path") ?? "/";
  const provided = previewSecretFromRequest(request, url);
  const authorized = authorizePreviewAccess(
    provided,
    process.env.SANITY_PREVIEW_SECRET,
    path,
  );
  if (!authorized.ok) {
    return jsonError(authorized.status);
  }
  const destination = sameOriginPathUrl(request.url, authorized.path);
  if (!destination) {
    return jsonError(401);
  }
  const draft = await draftMode();
  draft.enable();
  return NextResponse.redirect(destination, { headers: privateHeaders });
}

export async function GET(request: Request) {
  return enablePreview(request);
}

export async function POST(request: Request) {
  let path: string | undefined;
  const contentType = request.headers.get("content-type") ?? "";
  if (contentType.includes("application/json")) {
    try {
      const body = (await request.json()) as { path?: unknown };
      if (typeof body.path === "string") {
        path = body.path;
      }
    } catch {
      return jsonError(400);
    }
  }
  return enablePreview(request, path);
}
