import { AboutPageView } from "@/components/about/about-page-view";
import { CapabilityPageView } from "@/components/domain/capability-page-view";
import { PreviewBanner } from "@/components/layout/preview-banner";
import type { AboutPageContent } from "@/content/about";
import { resolveAboutPage, resolveCapabilityPage } from "@/content/resolve";
import type { CapabilityPageContent } from "@/content/types";
import { pageMetadata } from "@/lib/seo";
import { isPreviewSession } from "@/sanity/preview-session";

export function capabilityRoute(
  fallback: CapabilityPageContent,
  nav: readonly { label: string; href: string }[] = [],
) {
  return {
    generateMetadata: async () => {
      const page = await resolveCapabilityPage(fallback);
      const metadata = pageMetadata({
        title: page.seoTitle,
        description: page.description,
        path: page.path,
      });
      if (await isPreviewSession()) {
        return {
          ...metadata,
          robots: { index: false, follow: false, nocache: true },
        };
      }
      return metadata;
    },
    Page: async () => {
      const page = await resolveCapabilityPage(fallback);
      const preview = await isPreviewSession();
      return (
        <>
          {preview ? <PreviewBanner /> : null}
          <CapabilityPageView page={page} nav={nav} />
        </>
      );
    },
  };
}

export function aboutRoute(fallback: AboutPageContent) {
  return {
    generateMetadata: async () => {
      const page = await resolveAboutPage(fallback);
      const metadata = pageMetadata({
        title: page.seoTitle,
        description: page.description,
        path: page.path,
      });
      if (await isPreviewSession()) {
        return {
          ...metadata,
          robots: { index: false, follow: false, nocache: true },
        };
      }
      return metadata;
    },
    Page: async () => {
      const page = await resolveAboutPage(fallback);
      const preview = await isPreviewSession();
      return (
        <>
          {preview ? <PreviewBanner /> : null}
          <AboutPageView page={page} />
        </>
      );
    },
  };
}
