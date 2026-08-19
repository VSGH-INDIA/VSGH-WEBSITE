import type { CapabilityPageContent } from "@/content/types";

export const MATERIAL_PATHWAY: CapabilityPageContent["stages"] = [
  {
    index: "[01]",
    title: "Resource",
    body: "Recovered or resource-derived feedstock identified as the start of a materials programme.",
  },
  {
    index: "[02]",
    title: "Material",
    body: "Development of a usable material state through metallurgy and processing — not a published grade list.",
  },
  {
    index: "[03]",
    title: "Metallurgy",
    body: "Structure, process, and property treated as one problem.",
  },
  {
    index: "[04]",
    title: "Processing",
    body: "Conversion from purified feedstock toward a controlled form.",
  },
  {
    index: "[05]",
    title: "Characterization",
    body: "Measurement that makes qualification possible. Methods stay unpublished.",
  },
  {
    index: "[06]",
    title: "Qualification",
    body: "Evidence under a defined programme. Status is not claimed on this site.",
  },
  {
    index: "[07]",
    title: "Application",
    body: "Fitness discussed in aerospace, defense, space, or industrial context — without operational claims.",
  },
];

export const materialsPages = {
  overview: {
    slug: "overview",
    path: "/materials/overview",
    navLabel: "Overview",
    seoTitle: "Materials overview",
    description:
      "VSGH materials work develops engineered capability from recovered feedstock through metallurgy, processing, characterization, and qualification — not a public product catalogue.",
    domain: "Materials",
    parentPath: "/materials/overview",
    eyebrow: "[ Materials ] · overview",
    headline: "Material capability, not a catalogue of grades.",
    lede: "VSGH develops materials as a programme: resource becomes feedstock, feedstock becomes material, material is characterized, and only then is application discussed. This domain does not list alloy numbers, compositions, or performance data.",
    mediaLabel: "Materials pathway visual · placeholder",
    sections: [
      {
        title: "What this domain covers",
        body: "Pages describe material-development, metallurgy, processing, and qualification as disciplines. They are not data sheets. If a number cannot be published, it is omitted.",
      },
      {
        title: "How materials relate to technology",
        body: "Technology is the engineering sequence that makes material work possible — recovery, purification, alloy and process development, manufacturing development. Materials describes what is being developed; technology describes how the work is structured.",
      },
    ],
    stages: MATERIAL_PATHWAY,
    related: [
      {
        href: "/technology/resource-recovery",
        label: "Technology · resource recovery",
        body: "Where the chain begins: feedstock preparation under controlled handling.",
      },
      {
        href: "/materials/qualification",
        label: "Qualification",
        body: "How evidence is treated before application language is used.",
      },
      {
        href: "/applications/aerospace",
        label: "Applications · aerospace",
        body: "Intended context, not a claim of deployment. Page publishes when that domain is live.",
      },
    ],
    cta: {
      title: "Follow the development sequence.",
      body: "Material development describes how capability is iterated. Metallurgy describes the scientific core.",
      primary: {
        href: "/materials/material-development",
        label: "Material development",
      },
      secondary: { href: "/technology/resource-recovery", label: "Technology" },
    },
  },
  "material-development": {
    slug: "material-development",
    path: "/materials/material-development",
    navLabel: "Material development",
    seoTitle: "Material development",
    description:
      "VSGH material development iterates composition, processing, and structure toward a usable material state. No grades or specifications are published here.",
    domain: "Materials",
    parentPath: "/materials/overview",
    eyebrow: "[ Materials ] · development",
    headline: "Iterate toward a usable material state.",
    lede: "Development is a controlled loop: ask a materials question, process a candidate state, measure, review, and decide. Public pages describe that loop. They do not publish windows, recipes, or target values.",
    mediaLabel: "Material development visual · placeholder",
    sections: [
      {
        title: "Resource-derived development",
        body: "Feedstock that began as recovered or resource-derived input is treated as the beginning of development, not as a finished commodity. Suitability is a programme question, not a slogan.",
      },
      {
        title: "What is not on this page",
        body: "No product codes, no composition tables, no mechanical or thermal figures. Those belong in controlled documents, if they exist, not on a public website.",
      },
    ],
    principles: [
      {
        index: "[01]",
        title: "Question",
        body: "Define the materials question before changing the material.",
      },
      {
        index: "[02]",
        title: "Process",
        body: "Apply a conversion route appropriate to the question — described here only as a class of work.",
      },
      {
        index: "[03]",
        title: "Measure",
        body: "Characterization decides whether the state is understood well enough to continue.",
      },
      {
        index: "[04]",
        title: "Review",
        body: "Development proceeds under defined review, not opportunistic specification.",
      },
    ],
    related: [
      {
        href: "/materials/metallurgy",
        label: "Metallurgy",
        body: "Structure–process–property thinking that sits inside every development loop.",
      },
      {
        href: "/technology/alloy-development",
        label: "Technology · alloy development",
        body: "How alloy and process studies are framed as engineering work.",
      },
    ],
    cta: {
      title: "Metallurgy is the scientific core.",
      body: "Processing and qualification complete the materials domain.",
      primary: { href: "/materials/metallurgy", label: "Metallurgy" },
      secondary: { href: "/materials/processing", label: "Processing" },
    },
  },
  metallurgy: {
    slug: "metallurgy",
    path: "/materials/metallurgy",
    navLabel: "Metallurgy",
    seoTitle: "Metallurgy",
    description:
      "VSGH metallurgy treats structure, processing, and properties as one problem for recovered and refined feedstocks. No alloy grades are listed.",
    domain: "Materials",
    parentPath: "/materials/overview",
    eyebrow: "[ Materials ] · metallurgy",
    headline: "Structure, process, and property as one problem.",
    lede: "Metallurgy at VSGH is the discipline that keeps feedstock history, processing, and measured behaviour connected. This page names the discipline. It does not name alloys.",
    mediaLabel: "Metallurgy visual · placeholder",
    sections: [
      {
        title: "Why metallurgy is public as a capability",
        body: "Without metallurgy, recovery is only a stream and application is only a wish. Public language stays at capability: understand how processing changes structure, and how structure relates to behaviour worth measuring.",
      },
      {
        title: "Alloy thinking without a catalogue",
        body: "Alloy development is a class of study. Compositions, designations, and intellectual property remain off this site.",
      },
    ],
    principles: [
      {
        index: "[01]",
        title: "Feedstock history",
        body: "Where the metal came from is part of the metallurgical question.",
      },
      {
        index: "[02]",
        title: "Processing path",
        body: "How it was converted is not published as a recipe; it is acknowledged as decisive.",
      },
      {
        index: "[03]",
        title: "Measured behaviour",
        body: "Properties are discussed as things to be measured, not as advertised numbers.",
      },
    ],
    related: [
      {
        href: "/technology/alloy-development",
        label: "Technology · alloy development",
        body: "Engineering framing of alloy and process studies.",
      },
      {
        href: "/research/research-areas",
        label: "Research areas",
        body: "Scientific questions that sit behind metallurgy. Domain publishes when live.",
      },
    ],
    cta: {
      title: "Processing converts understanding into a form.",
      body: "Qualification decides what may be said about fitness.",
      primary: { href: "/materials/processing", label: "Processing" },
      secondary: { href: "/materials/qualification", label: "Qualification" },
    },
  },
  processing: {
    slug: "processing",
    path: "/materials/processing",
    navLabel: "Processing",
    seoTitle: "Materials processing",
    description:
      "VSGH processing is the conversion of purified feedstock toward a controlled material form. Process parameters are not disclosed.",
    domain: "Materials",
    parentPath: "/materials/overview",
    eyebrow: "[ Materials ] · processing",
    headline: "Conversion under control, not a disclosed recipe.",
    lede: "Processing is the work of moving a purified feedstock toward a form that can be characterized. Routes are described as classes of capability. Temperatures, times, atmospheres, and equipment lists are not published.",
    mediaLabel: "Processing visual · placeholder",
    sections: [
      {
        title: "What processing means here",
        body: "It is the link between purification and a material state that can be measured. It is not a shop-floor tour and not a capacity statement.",
      },
      {
        title: "Relationship to technology",
        body: "Advanced processing and manufacturing development live in the technology domain. This page stays with the materials consequence of those routes.",
      },
    ],
    principles: [
      {
        index: "[01]",
        title: "Form",
        body: "The intended material form is part of the question, not an afterthought.",
      },
      {
        index: "[02]",
        title: "Control",
        body: "Conversion is treated as a controlled activity. Controls themselves remain internal.",
      },
      {
        index: "[03]",
        title: "Integrity",
        body: "Scale-up thinking stays subordinate to material integrity.",
      },
    ],
    related: [
      {
        href: "/technology/manufacturing",
        label: "Technology · manufacturing",
        body: "Manufacturing development as an engineering class, not a plant list.",
      },
      {
        href: "/technology/purification",
        label: "Technology · purification",
        body: "The step that precedes meaningful processing.",
      },
    ],
    cta: {
      title: "Qualification is how processing is judged.",
      body: "Evidence before application language.",
      primary: { href: "/materials/qualification", label: "Qualification" },
      secondary: { href: "/materials/overview", label: "Materials overview" },
    },
  },
  qualification: {
    slug: "qualification",
    path: "/materials/qualification",
    navLabel: "Qualification",
    seoTitle: "Materials qualification",
    description:
      "VSGH treats qualification as a programme of characterization, review, and evidence. No qualification status or certifications are claimed on this page.",
    domain: "Materials",
    parentPath: "/materials/overview",
    eyebrow: "[ Materials ] · qualification",
    headline: "Evidence before application language.",
    lede: "Qualification is the discipline of deciding what may be said about fitness for a use class. This page describes that discipline. It does not claim that any material is qualified, certified, or approved for flight or defence use.",
    mediaLabel: "Qualification visual · placeholder",
    sections: [
      {
        title: "A programme, not a badge",
        body: "Characterization, documentation, and review belong together. Public communication waits on that work. Absence of a status statement is intentional.",
      },
      {
        title: "Application readiness as language",
        body: "Readiness here means: the materials question is defined well enough to discuss application context. It does not mean a part is flying, fielded, or listed on an approved-supplier register.",
      },
    ],
    principles: [
      {
        index: "[01]",
        title: "Characterize",
        body: "Measure behaviour relevant to the question.",
      },
      {
        index: "[02]",
        title: "Record",
        body: "Keep a reviewable chain. The chain is not this website.",
      },
      {
        index: "[03]",
        title: "Review",
        body: "Fitness is decided under defined review, not by layout.",
      },
      {
        index: "[04]",
        title: "Speak",
        body: "Public claims stay inside what the record can carry.",
      },
    ],
    related: [
      {
        href: "/about/quality",
        label: "Quality",
        body: "How control is described without listing standards.",
      },
      {
        href: "/about/scientific-integrity",
        label: "Scientific integrity",
        body: "Separation of validated results from hypotheses.",
      },
      {
        href: "/applications/aerospace",
        label: "Applications",
        body: "Where qualification need is discussed as context, not heritage.",
      },
    ],
    cta: {
      title: "Technology is the other half of the chain.",
      body: "Resource recovery and purification sit upstream of materials work.",
      primary: {
        href: "/technology/resource-recovery",
        label: "Resource recovery",
      },
      secondary: { href: "/contact", label: "Contact VSGH" },
    },
  },
} as const satisfies Record<string, CapabilityPageContent>;

export const materialsPageList = [
  materialsPages.overview,
  materialsPages["material-development"],
  materialsPages.metallurgy,
  materialsPages.processing,
  materialsPages.qualification,
] as const;
