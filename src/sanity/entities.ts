/**
 * WEB-034 entity names mapped to implemented public schemas.
 * contactEnquiry is intentionally not implemented (no enquiry store / no backend).
 */
export const CMS_ENTITIES = [
  "page",
  "section",
  "technology",
  "materialFamily",
  "application",
  "researchArticle",
  "publication",
  "newsItem",
  "careerPosition",
  "facility",
  "leadershipProfile",
  "mediaAsset",
  "contactEnquiry",
] as const;

export type CmsEntity = (typeof CMS_ENTITIES)[number];

export const CMS_ENTITY_IMPLEMENTATION = {
  page: ["homepage", "aboutPage", "capabilityPage", "contactPage"],
  section: "object on page documents",
  technology: "capabilityPage (domain=Technology)",
  materialFamily: "capabilityPage (domain=Materials)",
  application: "capabilityPage (domain=Applications)",
  researchArticle: "insightArticle",
  publication: "capabilityPage (Research publications) + insightArticle",
  newsItem: "insightArticle",
  careerPosition: "careerVacancy",
  facility: "aboutPage.facilities",
  leadershipProfile: "aboutPage leadership variant (no invented identities)",
  mediaAsset: "publicImage",
  contactEnquiry: "not implemented — public copy only on contactPage",
} as const;
