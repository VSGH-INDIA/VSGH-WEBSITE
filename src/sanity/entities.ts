/**
 * Public CMS entity set from WEB-034. Schema implementation waits for an
 * approved Sanity project and a resolved information architecture (see docs/CONFLICTS.md).
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
