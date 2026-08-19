import type { Metadata } from "next";
import { HomeApplications } from "@/components/home/home-applications";
import { HomeCapability } from "@/components/home/home-capability";
import { HomeCompany } from "@/components/home/home-company";
import { HomeCta } from "@/components/home/home-cta";
import { HomeHero } from "@/components/home/home-hero";
import { HomeJsonLd } from "@/components/home/home-json-ld";
import { HomePositioning } from "@/components/home/home-positioning";
import { HomeQuality } from "@/components/home/home-quality";
import { HomeResearch } from "@/components/home/home-research";
import { HomeSustainability } from "@/components/home/home-sustainability";
import { HomeTransformation } from "@/components/home/home-transformation";
import { SITE_DESCRIPTION, SITE_TITLE } from "@/lib/site";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    url: "/",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
  twitter: {
    card: "summary",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
};

export default function HomePage() {
  return (
    <main id="main">
      <HomeJsonLd />
      <HomeHero />
      <HomePositioning />
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
