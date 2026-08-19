import type { CapabilityPageContent } from "@/content/types";

export type CareerVacancy = {
  slug: string;
  title: string;
  discipline: string;
  location: string | null;
  posted: string | null;
  status: "open" | "closed";
  summary: string;
};

export const careerVacancies: CareerVacancy[] = [];

export const careersPage = {
  slug: "careers",
  path: "/careers",
  navLabel: "Careers",
  seoTitle: "Careers",
  description:
    "VSGH careers describes an engineering and scientific organisation. No vacancies, salaries, or locations are listed because none are approved for public posting.",
  domain: "Careers",
  parentPath: "/",
  eyebrow: "[ Careers ] · engineering and science",
  headline: "Work on materials as a programme, not as a slogan.",
  lede: "VSGH is an aerospace and materials technology organisation. Public careers language names disciplines — metallurgy, engineering, manufacturing development, scientific research, quality, operations, and digital engineering — not invented openings.",
  mediaLabel: "Careers visual · placeholder",
  sections: [
    {
      title: "Why this page exists without vacancies",
      body: "A vacancy list that is not true is a claim. Until roles are authorized for public posting, this page describes the kind of work VSGH does and how interest may later be received. It does not collect applications.",
    },
    {
      title: "Culture as discipline",
      body: "Scientific integrity, qualification thinking, and conservative public speech are part of how the organisation describes itself. They are not a benefits brochure. Benefits, headcount, and recruiters are not listed.",
    },
  ],
  principles: [
    {
      index: "[01]",
      title: "Aerospace and materials",
      body: "Work sits in the chain from recovered resource to application fitness.",
    },
    {
      index: "[02]",
      title: "Metallurgy and engineering",
      body: "Structure, process, and property treated as one problem.",
    },
    {
      index: "[03]",
      title: "Manufacturing development",
      body: "Scale-up thinking subordinate to material integrity.",
    },
    {
      index: "[04]",
      title: "Scientific research",
      body: "Questions labelled as known, under development, or exploratory.",
    },
    {
      index: "[05]",
      title: "Quality and operations",
      body: "Control and record, without a public certificate wall.",
    },
    {
      index: "[06]",
      title: "Digital engineering",
      body: "Software as a support to materials work — not a SaaS product story.",
    },
  ],
  emptyState: {
    eyebrow: "[ Vacancies ]",
    title: "No public openings are posted.",
    body: "When a role is approved for this site it will appear here with a true title and a true status. Do not send curricula or personal data to this page. An application channel has not been selected.",
  },
  related: [
    {
      href: "/about/scientific-integrity",
      label: "Scientific integrity",
      body: "How public statements are gated.",
    },
    {
      href: "/about/company",
      label: "Company",
      body: "Identity and purpose.",
    },
  ],
  cta: {
    title: "General interest is a contact question, later.",
    body: "The contact page does not submit messages yet. It is the future place for corporate enquiry — not a careers inbox.",
    primary: { href: "/contact", label: "Contact" },
    secondary: { href: "/about/company", label: "Company" },
  },
} as const satisfies CapabilityPageContent;
