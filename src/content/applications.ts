import type { CapabilityPageContent } from "@/content/types";

export const applicationsPages = {
  aerospace: {
    slug: "aerospace",
    path: "/applications/aerospace",
    navLabel: "Aerospace",
    seoTitle: "Aerospace applications",
    description:
      "VSGH discusses aerospace as an intended application class for engineered materials: structural, thermal, and propulsion-adjacent contexts. No programme history or customer use is claimed.",
    domain: "Applications",
    parentPath: "/applications/aerospace",
    eyebrow: "[ Applications ] · aerospace",
    headline: "Aerospace as a fitness question, not a heritage claim.",
    lede: "Aerospace is where mass, temperature, structure, and manufacturing discipline meet. VSGH describes that meeting as a materials and qualification need. This page does not say that VSGH materials are flying or used on named programmes.",
    mediaLabel: "Aerospace application visual · placeholder",
    sections: [
      {
        title: "Material capability to engineering requirement",
        body: "Public discussion starts from capability classes — lightweight intent, thermal environments, structural demand, propulsion-adjacent materials, manufacturing discipline — and asks what evidence a qualification programme would need. It does not publish those evidence values.",
      },
      {
        title: "Intended use, not operational use",
        body: "“Intended” means the domain is a legitimate context for materials work. It does not mean deployed, qualified, or approved.",
      },
    ],
    stages: [
      {
        index: "[01]",
        title: "Capability",
        body: "Materials and process classes under development, without a catalogue.",
      },
      {
        index: "[02]",
        title: "Requirements",
        body: "Mass, thermal, structural, and manufacturing questions stated as questions.",
      },
      {
        index: "[03]",
        title: "Domain",
        body: "Aerospace as the context in which those questions matter.",
      },
      {
        index: "[04]",
        title: "Qualification need",
        body: "Fitness would require a programme of evidence. Status is not claimed.",
      },
      {
        index: "[05]",
        title: "Intended use",
        body: "Future or intended application language only.",
      },
    ],
    related: [
      {
        href: "/materials/qualification",
        label: "Materials · qualification",
        body: "How evidence gates application language.",
      },
      {
        href: "/technology/advanced-materials",
        label: "Technology · advanced materials",
        body: "Demanding service as a technology class.",
      },
      {
        href: "/research/overview",
        label: "Research",
        body: "Where known, under development, and exploratory work are separated.",
      },
    ],
    cta: {
      title: "Defense and space are adjacent contexts.",
      body: "The same restraint applies: capability and need, not operations.",
      primary: { href: "/applications/defense", label: "Defense" },
      secondary: { href: "/applications/space", label: "Space" },
    },
  },
  defense: {
    slug: "defense",
    path: "/applications/defense",
    navLabel: "Defense",
    seoTitle: "Defense applications",
    description:
      "VSGH discusses defense as a controlled application class for materials and engineering. No programmes, customers, weapons, or operational claims are published.",
    domain: "Applications",
    parentPath: "/applications/aerospace",
    eyebrow: "[ Applications ] · defense",
    headline: "Defense relevance without operational claims.",
    lede: "Defense environments can be severe, regulated, and information-sensitive. VSGH’s public statement is limited: materials and engineering work may be relevant. This page does not describe weapon systems, named programmes, customers, or fielded use.",
    mediaLabel: "Defense application visual · placeholder",
    sections: [
      {
        title: "Controlled language",
        body: "If a detail would identify a programme, a platform, or a restricted requirement, it does not belong here. Capability is described at the level of materials, processing, characterization, and qualification discipline.",
      },
      {
        title: "What is refused",
        body: "No “used by”, no “approved by”, no “certified for”, no inventories of military application. Absence is policy, not an empty layout.",
      },
    ],
    principles: [
      {
        index: "[01]",
        title: "Severity",
        body: "Demanding environments are acknowledged as a class of requirement.",
      },
      {
        index: "[02]",
        title: "Traceability",
        body: "Defense-relevant work, if any, would still be a materials record problem — kept internal.",
      },
      {
        index: "[03]",
        title: "Silence",
        body: "Operational, customer, and weapons detail stay off the public site.",
      },
    ],
    related: [
      {
        href: "/about/scientific-integrity",
        label: "Scientific integrity",
        body: "Public claims stay inside the record.",
      },
      {
        href: "/materials/overview",
        label: "Materials",
        body: "Capability without a product list.",
      },
    ],
    cta: {
      title: "Space is another extreme-environment context.",
      body: "Industrial applications broaden the same engineering story.",
      primary: { href: "/applications/space", label: "Space" },
      secondary: {
        href: "/applications/advanced-industrial",
        label: "Advanced industrial",
      },
    },
  },
  space: {
    slug: "space",
    path: "/applications/space",
    navLabel: "Space",
    seoTitle: "Space applications",
    description:
      "VSGH discusses space as an intended context for materials in extreme thermal, structural, and reliability environments. No programme history is claimed.",
    domain: "Applications",
    parentPath: "/applications/aerospace",
    eyebrow: "[ Applications ] · space",
    headline: "Extreme environment as a materials question.",
    lede: "Space systems punish mass, temperature extremes, and unattended reliability. VSGH names those as reasons materials work is hard. It does not claim programme history, launches, or proven flight status.",
    mediaLabel: "Space application visual · placeholder",
    sections: [
      {
        title: "Themes, not specifications",
        body: "Thermal environment, structural demand, mass efficiency, reliability, manufacturing discipline, and qualification need may be discussed as themes. Values, test results, and mission names may not.",
      },
      {
        title: "Heritage is not implied",
        body: "A placeholder image is not a satellite. A sentence about vacuum or thermal cycling is not a test report.",
      },
    ],
    stages: [
      {
        index: "[01]",
        title: "Thermal",
        body: "Environment as a question for material behaviour.",
      },
      {
        index: "[02]",
        title: "Structural",
        body: "Load and stiffness as questions, not published allowables.",
      },
      {
        index: "[03]",
        title: "Mass",
        body: "Efficiency as an engineering pressure, not a claimed density.",
      },
      {
        index: "[04]",
        title: "Reliability",
        body: "Unattended service as a qualification need.",
      },
    ],
    related: [
      {
        href: "/technology/advanced-materials",
        label: "Advanced materials technology",
        body: "Demanding service without data sheets.",
      },
      {
        href: "/research/research-areas",
        label: "Research areas",
        body: "Scientific questions behind extreme-environment materials.",
      },
    ],
    cta: {
      title: "Industrial applications keep the same standard of speech.",
      body: "Premium engineering, not a commodity catalogue.",
      primary: {
        href: "/applications/advanced-industrial",
        label: "Advanced industrial",
      },
      secondary: { href: "/contact", label: "Contact VSGH" },
    },
  },
  "advanced-industrial": {
    slug: "advanced-industrial",
    path: "/applications/advanced-industrial",
    navLabel: "Advanced industrial",
    seoTitle: "Advanced industrial applications",
    description:
      "VSGH discusses advanced industrial use as high-duty application of engineered material from recovered feedstock — not a generic industrial catalogue or scrap supply offer.",
    domain: "Applications",
    parentPath: "/applications/aerospace",
    eyebrow: "[ Applications ] · advanced industrial",
    headline: "High-duty industry, still a materials company.",
    lede: "Advanced industrial use is where recovered feedstock can become engineered material for severe industrial duty. VSGH does not use this page to become a generic metals merchant or a recycling brochure.",
    mediaLabel: "Advanced industrial visual · placeholder",
    sections: [
      {
        title: "Same chain, different context",
        body: "Resource → material → engineering → qualification need → intended use still applies. The context is industrial duty, not aerospace certification theatre and not a SKU list.",
      },
      {
        title: "What is not sold here",
        body: "No commodity grades, no tonnage offers, no unnamed “clients in energy and automotive”. If a sector cannot be discussed without inventing a customer, it is omitted.",
      },
    ],
    principles: [
      {
        index: "[01]",
        title: "Duty",
        body: "High thermal, mechanical, or environmental duty as a class of need.",
      },
      {
        index: "[02]",
        title: "Engineering",
        body: "Material is the product of a programme, not of a trading desk.",
      },
      {
        index: "[03]",
        title: "Evidence",
        body: "Industrial application language still waits on characterization.",
      },
    ],
    related: [
      {
        href: "/materials/overview",
        label: "Materials",
        body: "Capability without a catalogue.",
      },
      {
        href: "/technology/manufacturing",
        label: "Manufacturing development",
        body: "Scale-up thinking without plant lists.",
      },
    ],
    cta: {
      title: "Research is where the questions live.",
      body: "Known, under development, and exploratory work are labelled separately.",
      primary: { href: "/research/overview", label: "Research overview" },
      secondary: { href: "/applications/aerospace", label: "Aerospace" },
    },
  },
} as const satisfies Record<string, CapabilityPageContent>;

export const applicationsPageList = [
  applicationsPages.aerospace,
  applicationsPages.defense,
  applicationsPages.space,
  applicationsPages["advanced-industrial"],
] as const;
