import { CapabilityPageView } from "@/components/domain/capability-page-view";
import { PreviewBanner } from "@/components/layout/preview-banner";
import { careersPage } from "@/content/careers";
import {
  resolveCapabilityPage,
  resolveCareerVacancies,
} from "@/content/resolve";
import { previewRobotsMetadata } from "@/lib/indexing";
import { pageMetadata } from "@/lib/seo";
import { isPreviewSession } from "@/sanity/preview-session";

export async function generateMetadata() {
  const page = await resolveCapabilityPage(careersPage);
  const metadata = pageMetadata({
    title: page.seoTitle,
    description: page.description,
    path: page.path,
  });
  if (await isPreviewSession()) {
    return { ...metadata, robots: previewRobotsMetadata() };
  }
  return metadata;
}

export default async function CareersPage() {
  const [page, vacancies, preview] = await Promise.all([
    resolveCapabilityPage(careersPage),
    resolveCareerVacancies(),
    isPreviewSession(),
  ]);

  return (
    <>
      {preview ? <PreviewBanner /> : null}
      <CapabilityPageView page={page} vacancies={vacancies} />
    </>
  );
}
