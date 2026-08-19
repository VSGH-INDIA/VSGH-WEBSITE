import { describe, expect, it } from "vitest";
import {
  ABOUT_NAV,
  isPrimaryNavCurrent,
  isPublishedPath,
  PRIMARY_NAV,
} from "./navigation";

describe("WEB-081 primary navigation", () => {
  it("uses the nine approved V1 labels", () => {
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
  });

  it("lands About on the implemented company page until /about exists", () => {
    expect(PRIMARY_NAV[0]?.href).toBe("/about/company");
  });
});

describe("WEB-081 About domain", () => {
  it("implements exactly the seven approved child paths", () => {
    expect(ABOUT_NAV.map((item) => item.href)).toEqual([
      "/about/company",
      "/about/vision",
      "/about/mission",
      "/about/leadership",
      "/about/scientific-integrity",
      "/about/quality",
      "/about/facilities",
    ]);
  });
});

describe("nav helpers", () => {
  it("treats About children as published and current under About", () => {
    expect(isPublishedPath("/about/vision")).toBe(true);
    expect(isPublishedPath("/materials")).toBe(false);
    expect(isPrimaryNavCurrent("/about/company", "/about/quality")).toBe(true);
    expect(isPrimaryNavCurrent("/materials", "/about/company")).toBe(false);
  });
});
