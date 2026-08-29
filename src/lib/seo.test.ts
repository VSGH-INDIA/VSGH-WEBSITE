import { existsSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { PUBLIC_INDEXING_ENABLED, robotsTxtConfig } from "@/lib/indexing";
import { IMPLEMENTED_ROUTES } from "@/lib/navigation";
import {
  catalogCoversImplementedRoutes,
  PUBLIC_ROUTE_CATALOG,
  routeSeoForPath,
} from "@/lib/route-catalog";
import { pageMetadata } from "@/lib/seo";
import { SITE_ORIGIN } from "@/lib/site";
import { publishedSitemapPaths } from "@/lib/sitemap-entries";

describe("public route SEO catalog", () => {
  it("covers every implemented public route exactly once", () => {
    expect(catalogCoversImplementedRoutes()).toBe(true);
    expect(PUBLIC_ROUTE_CATALOG).toHaveLength(IMPLEMENTED_ROUTES.length);
    const paths = PUBLIC_ROUTE_CATALOG.map((route) => route.path);
    expect(new Set(paths).size).toBe(paths.length);
    expect(paths.sort()).toEqual([...IMPLEMENTED_ROUTES].sort());
  });

  it("requires title, description, and a canonical path on every route", () => {
    for (const path of IMPLEMENTED_ROUTES) {
      const record = routeSeoForPath(path);
      expect(record, path).toBeDefined();
      expect(record?.title.length).toBeGreaterThan(2);
      expect(record?.description.length).toBeGreaterThan(20);
      expect(record?.path).toBe(path);

      const metadata = pageMetadata({
        title: record!.title,
        description: record!.description,
        path,
      });
      expect(metadata.alternates?.canonical).toBe(path);
      expect(metadata.description).toBe(record?.description);
      expect(metadata.robots).toMatchObject({
        index: PUBLIC_INDEXING_ENABLED,
        follow: PUBLIC_INDEXING_ENABLED,
      });
    }
  });
});

describe("indexing policy", () => {
  it("keeps robots.txt aligned with the indexing gate", () => {
    const robots = robotsTxtConfig();
    if (PUBLIC_INDEXING_ENABLED) {
      expect(robots.rules).toMatchObject({ allow: "/", userAgent: "*" });
      expect(robots.sitemap).toBe(`${SITE_ORIGIN}/sitemap.xml`);
    } else {
      expect(robots.rules).toMatchObject({ disallow: "/", userAgent: "*" });
      expect(robots.sitemap).toBeUndefined();
    }
  });

  it("only emits a sitemap module when indexing is authorized", () => {
    expect(existsSync("src/app/sitemap.ts")).toBe(PUBLIC_INDEXING_ENABLED);
  });

  it("sitemap helpers list published routes and never unpublished parents", () => {
    const paths = publishedSitemapPaths(["/insights/cms-pipeline-test"]);
    expect(paths).toContain("/");
    expect(paths).toContain("/contact");
    expect(paths).toContain("/insights/cms-pipeline-test");
    expect(paths).not.toContain("/about");
    expect(paths).not.toContain("/api/draft");
    expect(paths).not.toContain("/studio");
  });
});
