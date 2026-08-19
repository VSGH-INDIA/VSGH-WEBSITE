import { describe, expect, it } from "vitest";
import { homeContent } from "./home";

const forbidden = [
  "AS9100",
  "ISO 9001",
  "flight heritage",
  "customers include",
  "patent",
  "±0.001",
  "tonnes",
  "CO2",
  "certified to",
];

describe("homepage copy IP safety", () => {
  it("does not include unsupported claim markers", () => {
    const blob = JSON.stringify(homeContent).toLowerCase();
    for (const term of forbidden) {
      expect(blob.includes(term.toLowerCase())).toBe(false);
    }
  });
});
