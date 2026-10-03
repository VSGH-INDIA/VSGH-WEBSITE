import { defineField, defineType } from "sanity";
import { BUSINESS_LINE_SLUGS } from "@/content/business-lines";
import { PUBLIC_CONTENT_GUIDANCE } from "@/sanity/constants";
import {
  ctaField,
  lifecycleField,
  seoFields,
  stageMember,
} from "@/sanity/schema/objects";

const groups = [
  { name: "content", title: "Content", default: true },
  { name: "journey", title: "Connection journey" },
  { name: "media", title: "Media" },
  { name: "seo", title: "SEO" },
  { name: "publishing", title: "Publishing" },
];

const businessLineOptions = BUSINESS_LINE_SLUGS.map((value) => ({
  title: value.replaceAll("-", " "),
  value,
}));

export const businessLine = defineType({
  name: "businessLine",
  title: "Business line",
  type: "document",
  description:
    "Approved public content for a VSGH business-line landing page. Do not claim that VSGH manufactures third-party systems or components, holds unverified certifications, or has unannounced programme outcomes.",
  groups,
  fields: [
    { ...lifecycleField, group: "publishing" },
    ...seoFields.map((field) => ({ ...field, group: "seo" })),
    defineField({
      name: "title",
      title: "Editor label",
      type: "string",
      group: "content",
      validation: (rule) => rule.required().max(100),
    }),
    defineField({
      name: "slug",
      title: "Business-line route",
      type: "string",
      group: "publishing",
      options: { list: businessLineOptions },
      validation: (rule) =>
        rule.required().custom((value) => {
          return BUSINESS_LINE_SLUGS.includes(
            value as (typeof BUSINESS_LINE_SLUGS)[number],
          )
            ? true
            : "Select one of the approved business-line routes.";
        }),
    }),
    defineField({
      name: "eyebrow",
      type: "string",
      group: "content",
      validation: (rule) => rule.required().max(120),
    }),
    defineField({
      name: "headline",
      type: "string",
      group: "content",
      validation: (rule) => rule.required().max(160),
    }),
    defineField({
      name: "lede",
      type: "text",
      rows: 5,
      group: "content",
      description: PUBLIC_CONTENT_GUIDANCE,
      validation: (rule) => rule.required().max(900),
    }),
    defineField({
      name: "mediaLabel",
      title: "Media description",
      type: "string",
      group: "media",
      validation: (rule) => rule.required().max(120),
    }),
    defineField({
      name: "media",
      title: "Approved public media",
      type: "publicImage",
      group: "media",
    }),
    defineField({
      name: "focus",
      title: "What the conversation covers",
      type: "array",
      group: "content",
      description: PUBLIC_CONTENT_GUIDANCE,
      of: [stageMember],
      validation: (rule) => rule.required().min(3).max(3),
    }),
    defineField({
      name: "connectionFlow",
      title: "Interactive connection journey",
      type: "array",
      group: "journey",
      description:
        "Three public, non-confidential steps shown in the interactive explorer.",
      of: [stageMember],
      validation: (rule) => rule.required().min(3).max(3),
    }),
    defineField({
      name: "relatedSlugs",
      title: "Related business lines",
      type: "array",
      group: "content",
      of: [{ type: "string", options: { list: businessLineOptions } }],
      validation: (rule) => rule.required().min(2).max(2).unique(),
    }),
    { ...ctaField, group: "content" },
  ],
  preview: {
    select: { title: "title", subtitle: "slug" },
  },
});
