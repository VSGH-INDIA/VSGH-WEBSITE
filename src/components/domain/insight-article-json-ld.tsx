import type { InsightArticle } from "@/content/insight-articles";
import { absoluteUrl } from "@/lib/seo";
import { SITE_NAME, SITE_ORIGIN } from "@/lib/site";

export function InsightArticleJsonLd({ article }: { article: InsightArticle }) {
  if (article.status !== "published") {
    return null;
  }

  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Article",
        headline: article.title,
        description: article.description || article.summary,
        url: absoluteUrl(`/insights/${article.slug}`),
        isPartOf: {
          "@type": "WebSite",
          name: SITE_NAME,
          url: SITE_ORIGIN,
        },
        ...(article.publicationDate
          ? { datePublished: article.publicationDate }
          : {}),
        ...(article.author
          ? { author: { "@type": "Person", name: article.author } }
          : { author: { "@type": "Organization", name: SITE_NAME } }),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: SITE_ORIGIN,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Insights",
            item: absoluteUrl("/insights"),
          },
          {
            "@type": "ListItem",
            position: 3,
            name: article.title,
            item: absoluteUrl(`/insights/${article.slug}`),
          },
        ],
      },
    ],
  };

  const json = JSON.stringify(data).replace(/</g, "\\u003c");

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}
