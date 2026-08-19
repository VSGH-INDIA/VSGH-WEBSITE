import { AboutPageView } from "@/components/about/about-page-view";
import { aboutPages } from "@/content/about";
import { pageMetadata } from "@/lib/seo";

const page = aboutPages.company;

export const metadata = pageMetadata({
  title: page.seoTitle,
  description: page.description,
  path: page.path,
});

export default function AboutCompanyPage() {
  return <AboutPageView page={page} />;
}
