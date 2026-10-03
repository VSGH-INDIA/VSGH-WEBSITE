import { aboutPage } from "@/sanity/schema/about-page";
import { businessPage } from "@/sanity/schema/business-page";
import { capabilityPage } from "@/sanity/schema/capability-page";
import { careerVacancy } from "@/sanity/schema/career-vacancy";
import { contactPage } from "@/sanity/schema/contact-page";
import { homepage } from "@/sanity/schema/homepage";
import { insightArticle } from "@/sanity/schema/insight-article";
import { pageSectionTypes } from "@/sanity/schema/page-sections";
import { siteSettings } from "@/sanity/schema/site-settings";
import { emptyState, publicImage } from "@/sanity/schema/shared-types";

export const schemaTypes = [
  publicImage,
  emptyState,
  ...pageSectionTypes,
  siteSettings,
  homepage,
  businessPage,
  aboutPage,
  capabilityPage,
  contactPage,
  insightArticle,
  careerVacancy,
];
