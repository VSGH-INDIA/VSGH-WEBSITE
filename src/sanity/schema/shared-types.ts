import { defineField, defineType } from "sanity";
import { PUBLIC_CONTENT_GUIDANCE } from "@/sanity/constants";

export const publicImage = defineType({
  name: "publicImage",
  title: "Public media",
  type: "image",
  description:
    "Publication-safe imagery only. Not an IP, laboratory, or engineering file store. Public render requires visibility=public, approval=approved, and alt text.",
  options: { hotspot: true },
  fields: [
    defineField({
      name: "alt",
      type: "string",
      title: "Accessible alternative text",
      validation: (rule) => rule.max(160),
    }),
    defineField({
      name: "caption",
      type: "string",
      validation: (rule) => rule.max(160),
    }),
    defineField({
      name: "credit",
      type: "string",
      validation: (rule) => rule.max(120),
    }),
    defineField({
      name: "usage",
      type: "string",
      options: {
        list: [
          { title: "Hero", value: "hero" },
          { title: "Editorial", value: "editorial" },
          { title: "Open Graph", value: "og" },
          { title: "Inline", value: "inline" },
          { title: "Gallery", value: "gallery" },
        ],
      },
      initialValue: "editorial",
    }),
    defineField({
      name: "approvalStatus",
      type: "string",
      options: {
        list: [
          { title: "Draft", value: "draft" },
          { title: "Review", value: "review" },
          { title: "Approved", value: "approved" },
        ],
        layout: "radio",
      },
      initialValue: "draft",
    }),
    defineField({
      name: "visibility",
      type: "string",
      options: {
        list: [
          { title: "Internal", value: "internal" },
          { title: "Public", value: "public" },
        ],
        layout: "radio",
      },
      initialValue: "internal",
    }),
    defineField({
      name: "aspectRatio",
      type: "string",
      options: {
        list: ["16/9", "4/5", "4/3", "1/1", "21/9"],
      },
      initialValue: "16/9",
    }),
    defineField({
      name: "cropMode",
      type: "string",
      options: {
        list: [
          { title: "Cover", value: "cover" },
          { title: "Contain", value: "contain" },
          { title: "Focal", value: "focal" },
        ],
      },
      initialValue: "cover",
    }),
  ],
});

export const emptyState = defineType({
  name: "emptyState",
  title: "Controlled empty state",
  type: "object",
  fields: [
    defineField({
      name: "eyebrow",
      type: "string",
      validation: (rule) => rule.required().max(80),
    }),
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
  ],
});
