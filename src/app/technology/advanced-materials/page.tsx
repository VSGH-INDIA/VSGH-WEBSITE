import { CapabilityPageView } from "@/components/domain/capability-page-view";
import { technologyPages } from "@/content/technology";
import { TECHNOLOGY_NAV } from "@/lib/navigation";
import { pageMetadata } from "@/lib/seo";

const page = technologyPages["advanced-materials"];

export const metadata = pageMetadata({
  title: page.seoTitle,
  description: page.description,
  path: page.path,
});

export default function Page() {
  return <CapabilityPageView page={page} nav={TECHNOLOGY_NAV} />;
}
