import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { presentationTool } from "sanity/presentation";
import { structureTool } from "sanity/structure";
import { isSafeInternalPath } from "@/lib/safe-url";
import { VSGHDashboard } from "@/sanity/dashboard";
import { resolveSanityDataset, resolveSanityProjectId } from "@/sanity/project";
import {
  presentationDocuments,
  presentationLocations,
} from "@/sanity/presentation";
import { schemaTypes } from "@/sanity/schema";
import { deskStructure } from "@/sanity/structure";

const projectId = resolveSanityProjectId();
const dataset = resolveSanityDataset();
const previewOrigin = process.env.SANITY_STUDIO_PREVIEW_ORIGIN;
const previewSecret = process.env.SANITY_STUDIO_PREVIEW_SECRET;

export default defineConfig({
  name: "vsgh-public",
  title: "VSGH public website",
  projectId,
  dataset,
  plugins: [
    structureTool({ structure: deskStructure }),
    visionTool({ defaultApiVersion: "2026-08-19" }),
    presentationTool({
      title: "Visual preview",
      previewUrl: {
        initial: previewOrigin ?? "https://vsghindia.com",
        previewMode: {
          enable: "/api/draft/presentation",
          disable: "/api/draft/disable",
          shareAccess: false,
        },
      },
      allowOrigins: previewOrigin ? [previewOrigin] : ["https://vsghindia.com"],
      resolve: {
        mainDocuments: presentationDocuments,
        locations: presentationLocations,
      },
    }),
  ],
  tools: (previous) => [
    ...previous,
    { name: "vsgh-dashboard", title: "Dashboard", component: VSGHDashboard },
  ],
  schema: {
    types: schemaTypes,
  },
  document: {
    productionUrl: async (prev, context) => {
      const path = (context.document as { path?: unknown } | undefined)?.path;
      if (
        !previewOrigin ||
        !previewSecret ||
        typeof path !== "string" ||
        !isSafeInternalPath(path)
      ) {
        return prev;
      }
      const url = new URL("/api/draft", previewOrigin);
      url.searchParams.set("secret", previewSecret);
      url.searchParams.set("path", path);
      return url.toString();
    },
  },
});
