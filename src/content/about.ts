export type AboutPrinciple = {
  index: string;
  title: string;
  body: string;
};

export type AboutSection = {
  title: string;
  body: string;
};

export type AboutCta = {
  title: string;
  body: string;
  primary: { href: string; label: string };
  secondary: { href: string; label: string };
};

export type AboutFacility = {
  index: string;
  title: string;
  body: string;
  mediaLabel: string;
};

export type AboutPageContent = {
  slug: string;
  path: string;
  navLabel: string;
  seoTitle: string;
  description: string;
  eyebrow: string;
  headline: string;
  emphasis?: string;
  lede: string;
  mediaLabel: string;
  sections: AboutSection[];
  principles?: AboutPrinciple[];
  facilities?: AboutFacility[];
  leadershipNote?: string;
  variant: "standard" | "leadership" | "facilities";
  cta: AboutCta;
};

export const aboutPages = {
  company: {
    slug: "company",
    path: "/about/company",
    navLabel: "Company",
    seoTitle: "Company",
    description:
      "VSGH is a materials technology organization developing engineered capability from recovered and resource-derived feedstocks through metallurgy, processing, qualification, and application.",
    eyebrow: "[ About ] · company",
    headline: "A materials organization, not a commodity channel.",
    lede: "VSGH develops engineered material capability from recovered and resource-derived feedstocks. Recovery is the starting condition. The work is metallurgy, process development, characterization, and controlled qualification toward demanding applications.",
    mediaLabel: "Company identity visual · placeholder",
    variant: "standard",
    sections: [
      {
        title: "What VSGH is",
        body: "VSGH is an advanced aerospace and materials technology organization. Public description stays at the level of capability and discipline: materials development, metallurgy, engineering, qualification, and application. This page does not list corporate statistics, customers, or production status.",
      },
      {
        title: "Resource to material",
        body: "Recovered and resource-derived inputs are treated as feedstock for a materials programme. The public narrative is a chain — resource, recovery, purification, metallurgy, material development, qualification, application — not a disclosed process recipe.",
      },
      {
        title: "Where the material must earn its place",
        body: "Intended contexts are aerospace, defense, space, and advanced industrial use. VSGH describes direction here. Programme history, named buyers, and approved-supplier status are not published on this site.",
      },
    ],
    principles: [
      {
        index: "[01]",
        title: "Identity",
        body: "A materials and engineering organization whose public story begins with feedstock and ends with application fitness.",
      },
      {
        index: "[02]",
        title: "Capability",
        body: "Metallurgy, processing, characterization, and qualification — described as disciplines, not as a catalogue of grades.",
      },
      {
        index: "[03]",
        title: "Restraint",
        body: "What cannot be supported is not stated. Absence of a number is intentional.",
      },
    ],
    cta: {
      title: "Continue the corporate story.",
      body: "Vision and mission describe direction and method. Materials and technology pages are not published yet.",
      primary: { href: "/about/vision", label: "Read the vision" },
      secondary: { href: "/contact", label: "Contact VSGH" },
    },
  },
  vision: {
    slug: "vision",
    path: "/about/vision",
    navLabel: "Vision",
    seoTitle: "Vision",
    description:
      "VSGH’s long-term direction is advanced material capability — engineered from recovered resource, evidenced with scientific discipline, and judged by fitness for aerospace and related applications.",
    eyebrow: "[ About ] · vision",
    headline: "Materials that earn their place in demanding environments.",
    lede: "VSGH looks toward a future in which recovered and resource-derived feedstocks are routinely developed into engineered material capability — not treated as scrap, and not described with claims the evidence cannot carry.",
    mediaLabel: "Vision visual · placeholder",
    variant: "standard",
    sections: [
      {
        title: "Direction, not a forecast",
        body: "This page states ambition as direction: advanced materials, engineering capability, resource efficiency, and scientific development in service of aerospace, space, and related uses. It does not present unpublished programmes, dates, or market outcomes as facts.",
      },
      {
        title: "Resource efficiency as engineering",
        body: "Efficiency is framed as higher-value material from recovered resource — through metallurgy and qualification — rather than as an environmental metric. No diversion rates or carbon figures are published here.",
      },
    ],
    principles: [
      {
        index: "[01]",
        title: "Advanced materials",
        body: "Develop material systems intended for demanding thermal, mechanical, or environmental service.",
      },
      {
        index: "[02]",
        title: "Engineering capability",
        body: "Keep process, structure, and property thinking together so capability can be evidenced, not merely asserted.",
      },
      {
        index: "[03]",
        title: "Scientific development",
        body: "Advance understanding under measurement discipline. Public statements remain conservative until release is authorized.",
      },
      {
        index: "[04]",
        title: "Application fitness",
        body: "Judge progress by whether material behaviour is understood well enough to be discussed in application context.",
      },
    ],
    cta: {
      title: "See how the purpose is executed.",
      body: "Mission describes method: discipline, rigor, and controlled development.",
      primary: { href: "/about/mission", label: "Read the mission" },
      secondary: { href: "/about/company", label: "Company" },
    },
  },
  mission: {
    slug: "mission",
    path: "/about/mission",
    navLabel: "Mission",
    seoTitle: "Mission",
    description:
      "VSGH’s mission is to develop engineered material capability from recovered feedstock through metallurgy, processing, and qualification — with scientific rigor and conservative public communication.",
    eyebrow: "[ About ] · mission",
    headline: "Execute the chain from feedstock to fitness.",
    lede: "The mission is practical: turn recovered and resource-derived inputs into material capability that can be characterized, reviewed, and discussed in application context — without treating slogans as engineering.",
    mediaLabel: "Mission visual · placeholder",
    variant: "standard",
    sections: [
      {
        title: "How VSGH intends to work",
        body: "Work proceeds through engineering discipline, scientific rigor, materials development, resource transformation, and qualification. Each step is a controlled activity. This site does not publish process windows or laboratory methods.",
      },
      {
        title: "Responsible technology development",
        body: "Public communication stays inside what can be supported. Hypotheses are not presented as validated results. Restricted information stays off the public website.",
      },
    ],
    principles: [
      {
        index: "[01]",
        title: "Engineering discipline",
        body: "Development under defined review, not opportunistic specification.",
      },
      {
        index: "[02]",
        title: "Scientific rigor",
        body: "Measurement before declaration. Characterization makes qualification possible.",
      },
      {
        index: "[03]",
        title: "Resource transformation",
        body: "Treat recovery as the input to materials work, not as the finished story.",
      },
      {
        index: "[04]",
        title: "Qualification",
        body: "Fitness for use is a programme of evidence, not a marketing line.",
      },
    ],
    cta: {
      title: "Integrity is part of the method.",
      body: "Scientific integrity and quality describe how evidence and control are treated.",
      primary: {
        href: "/about/scientific-integrity",
        label: "Scientific integrity",
      },
      secondary: { href: "/about/quality", label: "Quality" },
    },
  },
  leadership: {
    slug: "leadership",
    path: "/about/leadership",
    navLabel: "Leadership",
    seoTitle: "Leadership",
    description:
      "VSGH leadership biographies and portraits will be published when approved for public release. This page holds the public structure only.",
    eyebrow: "[ About ] · leadership",
    headline: "Leadership, when it is ready for the public record.",
    lede: "Approved public biographies, roles, and portraits are not available on this site yet. VSGH does not invent credentials, positions, or affiliations to fill a layout.",
    mediaLabel: "Leadership visual · placeholder",
    variant: "leadership",
    sections: [
      {
        title: "What this page is for",
        body: "When leadership information is authorized for public release, this page will present named profiles and portraits in the same visual system. Until then, the structure remains empty of personal data on purpose.",
      },
    ],
    leadershipNote:
      "Placeholder frames only. No names, titles, or achievements are implied.",
    cta: {
      title: "Company direction lives in the public narrative.",
      body: "Vision, mission, and scientific integrity describe how VSGH intends to work until individual profiles are released.",
      primary: { href: "/about/company", label: "Company" },
      secondary: { href: "/contact", label: "Contact VSGH" },
    },
  },
  "scientific-integrity": {
    slug: "scientific-integrity",
    path: "/about/scientific-integrity",
    navLabel: "Scientific integrity",
    seoTitle: "Scientific integrity",
    description:
      "VSGH treats scientific integrity as evidence-based engineering: measurement discipline, traceability, data integrity, and a clear separation of validated results from hypotheses.",
    eyebrow: "[ About ] · scientific integrity",
    headline: "Evidence before declaration.",
    lede: "Scientific integrity at VSGH is the habit of saying only what the record can carry. Engineering claims on this website stay at the level of principle. Laboratory procedures and experimental datasets are not published here.",
    mediaLabel: "Scientific integrity visual · placeholder",
    variant: "standard",
    sections: [
      {
        title: "What integrity requires in public",
        body: "Public technical communication separates validated results from hypotheses. Where evidence is incomplete, VSGH describes capability as direction, not as demonstrated performance.",
      },
      {
        title: "What this page does not contain",
        body: "No confidential methods, no unpublished measurements, no customer data. Integrity includes knowing what belongs inside controlled documentation rather than on a public page.",
      },
    ],
    principles: [
      {
        index: "[01]",
        title: "Evidence-based engineering",
        body: "Statements about material behaviour wait on characterization and review.",
      },
      {
        index: "[02]",
        title: "Reproducibility",
        body: "Work is designed so that another competent party could, in principle, follow the record — the record itself remains internal until released.",
      },
      {
        index: "[03]",
        title: "Traceability",
        body: "Feedstock, process steps, and measurements are treated as a chain of custody, not as isolated anecdotes.",
      },
      {
        index: "[04]",
        title: "Measurement discipline",
        body: "Characterization is a first-class activity. Methods are not listed publicly.",
      },
      {
        index: "[05]",
        title: "Data integrity",
        body: "Records are controlled. Public pages do not substitute for the quality system.",
      },
      {
        index: "[06]",
        title: "Controlled documentation",
        body: "Internal documents remain internal. This website is not a technical data package.",
      },
    ],
    cta: {
      title: "Quality is how control is practiced.",
      body: "Quality describes process control, verification, validation, and improvement — without listing certifications.",
      primary: { href: "/about/quality", label: "Quality" },
      secondary: { href: "/about/mission", label: "Mission" },
    },
  },
  quality: {
    slug: "quality",
    path: "/about/quality",
    navLabel: "Quality",
    seoTitle: "Quality",
    description:
      "VSGH quality philosophy: controlled processes, traceability, characterization, verification, validation, qualification, documentation, and improvement. No public certification claims.",
    eyebrow: "[ About ] · quality",
    headline: "Control first. Certificates later, if authorized.",
    lede: "Quality at VSGH is a way of developing and evidencing material — not a list of standard numbers on a homepage. This page does not claim ISO, AS, EN, NADCAP, or any other certification status.",
    mediaLabel: "Quality visual · placeholder",
    variant: "standard",
    sections: [
      {
        title: "Philosophy",
        body: "Material is developed under defined review. Characterization precedes offering capability. Qualification is treated as a programme. Documentation exists to make the work reviewable inside VSGH — not to decorate this website.",
      },
      {
        title: "What is not claimed",
        body: "No accreditation list, no registrar names, no implied compliance. If a certification is later approved for public disclosure, it will be stated explicitly on an authorized page.",
      },
    ],
    principles: [
      {
        index: "[01]",
        title: "Controlled processes",
        body: "Work follows defined sequences. This site does not publish those sequences.",
      },
      {
        index: "[02]",
        title: "Traceability",
        body: "Identity of material and of measurements is treated as essential, not optional.",
      },
      {
        index: "[03]",
        title: "Characterization",
        body: "Measure behaviour before describing it as capability.",
      },
      {
        index: "[04]",
        title: "Verification and validation",
        body: "Check that work was done as intended, and that it is fit for the intended question.",
      },
      {
        index: "[05]",
        title: "Qualification",
        body: "Fitness for a use class is earned through evidence, not through layout.",
      },
      {
        index: "[06]",
        title: "Improvement",
        body: "Findings feed the next cycle of development. Metrics of that cycle are not invented for this page.",
      },
    ],
    cta: {
      title: "Capability needs a place to be developed.",
      body: "Facilities describes laboratory and development categories without inventories or addresses.",
      primary: { href: "/about/facilities", label: "Facilities" },
      secondary: { href: "/contact", label: "Contact VSGH" },
    },
  },
  facilities: {
    slug: "facilities",
    path: "/about/facilities",
    navLabel: "Facilities",
    seoTitle: "Facilities",
    description:
      "VSGH facility concept: materials development, characterization, metallurgy, processing, engineering, testing, and manufacturing development. No addresses, inventories, or capacities.",
    eyebrow: "[ About ] · facilities",
    headline: "Places of work, described as capability classes.",
    lede: "VSGH develops material capability in controlled settings. This page names categories of work — not sites, equipment lists, or production quantities. Approved photography can replace the frames without changing the layout.",
    mediaLabel: "Facilities overview visual · placeholder",
    variant: "facilities",
    sections: [
      {
        title: "What is shown",
        body: "Each category is a discipline that belongs in a materials programme. None of the following is a claim that a named plant, machine, or certified laboratory is listed for public inspection.",
      },
    ],
    facilities: [
      {
        index: "[01]",
        title: "Materials development",
        body: "Composition, processing, and structure iterated toward a usable material state.",
        mediaLabel: "Materials development · placeholder",
      },
      {
        index: "[02]",
        title: "Laboratory characterization",
        body: "Measurement that makes qualification possible. Methods remain unpublished.",
        mediaLabel: "Characterization · placeholder",
      },
      {
        index: "[03]",
        title: "Metallurgy",
        body: "Structure–process–property thinking applied to recovered and refined feedstocks.",
        mediaLabel: "Metallurgy · placeholder",
      },
      {
        index: "[04]",
        title: "Processing",
        body: "Conversion from purified feedstock toward a controlled material form.",
        mediaLabel: "Processing · placeholder",
      },
      {
        index: "[05]",
        title: "Engineering",
        body: "Application context and design constraints treated as part of material work.",
        mediaLabel: "Engineering · placeholder",
      },
      {
        index: "[06]",
        title: "Testing",
        body: "Evaluation under defined questions. Results are not posted here.",
        mediaLabel: "Testing · placeholder",
      },
      {
        index: "[07]",
        title: "Manufacturing development",
        body: "Scale-up thinking that remains subordinate to material integrity and control.",
        mediaLabel: "Manufacturing development · placeholder",
      },
    ],
    cta: {
      title: "From place of work to application.",
      body: "Applications and technology pages are not published yet. Contact remains available for a technical conversation.",
      primary: { href: "/contact", label: "Contact VSGH" },
      secondary: { href: "/about/company", label: "Company" },
    },
  },
} as const satisfies Record<string, AboutPageContent>;

export const aboutPageList = [
  aboutPages.company,
  aboutPages.vision,
  aboutPages.mission,
  aboutPages.leadership,
  aboutPages["scientific-integrity"],
  aboutPages.quality,
  aboutPages.facilities,
] as const;
