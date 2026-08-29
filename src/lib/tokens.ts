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
  "border",
  "accent-strong",
  "accent-muted",
  "inverse-background",
  "inverse-foreground",
] as const;

export type TokenRole = (typeof TOKEN_ROLES)[number];

export function isTokenRole(value: string): value is TokenRole {
  return (TOKEN_ROLES as readonly string[]).includes(value);
}

export const TYPE_SCALE = [
  "display",
  "hero",
  "h1",
  "h2",
  "h3",
  "body",
  "body-small",
  "label",
  "nav",
  "meta",
] as const;

export const SPACE_SCALE = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "8",
  "10",
  "12",
  "16",
  "20",
  "24",
] as const;

export const RADIUS_SCALE = ["none", "sm", "md", "full"] as const;

export const SHADOW_SCALE = ["none", "hairline", "low", "mid"] as const;

export const CONTAINER_TOKENS = ["content", "content-wide", "gutter"] as const;

export const BREAKPOINTS = {
  sm: "40rem",
  md: "48rem",
  lg: "64rem",
  xl: "80rem",
} as const;

export const MOTION_DURATION = [
  "instant",
  "fast",
  "default",
  "reveal",
  "slow",
] as const;

export const MOTION_EASING = ["standard", "out", "in"] as const;

export const Z_LAYERS = [
  "base",
  "raised",
  "sticky",
  "header",
  "overlay",
  "skip",
  "modal",
] as const;

export const DESIGN_TOKEN_GROUPS = [
  "typography",
  "spacing",
  "radius",
  "borders",
  "shadows",
  "containers",
  "breakpoints",
  "motion-duration",
  "motion-easing",
  "z-index",
  "focus",
] as const;

export type DesignTokenGroup = (typeof DESIGN_TOKEN_GROUPS)[number];
