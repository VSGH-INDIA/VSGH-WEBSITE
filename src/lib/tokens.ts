export const TOKEN_ROLES = [
  "background",
  "surface",
  "elevated-surface",
  "primary-text",
  "secondary-text",
  "brand-accent",
  "action",
  "success",
  "warning",
  "error",
  "focus",
] as const;

export type TokenRole = (typeof TOKEN_ROLES)[number];

export function isTokenRole(value: string): value is TokenRole {
  return (TOKEN_ROLES as readonly string[]).includes(value);
}
