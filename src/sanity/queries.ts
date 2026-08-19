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
  categories[]{ id, title, body },
  fields[]{ id, label, hint },
  related[]{ href, label, body }
}`;

export const CAPABILITY_PAGE_QUERY = `*[_type == "capabilityPage" && path == $path && lifecycle == "published"][0]${CAPABILITY_PROJECTION}`;
export const CAPABILITY_PAGE_PREVIEW_QUERY = `*[_type == "capabilityPage" && path == $path && lifecycle != "archived"][0]${CAPABILITY_PROJECTION}`;

export const ABOUT_PAGE_QUERY = `*[_type == "aboutPage" && path == $path && lifecycle == "published"][0]${ABOUT_PROJECTION}`;
export const ABOUT_PAGE_PREVIEW_QUERY = `*[_type == "aboutPage" && path == $path && lifecycle != "archived"][0]${ABOUT_PROJECTION}`;

export const HOMEPAGE_QUERY = `*[_type == "homepage" && _id == "homepage" && lifecycle == "published"][0]`;
export const HOMEPAGE_PREVIEW_QUERY = `*[_type == "homepage" && _id == "homepage" && lifecycle != "archived"][0]`;

export const CONTACT_PAGE_QUERY = `*[_type == "contactPage" && _id == "contactPage" && lifecycle == "published"][0]${CONTACT_PROJECTION}`;
export const CONTACT_PAGE_PREVIEW_QUERY = `*[_type == "contactPage" && _id == "contactPage" && lifecycle != "archived"][0]${CONTACT_PROJECTION}`;

export const INSIGHT_ARTICLES_QUERY = `*[_type == "insightArticle" && lifecycle == "published"] | order(publicationDate desc){
  "slug": slug.current,
  title,
  category,
  summary,
  publicationDate,
  author,
  lifecycle,
  "status": "published",
  body[]{ title, body },
  mediaLabel,
  seoTitle,
  description
}`;
export const INSIGHT_ARTICLES_PREVIEW_QUERY = `*[_type == "insightArticle" && lifecycle != "archived"] | order(publicationDate desc){
  "slug": slug.current,
  title,
  category,
  summary,
  publicationDate,
  author,
  lifecycle,
  "status": select(lifecycle == "published" => "published", "draft"),
  body[]{ title, body },
  mediaLabel,
  seoTitle,
  description
}`;

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
