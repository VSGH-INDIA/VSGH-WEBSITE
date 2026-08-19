import type { CapabilityPageContent } from "@/content/types";

export type InsightArticle = {
  slug: string;
  title: string;
  category: string;
  summary: string;
  publicationDate: string | null;
  author: string | null;
  status: "draft" | "published";
  body: string;
  mediaLabel: string;
  seoTitle: string;
  description: string;
};

export const insightArticles: InsightArticle[] = [];

export const insightsPage = {
  slug: "insights",
  path: "/insights",
  navLabel: "Insights",
  seoTitle: "Insights",
  description:
    "VSGH Insights is the public editorial surface for technical perspectives and company updates. No articles are published yet.",
  domain: "Insights",
  parentPath: "/",
  eyebrow: "[ Insights ] · editorial surface",
  headline: "A public record for writing that is ready to be public.",
  lede: "Insights will hold authorized articles, technical perspectives, company updates, and engineering commentary. The list is empty because nothing in that class has been approved for this site. Empty is preferable to invented posts.",
  mediaLabel: "Insights visual · placeholder",
  sections: [
    {
      title: "What this domain is for",
      body: "Future entries will carry a title, category, summary, and a publication date only when those fields are true. Authors will appear only when approved. Article JSON-LD will be added only for real published items.",
    },
    {
      title: "What will not appear by invention",
      body: "No lorem ipsum, no fabricated research, no placeholder names, no false dates, no statistics invented to fill a grid.",
    },
  ],
  emptyState: {
    eyebrow: "[ Record ]",
    title: "Insights are being developed.",
    body: "When an article is authorized for www.vsgh.com, it will appear here. Until then this page remains a structured empty state, ready for a future content release without a layout redesign.",
  },
  related: [
    {
      href: "/research/publications",
      label: "Research · publications",
      body: "The scientific public record is also empty until authorized.",
    },
    {
      href: "/about/company",
      label: "Company",
      body: "Corporate identity without an editorial feed.",
    },
  ],
  cta: {
    title: "A conversation does not require an article.",
    body: "Contact remains available for technical or corporate enquiry.",
    primary: { href: "/contact", label: "Contact VSGH" },
    secondary: { href: "/research/overview", label: "Research" },
  },
} as const satisfies CapabilityPageContent;
