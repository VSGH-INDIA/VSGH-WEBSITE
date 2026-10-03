import { existsSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

const headerPath = fileURLToPath(new URL("./site-header.tsx", import.meta.url));
const logoPath = fileURLToPath(
  new URL("../../../public/images/vsgh-india-logo.png", import.meta.url),
);

describe("VSGH header identity", () => {
  it("uses the approved VSGH logo asset rather than a generated CSS mark", () => {
    const source = readFileSync(headerPath, "utf8");

    expect(existsSync(logoPath)).toBe(true);
    expect(source).toContain('src="/images/vsgh-india-logo.png"');
    expect(source).not.toContain("clip-path:polygon");
  });
});
