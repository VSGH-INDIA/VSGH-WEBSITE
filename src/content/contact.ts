export const contactPage = {
  path: "/contact",
  seoTitle: "Contact",
  description:
    "VSGH public contact page for future technology, materials, research, business, and corporate enquiries. No messages are sent; no address, telephone, or email is published.",
  eyebrow: "[ Contact ] · public enquiry",
  headline: "A channel for conversation, when a channel exists.",
  lede: "This page names legitimate enquiry classes and reserves the shape of a future form. It does not send mail, store data, or connect to a CRM. No office address, telephone number, or email address is published here because none is approved for this site.",
  mediaLabel: "Contact visual · placeholder",
  notice:
    "Enquiry channel not connected. Nothing entered on this page is transmitted or stored. Do not include confidential, personal, or restricted information.",
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
      href: "/materials/overview",
      label: "Materials",
      body: "Capability language without a catalogue.",
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
