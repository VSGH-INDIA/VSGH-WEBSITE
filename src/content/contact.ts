export const contactPage = {
  path: "/contact",
  seoTitle: "Contact",
  description:
    "VSGH India Pvt Ltd contact page with India and Europe office addresses for technology, materials, research, business, and corporate enquiries.",
  eyebrow: "[ Contact ] · public enquiry",
  headline: "Company locations for business correspondence.",
  lede: "VSGH India Pvt Ltd maintains India and Europe offices for company correspondence, technology, materials, research, business, and corporate enquiries.",
  mediaLabel: "Contact visual",
  notice:
    "Business enquiries are accepted through the form below when the VSGH delivery service is configured. Do not include confidential technical data, drawings, restricted information, or files.",
  leadership: {
    name: "Dr. Subramanya S",
    role: "Managing Director",
  },
  locations: [
    {
      region: "India",
      address: ["B116, DS Max Signatures", "Devi Nagar, Bangalore - 560094"],
    },
    {
      region: "Europe",
      address: ["Corso Pietro Ronaldi, 68", "Quarona-13017, Italy"],
    },
  ],
  categories: [
    {
      id: "aerospace-systems-components",
      title: "Aerospace systems & components",
      body: "Business-development, promotion, and distribution connections for approved manufacturing capability.",
    },
    {
      id: "advanced-materials",
      title: "Advanced materials",
      body: "Public capability and material-development discussion without a published catalogue.",
    },
    {
      id: "technology-r-and-d",
      title: "Technology / R&D",
      body: "Scientific and engineering direction. Unpublished results stay unpublished.",
    },
    {
      id: "machinery-imports-exports",
      title: "Machinery imports & exports",
      body: "Industrial machinery opportunities and legitimate international trade context.",
    },
    {
      id: "global-partnership-programme",
      title: "Global partnership / programme",
      body: "Strategic relationships, international programmes, and routes to market.",
    },
  ],
  fields: [
    {
      id: "name",
      label: "Name",
      hint: "Reserved. Not collected on this page.",
    },
    {
      id: "organisation",
      label: "Organisation",
      hint: "Reserved. Not collected on this page.",
    },
    {
      id: "message",
      label: "Message",
      hint: "Reserved. Not collected on this page.",
    },
  ],
  related: [
    {
      href: "/business",
      label: "Business",
      body: "Global connections across aerospace, machinery, and partnerships.",
    },
    {
      href: "/research/overview",
      label: "Research",
      body: "Scientific direction without unpublished results.",
    },
    {
      href: "/careers",
      label: "Careers",
      body: "Disciplines without a vacancy list.",
    },
  ],
} as const;
