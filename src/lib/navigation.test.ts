import { describe, expect, it } from "vitest";
import {
  ABOUT_NAV,
  isPrimaryNavCurrent,
  isPublishedPath,
  MATERIALS_NAV,
  PRIMARY_NAV,
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
  });
});

describe("WEB-081 domain trees", () => {
  it("lists About, Materials, and Technology children", () => {
    expect(ABOUT_NAV).toHaveLength(7);
    expect(MATERIALS_NAV.map((item) => item.href)).toEqual([
      "/materials/overview",
      "/materials/material-development",
      "/materials/metallurgy",
      "/materials/processing",
      "/materials/qualification",
    ]);
    expect(TECHNOLOGY_NAV.map((item) => item.href)).toEqual([
      "/technology/resource-recovery",
      "/technology/purification",
      "/technology/alloy-development",
      "/technology/advanced-materials",
      "/technology/manufacturing",
    ]);
  });
});

describe("nav helpers", () => {
  it("treats published domain children as current and prefetchable", () => {
    expect(isPublishedPath("/materials/overview")).toBe(true);
    expect(isPublishedPath("/technology/purification")).toBe(true);
    expect(isPublishedPath("/applications/aerospace")).toBe(false);
    expect(
      isPrimaryNavCurrent("/materials/overview", "/materials/qualification"),
    ).toBe(true);
    expect(
      isPrimaryNavCurrent(
        "/technology/resource-recovery",
        "/materials/overview",
      ),
    ).toBe(false);
  });
});
