import { CapabilityPageView } from "@/components/domain/capability-page-view";
import { materialsPages } from "@/content/materials";
import { MATERIALS_NAV } from "@/lib/navigation";
import { pageMetadata } from "@/lib/seo";

const page = materialsPages.processing;

export const metadata = pageMetadata({
  title: page.seoTitle,
  description: page.description,
  path: page.path,
});

export default function Page() {
  return <CapabilityPageView page={page} nav={MATERIALS_NAV} />;
}
