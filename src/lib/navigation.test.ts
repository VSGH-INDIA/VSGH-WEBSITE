import { describe, expect, it } from "vitest";
import {
  ABOUT_NAV,
  APPLICATIONS_NAV,
  isPrimaryNavCurrent,
  isPublishedPath,
  MATERIALS_NAV,
  PRIMARY_NAV,
  RESEARCH_NAV,
  TECHNOLOGY_NAV,
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

  it("lands implemented domains on first published children", () => {
    expect(PRIMARY_NAV[0]?.href).toBe("/about/company");
    expect(PRIMARY_NAV[1]?.href).toBe("/materials/overview");
    expect(PRIMARY_NAV[2]?.href).toBe("/technology/resource-recovery");
    expect(PRIMARY_NAV[3]?.href).toBe("/applications/aerospace");
    expect(PRIMARY_NAV[4]?.href).toBe("/research/overview");
  });
});

describe("WEB-081 domain trees", () => {
  it("lists implemented domain children", () => {
    expect(ABOUT_NAV).toHaveLength(7);
    expect(MATERIALS_NAV).toHaveLength(5);
    expect(TECHNOLOGY_NAV).toHaveLength(5);
    expect(APPLICATIONS_NAV.map((item) => item.href)).toEqual([
      "/applications/aerospace",
      "/applications/defense",
      "/applications/space",
      "/applications/advanced-industrial",
    ]);
    expect(RESEARCH_NAV.map((item) => item.href)).toEqual([
      "/research/overview",
      "/research/research-areas",
      "/research/publications",
    ]);
  });
});

describe("nav helpers", () => {
  it("treats published domain children as current and prefetchable", () => {
    expect(isPublishedPath("/applications/aerospace")).toBe(true);
    expect(isPublishedPath("/research/publications")).toBe(true);
    expect(isPublishedPath("/contact")).toBe(false);
    expect(
      isPrimaryNavCurrent("/applications/aerospace", "/applications/space"),
    ).toBe(true);
    expect(
      isPrimaryNavCurrent("/research/overview", "/applications/aerospace"),
    ).toBe(false);
  });
});
