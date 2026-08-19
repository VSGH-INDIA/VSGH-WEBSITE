import { defineField, defineType } from "sanity";
import { PUBLIC_CONTENT_GUIDANCE } from "@/sanity/constants";
import {
  ctaField,
  lifecycleField,
  relatedMember,
  sectionMember,
  seoFields,
  slugField,
  stageMember,
  statusMember,
} from "@/sanity/schema/objects";

export const capabilityPage = defineType({
  name: "capabilityPage",
  title: "Capability page",
  type: "document",
  description:
    "Materials, Technology, Applications, Research, Sustainability, Insights index, and Careers index. WEB-081 paths only.",
  fields: [
    lifecycleField,
    defineField({
      name: "domain",
      type: "string",
      options: {
        list: [
          "Materials",
          "Technology",
          "Applications",
          "Research",
          "Sustainability",
          "Insights",
          "Careers",
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "navLabel",
      type: "string",
      validation: (rule) => rule.required().max(80),
    }),
    slugField,
    defineField({
      name: "path",
      type: "string",
      description: "Exact WEB-081 public path, e.g. /materials/overview",
      validation: (rule) =>
        rule.required().regex(/^\/[a-z0-9\-/]*$/, { name: "web-081-path" }),
    }),
    defineField({
      name: "parentPath",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "order",
      type: "number",
      validation: (rule) => rule.required().integer().min(0),
    }),
    ...seoFields,
    defineField({
      name: "eyebrow",
      type: "string",
      validation: (rule) => rule.required().max(120),
    }),
    defineField({
      name: "headline",
      type: "string",
      validation: (rule) => rule.required().max(160),
    }),
    defineField({
      name: "emphasis",
      type: "string",
      validation: (rule) => rule.max(80),
    }),
    defineField({
      name: "lede",
      type: "text",
      rows: 4,
      description: PUBLIC_CONTENT_GUIDANCE,
      validation: (rule) => rule.required().max(800),
    }),
    defineField({
      name: "mediaLabel",
      type: "string",
      validation: (rule) => rule.required().max(120),
    }),
    defineField({ name: "media", type: "publicImage" }),
    defineField({
      name: "sections",
      type: "array",
      of: [sectionMember],
      validation: (rule) => rule.min(1),
    }),
    defineField({ name: "stages", type: "array", of: [stageMember] }),
    defineField({ name: "principles", type: "array", of: [stageMember] }),
    defineField({
      name: "statuses",
      type: "array",
      of: [statusMember],
    }),
    defineField({ name: "related", type: "array", of: [relatedMember] }),
    defineField({ name: "emptyState", type: "emptyState" }),
    ctaField,
  ],
  preview: {
    select: { title: "navLabel", subtitle: "path", lifecycle: "lifecycle" },
    prepare: ({ title, subtitle, lifecycle }) => ({
      title,
      subtitle: `${lifecycle ?? "draft"} · ${subtitle ?? ""}`,
    }),
  },
});
