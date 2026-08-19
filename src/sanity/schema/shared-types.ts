import { defineField, defineType } from "sanity";
import { PUBLIC_CONTENT_GUIDANCE } from "@/sanity/constants";

export const publicImage = defineType({
  name: "publicImage",
  title: "Public media",
  type: "image",
  description:
    "Publication-safe imagery only. Not an IP, laboratory, or engineering file store.",
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
