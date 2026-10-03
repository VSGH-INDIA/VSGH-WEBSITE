import { defineField, defineType } from "sanity";
import { PUBLIC_CONTENT_GUIDANCE } from "@/sanity/constants";
import { ctaField, lifecycleField, seoFields } from "@/sanity/schema/objects";

const groups = [
  { name: "content", title: "Content", default: true },
  { name: "media", title: "Media" },
  { name: "seo", title: "SEO" },
  { name: "publishing", title: "Publishing" },
];

export const businessPage = defineType({
  name: "businessPage",
  title: "Business page",
  type: "document",
  description:
    "Approved public positioning for VSGH business lines. Do not state that VSGH manufactures systems or components unless that fact is independently approved for publication.",
  groups,
  fields: [
    { ...lifecycleField, group: "publishing" },
    ...seoFields.map((field) => ({ ...field, group: "seo" })),
    defineField({
      name: "path",
      title: "Public route",
      type: "string",
      initialValue: "/business",
      readOnly: true,
      group: "publishing",
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
      rows: 4,
      group: "content",
      description: PUBLIC_CONTENT_GUIDANCE,
      validation: (rule) => rule.required().max(800),
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
      name: "lines",
      title: "Business lines",
      type: "array",
      group: "content",
      validation: (rule) => rule.required().min(3).max(3),
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "id",
              type: "string",
              validation: (rule) =>
                rule.required().regex(/^[a-z0-9-]+$/, { name: "anchor id" }),
            }),
            defineField({
              name: "index",
              title: "Display number",
              type: "string",
              validation: (rule) => rule.required().max(12),
            }),
            defineField({
              name: "title",
              type: "string",
              validation: (rule) => rule.required().max(100),
            }),
            defineField({
              name: "body",
              type: "text",
              rows: 4,
              description: PUBLIC_CONTENT_GUIDANCE,
              validation: (rule) => rule.required().max(600),
            }),
          ],
        },
      ],
    }),
    { ...ctaField, group: "content" },
  ],
  preview: {
    prepare: () => ({ title: "Business" }),
  },
});
