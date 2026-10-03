import { HomeApplications } from "@/components/home/home-applications";
import { HomeBusiness } from "@/components/home/home-business";
import { HomeCapability } from "@/components/home/home-capability";
import { HomeCompany } from "@/components/home/home-company";
import { HomeCta } from "@/components/home/home-cta";
import { HomeExplorer } from "@/components/home/home-explorer";
import { HomeHero } from "@/components/home/home-hero";
import { HomeJsonLd } from "@/components/home/home-json-ld";
import { HomePositioning } from "@/components/home/home-positioning";
import { HomeQuality } from "@/components/home/home-quality";
import { HomeResearch } from "@/components/home/home-research";
import { HomeSustainability } from "@/components/home/home-sustainability";
import { HomeTransformation } from "@/components/home/home-transformation";
import { HomeWhyVSGH } from "@/components/home/home-why-vsgh";
import { homeContent } from "@/content/home";
import { resolveHomepage } from "@/content/resolve";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata() {
  const content = await resolveHomepage(homeContent);
  return pageMetadata({
    title: content.seoTitle,
    description: content.description,
    path: content.path,
  });
}

export default async function HomePage() {
  const content = await resolveHomepage(homeContent);

  return (
    <main id="main">
      <HomeJsonLd description={content.description} title={content.seoTitle} />
      <HomeHero content={content} />
      <HomeBusiness content={content} />
      <HomeWhyVSGH content={content} />
      <HomePositioning content={content} />
      <HomeExplorer content={content} />
      <HomeTransformation content={content} />
      <HomeCapability content={content} />
      <HomeApplications content={content} />
      <HomeResearch content={content} />
      <HomeQuality content={content} />
      <HomeSustainability content={content} />
      <HomeCompany content={content} />
      <HomeCta content={content} />
    </main>
  );
}
