import { describe, expect, it } from "vitest";
import { aboutPages } from "@/content/about";
import { applicationsPages } from "@/content/applications";
import { careersPage } from "@/content/careers";
import { contactPage } from "@/content/contact";
import { insightsPage } from "@/content/insights";
import { materialsPages } from "@/content/materials";
import { researchPages } from "@/content/research";
import { sustainabilityPage } from "@/content/sustainability";
import { technologyPages } from "@/content/technology";
import { IMPLEMENTED_ROUTES, isPublishedPath } from "@/lib/navigation";
import { breadcrumbItems } from "@/lib/seo";
import { SITE_ORIGIN } from "@/lib/site";

const WEB_081_PAGES = [
  "/",
  "/about/company",
  "/about/vision",
  "/about/mission",
  "/about/leadership",
  "/about/scientific-integrity",
  "/about/quality",
  "/about/facilities",
  "/materials/overview",
  "/materials/material-development",
  "/materials/metallurgy",
  "/materials/processing",
  "/materials/qualification",
  "/technology/resource-recovery",
  "/technology/purification",
  "/technology/alloy-development",
  "/technology/advanced-materials",
  "/technology/manufacturing",
  "/applications/aerospace",
  "/applications/defense",
  "/applications/space",
  "/applications/advanced-industrial",
  "/research/overview",
  "/research/research-areas",
  "/research/publications",
  "/sustainability",
  "/insights",
  "/careers",
  "/contact",
] as const;

const HOME_HREFS = [
  "/contact",
  "/applications/aerospace",
  "/research/overview",
  "/materials/overview",
  "/sustainability",
  "/about/company",
  "/about/quality",
];

function collectHrefs(value: unknown, acc: string[] = []): string[] {
  if (typeof value === "string") {
    if (value.startsWith("/") && !value.startsWith("//")) {
      acc.push(value.split("#")[0] ?? value);
    }
    return acc;
  }
  if (Array.isArray(value)) {
    for (const item of value) {
      collectHrefs(item, acc);
    }
    return acc;
  }
  if (value && typeof value === "object") {
    for (const item of Object.values(value)) {
      collectHrefs(item, acc);
    }
  }
  return acc;
}

describe("WEB-081 route inventory", () => {
  it("implements exactly the approved public pages", () => {
    expect([...IMPLEMENTED_ROUTES].sort()).toEqual([...WEB_081_PAGES].sort());
    expect(IMPLEMENTED_ROUTES).toHaveLength(29);
  });

  it("does not treat unpublished parent indexes as published", () => {
    expect(isPublishedPath("/about")).toBe(false);
    expect(isPublishedPath("/materials")).toBe(false);
    expect(isPublishedPath("/technology")).toBe(false);
    expect(isPublishedPath("/applications")).toBe(false);
    expect(isPublishedPath("/research")).toBe(false);
    expect(isPublishedPath("/insights/news")).toBe(false);
  });
});

describe("internal links", () => {
  it("only targets implemented routes", () => {
    const hrefs = collectHrefs({
      aboutPages,
      materialsPages,
      technologyPages,
      applicationsPages,
      researchPages,
      sustainabilityPage,
      insightsPage,
      careersPage,
      contactPage,
      HOME_HREFS,
    });
    for (const href of hrefs) {
      expect(isPublishedPath(href), href).toBe(true);
    }
  });
});

describe("canonical production origin", () => {
  it("uses vsghindia.com and rejects the obsolete vsgh.com host", () => {
    expect(SITE_ORIGIN).toBe("https://vsghindia.com");
    expect(SITE_ORIGIN).not.toBe("https://www.vsgh.com");
    expect(SITE_ORIGIN).not.toContain("www.vsgh.com");
    expect(SITE_ORIGIN).not.toContain("vsgh.com");
  });
});

describe("breadcrumb architecture", () => {
  it("collapses domain landings onto the first published child", () => {
    expect(
      breadcrumbItems({
        path: "/materials/overview",
        navLabel: "Overview",
        parentName: "Materials",
        parentPath: "/materials/overview",
      }).map((item) => item.item),
    ).toEqual([SITE_ORIGIN, `${SITE_ORIGIN}/materials/overview`]);
  });

  it("uses the published landing URL rather than an unpublished parent index", () => {
    const crumbs = breadcrumbItems({
      path: "/about/vision",
      navLabel: "Vision",
      parentName: "About",
      parentPath: "/about/company",
    });
    expect(crumbs.map((item) => item.item)).toEqual([
      SITE_ORIGIN,
      `${SITE_ORIGIN}/about/company`,
      `${SITE_ORIGIN}/about/vision`,
    ]);
  });
});
