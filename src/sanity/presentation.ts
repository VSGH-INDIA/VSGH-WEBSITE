import { defineDocuments, defineLocations } from "sanity/presentation";

export const presentationDocuments = defineDocuments([
  { route: "/", type: "homepage" },
  { route: "/business", type: "businessPage" },
  {
    route: "/business/:slug",
    resolve: ({ params }) =>
      params.slug
        ? {
            filter: '_type == "businessLine" && slug == $slug',
            params: { slug: params.slug },
          }
        : undefined,
  },
  { route: "/contact", type: "contactPage" },
  {
    route: "/:section/:page",
    filter: '_type in ["aboutPage", "capabilityPage"] && path == $path',
    params: ({ path }) => ({ path }),
  },
]);

const location = (title: string, href: string) => ({
  locations: [{ title, href }],
});

export const presentationLocations = {
  homepage: defineLocations({
    select: { title: "hero.headline" },
    resolve: () => location("Homepage", "/"),
  }),
  businessPage: defineLocations({
    select: { title: "headline" },
    resolve: () => location("Business", "/business"),
  }),
  businessLine: defineLocations({
    select: { title: "title", slug: "slug" },
    resolve: (document) =>
      document?.slug
        ? location(
            document.title || "Business line",
            `/business/${document.slug}`,
          )
        : {
            message: "Choose an approved business-line route.",
            tone: "caution",
          },
  }),
  partnerCompany: defineLocations({
    select: { title: "companyName" },
    resolve: (document) =>
      location(
        document?.title || "Partner company",
        "/business/global-programmes",
      ),
  }),
  contactPage: defineLocations({
    select: { title: "headline" },
    resolve: () => location("Contact", "/contact"),
  }),
  aboutPage: defineLocations({
    select: { title: "headline", path: "path" },
    resolve: (document) =>
      document?.path
        ? location(document.title || "About", document.path)
        : {
            message: "This page does not have a public route.",
            tone: "caution",
          },
  }),
  capabilityPage: defineLocations({
    select: { title: "headline", path: "path" },
    resolve: (document) =>
      document?.path
        ? location(document.title || "Capability", document.path)
        : {
            message: "This page does not have a public route.",
            tone: "caution",
          },
  }),
};
