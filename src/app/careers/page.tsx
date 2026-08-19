import { CapabilityPageView } from "@/components/domain/capability-page-view";
import { careersPage } from "@/content/careers";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: careersPage.seoTitle,
  description: careersPage.description,
  path: careersPage.path,
});

export default function CareersPage() {
  return <CapabilityPageView page={careersPage} />;
}
