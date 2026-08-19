export const PRIMARY_NAV = [
  { label: "About", href: "/about/company" },
  { label: "Materials", href: "/materials" },
  { label: "Technology", href: "/technology" },
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

export function isPublishedPath(href: string): boolean {
  return href === "/" || href.startsWith("/about/");
}

export function isPrimaryNavCurrent(href: string, pathname: string): boolean {
  if (href.startsWith("/about")) {
    return pathname.startsWith("/about/");
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}
