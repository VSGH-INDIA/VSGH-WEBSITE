import type { StructureResolver } from "sanity/structure";

const singleton = (
  S: Parameters<StructureResolver>[0],
  title: string,
  type: string,
  id: string,
) =>
  S.listItem()
    .title(title)
    .id(id)
    .child(S.document().schemaType(type).documentId(id));

const capabilityDomain = (
  S: Parameters<StructureResolver>[0],
  title: string,
  domain: string,
) =>
  S.listItem()
    .title(title)
    .child(
      S.documentList()
        .title(title)
        .filter('_type == "capabilityPage" && domain == $domain')
        .params({ domain }),
    );

const lifecycleList = (
  S: Parameters<StructureResolver>[0],
  title: string,
  lifecycle: string,
) =>
  S.documentList()
    .title(title)
    .schemaType("insightArticle")
    .filter(
      '_type in ["homepage", "businessPage", "businessLine", "aboutPage", "capabilityPage", "contactPage", "insightArticle", "careerVacancy", "siteSettings"] && lifecycle == $lifecycle',
    )
    .params({ lifecycle });

export const deskStructure: StructureResolver = (S) =>
  S.list()
    .title("VSGH editorial workspace")
    .items([
      singleton(S, "Homepage", "homepage", "homepage"),
      singleton(S, "Business", "businessPage", "businessPage"),
      singleton(S, "Contact", "contactPage", "contactPage"),
      S.divider(),
      S.listItem()
        .title("Website pages")
        .child(
          S.list()
            .title("Website pages")
            .items([
              S.documentTypeListItem("aboutPage").title("About"),
              S.documentTypeListItem("businessLine").title(
                "Business line pages",
              ),
              capabilityDomain(S, "Materials", "Materials"),
              capabilityDomain(S, "Technology", "Technology"),
              capabilityDomain(S, "Applications", "Applications"),
              capabilityDomain(S, "Research", "Research"),
              capabilityDomain(S, "Sustainability", "Sustainability"),
            ]),
        ),
      S.listItem()
        .title("Publishing")
        .child(
          S.list()
            .title("Publishing")
            .items([
              S.documentTypeListItem("insightArticle").title("Insights"),
              S.documentTypeListItem("careerVacancy").title("Career vacancies"),
              S.listItem()
                .title("Draft content")
                .child(lifecycleList(S, "Draft content", "draft")),
              S.listItem()
                .title("Recently published")
                .child(lifecycleList(S, "Recently published", "published")),
            ]),
        ),
      S.listItem()
        .title("Review")
        .child(
          S.list()
            .title("Review")
            .items([
              S.listItem()
                .title("Needs technical / IP review")
                .child(
                  lifecycleList(S, "Needs technical / IP review", "review"),
                ),
              S.listItem()
                .title("Approved, awaiting publication")
                .child(
                  lifecycleList(
                    S,
                    "Approved, awaiting publication",
                    "approved",
                  ),
                ),
            ]),
        ),
      S.divider(),
      S.listItem()
        .title("Media library")
        .child(S.documentTypeList("sanity.imageAsset").title("Uploaded media")),
      S.listItem()
        .title("Settings")
        .child(
          S.list()
            .title("Settings")
            .items([
              singleton(S, "Site settings", "siteSettings", "siteSettings"),
            ]),
        ),
    ]);
