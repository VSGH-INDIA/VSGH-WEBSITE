import type { StructureResolver } from "sanity/structure";

export const deskStructure: StructureResolver = (S) =>
  S.list()
    .title("Public website content")
    .items([
      S.listItem()
        .title("Homepage")
        .id("homepage")
        .child(S.document().schemaType("homepage").documentId("homepage")),
      S.listItem()
        .title("Contact")
        .id("contactPage")
        .child(
          S.document().schemaType("contactPage").documentId("contactPage"),
        ),
      S.divider(),
      S.documentTypeListItem("aboutPage").title("About"),
      S.documentTypeListItem("capabilityPage").title(
        "Materials / Technology / Applications / Research / leaf domains",
      ),
      S.divider(),
      S.documentTypeListItem("insightArticle").title("Insights"),
      S.documentTypeListItem("careerVacancy").title("Careers vacancies"),
    ]);
