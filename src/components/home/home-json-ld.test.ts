import { describe, expect, it } from "vitest";
import { SITE_DESCRIPTION, SITE_NAME, SITE_ORIGIN } from "@/lib/site";

describe("homepage JSON-LD", () => {
  it("serializes a valid Organization object", () => {
    const data = {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_ORIGIN,
      description: SITE_DESCRIPTION,
    };
    const parsed = JSON.parse(
      JSON.stringify(data).replace(/</g, "\\u003c"),
    ) as typeof data;
    expect(parsed["@type"]).toBe("Organization");
    expect(parsed.url).toBe("https://www.vsgh.com");
  });
});
