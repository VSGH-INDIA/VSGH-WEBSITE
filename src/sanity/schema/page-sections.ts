import { defineField, defineType } from "sanity";
import { isSafeInternalPath } from "@/lib/safe-url";
import { PUBLIC_CONTENT_GUIDANCE } from "@/sanity/constants";

const textBlock = [
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
    validation: (rule) => rule.max(1200),
  }),
];

export const heroBlock = defineType({
  name: "heroBlock",
  title: "Hero",
  type: "object",
  fields: [
    ...textBlock,
    defineField({
      name: "emphasis",
      type: "string",
      validation: (rule) => rule.max(80),
    }),
    defineField({
      name: "mediaLabel",
      type: "string",
      validation: (rule) => rule.max(120),
    }),
    defineField({ name: "media", type: "publicImage" }),
  ],
});

export const introBlock = defineType({
  name: "introBlock",
  title: "Intro",
  type: "object",
  fields: textBlock,
});

export const richTextBlock = defineType({
  name: "richTextBlock",
  title: "Structured text",
  type: "object",
  description: "Plain text paragraphs only. Raw HTML is not permitted.",
  fields: [
    defineField({
      name: "title",
      type: "string",
      validation: (rule) => rule.max(160),
    }),
    defineField({
      name: "paragraphs",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "title",
              type: "string",
              validation: (rule) => rule.max(160),
            }),
            defineField({
              name: "body",
              type: "text",
              rows: 5,
              description: PUBLIC_CONTENT_GUIDANCE,
              validation: (rule) => rule.required().max(4000),
            }),
          ],
        },
      ],
    }),
  ],
});

export const mediaBlock = defineType({
  name: "mediaBlock",
  title: "Media",
  type: "object",
  fields: [
    defineField({
      name: "mediaLabel",
      type: "string",
      validation: (rule) => rule.max(120),
    }),
    defineField({ name: "media", type: "publicImage" }),
    defineField({
      name: "body",
      type: "text",
      rows: 3,
      description: PUBLIC_CONTENT_GUIDANCE,
      validation: (rule) => rule.max(400),
    }),
  ],
});

export const processBlock = defineType({
  name: "processBlock",
  title: "Process",
  type: "object",
  fields: [
    defineField({
      name: "title",
      type: "string",
      validation: (rule) => rule.max(160),
    }),
    defineField({
      name: "stages",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "index",
              type: "string",
              validation: (rule) => rule.max(12),
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
          ],
        },
      ],
    }),
  ],
});

export const relatedContentBlock = defineType({
  name: "relatedContentBlock",
  title: "Related content",
  type: "object",
  fields: [
    defineField({
      name: "title",
      type: "string",
      validation: (rule) => rule.max(160),
    }),
    defineField({
      name: "related",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "href",
              type: "string",
              validation: (rule) =>
                rule
                  .required()
                  .custom((value) =>
                    typeof value === "string" && isSafeInternalPath(value)
                      ? true
                      : "Use an internal site path beginning with a single /",
                  ),
            }),
            defineField({
              name: "label",
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
  ],
});

export const ctaSectionBlock = defineType({
  name: "ctaSectionBlock",
  title: "Call to action",
  type: "object",
  fields: [
    defineField({
      name: "title",
      type: "string",
      validation: (rule) => rule.required().max(120),
    }),
    defineField({
      name: "body",
      type: "text",
      rows: 3,
      description: PUBLIC_CONTENT_GUIDANCE,
      validation: (rule) => rule.required().max(400),
    }),
    defineField({
      name: "primaryLabel",
      type: "string",
      validation: (rule) => rule.required().max(40),
    }),
    defineField({
      name: "primaryHref",
      type: "string",
      validation: (rule) =>
        rule
          .required()
          .custom((value) =>
            typeof value === "string" && isSafeInternalPath(value)
              ? true
              : "Use an internal site path beginning with a single /",
          ),
    }),
    defineField({
      name: "secondaryLabel",
      type: "string",
      validation: (rule) => rule.max(40),
    }),
    defineField({
      name: "secondaryHref",
      type: "string",
      validation: (rule) =>
        rule.custom((value) =>
          !value || (typeof value === "string" && isSafeInternalPath(value))
            ? true
            : "Use an internal site path beginning with a single /",
        ),
    }),
  ],
});

export const pageSectionTypes = [
  heroBlock,
  introBlock,
  richTextBlock,
  mediaBlock,
  processBlock,
  relatedContentBlock,
  ctaSectionBlock,
];

export const pageBuilderField = defineField({
  name: "pageBuilder",
  title: "Page sections",
  type: "array",
  description:
    "Structured composition blocks only. Do not paste HTML or unpublished technical data.",
  of: pageSectionTypes.map((type) => ({ type: type.name })),
});
