import { DomainSubnav } from "@/components/domain/domain-subnav";
import { ABOUT_NAV } from "@/lib/navigation";

export function AboutSubnav({ currentPath }: { currentPath: string }) {
  const slug = currentPath.split("/").filter(Boolean).at(-1) ?? "company";
  const items = ABOUT_NAV.map((item) => ({
    label: item.label,
    href: `/about/company#${item.href.split("/").at(-1)}`,
  }));

  return (
    <DomainSubnav
      label="About"
      items={items}
      currentPath={`/about/company#${slug}`}
    />
  );
}
