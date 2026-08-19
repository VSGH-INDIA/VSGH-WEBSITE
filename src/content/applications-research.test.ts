import { describe, expect, it } from "vitest";
import { applicationsPageList, applicationsPages } from "./applications";
import { researchPageList, researchPages } from "./research";

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
  "flight proven",
];

describe("applications and research copy", () => {
  it("covers the WEB-081 Applications and Research trees", () => {
    expect(applicationsPageList.map((page) => page.path)).toEqual([
      "/applications/aerospace",
      "/applications/defense",
      "/applications/space",
      "/applications/advanced-industrial",
    ]);
    expect(researchPageList.map((page) => page.path)).toEqual([
      "/research/overview",
      "/research/research-areas",
      "/research/publications",
    ]);
  });

  it("uses unique SEO titles", () => {
    const titles = [
      ...applicationsPageList.map((page) => page.seoTitle),
      ...researchPageList.map((page) => page.seoTitle),
    ];
    expect(new Set(titles).size).toBe(titles.length);
  });

  it("does not include unsupported claim markers", () => {
    const blob = JSON.stringify({
      applicationsPages,
      researchPages,
    }).toLowerCase();
    for (const term of forbidden) {
      if (term === "MPa") {
        expect(/(^|[^a-z])mpa([^a-z]|$)/.test(blob)).toBe(false);
        continue;
      }
      expect(blob.includes(term.toLowerCase())).toBe(false);
    }
  });

  it("keeps publications empty of invented records", () => {
    expect(researchPages.publications.lede.toLowerCase()).toContain("empty");
  });
});
