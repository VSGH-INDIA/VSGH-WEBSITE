import { describe, expect, it } from "vitest";

function relativeLuminance(hex: string): number {
  const raw = hex.replace("#", "");
  const channels = [0, 2, 4].map((i) => {
    const value = Number.parseInt(raw.slice(i, i + 2), 16) / 255;
    return value <= 0.04045
      ? value / 12.92
      : ((value + 0.055) / 1.055) ** 2.4;
  });
  const [r, g, b] = channels;
  if (r === undefined || g === undefined || b === undefined) {
    throw new Error("Invalid hex");
  }
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

function contrast(a: string, b: string): number {
  const light = Math.max(relativeLuminance(a), relativeLuminance(b));
  const dark = Math.min(relativeLuminance(a), relativeLuminance(b));
  return (light + 0.05) / (dark + 0.05);
}

describe("design-system contrast (WCAG 2.2 AA intent)", () => {
  const background = "#080c14";
  const surface = "#0d131c";

  it("meets 4.5:1 for body and muted text on dark fields", () => {
    expect(contrast("#f4f6f8", background)).toBeGreaterThanOrEqual(4.5);
    expect(contrast("#94a3b8", background)).toBeGreaterThanOrEqual(4.5);
    expect(contrast("#94a3b8", surface)).toBeGreaterThanOrEqual(4.5);
    expect(contrast("#080c14", "#f4f6f8")).toBeGreaterThanOrEqual(4.5);
  });
});
