import { ContactPageView } from "@/components/domain/contact-page-view";
import { contactPage } from "@/content/contact";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: contactPage.seoTitle,
  description: contactPage.description,
  path: contactPage.path,
});

export default function ContactPage() {
  return <ContactPageView />;
}
