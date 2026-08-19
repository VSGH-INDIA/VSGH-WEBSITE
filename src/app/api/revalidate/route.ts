import { revalidatePath, revalidateTag } from "next/cache";
import { NextResponse } from "next/server";
import { isConfiguredSecret } from "@/lib/security-headers";
import { parseRevalidatePayload, secretsEqual } from "@/sanity/revalidate";

function jsonError(status: number) {
  return NextResponse.json({ ok: false }, { status });
}

export function GET() {
  return jsonError(405);
}

export async function POST(request: Request) {
  const secret = process.env.SANITY_REVALIDATE_SECRET;
  if (!isConfiguredSecret(secret)) {
    return jsonError(501);
  }
  const header = request.headers.get("x-vsgh-revalidate-secret") ?? "";
  if (!secretsEqual(header, secret)) {
    return jsonError(401);
  }

  const raw = await request.text();
  const parsed = parseRevalidatePayload(raw);
  if (!parsed.ok) {
    return jsonError(parsed.status);
  }

  revalidateTag("sanity", { expire: 0 });
  if (parsed.path) {
    revalidatePath(parsed.path);
  }

  return NextResponse.json({ ok: true });
}
