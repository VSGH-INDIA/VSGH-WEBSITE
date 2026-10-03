import { aboutPageList } from "@/content/about";
import { applicationsPageList } from "@/content/applications";
import { careersPage } from "@/content/careers";
import { businessPage } from "@/content/business";
import { businessLines } from "@/content/business-lines";
import { contactPage } from "@/content/contact";
import { insightsPage } from "@/content/insights";
import { materialsPageList } from "@/content/materials";
import { researchPageList } from "@/content/research";
import { sustainabilityPage } from "@/content/sustainability";
import { technologyPageList } from "@/content/technology";
import { IMPLEMENTED_ROUTES } from "@/lib/navigation";
import { SITE_DESCRIPTION, SITE_TITLE } from "@/lib/site";

export type RouteSeoRecord = {
  path: string;
  title: string;
  description: string;
};

const leafPages = [
  ...aboutPageList,
  ...materialsPageList,
  ...technologyPageList,
  ...applicationsPageList,
  ...researchPageList,
  businessPage,
  ...businessLines,
  sustainabilityPage,
  insightsPage,
  careersPage,
  contactPage,
];

export const PUBLIC_ROUTE_CATALOG: readonly RouteSeoRecord[] = [
  {
    path: "/",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
  },
  ...leafPages.map((page) => ({
    path: page.path,
    title: page.seoTitle,
    description: page.description,
  })),
];

export function routeSeoForPath(path: string): RouteSeoRecord | undefined {
  return PUBLIC_ROUTE_CATALOG.find((route) => route.path === path);
}

export function catalogPaths(): string[] {
  return PUBLIC_ROUTE_CATALOG.map((route) => route.path);
}

export function catalogCoversImplementedRoutes(): boolean {
  const catalog = new Set(catalogPaths());
  return (
    IMPLEMENTED_ROUTES.length === catalog.size &&
    IMPLEMENTED_ROUTES.every((path) => catalog.has(path))
  );
}
