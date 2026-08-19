import { defineCliConfig } from "sanity/cli";
import {
  resolveSanityDataset,
  resolveSanityProjectId,
} from "./src/sanity/project";

export default defineCliConfig({
  api: {
    projectId: resolveSanityProjectId(),
    dataset: resolveSanityDataset(),
  },
  studioHost: undefined,
});
