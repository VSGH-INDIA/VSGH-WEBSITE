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
