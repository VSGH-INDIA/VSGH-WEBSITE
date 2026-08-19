import { describe, expect, it } from "vitest";
import { aboutPageList, aboutPages } from "./about";

const forbidden = [
  "AS9100",
  "ISO 9001",
  "flight heritage",
  "customers include",
  "patent",
  "±0.001",
  "tonnes",
  "CO2",
  "certified to",
];

describe("about content", () => {
  it("covers the seven WEB-081 About routes with unique SEO titles", () => {
    expect(aboutPageList).toHaveLength(7);
    const paths = aboutPageList.map((page) => page.path);
    expect(paths).toEqual([
      "/about/company",
      "/about/vision",
      "/about/mission",
      "/about/leadership",
      "/about/scientific-integrity",
      "/about/quality",
      "/about/facilities",
    ]);
    const titles = aboutPageList.map((page) => page.seoTitle);
    expect(new Set(titles).size).toBe(7);
  });

  it("does not include unsupported claim markers", () => {
    const blob = JSON.stringify(aboutPages).toLowerCase();
    for (const term of forbidden) {
      expect(blob.includes(term.toLowerCase())).toBe(false);
    }
  });

  it("does not invent leadership identities", () => {
    expect(aboutPages.leadership.leadershipNote?.toLowerCase()).toContain(
      "no names",
    );
  });
});
