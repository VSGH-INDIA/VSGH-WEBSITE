import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { defineCliConfig } from "sanity/cli";

const projectRoot = dirname(fileURLToPath(import.meta.url));
const projectId =
  process.env.SANITY_STUDIO_PROJECT_ID ??
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ??
  "9fys33s1";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET ?? "production";

/**
 * The public application uses `@/` for imports. Sanity Studio is bundled by
 * Vite, which does not read Next.js path aliases automatically, so mirror the
 * alias here for Studio development and production builds.
 */
export default defineCliConfig({
  api: { projectId, dataset },
  deployment: { appId: "cwfgxmwni2oly2x70dieqjw4" },
  vite: {
    resolve: {
      alias: {
        "@": resolve(projectRoot, "src"),
      },
    },
  },
});
