import type { CapabilityPageContent } from "@/content/types";

export const sustainabilityPage = {
  slug: "sustainability",
  path: "/sustainability",
  navLabel: "Sustainability",
  seoTitle: "Sustainability",
  description:
    "VSGH treats sustainability as resource efficiency through materials engineering: recovery, purification, development, and application. No environmental metrics are published.",
  domain: "Sustainability",
  parentPath: "/",
  eyebrow: "[ Sustainability ] · resource efficiency",
  headline: "Recovery is the input. Engineering is the value.",
  lede: "Sustainability at VSGH is not a separate green brand. It is the same materials chain: recovered resource becomes feedstock, feedstock becomes engineered material, and value is judged in application. This page publishes no carbon, energy, water, or diversion figures.",
  mediaLabel: "Sustainability visual · placeholder",
  sections: [
    {
      title: "Engineering, not environmental marketing",
      body: "Public language stays qualitative: resource efficiency, material recovery, circular pathways as an engineering intention, responsible development, and lifecycle thinking. Invented percentages would be a claim. They are omitted.",
    },
    {
      title: "What is not stated",
      body: "No carbon-reduction figures, no climate-end-state programmes, no ESG scores, no environmental certificates, no regulatory compliance badges. If such a fact is later approved for public use, it will be written as a fact — not as decoration.",
    },
  ],
  stages: [
    {
      index: "[01]",
      title: "Resource",
      body: "Recovered or resource-derived input as the start of a materials programme.",
    },
    {
      index: "[02]",
      title: "Recovery",
      body: "Concentrating value-bearing streams under controlled handling.",
    },
    {
      index: "[03]",
      title: "Purification",
      body: "Making a feedstock suitable for metallurgy. Methods unpublished.",
    },
    {
      index: "[04]",
      title: "Material development",
      body: "Iterating toward a usable material state.",
    },
    {
      index: "[05]",
      title: "Engineering value",
      body: "Capability judged by fitness questions, not by scrap volume.",
    },
    {
      index: "[06]",
      title: "Advanced application",
      body: "Intended use in demanding environments — without operational claims.",
    },
  ],
  related: [
    {
      href: "/technology/resource-recovery",
      label: "Technology · resource recovery",
      body: "Where the engineering sequence begins.",
    },
    {
      href: "/materials/overview",
      label: "Materials",
      body: "What recovery is for.",
    },
  ],
  cta: {
    title: "The chain continues in materials and technology.",
    body: "Qualification still gates application language.",
    primary: { href: "/materials/overview", label: "Materials" },
    secondary: { href: "/contact", label: "Contact VSGH" },
  },
} as const satisfies CapabilityPageContent;
