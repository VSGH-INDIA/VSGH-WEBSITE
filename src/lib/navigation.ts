export const PRIMARY_NAV = [
  { label: "About", href: "/about/company" },
  { label: "Materials", href: "/materials/overview" },
  { label: "Technology", href: "/technology/resource-recovery" },
  { label: "Applications", href: "/applications/aerospace" },
  { label: "Research", href: "/research/overview" },
  { label: "Sustainability", href: "/sustainability" },
  { label: "Insights", href: "/insights" },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
] as const;

export const ABOUT_NAV = [
  { label: "Company", href: "/about/company" },
  { label: "Vision", href: "/about/vision" },
  { label: "Mission", href: "/about/mission" },
  { label: "Leadership", href: "/about/leadership" },
  { label: "Scientific integrity", href: "/about/scientific-integrity" },
  { label: "Quality", href: "/about/quality" },
  { label: "Facilities", href: "/about/facilities" },
] as const;

export const MATERIALS_NAV = [
  { label: "Overview", href: "/materials/overview" },
  { label: "Material development", href: "/materials/material-development" },
  { label: "Metallurgy", href: "/materials/metallurgy" },
  { label: "Processing", href: "/materials/processing" },
  { label: "Qualification", href: "/materials/qualification" },
] as const;

export const TECHNOLOGY_NAV = [
  { label: "Resource recovery", href: "/technology/resource-recovery" },
  { label: "Purification", href: "/technology/purification" },
  { label: "Alloy development", href: "/technology/alloy-development" },
  { label: "Advanced materials", href: "/technology/advanced-materials" },
  { label: "Manufacturing", href: "/technology/manufacturing" },
] as const;

export const APPLICATIONS_NAV = [
  { label: "Aerospace", href: "/applications/aerospace" },
  { label: "Defense", href: "/applications/defense" },
  { label: "Space", href: "/applications/space" },
  { label: "Advanced industrial", href: "/applications/advanced-industrial" },
] as const;

export const RESEARCH_NAV = [
  { label: "Overview", href: "/research/overview" },
  { label: "Research areas", href: "/research/research-areas" },
  { label: "Publications", href: "/research/publications" },
] as const;

export const IMPLEMENTED_ROUTES = [
  "/",
  ...ABOUT_NAV.map((item) => item.href),
  ...MATERIALS_NAV.map((item) => item.href),
  ...TECHNOLOGY_NAV.map((item) => item.href),
  ...APPLICATIONS_NAV.map((item) => item.href),
  ...RESEARCH_NAV.map((item) => item.href),
  "/sustainability",
  "/insights",
  "/careers",
  "/contact",
] as const;

const CURRENT_DOMAINS = [
  { hrefPrefix: "/about", pathPrefix: "/about/" },
  { hrefPrefix: "/materials", pathPrefix: "/materials/" },
  { hrefPrefix: "/technology", pathPrefix: "/technology/" },
  { hrefPrefix: "/applications", pathPrefix: "/applications/" },
  { hrefPrefix: "/research", pathPrefix: "/research/" },
] as const;

export function isPublishedPath(href: string): boolean {
  const path = href.split("#")[0]?.split("?")[0] ?? href;
  return (IMPLEMENTED_ROUTES as readonly string[]).includes(path);
}

export function isPrimaryNavCurrent(href: string, pathname: string): boolean {
  for (const domain of CURRENT_DOMAINS) {
    if (href.startsWith(domain.hrefPrefix)) {
      return pathname.startsWith(domain.pathPrefix);
    }
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}
