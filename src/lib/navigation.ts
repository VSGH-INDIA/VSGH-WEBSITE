export const PRIMARY_NAV = [
  { label: "About", href: "/about/company" },
  { label: "Materials", href: "/materials/overview" },
  { label: "Technology", href: "/technology/resource-recovery" },
  { label: "Applications", href: "/applications" },
  { label: "Research", href: "/research" },
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

const PUBLISHED_PREFIXES = ["/about/", "/materials/", "/technology/"] as const;

const CURRENT_DOMAINS = [
  { hrefPrefix: "/about", pathPrefix: "/about/" },
  { hrefPrefix: "/materials", pathPrefix: "/materials/" },
  { hrefPrefix: "/technology", pathPrefix: "/technology/" },
] as const;

export function isPublishedPath(href: string): boolean {
  return (
    href === "/" || PUBLISHED_PREFIXES.some((prefix) => href.startsWith(prefix))
  );
}

export function isPrimaryNavCurrent(href: string, pathname: string): boolean {
  for (const domain of CURRENT_DOMAINS) {
    if (href.startsWith(domain.hrefPrefix)) {
      return pathname.startsWith(domain.pathPrefix);
    }
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}
