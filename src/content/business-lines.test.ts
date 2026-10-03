import { describe, expect, it } from "vitest";
import {
  BUSINESS_LINE_PATHS,
  BUSINESS_LINE_SLUGS,
  businessLineForSlug,
  businessLinePathForOverviewId,
  businessLines,
  isBusinessLineSlug,
} from "@/content/business-lines";

describe("business-line landing content", () => {
  it("defines the three approved landing pages", () => {
    expect(businessLines).toHaveLength(3);
    expect(businessLines.map((line) => line.slug)).toEqual(BUSINESS_LINE_SLUGS);
    expect(businessLines.map((line) => line.path)).toEqual(BUSINESS_LINE_PATHS);
  });

  it("keeps public CTAs on safe first-party contact routes", () => {
    for (const line of businessLines) {
      expect(line.cta.primary.href).toMatch(/^\/contact\?enquiry=[a-z0-9-]+$/);
      expect(line.focus).toHaveLength(3);
      expect(line.connectionFlow).toHaveLength(3);
      expect(line.relatedSlugs).toHaveLength(2);
    }
  });

  it("maps overview actions to specific business-line pages", () => {
    expect(businessLinePathForOverviewId("aerospace-systems")).toBe(
      "/business/aerospace-systems-components",
    );
    expect(businessLinePathForOverviewId("imports-exports")).toBe(
      "/business/imports-exports",
    );
    expect(businessLinePathForOverviewId("global-programmes")).toBe(
      "/business/global-programmes",
    );
    expect(isBusinessLineSlug("not-a-business-line")).toBe(false);
    expect(businessLineForSlug("imports-exports")?.navLabel).toBe(
      "Imports & exports",
    );
  });
});
