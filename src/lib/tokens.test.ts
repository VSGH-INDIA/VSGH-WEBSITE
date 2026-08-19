import { describe, expect, it } from "vitest";
import { isTokenRole } from "./tokens";

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
