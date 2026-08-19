import { defineField, defineType } from "sanity";
import { PUBLIC_CONTENT_GUIDANCE } from "@/sanity/constants";
import {
  lifecycleField,
  seoFields,
  titleSlugField,
} from "@/sanity/schema/objects";

export const insightArticle = defineType({
  name: "insightArticle",
  title: "Insight article",
  type: "document",
  description:
    "Future editorial records. Do not invent articles, authors, or dates. Body is structured text, not free HTML.",
  fields: [
    lifecycleField,
    defineField({
      name: "title",
      type: "string",
      validation: (rule) => rule.required().max(160),
    }),
    titleSlugField,
    defineField({
      name: "category",
      type: "string",
      options: {
        list: [
          "Technical perspective",
          "Company update",
          "Research commentary",
          "Engineering insight",
          "Announcement",
        ],
      },
    }),
    defineField({
      name: "summary",
      type: "text",
      rows: 3,
      description: PUBLIC_CONTENT_GUIDANCE,
      validation: (rule) => rule.required().max(400),
    }),
    defineField({
      name: "publicationDate",
      type: "date",
      description: "Only a real publication date. Leave empty until published.",
    }),
    defineField({
      name: "author",
      type: "string",
      description:
        "Only an approved public attribution. Leave empty otherwise.",
      validation: (rule) => rule.max(80),
    }),
    defineField({
      name: "body",
      type: "array",
      of: [
        {
          type: "object",
          name: "block",
          fields: [
            defineField({ name: "title", type: "string" }),
            defineField({
              name: "body",
              type: "text",
              rows: 6,
              description: PUBLIC_CONTENT_GUIDANCE,
            }),
          ],
        },
      ],
    }),
    defineField({
      name: "mediaLabel",
      type: "string",
      validation: (rule) => rule.max(120),
    }),
    defineField({ name: "media", type: "publicImage" }),
    ...seoFields,
  ],
  preview: {
    select: { title: "title", lifecycle: "lifecycle" },
    prepare: ({ title, lifecycle }) => ({
      title: title ?? "Untitled insight",
      subtitle: lifecycle ?? "draft",
    }),
  },
});
