import { SITE_NAME, SITE_ORIGIN } from "@/lib/site";
import { absoluteUrl, breadcrumbItems } from "@/lib/seo";

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
  const crumbs = breadcrumbItems({
    path,
    navLabel,
    parentName,
    parentPath,
  }).map((item, index) => ({
    "@type": "ListItem" as const,
    position: index + 1,
    name: item.name,
    item: item.item,
  }));

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
