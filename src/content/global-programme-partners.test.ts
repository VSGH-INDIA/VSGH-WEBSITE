import { describe, expect, it } from "vitest";
import { normalizeGlobalProgrammePartners } from "@/content/global-programme-partners";

const partner = {
  _id: "partner.example",
  slug: "example-industries",
  companyName: "Example Industries",
  overview: "An approved public company profile.",
  logo: {
    src: "https://cdn.sanity.io/images/example/production/logo.png",
    alt: "Example Industries logo",
    approvalStatus: "approved",
    visibility: "public",
  },
  services: ["Precision engineering", "Programme support"],
  contact: {
    name: "Public Contact",
    role: "Business development",
    email: "contact@example.com",
    phone: "+91 80 1234 5678",
  },
  locations: [{ label: "India", address: "Bengaluru, India" }],
  website: "https://example.com",
};

describe("global programme partner normalization", () => {
  it("keeps a complete, approved public profile", () => {
    expect(normalizeGlobalProgrammePartners([partner])).toMatchObject([
      {
        slug: "example-industries",
        companyName: "Example Industries",
        website: "https://example.com/",
      },
    ]);
  });

  it("rejects profiles with incomplete public details", () => {
    expect(
      normalizeGlobalProgrammePartners([
        { ...partner, contact: { ...partner.contact, email: "not-an-email" } },
      ]),
    ).toEqual([]);
  });

  it("rejects non-public logos and unsafe external links", () => {
    expect(
      normalizeGlobalProgrammePartners([
        {
          ...partner,
          logo: { ...partner.logo, visibility: "internal" },
          website: "javascript:alert(1)",
        },
      ]),
    ).toEqual([]);
  });
});
