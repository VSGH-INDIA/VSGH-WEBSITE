import { defineField, defineType } from "sanity";
import { PUBLIC_CONTENT_GUIDANCE } from "@/sanity/constants";
import {
  lifecycleField,
  relatedMember,
  seoFields,
} from "@/sanity/schema/objects";

export const contactPage = defineType({
  name: "contactPage",
  title: "Contact page",
  type: "document",
  description:
    "Public contact copy and enquiry labels. Delivery configuration stays in server-only environment variables, never in the CMS.",
  fields: [
    lifecycleField,
    ...seoFields,
    defineField({
      name: "path",
      type: "string",
      initialValue: "/contact",
      readOnly: true,
    }),
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
      name: "leadership",
      title: "Public leadership contact",
      type: "object",
      fields: [
        defineField({
          name: "name",
          type: "string",
          validation: (rule) => rule.max(120),
        }),
        defineField({
          name: "role",
          type: "string",
          validation: (rule) => rule.max(120),
        }),
      ],
    }),
    defineField({
      name: "locations",
      title: "Public company locations",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "region",
              type: "string",
              validation: (rule) => rule.required().max(80),
            }),
            defineField({
              name: "address",
              type: "array",
              of: [{ type: "string" }],
              validation: (rule) => rule.required().min(1).max(4),
            }),
          ],
        },
      ],
    }),
    defineField({
      name: "notice",
      type: "text",
      rows: 3,
      validation: (rule) => rule.required().max(400),
    }),
    defineField({
      name: "categories",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "id",
              type: "string",
              validation: (rule) =>
                rule.required().regex(/^[a-z0-9-]+$/, { name: "id" }),
            }),
            defineField({
              name: "title",
              type: "string",
              validation: (rule) => rule.required().max(80),
            }),
            defineField({
              name: "body",
              type: "text",
              rows: 2,
              validation: (rule) => rule.required().max(240),
            }),
          ],
        },
      ],
    }),
    defineField({
      name: "fields",
      type: "array",
      description: "Reserved form labels. Not a submission schema.",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "id", type: "string" }),
            defineField({ name: "label", type: "string" }),
            defineField({ name: "hint", type: "string" }),
          ],
        },
      ],
    }),
    defineField({ name: "related", type: "array", of: [relatedMember] }),
  ],
});
