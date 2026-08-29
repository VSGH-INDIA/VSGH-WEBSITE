import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import {
  BREAKPOINTS,
  CONTAINER_TOKENS,
  DESIGN_TOKEN_GROUPS,
  MOTION_DURATION,
  MOTION_EASING,
  RADIUS_SCALE,
  SHADOW_SCALE,
  SPACE_SCALE,
  TYPE_SCALE,
  Z_LAYERS,
  isTokenRole,
} from "./tokens";

const tokensCss = readFileSync("src/styles/tokens.css", "utf8");

describe("isTokenRole", () => {
  it("accepts WEB-065 and Rev A semantic roles", () => {
    expect(isTokenRole("background")).toBe(true);
    expect(isTokenRole("brand-accent")).toBe(true);
    expect(isTokenRole("inverse-foreground")).toBe(true);
    expect(isTokenRole("border")).toBe(true);
  });

  it("rejects unknown roles", () => {
    expect(isTokenRole("neon")).toBe(false);
  });
});

describe("design tokens V2", () => {
  it("centralizes the required token groups", () => {
    expect(DESIGN_TOKEN_GROUPS).toEqual([
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
    ]);
    expect(TYPE_SCALE).toContain("display");
    expect(SPACE_SCALE).toContain("8");
    expect(RADIUS_SCALE).toContain("sm");
    expect(SHADOW_SCALE).toContain("hairline");
    expect(CONTAINER_TOKENS).toContain("content-wide");
    expect(BREAKPOINTS.xl).toBe("80rem");
    expect(MOTION_DURATION).toContain("reveal");
    expect(MOTION_EASING).toContain("standard");
    expect(Z_LAYERS).toContain("header");
  });

  it("keeps CSS custom properties for the V2 scales", () => {
    expect(tokensCss).toContain("--vsgh-text-display");
    expect(tokensCss).toContain("--vsgh-space-8");
    expect(tokensCss).toContain("--vsgh-radius-sm");
    expect(tokensCss).toContain("--vsgh-border-width");
    expect(tokensCss).toContain("--vsgh-shadow-hairline");
    expect(tokensCss).toContain("--vsgh-content-wide");
    expect(tokensCss).toContain("--vsgh-bp-xl");
    expect(tokensCss).toContain("--vsgh-duration-reveal");
    expect(tokensCss).toContain("--vsgh-ease-out");
    expect(tokensCss).toContain("--vsgh-z-header");
    expect(tokensCss).toContain("--vsgh-focus-ring");
    expect(tokensCss).toContain("prefers-reduced-motion: reduce");
  });
});
