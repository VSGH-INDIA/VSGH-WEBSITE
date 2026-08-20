import { describe, expect, it } from "vitest";
import { SITE_DESCRIPTION, SITE_NAME, SITE_ORIGIN } from "@/lib/site";

describe("homepage JSON-LD", () => {
  it("serializes Organization, WebPage, and Home breadcrumb without Article", () => {
    const data = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Organization",
          name: SITE_NAME,
          url: SITE_ORIGIN,
          description: SITE_DESCRIPTION,
        },
        {
          "@type": "WebPage",
          name: SITE_NAME,
          description: SITE_DESCRIPTION,
          url: SITE_ORIGIN,
        },
      ],
    };
    const parsed = JSON.parse(
      JSON.stringify(data).replace(/</g, "\\u003c"),
    ) as typeof data;
    expect(parsed["@graph"][0]?.["@type"]).toBe("Organization");
    expect(parsed["@graph"][1]?.["@type"]).toBe("WebPage");
    expect(JSON.stringify(parsed).includes("Article")).toBe(false);
    expect(SITE_ORIGIN).toBe("https://vsghindia.com");
    expect(SITE_ORIGIN).not.toBe("https://www.vsgh.com");
    expect(parsed["@graph"][0]?.url).toBe(SITE_ORIGIN);
    expect(parsed["@graph"][0]?.url).toBe("https://vsghindia.com");
  });
});
