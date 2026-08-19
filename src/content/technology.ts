import type { CapabilityPageContent } from "@/content/types";

export const technologyPages = {
  "resource-recovery": {
    slug: "resource-recovery",
    path: "/technology/resource-recovery",
    navLabel: "Resource recovery",
    seoTitle: "Resource recovery",
    description:
      "VSGH resource recovery treats recovered streams as feedstock for materials work. It is not a generic recycling service description and discloses no process parameters.",
    domain: "Technology",
    parentPath: "/technology/resource-recovery",
    eyebrow: "[ Technology ] · resource recovery",
    headline: "Recovery is the start of an engineering sequence.",
    lede: "Resource recovery at VSGH is feedstock preparation: identifying, receiving, and concentrating value-bearing streams so that purification and metallurgy can follow. This is not a municipal recycling narrative and not a disclosure of plant design.",
    mediaLabel: "Resource recovery visual · placeholder",
    sections: [
      {
        title: "Feedstock, not an end-product",
        body: "Recovered material is treated as the beginning of a materials programme. Public language does not invent diversion rates, tonnages, or customer waste contracts.",
      },
      {
        title: "Where it sits in the chain",
        body: "Recovery precedes purification. Purification precedes metallurgy and processing. Application is last, and only as a discussion of fitness — not as a claim of use.",
      },
    ],
    stages: [
      {
        index: "[01]",
        title: "Identify",
        body: "Streams that may be suitable for materials work, under controlled handling.",
      },
      {
        index: "[02]",
        title: "Receive",
        body: "Intake as an engineering activity, not as an open dump.",
      },
      {
        index: "[03]",
        title: "Concentrate",
        body: "Separate value-bearing fractions. Methods remain unpublished.",
      },
      {
        index: "[04]",
        title: "Hand to purification",
        body: "Pass a defined feedstock question to the next discipline.",
      },
    ],
    related: [
      {
        href: "/technology/purification",
        label: "Purification",
        body: "Reducing unwanted constituents before metallurgy.",
      },
      {
        href: "/materials/overview",
        label: "Materials overview",
        body: "What recovery is for: a materials programme.",
      },
    ],
    cta: {
      title: "Purification makes metallurgy possible.",
      body: "Unwanted constituents are a materials problem before they are a marketing story.",
      primary: { href: "/technology/purification", label: "Purification" },
      secondary: { href: "/materials/overview", label: "Materials" },
    },
  },
  purification: {
    slug: "purification",
    path: "/technology/purification",
    navLabel: "Purification",
    seoTitle: "Purification",
    description:
      "VSGH purification is the reduction of unwanted constituents to levels required for subsequent metallurgy. Chemistries and process windows are not published.",
    domain: "Technology",
    parentPath: "/technology/resource-recovery",
    eyebrow: "[ Technology ] · purification",
    headline: "Purity as a requirement for metallurgy, not a slogan.",
    lede: "Purification sits between recovery and alloy or process development. The public statement is the purpose: make a feedstock suitable for materials work. The public statement is not a flowsheet.",
    mediaLabel: "Purification visual · placeholder",
    sections: [
      {
        title: "Why it is separate from recovery",
        body: "Concentration is not the same as meeting a materials requirement. Purification is the discipline that asks whether a stream can enter metallurgy.",
      },
      {
        title: "What remains internal",
        body: "Reagents, temperatures, yields, and equipment identities stay off this website.",
      },
    ],
    principles: [
      {
        index: "[01]",
        title: "Requirement",
        body: "The next materials step defines what “suitable” means. Those numbers are not listed here.",
      },
      {
        index: "[02]",
        title: "Control",
        body: "Unwanted constituents are treated as a controlled problem.",
      },
      {
        index: "[03]",
        title: "Handoff",
        body: "Purified feedstock is an input to metallurgy and processing, not a retail product.",
      },
    ],
    related: [
      {
        href: "/technology/alloy-development",
        label: "Alloy development",
        body: "Where purified feedstock becomes a materials question.",
      },
      {
        href: "/materials/processing",
        label: "Materials · processing",
        body: "Conversion after a feedstock is fit to process.",
      },
    ],
    cta: {
      title: "Alloy and process development sit next.",
      body: "Composition and processing studies, described as capability classes.",
      primary: {
        href: "/technology/alloy-development",
        label: "Alloy development",
      },
      secondary: {
        href: "/technology/advanced-materials",
        label: "Advanced materials",
      },
    },
  },
  "alloy-development": {
    slug: "alloy-development",
    path: "/technology/alloy-development",
    navLabel: "Alloy development",
    seoTitle: "Alloy development",
    description:
      "VSGH alloy development is composition and processing study directed at application-relevant behaviour. No alloy designations or compositions are published.",
    domain: "Technology",
    parentPath: "/technology/resource-recovery",
    eyebrow: "[ Technology ] · alloy development",
    headline: "Study alloys. Do not publish a catalogue.",
    lede: "Alloy development is an engineering class: change composition and processing with a question in mind, then measure. Designations, recipes, and intellectual property are not listed on this site.",
    mediaLabel: "Alloy development visual · placeholder",
    sections: [
      {
        title: "Capability, not a product line",
        body: "This page does not offer alloys for sale by name. It describes the work of developing alloy understanding from recovered and refined feedstocks.",
      },
      {
        title: "Link to materials metallurgy",
        body: "Metallurgy is the scientific framing. Alloy development is the technology programme that applies that framing to a question.",
      },
    ],
    principles: [
      {
        index: "[01]",
        title: "Question",
        body: "Behaviour of interest is stated as a question, not as a guaranteed result.",
      },
      {
        index: "[02]",
        title: "Study",
        body: "Composition and processing are varied under review. Variations are not tabulated here.",
      },
      {
        index: "[03]",
        title: "Measure",
        body: "Characterization decides whether the study produced understanding.",
      },
    ],
    related: [
      {
        href: "/materials/metallurgy",
        label: "Materials · metallurgy",
        body: "Structure–process–property as one problem.",
      },
      {
        href: "/technology/advanced-materials",
        label: "Advanced materials",
        body: "Systems intended for demanding service, still without specifications.",
      },
    ],
    cta: {
      title: "Advanced materials is the broader systems view.",
      body: "Manufacturing development asks how integrity survives scale-up thinking.",
      primary: {
        href: "/technology/advanced-materials",
        label: "Advanced materials",
      },
      secondary: { href: "/technology/manufacturing", label: "Manufacturing" },
    },
  },
  "advanced-materials": {
    slug: "advanced-materials",
    path: "/technology/advanced-materials",
    navLabel: "Advanced materials",
    seoTitle: "Advanced materials technology",
    description:
      "VSGH advanced materials technology addresses demanding thermal, mechanical, or environmental service as a capability class. No performance numbers are published.",
    domain: "Technology",
    parentPath: "/technology/resource-recovery",
    eyebrow: "[ Technology ] · advanced materials",
    headline: "Demanding service as a question, not a data sheet.",
    lede: "Advanced materials here means: develop material systems intended for severe thermal, mechanical, or environmental service. Intended is not demonstrated. Demonstrated belongs in a record that is not this website.",
    mediaLabel: "Advanced materials visual · placeholder",
    sections: [
      {
        title: "What “advanced” is allowed to mean",
        body: "It means the application class is demanding. It does not mean a published advantage over named competitors, a named composition, or a qualified product.",
      },
      {
        title: "Characterization and testing",
        body: "Those activities exist as technology classes. Methods, standards used, and results are not listed.",
      },
    ],
    principles: [
      {
        index: "[01]",
        title: "Environment",
        body: "Thermal, mechanical, and environmental service are discussed as contexts.",
      },
      {
        index: "[02]",
        title: "System",
        body: "Material is considered with processing and intended form, not as an isolated coupon claim.",
      },
      {
        index: "[03]",
        title: "Evidence",
        body: "Public text stays behind the evidence line.",
      },
    ],
    related: [
      {
        href: "/materials/qualification",
        label: "Materials · qualification",
        body: "How fitness language is gated.",
      },
      {
        href: "/applications/space",
        label: "Applications · space",
        body: "Extreme environment as context. Domain publishes when live.",
      },
    ],
    cta: {
      title: "Manufacturing development stays subordinate to integrity.",
      body: "Scale is not claimed. Thinking about scale is part of technology.",
      primary: { href: "/technology/manufacturing", label: "Manufacturing" },
      secondary: { href: "/research/overview", label: "Research" },
    },
  },
  manufacturing: {
    slug: "manufacturing",
    path: "/technology/manufacturing",
    navLabel: "Manufacturing",
    seoTitle: "Manufacturing development",
    description:
      "VSGH manufacturing development considers how material integrity survives scale-up thinking. No plant lists, capacities, or production volumes are published.",
    domain: "Technology",
    parentPath: "/technology/resource-recovery",
    eyebrow: "[ Technology ] · manufacturing",
    headline: "Scale-up thinking, not a factory tour.",
    lede: "Manufacturing development asks how a material state might be produced with integrity. This page does not list machines, sites, throughputs, or order books.",
    mediaLabel: "Manufacturing development visual · placeholder",
    sections: [
      {
        title: "Subordinate to material integrity",
        body: "If scale and integrity conflict, public language does not pretend scale won. Capacity figures are omitted because they are not approved for this site — and because inventing them would be a claim.",
      },
      {
        title: "Testing as a class of work",
        body: "Testing supports manufacturing development and qualification. Results are not posted.",
      },
    ],
    principles: [
      {
        index: "[01]",
        title: "Repeatability",
        body: "A route that cannot be discussed as controlled is not described as manufacturing capability.",
      },
      {
        index: "[02]",
        title: "Traceability",
        body: "Identity of material through conversion remains a requirement of the work, not a public log.",
      },
      {
        index: "[03]",
        title: "Restraint",
        body: "No production quantities. No equipment inventories.",
      },
    ],
    related: [
      {
        href: "/materials/processing",
        label: "Materials · processing",
        body: "Materials view of conversion.",
      },
      {
        href: "/about/facilities",
        label: "Facilities",
        body: "Capability classes without addresses.",
      },
    ],
    cta: {
      title: "Application is where capability is tested as a story.",
      body: "Applications pages discuss intended domains without heritage claims.",
      primary: { href: "/applications/aerospace", label: "Applications" },
      secondary: { href: "/contact", label: "Contact VSGH" },
    },
  },
} as const satisfies Record<string, CapabilityPageContent>;

export const technologyPageList = [
  technologyPages["resource-recovery"],
  technologyPages.purification,
  technologyPages["alloy-development"],
  technologyPages["advanced-materials"],
  technologyPages.manufacturing,
] as const;
