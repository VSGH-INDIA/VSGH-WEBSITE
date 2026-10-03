import { SITE_DESCRIPTION } from "@/lib/site";

export type SiteSettings = {
  companyName: string;
  shortName: string;
  defaultDescription: string;
  titleSuffix: string;
  googleSiteVerification?: string;
  bingSiteVerification?: string;
};

export const siteSettings: SiteSettings = {
  companyName: "VSGH India Pvt Ltd",
  shortName: "VSGH",
  defaultDescription: SITE_DESCRIPTION,
  titleSuffix: "VSGH",
};
