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
  const crumbs = [
    {
      "@type": "ListItem" as const,
      position: 1,
      name: "Home",
      item: SITE_ORIGIN,
    },
    ...(parentPath !== "/"
      ? [
          {
            "@type": "ListItem" as const,
            position: 2,
            name: parentName,
            item: absoluteUrl(parentPath),
          },
        ]
      : []),
    {
      "@type": "ListItem" as const,
      position: parentPath !== "/" ? 3 : 2,
      name: navLabel,
      item: absoluteUrl(path),
    },
  ];

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
        itemListElement: crumbs,
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
