import { defineArrayMember, defineField } from "sanity";
import { isSafeInternalPath } from "@/lib/safe-url";
import { PUBLIC_CONTENT_GUIDANCE } from "@/sanity/constants";

const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

export const lifecycleField = defineField({
  name: "lifecycle",
  title: "Publication lifecycle",
  type: "string",
  description:
    "Only lifecycle=published documents are eligible for the public site after Sanity publish. Draft/review/approved remain off www.vsgh.com.",
  options: {
    list: [
      { title: "Draft", value: "draft" },
      { title: "Review", value: "review" },
      { title: "Approved", value: "approved" },
      { title: "Published", value: "published" },
      { title: "Archived", value: "archived" },
    ],
    layout: "radio",
  },
  initialValue: "draft",
  validation: (rule) => rule.required(),
});

export const seoFields = [
  defineField({
    name: "seoTitle",
    title: "SEO title",
    type: "string",
    description: PUBLIC_CONTENT_GUIDANCE,
    validation: (rule) => rule.required().max(70),
  }),
  defineField({
    name: "description",
    title: "SEO / meta description",
    type: "text",
    rows: 3,
    validation: (rule) => rule.required().max(180),
  }),
  defineField({
    name: "ogTitle",
    title: "OG title override",
    type: "string",
    validation: (rule) => rule.max(70),
  }),
  defineField({
    name: "ogDescription",
    title: "OG description override",
    type: "text",
    rows: 3,
    validation: (rule) => rule.max(180),
  }),
  defineField({
    name: "ogImage",
    title: "OG image",
    type: "publicImage",
  }),
];

export const ctaField = defineField({
  name: "cta",
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
      description: "Internal path beginning with /",
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
      validation: (rule) => rule.required().max(40),
    }),
    defineField({
      name: "secondaryHref",
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
  ],
});

export const sectionMember = defineArrayMember({
  type: "object",
  name: "section",
  fields: [
    defineField({
      name: "title",
      type: "string",
      validation: (rule) => rule.required().max(120),
    }),
    defineField({
      name: "body",
      type: "text",
      rows: 4,
      description: PUBLIC_CONTENT_GUIDANCE,
      validation: (rule) => rule.required().max(1200),
    }),
  ],
});

export const stageMember = defineArrayMember({
  type: "object",
  name: "stage",
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
  ],
});

export const statusMember = defineArrayMember({
  type: "object",
  name: "statusBand",
  fields: [
    defineField({
      name: "label",
      type: "string",
      validation: (rule) => rule.required().max(40),
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
});
export const relatedMember = defineArrayMember({
  type: "object",
  name: "relatedLink",
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
});

export const slugField = defineField({
  name: "slug",
  title: "Slug",
  type: "slug",
  options: { source: "navLabel", maxLength: 96 },
  validation: (rule) =>
    rule.required().custom((value) => {
      const current = value?.current;
      if (!current) {
        return "Required";
      }
      return slugPattern.test(current)
        ? true
        : "Use lowercase hyphenated slugs";
    }),
});

export const titleSlugField = defineField({
  name: "slug",
  title: "Slug",
  type: "slug",
  options: { source: "title", maxLength: 96 },
  validation: (rule) =>
    rule.required().custom((value) => {
      const current = value?.current;
      if (!current) {
        return "Required";
      }
      return slugPattern.test(current)
        ? true
        : "Use lowercase hyphenated slugs";
    }),
});
