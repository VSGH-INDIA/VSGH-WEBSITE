import { createReadStream } from "node:fs";
import { access } from "node:fs/promises";
import { getCliClient } from "sanity/cli";
import { VSGH_SANITY_API_VERSION } from "../../src/sanity/project";

const apply = process.argv.includes("--apply");
const logoPath = process.env.KCNC_LOGO_PATH;
const documentId = "partnerCompany.karnataka-cnc-tech";

const profile = {
  _id: documentId,
  _type: "partnerCompany",
  lifecycle: "published",
  companyName: "Karnataka CNC Tech Pvt. Ltd.",
  slug: { _type: "slug", current: "karnataka-cnc-tech" },
  overview:
    "Karnataka CNC Tech Pvt. Ltd. is a manufacturer of jigs, fixtures, precision components, and assemblies for aerospace, defence, and power-generation sectors.",
  services: [
    "Design and engineering",
    "Prototyping",
    "Precision CNC machining",
    "Fabrication",
    "Assemblies",
    "Finishing",
    "Contract manufacturing",
    "Reverse engineering",
  ],
  contact: { email: "info@kcnctech.com" },
  locations: [
    {
      _key: "office",
      label: "Office",
      address: "D-103, Industrial Estate, Rajajinagar, Bangalore 560010",
    },
    {
      _key: "workshop",
      label: "Workshop",
      address:
        "Plot No. 42, KIADB Industrial Area, B. Marenahalli, Devanahalli Taluk 562123",
    },
  ],
  website: "https://www.kcnctech.in/",
  displayOnGlobalProgrammes: true,
  globalProgrammesOrder: 10,
};

async function main() {
  if (!apply) {
    console.log("Dry run only. No KCNC content will be changed.");
    console.table([
      {
        document: documentId,
        operation: "upload approved logo and create if absent",
      },
    ]);
    console.log(
      "Run with --apply and KCNC_LOGO_PATH set to the approved logo file.",
    );
    return;
  }

  if (!logoPath) {
    throw new Error("KCNC_LOGO_PATH is required with --apply.");
  }
  await access(logoPath);

  const client = getCliClient({ apiVersion: VSGH_SANITY_API_VERSION });
  const existing = await client.fetch<{ _id: string } | null>(
    "*[_id == $id][0]{_id}",
    { id: documentId },
  );
  if (existing) {
    console.log(`${documentId} already exists; no overwrite was performed.`);
    return;
  }

  const asset = await client.assets.upload(
    "image",
    createReadStream(logoPath),
    {
      filename: "kcnc-logo.png",
    },
  );
  await client.create({
    ...profile,
    logo: {
      _type: "image",
      asset: { _type: "reference", _ref: asset._id },
      alt: "Karnataka CNC Tech logo",
      decorative: false,
      approvalStatus: "approved",
      visibility: "public",
      usage: "editorial",
      aspectRatio: "16/9",
      cropMode: "contain",
    },
  });
  console.log(`Created ${documentId} with an approved public logo.`);
}

main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
