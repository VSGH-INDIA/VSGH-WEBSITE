import { describe, expect, it } from "vitest";
import { isSafeHref, isSafeInternalPath } from "./safe-url";

describe("URL safety", () => {
  it("accepts implemented-style internal paths", () => {
    expect(isSafeInternalPath("/")).toBe(true);
    expect(isSafeInternalPath("/about/company")).toBe(true);
    expect(isSafeInternalPath("/contact")).toBe(true);
  });

  it("rejects protocol and protocol-relative hrefs", () => {
    expect(isSafeHref("javascript:alert(1)")).toBe(false);
    expect(isSafeHref("data:text/html,x")).toBe(false);
    expect(isSafeHref("vbscript:msg")).toBe(false);
    expect(isSafeInternalPath("//evil.example")).toBe(false);
    expect(isSafeInternalPath("/\\evil")).toBe(false);
    expect(isSafeInternalPath("/about/../contact")).toBe(false);
    expect(isSafeInternalPath("https://example.com")).toBe(false);
  });

  it("accepts same-page fragments used by the homepage", () => {
    expect(isSafeHref("#capability")).toBe(true);
    expect(isSafeHref("#")).toBe(false);
    expect(isSafeHref("#javascript:alert(1)")).toBe(false);
  });
});
