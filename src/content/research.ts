import type { CapabilityPageContent } from "@/content/types";

export const researchPages = {
  overview: {
    slug: "overview",
    path: "/research/overview",
    navLabel: "Overview",
    seoTitle: "Research overview",
    description:
      "VSGH research is materials science and engineering development. Public pages separate known principles, work under development, and exploratory questions. No unpublished results are posted.",
    domain: "Research",
    parentPath: "/research/overview",
    eyebrow: "[ Research ] · overview",
    headline: "Scientific direction, labelled by how sure we are.",
    lede: "Research at VSGH exists to make materials work understandable. This domain describes scientific and engineering direction. It does not publish experimental parameters, datasets, or papers that have not been authorized for the public record.",
    mediaLabel: "Research overview visual · placeholder",
    sections: [
      {
        title: "A development environment, not a results feed",
        body: "Materials science, metallurgy, process development, characterization, testing, computational engineering, qualification, and advanced manufacturing may be named as areas of attention. Results from those areas stay inside controlled records until release is approved.",
      },
      {
        title: "How to read this domain",
        body: "If a statement is a principle, it is labelled as known. If it is a programme of work, it is under development. If it is a question, it is exploratory. Established capability is not implied by layout.",
      },
    ],
    statuses: [
      {
        label: "Known",
        title: "Principles we will stand behind in public",
        body: "Evidence before declaration. Recovery is feedstock. Qualification is a programme. These are statements of method, not of measured performance.",
      },
      {
        label: "Validated",
        title: "Results that may appear only when authorized",
        body: "Validated experimental outcomes are not listed on this website. When a result is approved for public release, it will be written as a result — not as a teaser.",
      },
      {
        label: "Under development",
        title: "Active scientific and engineering work",
        body: "Process development, characterization methods, and qualification thinking proceed internally. Public text names the class of work, not the state of a trial.",
      },
      {
        label: "Future / exploratory",
        title: "Questions, not capabilities",
        body: "Exploratory ideas are labelled as such. They are not offered as products or as proven routes.",
      },
    ],
    related: [
      {
        href: "/research/research-areas",
        label: "Research areas",
        body: "The scientific map, still without datasets.",
      },
      {
        href: "/materials/metallurgy",
        label: "Materials · metallurgy",
        body: "Where research questions become materials language.",
      },
    ],
    cta: {
      title: "Areas and the public record.",
      body: "Publications will list only what is authorized. The list may be empty.",
      primary: { href: "/research/research-areas", label: "Research areas" },
      secondary: { href: "/research/publications", label: "Publications" },
    },
  },
  "research-areas": {
    slug: "research-areas",
    path: "/research/research-areas",
    navLabel: "Research areas",
    seoTitle: "Research areas",
    description:
      "VSGH research areas include materials science, metallurgy, process development, characterization, testing, computational engineering, qualification, and advanced manufacturing — as directions, not as result sets.",
    domain: "Research",
    parentPath: "/research/overview",
    eyebrow: "[ Research ] · areas",
    headline: "A map of questions, not a library of answers.",
    lede: "Each area is a legitimate scientific or engineering attention. None is a claim that a paper, a dataset, or a validated process window is available here.",
    mediaLabel: "Research areas visual · placeholder",
    sections: [
      {
        title: "How areas are listed",
        body: "Titles are capability classes. Bodies say what kind of question belongs there. Methods and findings remain unpublished unless a later authorized record says otherwise.",
      },
    ],
    principles: [
      {
        index: "[01]",
        title: "Materials science",
        body: "Structure and behaviour as objects of study. Under development internally; not a public corpus.",
      },
      {
        index: "[02]",
        title: "Metallurgy",
        body: "Feedstock, process, and property as one research problem.",
      },
      {
        index: "[03]",
        title: "Process development",
        body: "Routes from feedstock to form. Windows stay off the site.",
      },
      {
        index: "[04]",
        title: "Characterization",
        body: "Measurement science that makes qualification possible.",
      },
      {
        index: "[05]",
        title: "Testing",
        body: "Defined questions, unpublished results.",
      },
      {
        index: "[06]",
        title: "Computational engineering",
        body: "Models as tools for questions. No claimed digital twin, no posted simulations.",
      },
      {
        index: "[07]",
        title: "Qualification",
        body: "How evidence is structured. Status not asserted.",
      },
      {
        index: "[08]",
        title: "Advanced manufacturing",
        body: "Exploratory and developmental thinking about making, subordinate to integrity.",
      },
    ],
    related: [
      {
        href: "/technology/alloy-development",
        label: "Technology · alloy development",
        body: "Engineering programme language for composition and process studies.",
      },
      {
        href: "/applications/aerospace",
        label: "Applications · aerospace",
        body: "A context that generates research questions.",
      },
    ],
    cta: {
      title: "The public record is a list, not a promise.",
      body: "Publications remain empty until something is authorized to appear.",
      primary: { href: "/research/publications", label: "Publications" },
      secondary: { href: "/contact", label: "Contact VSGH" },
    },
  },
  publications: {
    slug: "publications",
    path: "/research/publications",
    navLabel: "Publications",
    seoTitle: "Publications",
    description:
      "VSGH public publications will appear here when authorized. No papers, datasets, or reports are invented to fill the page.",
    domain: "Research",
    parentPath: "/research/overview",
    eyebrow: "[ Research ] · publications",
    headline: "The public record, when there is one.",
    lede: "This page is the place for authorized public papers, technical notes, and disclosures. Today the list is empty on purpose. VSGH does not invent titles, journals, or dates to look active.",
    mediaLabel: "Publications visual · placeholder",
    sections: [
      {
        title: "What will appear",
        body: "Items that a later content release has approved for vsghindia.com. Each item will carry a title, a date, and a clear status (for example: public paper, technical note). Until then, there are no rows.",
      },
      {
        title: "What will never appear here by invention",
        body: "Confidential reports, customer studies, unpublished experimental data, and documents that belong in PLM, LIMS, or other internal systems.",
      },
    ],
    statuses: [
      {
        label: "Public record",
        title: "Authorized items",
        body: "None posted. The structure is ready for future entries without a layout change.",
      },
      {
        label: "Not for this site",
        title: "Internal and restricted work",
        body: "Laboratory records and unpublished results remain off the public website.",
      },
    ],
    related: [
      {
        href: "/research/overview",
        label: "Research overview",
        body: "How known, developmental, and exploratory statements are separated.",
      },
      {
        href: "/about/scientific-integrity",
        label: "Scientific integrity",
        body: "Why an empty list is preferable to a false one.",
      },
    ],
    cta: {
      title: "A technical conversation does not require a paper list.",
      body: "Contact remains available. Materials and technology describe capability without a bibliography.",
      primary: { href: "/contact", label: "Contact VSGH" },
      secondary: { href: "/materials/overview", label: "Materials" },
    },
  },
} as const satisfies Record<string, CapabilityPageContent>;

export const researchPageList = [
  researchPages.overview,
  researchPages["research-areas"],
  researchPages.publications,
] as const;
