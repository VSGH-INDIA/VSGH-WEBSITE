import type { Metadata } from "next";
import { publicRobotsMetadata } from "@/lib/indexing";
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
  const isHome = path === "/";
  return {
    title: isHome ? { absolute: title } : title,
    description,
    alternates: {
      canonical: path,
    },
    openGraph: {
      type: "website",
      url: path,
      siteName: SITE_NAME,
      title: isHome ? title : `${title} · ${SITE_NAME}`,
      description,
    },
    twitter: {
      card: "summary",
      title: isHome ? title : `${title} · ${SITE_NAME}`,
      description,
    },
    robots: publicRobotsMetadata(),
  };
}

export function absoluteUrl(path: string): string {
  if (!path || path === "/") {
    return SITE_ORIGIN;
  }
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
