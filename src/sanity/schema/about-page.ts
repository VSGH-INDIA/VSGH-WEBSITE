import { defineField, defineType } from "sanity";
import { PUBLIC_CONTENT_GUIDANCE } from "@/sanity/constants";
import {
  ctaField,
  lifecycleField,
  sectionMember,
  seoFields,
  slugField,
  stageMember,
} from "@/sanity/schema/objects";

export const aboutPage = defineType({
  name: "aboutPage",
  title: "About page",
  type: "document",
  description: "WEB-081 About children only. Not a corporate org-chart system.",
  fields: [
    lifecycleField,
    defineField({
      name: "navLabel",
      type: "string",
      validation: (rule) => rule.required().max(80),
    }),
    slugField,
    defineField({
      name: "path",
      type: "string",
      validation: (rule) =>
        rule.required().regex(/^\/about\/[a-z0-9\-]+$/, { name: "about-path" }),
    }),
    defineField({
      name: "variant",
      type: "string",
      options: {
        list: [
          { title: "Standard", value: "standard" },
          { title: "Leadership", value: "leadership" },
          { title: "Facilities", value: "facilities" },
        ],
      },
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
    defineField({ name: "principles", type: "array", of: [stageMember] }),
    defineField({
      name: "leadershipNote",
      type: "text",
      rows: 3,
      description: "Do not invent names, titles of living persons, or bios.",
    }),
    defineField({
      name: "facilities",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "index",
              type: "string",
              validation: (rule) => rule.required().max(12),
            }),
            defineField({
              name: "title",
              type: "string",
              validation: (rule) => rule.required().max(80),
            }),
            defineField({
              name: "body",
              type: "text",
              rows: 3,
              description: PUBLIC_CONTENT_GUIDANCE,
              validation: (rule) => rule.required().max(400),
            }),
            defineField({
              name: "mediaLabel",
              type: "string",
              validation: (rule) => rule.required().max(120),
            }),
            defineField({ name: "media", type: "publicImage" }),
          ],
        },
      ],
    }),
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
