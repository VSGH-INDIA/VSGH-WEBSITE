import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { defineCliConfig } from "sanity/cli";

const projectRoot = dirname(fileURLToPath(import.meta.url));

/**
 * The public application uses `@/` for imports. Sanity Studio is bundled by
 * Vite, which does not read Next.js path aliases automatically, so mirror the
 * alias here for Studio development and production builds.
 */
export default defineCliConfig({
  vite: {
    resolve: {
      alias: {
        "@": resolve(projectRoot, "src"),
      },
    },
  },
});
