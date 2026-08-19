import { describe, expect, it } from "vitest";
import { insightArticles } from "@/content/insight-articles";
import { normalizeInsightArticles } from "@/content/insight-articles";
import {
  INSIGHT_ARTICLES_PREVIEW_QUERY,
  INSIGHT_ARTICLES_QUERY,
} from "@/sanity/queries";

describe("insight article publication filter", () => {
  it("keeps the static fallback empty", () => {
    expect(insightArticles).toEqual([]);
  });

  it("drops draft/review/approved rows from the published normalizer", () => {
    const rows = [
      {
        slug: "cms-pipeline-test",
        title: "CMS pipeline test",
        summary: "Temporary public-content pipeline record.",
        lifecycle: "draft",
        body: [{ body: "Not for the public index." }],
      },
      {
        slug: "cms-pipeline-test",
        title: "CMS pipeline test",
        summary: "Temporary public-content pipeline record.",
        lifecycle: "published",
        body: [{ body: "Visible only after lifecycle published." }],
      },
      {
        slug: "javascript:alert",
        title: "Bad slug",
        lifecycle: "published",
      },
    ];
    const published = normalizeInsightArticles(rows, "published");
    expect(published).toHaveLength(1);
    expect(published[0]?.slug).toBe("cms-pipeline-test");
    expect(published[0]?.status).toBe("published");
    expect(published[0]?.body[0]?.body).not.toContain("<script");
  });

  it("allows non-published rows only in preview mode", () => {
    const preview = normalizeInsightArticles(
      [
        {
          slug: "cms-pipeline-test",
          title: "CMS pipeline test",
          lifecycle: "review",
          summary: "Preview only.",
        },
        {
          slug: "archived-item",
          title: "Archived",
          lifecycle: "archived",
        },
      ],
      "preview",
    );
    expect(preview.map((item) => item.slug)).toEqual(["cms-pipeline-test"]);
    expect(preview[0]?.status).toBe("draft");
  });

  it("uses published-only GROQ for the public list", () => {
    expect(INSIGHT_ARTICLES_QUERY).toContain('lifecycle == "published"');
    expect(INSIGHT_ARTICLES_PREVIEW_QUERY).not.toContain(
      'lifecycle == "published"]',
    );
    expect(INSIGHT_ARTICLES_PREVIEW_QUERY).toContain('lifecycle != "archived"');
  });
});
