import { describe, expect, it } from "vitest";
import { MIN_SECRET_LENGTH } from "@/lib/security-headers";
import {
  authorizePreviewAccess,
  previewExitUrl,
  previewSecretFromRequest,
  sameOriginPathUrl,
} from "@/sanity/preview-auth";
import {
  ABOUT_PAGE_PREVIEW_QUERY,
  ABOUT_PAGE_QUERY,
  CAPABILITY_PAGE_PREVIEW_QUERY,
  CAPABILITY_PAGE_QUERY,
  HOMEPAGE_PREVIEW_QUERY,
  HOMEPAGE_QUERY,
} from "@/sanity/queries";
import { canSetPublished, VSGH_ROLE_IDS } from "@/sanity/rbac";
import { parseRevalidatePayload } from "@/sanity/revalidate";

const secret = "a".repeat(MIN_SECRET_LENGTH);

describe("publication filtering", () => {
  it("keeps public GROQ on lifecycle == published", () => {
    expect(CAPABILITY_PAGE_QUERY).toContain('lifecycle == "published"');
    expect(ABOUT_PAGE_QUERY).toContain('lifecycle == "published"');
    expect(HOMEPAGE_QUERY).toContain('lifecycle == "published"');
  });

  it("does not require published lifecycle for preview GROQ", () => {
    expect(CAPABILITY_PAGE_PREVIEW_QUERY).not.toContain(
      'lifecycle == "published"',
    );
    expect(ABOUT_PAGE_PREVIEW_QUERY).not.toContain('lifecycle == "published"');
    expect(HOMEPAGE_PREVIEW_QUERY).not.toContain('lifecycle == "published"');
    expect(CAPABILITY_PAGE_PREVIEW_QUERY).toContain('lifecycle != "archived"');
  });
});

describe("preview authorization", () => {
  it("rejects missing, short, and invalid secrets", () => {
    expect(authorizePreviewAccess(secret, undefined, "/contact")).toEqual({
      ok: false,
      status: 501,
    });
    expect(authorizePreviewAccess("short", secret, "/contact")).toEqual({
      ok: false,
      status: 401,
    });
    expect(authorizePreviewAccess("b".repeat(32), secret, "/contact")).toEqual({
      ok: false,
      status: 401,
    });
  });

  it("rejects disallowed paths after a valid secret", () => {
    expect(authorizePreviewAccess(secret, secret, "/admin")).toEqual({
      ok: false,
      status: 401,
    });
    expect(authorizePreviewAccess(secret, secret, "//evil.example")).toEqual({
      ok: false,
      status: 401,
    });
  });

  it("accepts header or query secret and same-origin allowlisted redirects", () => {
    expect(authorizePreviewAccess(secret, secret, "/contact")).toEqual({
      ok: true,
      path: "/contact",
    });
    const url = new URL("https://www.vsgh.com/api/draft?path=/contact");
    const headerRequest = new Request(url, {
      headers: { "x-vsgh-preview-secret": secret },
    });
    expect(previewSecretFromRequest(headerRequest, url)).toBe(secret);
    expect(
      sameOriginPathUrl("https://www.vsgh.com/api/draft", "/contact")?.href,
    ).toBe("https://www.vsgh.com/contact");
    expect(
      previewExitUrl(
        "https://www.vsgh.com/api/draft/disable?next=https://evil.example",
      ),
    ).toEqual(new URL("https://www.vsgh.com/"));
  });
});

describe("RBAC helpers", () => {
  it("allows only publisher or administrator to set published", () => {
    expect(canSetPublished({ roles: [{ name: VSGH_ROLE_IDS.editor }] })).toBe(
      false,
    );
    expect(
      canSetPublished({ roles: [{ name: VSGH_ROLE_IDS.publisher }] }),
    ).toBe(true);
    expect(canSetPublished({ roles: [{ name: "administrator" }] })).toBe(true);
  });
});

describe("webhook path allowlist", () => {
  it("still rejects unallowlisted revalidate paths", () => {
    expect(parseRevalidatePayload(JSON.stringify({ path: "/admin" }))).toEqual({
      ok: false,
      status: 400,
    });
  });
});
