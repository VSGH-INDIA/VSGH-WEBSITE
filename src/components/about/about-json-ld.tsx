import type { AboutPageContent } from "@/content/about";
import { SITE_NAME, SITE_ORIGIN } from "@/lib/site";
import { absoluteUrl } from "@/lib/seo";

export function AboutJsonLd({ page }: { page: AboutPageContent }) {
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        name: `${page.seoTitle} · ${SITE_NAME}`,
        description: page.description,
        url: absoluteUrl(page.path),
        isPartOf: {
          "@type": "WebSite",
          name: SITE_NAME,
          url: SITE_ORIGIN,
        },
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
            name: "About",
            item: absoluteUrl("/about/company"),
          },
          {
            "@type": "ListItem",
            position: 3,
            name: page.navLabel,
            item: absoluteUrl(page.path),
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
