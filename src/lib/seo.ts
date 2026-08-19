import type { Metadata } from "next";
import { SITE_NAME, SITE_ORIGIN } from "@/lib/site";

export function pageMetadata({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}): Metadata {
  return {
    title,
    description,
    alternates: {
      canonical: path,
    },
    openGraph: {
      type: "website",
      url: path,
      siteName: SITE_NAME,
      title: `${title} · ${SITE_NAME}`,
      description,
    },
    twitter: {
      card: "summary",
      title: `${title} · ${SITE_NAME}`,
      description,
    },
    robots: {
      index: false,
      follow: false,
    },
  };
}

export function absoluteUrl(path: string): string {
  return `${SITE_ORIGIN}${path}`;
}

export function breadcrumbItems({
  path,
  navLabel,
  parentName,
  parentPath,
}: {
  path: string;
  navLabel: string;
  parentName: string;
  parentPath: string;
}): { name: string; item: string }[] {
  const home = { name: "Home", item: SITE_ORIGIN };
  if (parentPath === "/") {
    return [home, { name: navLabel, item: absoluteUrl(path) }];
  }
  if (parentPath === path) {
    return [home, { name: parentName, item: absoluteUrl(path) }];
  }
  return [
    home,
    { name: parentName, item: absoluteUrl(parentPath) },
    { name: navLabel, item: absoluteUrl(path) },
  ];
}
