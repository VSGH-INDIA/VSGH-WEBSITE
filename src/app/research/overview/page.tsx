import { CapabilityPageView } from "@/components/domain/capability-page-view";
import { researchPages } from "@/content/research";
import { RESEARCH_NAV } from "@/lib/navigation";
import { pageMetadata } from "@/lib/seo";

const page = researchPages.overview;

export const metadata = pageMetadata({
  title: page.seoTitle,
  description: page.description,
  path: page.path,
});

export default function Page() {
  return <CapabilityPageView page={page} nav={RESEARCH_NAV} />;
}
