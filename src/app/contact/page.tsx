import { ContactPageView } from "@/components/domain/contact-page-view";
import { PreviewBanner } from "@/components/layout/preview-banner";
import { contactPage } from "@/content/contact";
import { resolveContactPage } from "@/content/resolve";
import { pageMetadata } from "@/lib/seo";
import { isPreviewSession } from "@/sanity/preview-session";

export async function generateMetadata() {
  const page = await resolveContactPage(contactPage);
  const metadata = pageMetadata({
    title: page.seoTitle,
    description: page.description,
    path: page.path,
  });
  if (await isPreviewSession()) {
    return {
      ...metadata,
      robots: { index: false, follow: false, nocache: true },
    };
  }
  return metadata;
}

export default async function ContactPage() {
  const page = await resolveContactPage(contactPage);
  const preview = await isPreviewSession();
  return (
    <>
      {preview ? <PreviewBanner /> : null}
      <ContactPageView page={page} />
    </>
  );
}
