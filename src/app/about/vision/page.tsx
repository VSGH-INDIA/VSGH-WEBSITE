import { AboutPageView } from "@/components/about/about-page-view";
import { aboutPages } from "@/content/about";
import { pageMetadata } from "@/lib/seo";

const page = aboutPages.vision;

export const metadata = pageMetadata({
  title: page.seoTitle,
  description: page.description,
  path: page.path,
});

export default function AboutVisionPage() {
  return <AboutPageView page={page} />;
}
