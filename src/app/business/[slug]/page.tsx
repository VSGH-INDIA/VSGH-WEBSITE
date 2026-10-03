import { BusinessLinePageView } from "@/components/domain/business-line-page-view";
import { businessLines } from "@/content/business-lines";
import { resolveBusinessLine } from "@/content/resolve";
import { previewRobotsMetadata } from "@/lib/indexing";
import { pageMetadata } from "@/lib/seo";
import { isPreviewSession } from "@/sanity/preview-session";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  return businessLines.map((line) => ({ slug: line.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const line = await resolveBusinessLine(slug);
  if (!line) {
    return { robots: previewRobotsMetadata() };
  }

  const metadata = pageMetadata({
    title: line.seoTitle,
    description: line.description,
    path: line.path,
  });

  if (await isPreviewSession()) {
    return { ...metadata, robots: previewRobotsMetadata() };
  }

  return metadata;
}

export default async function BusinessLinePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const line = await resolveBusinessLine(slug);
  if (!line) {
    notFound();
  }

  return <BusinessLinePageView line={line} />;
}
