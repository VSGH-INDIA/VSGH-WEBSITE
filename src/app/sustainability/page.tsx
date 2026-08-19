import { CapabilityPageView } from "@/components/domain/capability-page-view";
import { sustainabilityPage } from "@/content/sustainability";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: sustainabilityPage.seoTitle,
  description: sustainabilityPage.description,
  path: sustainabilityPage.path,
});

export default function SustainabilityPage() {
  return <CapabilityPageView page={sustainabilityPage} />;
}
