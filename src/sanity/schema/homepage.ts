import { defineField, defineType } from "sanity";
import { PUBLIC_CONTENT_GUIDANCE } from "@/sanity/constants";
import { lifecycleField, seoFields } from "@/sanity/schema/objects";

const block = [
  defineField({
    name: "eyebrow",
    type: "string",
    validation: (rule) => rule.max(120),
  }),
  defineField({
    name: "title",
    type: "string",
    validation: (rule) => rule.max(160),
  }),
  defineField({
    name: "body",
    type: "text",
    rows: 4,
    description: PUBLIC_CONTENT_GUIDANCE,
    validation: (rule) => rule.max(800),
  }),
];

export const homepage = defineType({
  name: "homepage",
  title: "Homepage",
  type: "document",
  description: "Singleton public homepage. One document id: homepage.",
  fields: [
    lifecycleField,
    ...seoFields,
    defineField({
      name: "hero",
      type: "object",
      fields: [
        ...block,
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
      ],
    }),
    defineField({
      name: "positioning",
      type: "object",
      fields: [
        ...block,
        defineField({
          name: "points",
          type: "array",
          of: [{ type: "object", fields: block.slice(1) }],
        }),
      ],
    }),
    defineField({
      name: "transformation",
      type: "object",
      fields: [
        ...block,
        defineField({
          name: "stages",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                defineField({ name: "index", type: "string" }),
                defineField({ name: "title", type: "string" }),
                defineField({
                  name: "body",
                  type: "text",
                  rows: 2,
                  description: PUBLIC_CONTENT_GUIDANCE,
                }),
              ],
            },
          ],
        }),
      ],
    }),
    defineField({
      name: "capability",
      type: "object",
      fields: [
        ...block,
        defineField({
          name: "items",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                defineField({ name: "index", type: "string" }),
                defineField({ name: "title", type: "string" }),
                defineField({
                  name: "body",
                  type: "text",
                  rows: 2,
                  description: PUBLIC_CONTENT_GUIDANCE,
                }),
              ],
            },
          ],
        }),
      ],
    }),
    defineField({
      name: "applications",
      type: "object",
      fields: [
        ...block,
        defineField({
          name: "featured",
          type: "object",
          fields: [
            defineField({ name: "title", type: "string" }),
            defineField({
              name: "body",
              type: "text",
              rows: 3,
              description: PUBLIC_CONTENT_GUIDANCE,
            }),
          ],
        }),
        defineField({
          name: "others",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                defineField({ name: "title", type: "string" }),
                defineField({ name: "body", type: "text", rows: 2 }),
              ],
            },
          ],
        }),
      ],
    }),
    defineField({
      name: "research",
      type: "object",
      fields: [
        ...block,
        defineField({
          name: "items",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                defineField({ name: "title", type: "string" }),
                defineField({ name: "body", type: "text", rows: 2 }),
              ],
            },
          ],
        }),
      ],
    }),
    defineField({
      name: "quality",
      type: "object",
      fields: [
        ...block,
        defineField({
          name: "items",
          type: "array",
          of: [
            {
              type: "object",
              fields: [
                defineField({ name: "title", type: "string" }),
                defineField({ name: "body", type: "text", rows: 2 }),
              ],
            },
          ],
        }),
      ],
    }),
    defineField({ name: "sustainability", type: "object", fields: [...block] }),
    defineField({ name: "company", type: "object", fields: [...block] }),
    defineField({
      name: "cta",
      type: "object",
      fields: [
        defineField({ name: "title", type: "string" }),
        defineField({
          name: "body",
          type: "text",
          rows: 3,
          description: PUBLIC_CONTENT_GUIDANCE,
        }),
      ],
    }),
  ],
  preview: {
    prepare: () => ({ title: "Homepage" }),
  },
});
