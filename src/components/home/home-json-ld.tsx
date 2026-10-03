import { SITE_DESCRIPTION, SITE_NAME, SITE_ORIGIN } from "@/lib/site";

export function HomeJsonLd({
  description = SITE_DESCRIPTION,
  title = SITE_NAME,
}: {
  description?: string;
  title?: string;
}) {
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        name: SITE_NAME,
        url: SITE_ORIGIN,
        description,
      },
      {
        "@type": "WebPage",
        name: title,
        description,
        url: SITE_ORIGIN,
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
