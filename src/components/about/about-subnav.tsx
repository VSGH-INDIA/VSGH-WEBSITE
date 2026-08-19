import { DomainSubnav } from "@/components/domain/domain-subnav";
import { ABOUT_NAV } from "@/lib/navigation";

export function AboutSubnav({ currentPath }: { currentPath: string }) {
  return (
    <DomainSubnav label="About" items={ABOUT_NAV} currentPath={currentPath} />
  );
}
