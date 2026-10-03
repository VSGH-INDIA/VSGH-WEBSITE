import { AboutScrollFlow } from "@/components/about/about-scroll-flow";
import { DomainJsonLd } from "@/components/domain/domain-json-ld";
import { PreviewBanner } from "@/components/layout/preview-banner";
import { aboutPageList, aboutPages } from "@/content/about";
import { resolveAboutPage } from "@/content/resolve";
import { previewRobotsMetadata } from "@/lib/indexing";
import { pageMetadata } from "@/lib/seo";
import { isPreviewSession } from "@/sanity/preview-session";

export async function generateMetadata() {
  const page = await resolveAboutPage(aboutPages.company);
  const metadata = pageMetadata({
    title: "About VSGH",
    description: page.description,
    path: page.path,
  });
  return (await isPreviewSession())
    ? { ...metadata, robots: previewRobotsMetadata() }
    : metadata;
}

export default async function CompanyPage() {
  const [pages, preview] = await Promise.all([
    Promise.all(aboutPageList.map((page) => resolveAboutPage(page))),
    isPreviewSession(),
  ]);

  return (
    <>
      {preview ? <PreviewBanner /> : null}
      <DomainJsonLd
        title="About VSGH"
        description={pages[0]?.description ?? aboutPages.company.description}
        path="/about/company"
        navLabel="About"
        parentName="About"
        parentPath="/about/company"
      />
      <AboutScrollFlow pages={pages} />
    </>
  );
}
