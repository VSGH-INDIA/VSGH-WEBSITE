import { describe, expect, it } from "vitest";
import { materialsPageList, materialsPages } from "./materials";
import { technologyPageList, technologyPages } from "./technology";

const forbidden = [
  "AS9100",
  "ISO 9001",
  "flight heritage",
  "customers include",
  "patent",
  "±0.001",
  "MPa",
  "tonnes",
  "CO2",
  "certified to",
];

describe("materials and technology copy", () => {
  it("covers the WEB-081 Materials and Technology trees", () => {
    expect(materialsPageList.map((page) => page.path)).toEqual([
      "/materials/overview",
      "/materials/material-development",
      "/materials/metallurgy",
      "/materials/processing",
      "/materials/qualification",
    ]);
    expect(technologyPageList.map((page) => page.path)).toEqual([
      "/technology/resource-recovery",
      "/technology/purification",
      "/technology/alloy-development",
      "/technology/advanced-materials",
      "/technology/manufacturing",
    ]);
  });

  it("uses unique SEO titles", () => {
    const titles = [
      ...materialsPageList.map((page) => page.seoTitle),
      ...technologyPageList.map((page) => page.seoTitle),
    ];
    expect(new Set(titles).size).toBe(titles.length);
  });

  it("does not include unsupported technical claim markers", () => {
    const blob = JSON.stringify({
      materialsPages,
      technologyPages,
    }).toLowerCase();
    for (const term of forbidden) {
      expect(blob.includes(term.toLowerCase())).toBe(false);
    }
  });
});
