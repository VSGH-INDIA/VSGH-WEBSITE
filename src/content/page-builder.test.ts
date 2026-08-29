import { describe, expect, it } from "vitest";
import { normalizePageBuilder } from "./page-builder";

describe("page builder", () => {
  it("keeps typed blocks and drops unknown or HTML-shaped types", () => {
    const blocks = normalizePageBuilder([
      {
        _type: "introBlock",
        title: "Discipline",
        body: "Structured composition only.",
      },
      {
        _type: "rawHtml",
        body: "<script>alert(1)</script>",
      },
      {
        type: "ctaSectionBlock",
        title: "Contact",
        body: "Reach VSGH.",
        primaryLabel: "Contact",
        primaryHref: "javascript:alert(1)",
        secondaryLabel: "Insights",
        secondaryHref: "/insights",
      },
    ]);
    expect(blocks).toHaveLength(2);
    expect(blocks[0]?.type).toBe("introBlock");
    expect(blocks[1]?.primaryHref).toBeUndefined();
    expect(blocks[1]?.secondaryHref).toBe("/insights");
  });

  it("sanitizes related links", () => {
    const blocks = normalizePageBuilder([
      {
        _type: "relatedContentBlock",
        related: [
          { href: "/contact", label: "Contact", body: "Enquiry" },
          { href: "//evil.example", label: "Bad", body: "No" },
        ],
      },
    ]);
    expect(blocks[0]?.related).toEqual([
      { href: "/contact", label: "Contact", body: "Enquiry" },
    ]);
  });
});
