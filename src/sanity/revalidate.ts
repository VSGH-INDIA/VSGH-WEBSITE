import { createHash, timingSafeEqual } from "node:crypto";
import { IMPLEMENTED_ROUTES } from "@/lib/navigation";
import { isSafeInternalPath } from "@/lib/safe-url";

export const MAX_REVALIDATE_BODY_BYTES = 65_536;

export function secretsEqual(provided: string, expected: string): boolean {
  const left = createHash("sha256").update(provided).digest();
  const right = createHash("sha256").update(expected).digest();
  return timingSafeEqual(left, right);
}

export function isRevalidatablePath(path: string): boolean {
  return (
    isSafeInternalPath(path) &&
    (IMPLEMENTED_ROUTES as readonly string[]).includes(path)
  );
}

export type RevalidateParseResult =
  { ok: true; path?: string } | { ok: false; status: 400 | 413 };

export function parseRevalidatePayload(raw: string): RevalidateParseResult {
  if (raw.length > MAX_REVALIDATE_BODY_BYTES) {
    return { ok: false, status: 413 };
  }
  const trimmed = raw.trim();
  if (!trimmed) {
    return { ok: true };
  }
  let body: unknown;
  try {
    body = JSON.parse(trimmed) as unknown;
  } catch {
    return { ok: false, status: 400 };
  }
  if (body === null || typeof body !== "object" || Array.isArray(body)) {
    return { ok: false, status: 400 };
  }
  if (!("path" in body)) {
    return { ok: true };
  }
  const path = (body as { path: unknown }).path;
  if (typeof path !== "string" || !isRevalidatablePath(path)) {
    return { ok: false, status: 400 };
  }
  return { ok: true, path };
}
