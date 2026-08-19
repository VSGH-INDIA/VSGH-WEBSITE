export type PageCta = {
  title: string;
  body: string;
  primary: { href: string; label: string };
  secondary: { href: string; label: string };
};

export type PageSection = {
  title: string;
  body: string;
};

export type PageStage = {
  index: string;
  title: string;
  body: string;
};

export type RelatedLink = {
  href: string;
  label: string;
  body: string;
};

export type StatusBand = {
  label: string;
  title: string;
  body: string;
};

export type CapabilityPageContent = {
  slug: string;
  path: string;
  navLabel: string;
  seoTitle: string;
  description: string;
  domain: string;
  parentPath: string;
  eyebrow: string;
  headline: string;
  emphasis?: string;
  lede: string;
  mediaLabel: string;
  sections: PageSection[];
  stages?: PageStage[];
  principles?: PageStage[];
  related?: RelatedLink[];
  statuses?: StatusBand[];
  cta: PageCta;
};
