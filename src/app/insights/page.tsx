import { CapabilityPageView } from "@/components/domain/capability-page-view";
import { insightsPage } from "@/content/insights";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: insightsPage.seoTitle,
  description: insightsPage.description,
  path: insightsPage.path,
});

export default function InsightsPage() {
  return <CapabilityPageView page={insightsPage} />;
}
