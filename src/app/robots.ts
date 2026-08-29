import type { MetadataRoute } from "next";
import { robotsTxtConfig } from "@/lib/indexing";

export default function robots(): MetadataRoute.Robots {
  return robotsTxtConfig();
}
