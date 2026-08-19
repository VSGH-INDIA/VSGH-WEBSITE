import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { overlayPublishedContent } from "@/content/sanitize-cms";
import { securityHeaders } from "@/lib/security-headers";
import { parseRevalidatePayload } from "@/sanity/revalidate";

describe("security headers", () => {
  it("sets nosniff, frame denial, CSP, and production HSTS", () => {
    const local = Object.fromEntries(
      securityHeaders(false).map((header) => [header.key, header.value]),
    );
    const production = Object.fromEntries(
      securityHeaders(true).map((header) => [header.key, header.value]),
    );
    expect(local["X-Content-Type-Options"]).toBe("nosniff");
    expect(local["X-Frame-Options"]).toBe("DENY");
    expect(local["Content-Security-Policy"]).toContain(
      "frame-ancestors 'none'",
    );
    expect(local["Content-Security-Policy"]).toContain("https://cdn.sanity.io");
    expect(local["Strict-Transport-Security"]).toBeUndefined();
    expect(production["Strict-Transport-Security"]).toContain("max-age=");
    expect(local["Permissions-Policy"]).toContain("camera=()");
  });
});

describe("revalidation payload", () => {
  it("allows tag-only bodies and allowlisted paths", () => {
    expect(parseRevalidatePayload("")).toEqual({ ok: true });
    expect(parseRevalidatePayload(JSON.stringify({ _id: "x" }))).toEqual({
      ok: true,
    });
    expect(
      parseRevalidatePayload(JSON.stringify({ path: "/contact" })),
    ).toEqual({ ok: true, path: "/contact" });
  });

  it("rejects unallowlisted and unsafe paths", () => {
    expect(parseRevalidatePayload("{")).toEqual({ ok: false, status: 400 });
    expect(parseRevalidatePayload(JSON.stringify({ path: "/admin" }))).toEqual({
      ok: false,
      status: 400,
    });
    expect(
      parseRevalidatePayload(JSON.stringify({ path: "//evil.example" })),
    ).toEqual({ ok: false, status: 400 });
    expect(
      parseRevalidatePayload(JSON.stringify({ path: "/applications" })),
    ).toEqual({ ok: false, status: 400 });
  });
});

describe("CMS overlay URL sanitization", () => {
  it("does not keep javascript: CTA destinations", () => {
    const fallback = {
      headline: "Fallback",
      path: "/contact",
      cta: {
        title: "Next",
        body: "Body",
        primary: { href: "/about/company", label: "Company" },
        secondary: { href: "/careers", label: "Careers" },
      },
      related: [{ href: "/insights", label: "Insights", body: "Public" }],
    };
    const page = overlayPublishedContent(fallback, {
      headline: "From CMS",
      cta: {
        title: "Next",
        body: "Body",
        primary: { href: "javascript:alert(1)", label: "X" },
        secondary: { href: "//evil.example", label: "Y" },
      },
      related: [{ href: "javascript:alert(1)", label: "Bad", body: "No" }],
    });
    expect(page.cta.primary.href).toBe("/about/company");
    expect(page.cta.secondary.href).toBe("/careers");
    expect(page.related[0]?.href).toBe("/insights");
    expect(page.headline).toBe("From CMS");
  });
});

describe("secret surface", () => {
  it("does not put CMS secrets on NEXT_PUBLIC_ names or the published client", () => {
    const envExample = readFileSync(".env.example", "utf8");
    expect(envExample).not.toMatch(/NEXT_PUBLIC_SANITY_API_READ_TOKEN/);
    expect(envExample).not.toMatch(/NEXT_PUBLIC_SANITY_REVALIDATE/);
    expect(envExample).not.toMatch(/NEXT_PUBLIC_SANITY_PREVIEW/);
    const publishedClient = readFileSync("src/sanity/client.ts", "utf8");
    const publishedFn = publishedClient.slice(
      publishedClient.indexOf("getPublishedSanityClient"),
      publishedClient.indexOf("getPreviewSanityClient"),
    );
    expect(publishedFn).toContain('perspective: "published"');
    expect(publishedFn).not.toContain("token:");
  });

  it("does not cache preview GROQ and tags published GROQ for revalidateTag", () => {
    const fetchSource = readFileSync("src/sanity/fetch.ts", "utf8");
    const previewFn = fetchSource.slice(
      fetchSource.indexOf("function previewQuery"),
      fetchSource.indexOf("export function fetchPublishedCapabilityPage"),
    );
    const publishedFn = fetchSource.slice(
      fetchSource.indexOf("async function cachedPublishedQuery"),
      fetchSource.indexOf("function previewQuery"),
    );
    expect(previewFn).toContain("getPreviewSanityClient");
    expect(previewFn).not.toContain("unstable_cache");
    expect(previewFn).not.toContain('tags: ["sanity"]');
    expect(publishedFn).toContain('tags: ["sanity"]');
    expect(publishedFn).toContain("useCdn: false");
    expect(publishedFn).not.toContain("unstable_cache");
  });
});
