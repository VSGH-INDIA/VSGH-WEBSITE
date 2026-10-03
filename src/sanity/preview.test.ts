import { describe, expect, it } from "vitest";
import { MIN_SECRET_LENGTH } from "@/lib/security-headers";
import { SITE_ORIGIN } from "@/lib/site";
import {
  authorizePreviewAccess,
  previewExitUrl,
  previewSecretFromRequest,
  sameOriginPathUrl,
} from "@/sanity/preview-auth";
import {
  ABOUT_PAGE_PREVIEW_QUERY,
  ABOUT_PAGE_QUERY,
  BUSINESS_PAGE_PREVIEW_QUERY,
  BUSINESS_PAGE_QUERY,
  BUSINESS_LINE_PREVIEW_QUERY,
  BUSINESS_LINE_QUERY,
  CAPABILITY_PAGE_PREVIEW_QUERY,
  CAPABILITY_PAGE_QUERY,
  HOMEPAGE_PREVIEW_QUERY,
  HOMEPAGE_QUERY,
} from "@/sanity/queries";
import { canSetPublished, VSGH_ROLE_IDS } from "@/sanity/rbac";
import { parseRevalidatePayload } from "@/sanity/revalidate";
import {
  approvedStudioOrigins,
  isApprovedStudioOrigin,
} from "@/sanity/studio-origin";

const secret = "a".repeat(MIN_SECRET_LENGTH);

describe("publication filtering", () => {
  it("keeps public GROQ on lifecycle == published", () => {
    expect(CAPABILITY_PAGE_QUERY).toContain('lifecycle == "published"');
    expect(ABOUT_PAGE_QUERY).toContain('lifecycle == "published"');
    expect(HOMEPAGE_QUERY).toContain('lifecycle == "published"');
    expect(BUSINESS_PAGE_QUERY).toContain('lifecycle == "published"');
    expect(BUSINESS_LINE_QUERY).toContain('lifecycle == "published"');
  });

  it("does not require published lifecycle for preview GROQ", () => {
    expect(CAPABILITY_PAGE_PREVIEW_QUERY).not.toContain(
      'lifecycle == "published"',
    );
    expect(ABOUT_PAGE_PREVIEW_QUERY).not.toContain('lifecycle == "published"');
    expect(HOMEPAGE_PREVIEW_QUERY).not.toContain('lifecycle == "published"');
    expect(BUSINESS_PAGE_PREVIEW_QUERY).not.toContain(
      'lifecycle == "published"',
    );
    expect(BUSINESS_LINE_PREVIEW_QUERY).not.toContain(
      'lifecycle == "published"',
    );
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
    expect(SITE_ORIGIN).toBe("https://vsghindia.com");
    expect(SITE_ORIGIN).not.toBe("https://www.vsgh.com");
    const url = new URL(`${SITE_ORIGIN}/api/draft?path=/contact`);
    const headerRequest = new Request(url, {
      headers: { "x-vsgh-preview-secret": secret },
    });
    expect(previewSecretFromRequest(headerRequest, url)).toBe(secret);
    expect(
      sameOriginPathUrl(`${SITE_ORIGIN}/api/draft`, "/contact")?.href,
    ).toBe(`${SITE_ORIGIN}/contact`);
    expect(
      previewExitUrl(
        `${SITE_ORIGIN}/api/draft/disable?next=https://evil.example`,
      ),
    ).toEqual(new URL(`${SITE_ORIGIN}/`));
  });
});

describe("Presentation Tool framing", () => {
  it("limits draft preview framing to the hosted Studio or an explicit local origin", () => {
    expect(approvedStudioOrigins(undefined, false)).toEqual([
      "https://vsgh-india-cms.sanity.studio",
    ]);
    expect(
      isApprovedStudioOrigin(
        "https://vsgh-india-cms.sanity.studio",
        undefined,
        false,
      ),
    ).toBe(true);
    expect(
      isApprovedStudioOrigin("https://evil.example", undefined, false),
    ).toBe(false);
    expect(
      isApprovedStudioOrigin("http://localhost:3333", undefined, true),
    ).toBe(true);
  });

  it("keeps the Presentation handshake secret-validated and route-allowlisted", async () => {
    const source = await import("node:fs/promises").then((fs) =>
      fs.readFile("src/app/api/draft/presentation/route.ts", "utf8"),
    );
    expect(source).toContain("validatePreviewUrl");
    expect(source).toContain("isApprovedStudioOrigin");
    expect(source).toContain("isRevalidatablePath");
    expect(source).toContain("draft.enable()");
    expect(source).toContain("private, no-store");
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
