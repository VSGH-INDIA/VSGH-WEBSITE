import { BusinessPageView } from "@/components/domain/business-page-view";
import { PreviewBanner } from "@/components/layout/preview-banner";
import { resolveBusinessPage } from "@/content/resolve";
import { previewRobotsMetadata } from "@/lib/indexing";
import { pageMetadata } from "@/lib/seo";
import { isPreviewSession } from "@/sanity/preview-session";

export async function generateMetadata() {
  const page = await resolveBusinessPage();
  const metadata = pageMetadata({
    title: page.seoTitle,
    description: page.description,
    path: page.path,
  });
  return (await isPreviewSession())
    ? { ...metadata, robots: previewRobotsMetadata() }
    : metadata;
}

export default async function BusinessPage() {
  const page = await resolveBusinessPage();
  const preview = await isPreviewSession();
  return (
    <>
      {preview ? <PreviewBanner /> : null}
      <BusinessPageView page={page} />
    </>
  );
}
