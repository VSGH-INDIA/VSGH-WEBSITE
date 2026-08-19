import { SITE_NAME, SITE_ORIGIN } from "@/lib/site";
import { absoluteUrl } from "@/lib/seo";

export function DomainJsonLd({
  title,
  description,
  path,
  navLabel,
  parentName,
  parentPath,
}: {
  title: string;
  description: string;
  path: string;
  navLabel: string;
  parentName: string;
  parentPath: string;
}) {
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        name: `${title} · ${SITE_NAME}`,
        description,
        url: absoluteUrl(path),
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
            name: parentName,
            item: absoluteUrl(parentPath),
          },
          {
            "@type": "ListItem",
            position: 3,
            name: navLabel,
            item: absoluteUrl(path),
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
