import { HomeApplications } from "@/components/home/home-applications";
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
import { pageMetadata } from "@/lib/seo";
import { SITE_DESCRIPTION, SITE_TITLE } from "@/lib/site";

export const metadata = pageMetadata({
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  path: "/",
});

export default function HomePage() {
  return (
    <main id="main">
      <HomeJsonLd />
      <HomeHero />
      <HomePositioning />
      <HomeExplorer />
      <HomeTransformation />
      <HomeCapability />
      <HomeApplications />
      <HomeResearch />
      <HomeQuality />
      <HomeSustainability />
      <HomeCompany />
      <HomeCta />
    </main>
  );
}
