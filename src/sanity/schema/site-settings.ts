import { defineField, defineType } from "sanity";
import { PUBLIC_CONTENT_GUIDANCE } from "@/sanity/constants";
import { lifecycleField } from "@/sanity/schema/objects";

const groups = [
  { name: "identity", title: "Company identity", default: true },
  { name: "seo", title: "SEO & sharing" },
  { name: "contact", title: "Public contact information" },
  { name: "publishing", title: "Publishing" },
];

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site settings",
  type: "document",
  description:
    "Public company identity and search settings. Do not put passwords, API keys, mailbox credentials, preview secrets, or canonical-domain controls here.",
  groups,
  fields: [
    { ...lifecycleField, group: "publishing" },
    defineField({
      name: "companyName",
      title: "Legal public company name",
      type: "string",
      group: "identity",
      validation: (rule) => rule.required().max(120),
    }),
    defineField({
      name: "shortName",
      title: "Short brand name",
      type: "string",
      group: "identity",
      validation: (rule) => rule.required().max(40),
    }),
    defineField({
      name: "defaultDescription",
      title: "Default site description",
      type: "text",
      rows: 3,
      group: "seo",
      description: PUBLIC_CONTENT_GUIDANCE,
      validation: (rule) => rule.required().max(180),
    }),
    defineField({
      name: "titleSuffix",
      title: "Page-title suffix",
      type: "string",
      group: "seo",
      validation: (rule) => rule.required().max(40),
    }),
    defineField({
      name: "defaultOgImage",
      title: "Default approved social image",
      type: "publicImage",
      group: "seo",
    }),
    defineField({
      name: "googleSiteVerification",
      title: "Google site-verification token",
      type: "string",
      group: "seo",
      description: "Public verification value only; never a secret.",
      validation: (rule) => rule.max(300),
    }),
    defineField({
      name: "bingSiteVerification",
      title: "Bing site-verification token",
      type: "string",
      group: "seo",
      description: "Public verification value only; never a secret.",
      validation: (rule) => rule.max(300),
    }),
    defineField({
      name: "publicEnquiryLabel",
      title: "Public enquiry label",
      type: "string",
      group: "contact",
      validation: (rule) => rule.max(80),
    }),
  ],
  preview: {
    prepare: () => ({ title: "Site settings" }),
  },
});
