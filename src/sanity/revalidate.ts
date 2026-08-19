import { timingSafeEqual } from "node:crypto";
import { IMPLEMENTED_ROUTES } from "@/lib/navigation";

export function secretsEqual(provided: string, expected: string): boolean {
  const left = Buffer.from(provided);
  const right = Buffer.from(expected);
  if (left.length !== right.length || left.length === 0) {
    return false;
  }
  return timingSafeEqual(left, right);
}

export function isRevalidatablePath(path: string): boolean {
  return (IMPLEMENTED_ROUTES as readonly string[]).includes(path);
}
