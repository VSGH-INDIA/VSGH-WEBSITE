export type BusinessPageContent = {
  path: "/business";
  seoTitle: string;
  description: string;
  eyebrow: string;
  headline: string;
  lede: string;
  mediaLabel: string;
  lines: readonly {
    id: string;
    index: string;
    title: string;
    body: string;
  }[];
  cta: {
    title: string;
    body: string;
    primary: { label: string; href: string };
    secondary: { label: string; href: string };
  };
};

export const businessPage: BusinessPageContent = {
  path: "/business",
  seoTitle: "Business",
  description:
    "VSGH India Pvt Ltd connects manufacturers, machinery opportunities, and strategic partners across international markets.",
  eyebrow: "[ Business ] · global connections",
  headline:
    "Connecting Indian industrial capability with opportunity worldwide.",
  lede: "VSGH India Pvt Ltd works at the intersection of aerospace supply, machinery trade, and strategic programmes. We create the connections that help capable companies find the right counterparties across markets.",
  mediaLabel: "Business partnerships and global programmes visual",
  lines: [
    {
      id: "aerospace-systems",
      index: "01",
      title: "VSGH Aerospace Systems & Components",
      body: "VSGH does not directly manufacture aerospace systems or components. It acts as a promoter and distribution company, connecting Indian manufacturers with the companies, programmes, and markets that need their capability worldwide.",
    },
    {
      id: "imports-exports",
      index: "02",
      title: "VSGH Imports & Exports",
      body: "We support import and export business related to manufacturing machines and other industrial machinery, helping align equipment opportunities with the requirements of manufacturers and partners.",
    },
    {
      id: "global-programmes",
      index: "03",
      title: "Global Programmes",
      body: "We develop strategic partnerships and connections with companies whose capabilities can create stronger international programmes, routes to market, and long-term industrial relationships.",
    },
  ],
  cta: {
    title: "Start with the right connection.",
    body: "For conversations about aerospace supply, industrial machinery, or strategic partnerships, contact VSGH India Pvt Ltd through the published company locations.",
    primary: { label: "Discuss a programme", href: "/contact" },
    secondary: { label: "Materials capability", href: "/materials/overview" },
  },
};
