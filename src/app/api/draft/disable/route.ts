import { draftMode } from "next/headers";
import { NextResponse } from "next/server";
import { previewExitUrl } from "@/sanity/preview-auth";

export async function GET(request: Request) {
  const draft = await draftMode();
  draft.disable();
  return NextResponse.redirect(previewExitUrl(request.url), {
    headers: {
      "Cache-Control": "private, no-store",
      "X-Robots-Tag": "noindex, nofollow, noarchive",
    },
  });
}
