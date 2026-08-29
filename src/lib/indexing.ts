import type { Metadata, MetadataRoute } from "next";
import {
  PREVIEW_ROBOTS_HEADER,
  PUBLIC_INDEXING_ENABLED,
} from "@/lib/indexing-policy";
import { SITE_ORIGIN } from "@/lib/site";

export { PREVIEW_ROBOTS_HEADER, PUBLIC_INDEXING_ENABLED };

export function publicRobotsMetadata(): Metadata["robots"] {
  if (!PUBLIC_INDEXING_ENABLED) {
    return {
      index: false,
      follow: false,
      nocache: true,
      googleBot: {
        index: false,
        follow: false,
        noimageindex: true,
      },
    };
  }
  return {
    index: true,
    follow: true,
  };
}

export function previewRobotsMetadata(): Metadata["robots"] {
  return {
    index: false,
    follow: false,
    nocache: true,
  };
}

export function robotsTxtConfig(): MetadataRoute.Robots {
  if (!PUBLIC_INDEXING_ENABLED) {
    return {
      rules: {
        userAgent: "*",
        disallow: "/",
      },
    };
  }
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/studio"],
    },
    sitemap: `${SITE_ORIGIN}/sitemap.xml`,
    host: SITE_ORIGIN,
  };
}

export function productionRobotsHeader(): string | null {
  return PUBLIC_INDEXING_ENABLED ? null : PREVIEW_ROBOTS_HEADER;
}
