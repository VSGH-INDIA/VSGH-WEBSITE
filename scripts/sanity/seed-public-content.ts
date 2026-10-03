import { createClient } from "@sanity/client";
import { businessPage } from "../../src/content/business";
import { businessLines } from "../../src/content/business-lines";
import { contactPage } from "../../src/content/contact";
import { homeContent } from "../../src/content/home";
import { siteSettings } from "../../src/content/site-settings";
import {
  resolveSanityDataset,
  resolveSanityProjectId,
  VSGH_SANITY_API_VERSION,
} from "../../src/sanity/project";

type SeedDocument = Record<string, unknown> & {
  _id: string;
  _type: string;
};

const apply = process.argv.includes("--apply");
const writeToken = process.env.SANITY_API_WRITE_TOKEN;

function ctaForSanity(cta: {
  title: string;
  body: string;
  primary: { label: string; href: string };
  secondary: { label: string; href: string };
}) {
  return {
    title: cta.title,
    body: cta.body,
    primaryLabel: cta.primary.label,
    primaryHref: cta.primary.href,
    secondaryLabel: cta.secondary.label,
    secondaryHref: cta.secondary.href,
  };
}

const documents: SeedDocument[] = [
  {
    _id: "siteSettings",
    _type: "siteSettings",
    lifecycle: "published",
    ...siteSettings,
  },
  {
    _id: "homepage",
    _type: "homepage",
    lifecycle: "published",
    ...homeContent,
  },
  {
    _id: "businessPage",
    _type: "businessPage",
    lifecycle: "published",
    ...businessPage,
    cta: ctaForSanity(businessPage.cta),
  },
  ...businessLines.map((line): SeedDocument => ({
    _id: `businessLine.${line.slug}`,
    _type: "businessLine",
    lifecycle: "published",
    title: line.navLabel,
    slug: line.slug,
    seoTitle: line.seoTitle,
    description: line.description,
    eyebrow: line.eyebrow,
    headline: line.headline,
    lede: line.lede,
    mediaLabel: line.mediaLabel,
    focus: line.focus,
    connectionFlow: line.connectionFlow,
    relatedSlugs: line.relatedSlugs,
    cta: ctaForSanity(line.cta),
  })),
  {
    _id: "contactPage",
    _type: "contactPage",
    lifecycle: "published",
    ...contactPage,
  },
];

function label(document: SeedDocument): string {
  return `${document._type}:${document._id}`;
}

async function main() {
  if (!apply) {
    console.log("Dry run only. No Sanity content will be changed.");
    console.table(
      documents.map((document) => ({
        document: label(document),
        operation: "create if absent",
      })),
    );
    console.log(
      "Run `npm run cms:seed -- --apply` with SANITY_API_WRITE_TOKEN to create only missing documents.",
    );
    return;
  }

  if (!writeToken || writeToken.length < 32) {
    throw new Error(
      "SANITY_API_WRITE_TOKEN (32+ characters) is required with --apply.",
    );
  }

  const client = createClient({
    projectId: resolveSanityProjectId(),
    dataset: resolveSanityDataset(),
    apiVersion: process.env.SANITY_API_VERSION ?? VSGH_SANITY_API_VERSION,
    token: writeToken,
    useCdn: false,
  });
  const ids = documents.map((document) => document._id);
  const existing = new Set(
    await client.fetch<string[]>("*[_id in $ids]._id", { ids }),
  );
  const missing = documents.filter((document) => !existing.has(document._id));

  if (!missing.length) {
    console.log(
      "All public seed documents already exist; no overwrite was performed.",
    );
    return;
  }

  const transaction = client.transaction();
  for (const document of missing) transaction.createIfNotExists(document);
  await transaction.commit({ visibility: "sync" });
  console.log(`Created ${missing.length} missing document(s):`);
  for (const document of missing) console.log(`- ${label(document)}`);
  console.log(
    "Existing documents were preserved. Preview and review the result before changing lifecycle or publishing further content.",
  );
}

main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
