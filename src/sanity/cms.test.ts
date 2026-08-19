import { describe, expect, it } from "vitest";
import { isSanityConfigured } from "./env";
import {
  CAPABILITY_PAGE_QUERY,
  CAREER_VACANCIES_QUERY,
  INSIGHT_ARTICLES_QUERY,
} from "./queries";
import { isRevalidatablePath, secretsEqual } from "./revalidate";
import { schemaTypes } from "./schema";

describe("Sanity public CMS foundation", () => {
  it("treats missing or invalid project ids as unconfigured", () => {
    expect(isSanityConfigured("", "production")).toBe(false);
    expect(isSanityConfigured("unconfigured", "production")).toBe(false);
    expect(isSanityConfigured("abcdefgh", "production")).toBe(true);
  });

  it("registers the public document types", () => {
    expect(schemaTypes.map((type) => type.name)).toEqual([
      "publicImage",
      "emptyState",
      "homepage",
      "aboutPage",
      "capabilityPage",
      "contactPage",
      "insightArticle",
      "careerVacancy",
    ]);
  });

  it("only revalidates implemented WEB-081 paths", () => {
    expect(isRevalidatablePath("/materials/overview")).toBe(true);
    expect(isRevalidatablePath("/applications")).toBe(false);
    expect(isRevalidatablePath("//evil.example")).toBe(false);
    expect(secretsEqual("abc", "abc")).toBe(true);
    expect(secretsEqual("abc", "abd")).toBe(false);
  });

  it("requires published lifecycle in public GROQ", () => {
    expect(CAPABILITY_PAGE_QUERY).toContain('lifecycle == "published"');
    expect(INSIGHT_ARTICLES_QUERY).toContain('lifecycle == "published"');
    expect(CAREER_VACANCIES_QUERY).toContain('lifecycle == "published"');
  });
});
