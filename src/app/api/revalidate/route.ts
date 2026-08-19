import { revalidatePath, revalidateTag } from "next/cache";
import { NextResponse } from "next/server";
import { isRevalidatablePath, secretsEqual } from "@/sanity/revalidate";

export async function POST(request: Request) {
  const secret = process.env.SANITY_REVALIDATE_SECRET;
  if (!secret) {
    return NextResponse.json({ ok: false }, { status: 501 });
  }
  const header = request.headers.get("x-vsgh-revalidate-secret") ?? "";
  if (!secretsEqual(header, secret)) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }

  let path = "/";
  try {
    const body = (await request.json()) as { path?: string };
    if (typeof body.path === "string") {
      path = body.path;
    }
  } catch {
    path = "/";
  }

  revalidateTag("sanity", { expire: 0 });
  if (isRevalidatablePath(path)) {
    revalidatePath(path);
  } else {
    revalidatePath("/");
  }

  return NextResponse.json({ ok: true });
}
