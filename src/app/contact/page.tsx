import { ContactPageView } from "@/components/domain/contact-page-view";
import { contactPage } from "@/content/contact";
import { resolveContactPage } from "@/content/resolve";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata() {
  const page = await resolveContactPage(contactPage);
  return pageMetadata({
    title: page.seoTitle,
    description: page.description,
    path: page.path,
  });
}

export default async function ContactPage() {
  const page = await resolveContactPage(contactPage);
  return <ContactPageView page={page} />;
}
