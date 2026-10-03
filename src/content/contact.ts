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
    "Enquiry channel not connected. Nothing entered on this page is transmitted or stored. Do not include confidential, personal, or restricted information.",
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
      id: "technology",
      title: "Technology collaboration",
      body: "Engineering sequence, processing, and manufacturing development as public capability classes.",
    },
    {
      id: "materials",
      title: "Materials enquiry",
      body: "Material development, metallurgy, and qualification — without a catalogue.",
    },
    {
      id: "research",
      title: "Research collaboration",
      body: "Scientific direction. Unpublished results stay unpublished.",
    },
    {
      id: "business",
      title: "Business enquiry",
      body: "Corporate discussion that does not require a named customer story.",
    },
    {
      id: "general",
      title: "General corporate enquiry",
      body: "Identity, careers interest, or other public questions.",
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
