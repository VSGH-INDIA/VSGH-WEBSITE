export const PUBLIC_MEDIA_PROJECTION = `{
  alt,
  decorative,
  caption,
  credit,
  usage,
  approvalStatus,
  visibility,
  aspectRatio,
  cropMode,
  "src": asset->url,
  "width": asset->metadata.dimensions.width,
  "height": asset->metadata.dimensions.height,
  "focalPoint": hotspot
}`;

export const PAGE_BUILDER_PROJECTION = `pageBuilder[]{
  _type,
  eyebrow,
  title,
  emphasis,
  body,
  mediaLabel,
  media${PUBLIC_MEDIA_PROJECTION},
  paragraphs[]{ title, body },
  stages[]{ index, title, body },
  related[]{ href, label, body },
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref
}`;

const CAPABILITY_PROJECTION = `{
  "slug": slug.current,
  path,
  navLabel,
  seoTitle,
  description,
  domain,
  parentPath,
  eyebrow,
  headline,
  emphasis,
  lede,
  mediaLabel,
  media${PUBLIC_MEDIA_PROJECTION},
  ${PAGE_BUILDER_PROJECTION},
  sections[]{ title, body },
  stages[]{ index, title, body },
  principles[]{ index, title, body },
  related[]{ href, label, body },
  statuses[]{ label, title, body },
  emptyState{ eyebrow, title, body },
  cta{
    title,
    body,
    "primary": { "label": primaryLabel, "href": primaryHref },
    "secondary": { "label": secondaryLabel, "href": secondaryHref }
  }
}`;

const ABOUT_PROJECTION = `{
  "slug": slug.current,
  path,
  navLabel,
  seoTitle,
  description,
  eyebrow,
  headline,
  emphasis,
  lede,
  mediaLabel,
  variant,
  leadershipNote,
  sections[]{ title, body },
  principles[]{ index, title, body },
  facilities[]{ index, title, body, mediaLabel },
  cta{
    title,
    body,
    "primary": { "label": primaryLabel, "href": primaryHref },
    "secondary": { "label": secondaryLabel, "href": secondaryHref }
  }
}`;

const CONTACT_PROJECTION = `{
  path,
  seoTitle,
  description,
  eyebrow,
  headline,
  lede,
  mediaLabel,
  notice,
  leadership{ name, role },
  locations[]{ region, address },
  categories[]{ id, title, body },
  fields[]{ id, label, hint },
  related[]{ href, label, body }
}`;

const BUSINESS_PAGE_PROJECTION = `{
  path,
  seoTitle,
  description,
  eyebrow,
  headline,
  lede,
  mediaLabel,
  media${PUBLIC_MEDIA_PROJECTION},
  lines[]{ id, index, title, body },
  cta{
    title,
    body,
    "primary": { "label": primaryLabel, "href": primaryHref },
    "secondary": { "label": secondaryLabel, "href": secondaryHref }
  }
}`;

const BUSINESS_LINE_PROJECTION = `{
  slug,
  seoTitle,
  description,
  eyebrow,
  headline,
  lede,
  mediaLabel,
  media${PUBLIC_MEDIA_PROJECTION},
  focus[]{ index, title, body },
  connectionFlow[]{ index, title, body },
  relatedSlugs,
  cta{
    title,
    body,
    "primary": { "label": primaryLabel, "href": primaryHref },
    "secondary": { "label": secondaryLabel, "href": secondaryHref }
  }
}`;

const SITE_SETTINGS_PROJECTION = `{
  companyName,
  shortName,
  defaultDescription,
  titleSuffix,
  googleSiteVerification,
  bingSiteVerification
}`;

export const CAPABILITY_PAGE_QUERY = `*[_type == "capabilityPage" && path == $path && lifecycle == "published"][0]${CAPABILITY_PROJECTION}`;
export const CAPABILITY_PAGE_PREVIEW_QUERY = `*[_type == "capabilityPage" && path == $path && lifecycle != "archived"][0]${CAPABILITY_PROJECTION}`;

