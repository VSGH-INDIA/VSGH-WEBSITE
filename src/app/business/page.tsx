import { BusinessPageView } from "@/components/domain/business-page-view";
import { businessPage } from "@/content/business";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: businessPage.seoTitle,
  description: businessPage.description,
  path: businessPage.path,
});

export default function BusinessPage() {
  return <BusinessPageView />;
}
