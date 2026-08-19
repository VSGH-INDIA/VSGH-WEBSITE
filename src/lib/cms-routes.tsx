import { AboutPageView } from "@/components/about/about-page-view";
import { CapabilityPageView } from "@/components/domain/capability-page-view";
import type { AboutPageContent } from "@/content/about";
import { resolveAboutPage, resolveCapabilityPage } from "@/content/resolve";
import type { CapabilityPageContent } from "@/content/types";
import { pageMetadata } from "@/lib/seo";

export function capabilityRoute(
  fallback: CapabilityPageContent,
  nav: readonly { label: string; href: string }[] = [],
) {
  return {
    generateMetadata: async () => {
      const page = await resolveCapabilityPage(fallback);
      return pageMetadata({
        title: page.seoTitle,
        description: page.description,
        path: page.path,
      });
    },
    Page: async () => {
      const page = await resolveCapabilityPage(fallback);
      return <CapabilityPageView page={page} nav={nav} />;
    },
  };
}

export function aboutRoute(fallback: AboutPageContent) {
  return {
    generateMetadata: async () => {
      const page = await resolveAboutPage(fallback);
      return pageMetadata({
        title: page.seoTitle,
        description: page.description,
        path: page.path,
      });
    },
    Page: async () => {
      const page = await resolveAboutPage(fallback);
      return <AboutPageView page={page} />;
    },
  };
}
