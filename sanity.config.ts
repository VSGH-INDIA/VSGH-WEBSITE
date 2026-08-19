import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "@/sanity/schema";
import { deskStructure } from "@/sanity/structure";

const projectId =
  process.env.SANITY_STUDIO_PROJECT_ID ||
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ||
  "unconfigured";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

export default defineConfig({
  name: "vsgh-public",
  title: "VSGH public website",
  projectId,
  dataset,
  plugins: [
    structureTool({ structure: deskStructure }),
    visionTool({ defaultApiVersion: "2026-08-19" }),
  ],
  schema: {
    types: schemaTypes,
  },
});
