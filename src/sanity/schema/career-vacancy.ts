import { defineField, defineType } from "sanity";
import { PUBLIC_CONTENT_GUIDANCE } from "@/sanity/constants";
import { lifecycleField, titleSlugField } from "@/sanity/schema/objects";

export const careerVacancy = defineType({
  name: "careerVacancy",
  title: "Career vacancy",
  type: "document",
  description:
    "Public vacancy copy only when a role is authorized. Do not invent openings, salaries, or headcount. No applicant collection.",
  fields: [
    lifecycleField,
    defineField({
      name: "title",
      type: "string",
      validation: (rule) => rule.required().max(120),
    }),
    titleSlugField,
    defineField({
      name: "discipline",
      type: "string",
      options: {
        list: [
          "Aerospace",
          "Advanced materials",
          "Metallurgy",
          "Engineering",
          "Manufacturing",
          "Scientific research",
          "Software / digital engineering",
          "Quality",
          "Operations",
        ],
      },
    }),
    defineField({
      name: "location",
      type: "string",
      description: "Only an approved public location. Leave empty otherwise.",
      validation: (rule) => rule.max(80),
    }),
    defineField({
      name: "employmentType",
      type: "string",
      options: {
        list: ["Full-time", "Part-time", "Contract", "Not stated"],
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
      name: "description",
      type: "text",
      rows: 8,
      description: PUBLIC_CONTENT_GUIDANCE,
    }),
    defineField({
      name: "posted",
      type: "date",
      description: "Leave empty until the vacancy is truly posted.",
    }),
    defineField({
      name: "vacancyStatus",
      type: "string",
      options: {
        list: [
          { title: "Open", value: "open" },
          { title: "Closed", value: "closed" },
        ],
      },
      initialValue: "closed",
    }),
  ],
  preview: {
    select: { title: "title", lifecycle: "lifecycle" },
    prepare: ({ title, lifecycle }) => ({
      title: title ?? "Untitled vacancy",
      subtitle: lifecycle ?? "draft",
    }),
  },
});
