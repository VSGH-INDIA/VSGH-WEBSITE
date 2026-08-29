import { describe, expect, it } from "vitest";
import { isPublicMedia, normalizeMediaAsset, publicMediaOrNull } from "./media";

const approvedPublic = {
  src: "https://cdn.sanity.io/images/9fys33s1/production/abc-800x600.jpg",
  altText: "Approved public photograph of a materials facility exterior.",
  caption: "Facility exterior",
  credit: "VSGH",
  usage: "hero",
  approvalStatus: "approved",
  visibility: "public",
  aspectRatio: "16/9",
  cropMode: "cover",
  width: 1600,
  height: 900,
};

describe("media model", () => {
  it("normalizes a complete public asset", () => {
    const asset = normalizeMediaAsset(approvedPublic);
    expect(asset?.altText).toContain("facility");
    expect(asset?.approvalStatus).toBe("approved");
    expect(isPublicMedia(asset)).toBe(true);
  });

  it("rejects unpublished or unapproved imagery for public render", () => {
    expect(
      publicMediaOrNull({ ...approvedPublic, approvalStatus: "draft" }),
    ).toBeNull();
    expect(
      publicMediaOrNull({ ...approvedPublic, visibility: "internal" }),
    ).toBeNull();
    expect(publicMediaOrNull({ ...approvedPublic, altText: "" })).toBeNull();
    expect(
      publicMediaOrNull({
        ...approvedPublic,
        src: "https://evil.example/leak.jpg",
      }),
    ).toBeNull();
  });

  it("accepts local paths and Sanity CDN only", () => {
    expect(
      publicMediaOrNull({
        ...approvedPublic,
        src: "/media/approved-exterior.jpg",
      })?.src,
    ).toBe("/media/approved-exterior.jpg");
    expect(
      publicMediaOrNull({
        ...approvedPublic,
        src: "//cdn.sanity.io/images/x.jpg",
      }),
    ).toBeNull();
  });
});
