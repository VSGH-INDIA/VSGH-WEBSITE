import type { PageCta, PageStage, RelatedLink } from "@/content/types";

export const BUSINESS_LINE_SLUGS = [
  "aerospace-systems-components",
  "imports-exports",
  "global-programmes",
] as const;

export const BUSINESS_LINE_PATHS = [
  "/business/aerospace-systems-components",
  "/business/imports-exports",
  "/business/global-programmes",
] as const;

export type BusinessLineSlug = (typeof BUSINESS_LINE_SLUGS)[number];

export type BusinessLineContent = {
  slug: BusinessLineSlug;
  path: `/business/${BusinessLineSlug}`;
  navLabel: string;
  seoTitle: string;
  description: string;
  eyebrow: string;
  headline: string;
  lede: string;
  mediaLabel: string;
  focus: readonly PageStage[];
  connectionFlow: readonly PageStage[];
  relatedSlugs: readonly BusinessLineSlug[];
  cta: PageCta;
};

export const businessLines: readonly BusinessLineContent[] = [
  {
    slug: "aerospace-systems-components",
    path: "/business/aerospace-systems-components",
    navLabel: "Aerospace systems & components",
    seoTitle: "Aerospace Systems & Components",
    description:
      "VSGH India Pvt Ltd connects Indian aerospace systems and component manufacturers with relevant companies, programmes, and markets worldwide.",
    eyebrow: "[ Business / 01 ] · aerospace connections",
    headline: "A clearer route into aerospace capability conversations.",
    lede: "VSGH does not directly manufacture aerospace systems or components. We act as a promoter and distribution company, connecting capable Indian manufacturers with companies, programmes, and markets that are relevant to their public business context.",
    mediaLabel: "Aerospace manufacturing capability connection visual",
    focus: [
      {
        index: "01",
        title: "Public requirement context",
        body: "Start with the application area, market context, and type of industrial relationship being explored. Do not send drawings, controlled data, or confidential technical material through the public form.",
      },
      {
        index: "02",
        title: "Manufacturer connection",
        body: "VSGH brings relevant manufacturers and prospective counterparties into an informed commercial conversation, without presenting VSGH as the manufacturer.",
      },
      {
        index: "03",
        title: "Programme dialogue",
        body: "When there is a credible fit, the next discussion can establish the appropriate commercial, programme, and market context for the parties involved.",
      },
    ],
    connectionFlow: [
      {
        index: "01",
        title: "Frame",
        body: "Share public business context and the connection you are seeking.",
      },
      {
        index: "02",
        title: "Connect",
        body: "Identify the relevant manufacturing and counterparty conversation.",
      },
      {
        index: "03",
        title: "Continue",
        body: "Move the qualified discussion into the right commercial channel.",
      },
    ],
    relatedSlugs: ["imports-exports", "global-programmes"],
    cta: {
      title: "Discuss an aerospace connection.",
      body: "Begin with public commercial context. VSGH will route the conversation through the appropriate published company contact path.",
      primary: {
        label: "Discuss aerospace connections",
        href: "/contact?enquiry=aerospace-systems-components",
      },
      secondary: { label: "All business lines", href: "/business" },
    },
  },
  {
    slug: "imports-exports",
    path: "/business/imports-exports",
    navLabel: "Imports & exports",
    seoTitle: "Imports & Exports",
    description:
      "VSGH India Pvt Ltd supports international business conversations around manufacturing machines and industrial machinery opportunities.",
    eyebrow: "[ Business / 02 ] · industrial machinery",
    headline: "Industrial machinery opportunities, connected across markets.",
    lede: "VSGH undertakes import and export business related to manufacturing machines and other industrial machinery. The public platform creates a clear starting point for organisations exploring equipment opportunities across international markets.",
    mediaLabel: "Industrial machinery trade connection visual",
    focus: [
      {
        index: "01",
        title: "Equipment context",
        body: "Describe the machine or industrial equipment category, intended market, and public commercial context. Keep detailed specifications and controlled information out of the public enquiry.",
      },
      {
        index: "02",
        title: "Market connection",
        body: "VSGH helps establish the relevant conversation between equipment opportunities and manufacturers or partners with an aligned requirement.",
      },
      {
        index: "03",
        title: "Commercial alignment",
        body: "The next stage is a focused business dialogue between the right parties, with scope and responsibilities established directly by them.",
      },
    ],
    connectionFlow: [
      {
        index: "01",
        title: "Describe",
        body: "Set out the public industrial machinery opportunity and market context.",
      },
      {
        index: "02",
        title: "Align",
        body: "Identify the relevant equipment, manufacturer, or partner conversation.",
      },
      {
        index: "03",
        title: "Advance",
        body: "Move a credible opportunity into direct commercial discussion.",
      },
    ],
    relatedSlugs: ["aerospace-systems-components", "global-programmes"],
    cta: {
      title: "Discuss a machinery opportunity.",
      body: "Share the public context for an import or export conversation and VSGH can direct it to the appropriate business channel.",
      primary: {
        label: "Discuss machinery trade",
        href: "/contact?enquiry=machinery-imports-exports",
      },
      secondary: { label: "All business lines", href: "/business" },
    },
  },
  {
    slug: "global-programmes",
    path: "/business/global-programmes",
    navLabel: "Global Programmes",
    seoTitle: "Global Programmes",
    description:
      "VSGH India Pvt Ltd develops strategic partnerships and international business connections for long-term industrial programmes.",
    eyebrow: "[ Business / 03 ] · strategic partnerships",
    headline: "Strategic partnerships with a clearer path to conversation.",
    lede: "VSGH Global Programmes focuses on the strategic partnerships and connections that can bring companies into stronger international industrial relationships. It is a platform for identifying the right conversation, not a statement of unannounced programmes or outcomes.",
    mediaLabel: "Global strategic partnership connection visual",
    focus: [
      {
        index: "01",
        title: "Strategic fit",
        body: "Begin with the public business objective, market context, and type of partnership being considered rather than confidential programme detail.",
      },
      {
        index: "02",
        title: "Relevant counterparties",
        body: "VSGH creates connections with companies whose capabilities and interests may support a stronger international industrial relationship.",
      },
      {
        index: "03",
        title: "Long-term dialogue",
        body: "Where there is mutual relevance, the parties can establish a direct, appropriately scoped conversation about the opportunity.",
      },
    ],
    connectionFlow: [
      {
        index: "01",
        title: "Position",
        body: "State the public strategic objective and intended market direction.",
      },
      {
        index: "02",
        title: "Introduce",
        body: "Create a connection with a potentially aligned organisation.",
      },
      {
        index: "03",
        title: "Develop",
        body: "Take a credible partnership discussion into the right direct channel.",
      },
    ],
    relatedSlugs: ["aerospace-systems-components", "imports-exports"],
    cta: {
      title: "Discuss a global programme.",
      body: "Start with public strategic context and VSGH will direct the enquiry to the appropriate company contact path.",
      primary: {
        label: "Discuss a global programme",
        href: "/contact?enquiry=global-partnership-programme",
      },
      secondary: { label: "All business lines", href: "/business" },
    },
  },
] as const;

export function isBusinessLineSlug(value: string): value is BusinessLineSlug {
  return (BUSINESS_LINE_SLUGS as readonly string[]).includes(value);
}

export function businessLineForSlug(
  slug: string,
): BusinessLineContent | undefined {
  return businessLines.find((line) => line.slug === slug);
}

export function businessLinePathForOverviewId(id: string): string {
  const mapping: Record<string, BusinessLineSlug> = {
    "aerospace-systems": "aerospace-systems-components",
    "imports-exports": "imports-exports",
    "global-programmes": "global-programmes",
  };
  const slug = mapping[id];
  return slug ? `/business/${slug}` : "/business";
}

export function businessLineRelated(
  current: BusinessLineContent,
): RelatedLink[] {
  return current.relatedSlugs
    .map((slug) => businessLineForSlug(slug))
    .filter((line): line is BusinessLineContent => Boolean(line))
    .map((line) => ({
      href: line.path,
      label: line.navLabel,
      body: line.description,
    }));
}
