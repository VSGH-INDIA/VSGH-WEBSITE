import { CapabilityPageView } from "@/components/domain/capability-page-view";
import { applicationsPages } from "@/content/applications";
import { APPLICATIONS_NAV } from "@/lib/navigation";
import { pageMetadata } from "@/lib/seo";

const page = applicationsPages.defense;

export const metadata = pageMetadata({
  title: page.seoTitle,
  description: page.description,
  path: page.path,
});

export default function Page() {
  return <CapabilityPageView page={page} nav={APPLICATIONS_NAV} />;
}
