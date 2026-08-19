import { describe, expect, it } from "vitest";
import { PRIMARY_NAV } from "./navigation";

describe("WEB-081 primary navigation", () => {
  it("uses the nine approved V1 labels and paths", () => {
    expect(PRIMARY_NAV.map((item) => item.label)).toEqual([
      "About",
      "Materials",
      "Technology",
      "Applications",
      "Research",
      "Sustainability",
      "Insights",
      "Careers",
      "Contact",
    ]);
    expect(PRIMARY_NAV.map((item) => item.href)).toEqual([
      "/about",
      "/materials",
      "/technology",
      "/applications",
      "/research",
      "/sustainability",
      "/insights",
      "/careers",
      "/contact",
    ]);
  });
});
