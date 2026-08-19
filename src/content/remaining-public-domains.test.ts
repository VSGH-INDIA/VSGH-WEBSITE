import { describe, expect, it } from "vitest";
import { careerVacancies, careersPage } from "./careers";
import { contactPage } from "./contact";
import { insightArticles, insightsPage } from "./insights";
import { sustainabilityPage } from "./sustainability";

const forbidden = [
  "AS9100",
  "ISO 9001",
  "flight heritage",
  "customers include",
  "patent",
  "±0.001",
  "tonnes",
  "certified to",
  "flight proven",
  "carbon neutrality",
  "net-zero",
  "your message has been sent",
];

describe("remaining public domain copy", () => {
  it("covers the WEB-081 leaf routes", () => {
    expect(sustainabilityPage.path).toBe("/sustainability");
    expect(insightsPage.path).toBe("/insights");
    expect(careersPage.path).toBe("/careers");
    expect(contactPage.path).toBe("/contact");
  });

  it("uses unique SEO titles", () => {
    const titles = [
      sustainabilityPage.seoTitle,
      insightsPage.seoTitle,
      careersPage.seoTitle,
      contactPage.seoTitle,
    ];
    expect(new Set(titles).size).toBe(titles.length);
  });

  it("keeps insights and careers lists empty", () => {
    expect(insightArticles).toEqual([]);
    expect(careerVacancies).toEqual([]);
    expect(insightsPage.emptyState?.title).toBe(
      "Insights are being developed.",
    );
  });

  it("does not include unsupported claim markers", () => {
    const blob = JSON.stringify({
      sustainabilityPage,
      insightsPage,
      insightArticles,
      careersPage,
      careerVacancies,
      contactPage,
    }).toLowerCase();
    for (const term of forbidden) {
      expect(blob.includes(term.toLowerCase())).toBe(false);
    }
    expect(/@[\w.-]+\.[a-z]{2,}/i.test(blob)).toBe(false);
    expect(/\+?\d[\d\s().-]{7,}\d/.test(blob)).toBe(false);
  });
});