export const ABOUT_PAGE_QUERY = `*[_type == "aboutPage" && path == $path && lifecycle == "published"][0]${ABOUT_PROJECTION}`;
export const ABOUT_PAGE_PREVIEW_QUERY = `*[_type == "aboutPage" && path == $path && lifecycle != "archived"][0]${ABOUT_PROJECTION}`;

export const HOMEPAGE_QUERY = `*[_type == "homepage" && _id == "homepage" && lifecycle == "published"][0]`;
export const HOMEPAGE_PREVIEW_QUERY = `*[_type == "homepage" && _id == "homepage" && lifecycle != "archived"][0]`;

export const BUSINESS_PAGE_QUERY = `*[_type == "businessPage" && _id == "businessPage" && lifecycle == "published"][0]${BUSINESS_PAGE_PROJECTION}`;
export const BUSINESS_PAGE_PREVIEW_QUERY = `*[_type == "businessPage" && _id == "businessPage" && lifecycle != "archived"][0]${BUSINESS_PAGE_PROJECTION}`;
export const BUSINESS_LINE_QUERY = `*[_type == "businessLine" && slug == $slug && lifecycle == "published"][0]${BUSINESS_LINE_PROJECTION}`;
export const BUSINESS_LINE_PREVIEW_QUERY = `*[_type == "businessLine" && slug == $slug && lifecycle != "archived"][0]${BUSINESS_LINE_PROJECTION}`;
export const SITE_SETTINGS_QUERY = `*[_type == "siteSettings" && _id == "siteSettings" && lifecycle == "published"][0]${SITE_SETTINGS_PROJECTION}`;

export const CONTACT_PAGE_QUERY = `*[_type == "contactPage" && _id == "contactPage" && lifecycle == "published"][0]${CONTACT_PROJECTION}`;
export const CONTACT_PAGE_PREVIEW_QUERY = `*[_type == "contactPage" && _id == "contactPage" && lifecycle != "archived"][0]${CONTACT_PROJECTION}`;

const INSIGHT_ARTICLE_PROJECTION = `{
  "slug": slug.current,
  title,
  category,
  summary,
  publicationDate,
  author,
  lifecycle,
  body[]{ title, body },
  ${PAGE_BUILDER_PROJECTION},
  mediaLabel,
  media${PUBLIC_MEDIA_PROJECTION},
  seoTitle,
  description
}`;

export const INSIGHT_ARTICLES_QUERY = `*[_type == "insightArticle" && lifecycle == "published"] | order(publicationDate desc)${INSIGHT_ARTICLE_PROJECTION}`;
export const INSIGHT_ARTICLES_PREVIEW_QUERY = `*[_type == "insightArticle" && lifecycle != "archived"] | order(publicationDate desc)${INSIGHT_ARTICLE_PROJECTION}`;

export const INSIGHT_ARTICLE_QUERY = `*[_type == "insightArticle" && slug.current == $slug && lifecycle == "published"][0]${INSIGHT_ARTICLE_PROJECTION}`;
export const INSIGHT_ARTICLE_PREVIEW_QUERY = `*[_type == "insightArticle" && slug.current == $slug && lifecycle != "archived"][0]${INSIGHT_ARTICLE_PROJECTION}`;

export const CAREER_VACANCIES_QUERY = `*[_type == "careerVacancy" && lifecycle == "published" && vacancyStatus == "open"] | order(posted desc){
  "slug": slug.current,
  title,
  discipline,
  location,
  posted,
  "status": vacancyStatus,
  summary
}`;
export const CAREER_VACANCIES_PREVIEW_QUERY = `*[_type == "careerVacancy" && lifecycle != "archived"] | order(posted desc){
  "slug": slug.current,
  title,
  discipline,
  location,
  posted,
  "status": vacancyStatus,
  summary
}`;
