import { draftMode } from "next/headers";
import { NextResponse } from "next/server";
import { isConfiguredSecret } from "@/lib/security-headers";
import { isRevalidatablePath, secretsEqual } from "@/sanity/revalidate";

export async function GET(request: Request) {
  const secret = process.env.SANITY_PREVIEW_SECRET;
  if (!isConfiguredSecret(secret)) {
    return NextResponse.json({ ok: false }, { status: 501 });
  }
  const url = new URL(request.url);
  const token = url.searchParams.get("secret") ?? "";
  const path = url.searchParams.get("path") ?? "/";
  if (!secretsEqual(token, secret) || !isRevalidatablePath(path)) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }
  const destination = new URL(path, url.origin);
  if (destination.origin !== url.origin) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }
  const draft = await draftMode();
  draft.enable();
  return NextResponse.redirect(destination);
}
