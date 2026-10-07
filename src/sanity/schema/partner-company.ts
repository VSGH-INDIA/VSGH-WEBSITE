import { defineField, defineType } from "sanity";
import { PUBLIC_CONTENT_GUIDANCE } from "@/sanity/constants";
import { lifecycleField, titleSlugField } from "@/sanity/schema/objects";

const groups = [
  { name: "profile", title: "Profile", default: true },
  { name: "contact", title: "Public contact" },
  { name: "placement", title: "Global Programmes placement" },
  { name: "publishing", title: "Publishing" },
];

export const partnerCompany = defineType({
  name: "partnerCompany",
  title: "Partner company",
  type: "document",
  description:
    "An approved public profile for a company connected to VSGH Global Programmes. Do not publish confidential programme, customer, export-controlled, or unverified information.",
  groups,
  fields: [
    { ...lifecycleField, group: "publishing" },
    defineField({
      name: "companyName",
      title: "Company name",
      type: "string",
      group: "profile",
      validation: (rule) => rule.required().max(120),
    }),
    {
      ...titleSlugField,
      group: "publishing",
      options: { source: "companyName", maxLength: 96 },
    },
    defineField({
      name: "logo",
      title: "Approved public company logo",
      type: "publicImage",
      group: "profile",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "overview",
      title: "Public company overview",
      type: "text",
      rows: 5,
      group: "profile",
      description: PUBLIC_CONTENT_GUIDANCE,
      validation: (rule) => rule.required().max(1_200),
    }),
    defineField({
      name: "services",
      title: "Public services / capabilities",
      type: "array",
      group: "profile",
      description: "Use concise, approved public terms only.",
      of: [{ type: "string", validation: (rule) => rule.required().max(100) }],
      validation: (rule) => rule.required().min(1).max(12).unique(),
    }),
    defineField({
      name: "website",
      title: "Official website",
      type: "url",
      group: "profile",
      validation: (rule) => rule.required().uri({ scheme: ["https"] }),
    }),
    defineField({
      name: "contact",
      title: "Public business contact",
      type: "object",
      group: "contact",
      fields: [
        defineField({
          name: "name",
          title: "Contact name",
          type: "string",
          validation: (rule) => rule.required().max(120),
        }),
        defineField({
          name: "role",
          title: "Role",
          type: "string",
          validation: (rule) => rule.max(120),
        }),
        defineField({
          name: "email",
          title: "Public email address",
          type: "string",
          validation: (rule) => rule.required().email().max(254),
        }),
        defineField({
          name: "phone",
          title: "Public telephone number",
          type: "string",
          validation: (rule) => rule.max(40),
        }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "locations",
      title: "Public addresses",
      type: "array",
      group: "contact",
      of: [
        {
          type: "object",
          name: "partnerLocation",
          fields: [
            defineField({
              name: "label",
              title: "Location label",
              type: "string",
              validation: (rule) => rule.required().max(80),
            }),
            defineField({
              name: "address",
              title: "Public address",
              type: "text",
              rows: 3,
              validation: (rule) => rule.required().max(400),
            }),
          ],
          preview: { select: { title: "label", subtitle: "address" } },
        },
      ],
      validation: (rule) => rule.required().min(1).max(6),
    }),
    defineField({
      name: "displayOnGlobalProgrammes",
      title: "Display on Global Programmes",
      type: "boolean",
      group: "placement",
      description:
        "Only published records with this control enabled can appear in the public partner directory.",
      initialValue: false,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "globalProgrammesOrder",
      title: "Global Programmes display order",
      type: "number",
      group: "placement",
      initialValue: 100,
      validation: (rule) => rule.required().integer().min(0).max(9_999),
    }),
  ],
  preview: {
    select: { title: "companyName", subtitle: "website", media: "logo" },
  },
});
