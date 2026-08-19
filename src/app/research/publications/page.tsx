import { capabilityRoute } from "@/lib/cms-routes";
import { researchPages } from "@/content/research";
import { RESEARCH_NAV } from "@/lib/navigation";

const route = capabilityRoute(researchPages.publications, RESEARCH_NAV);
export const generateMetadata = route.generateMetadata;
export default route.Page;
