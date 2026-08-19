import { capabilityRoute } from "@/lib/cms-routes";
import { researchPages } from "@/content/research";
import { RESEARCH_NAV } from "@/lib/navigation";

const route = capabilityRoute(researchPages["research-areas"], RESEARCH_NAV);
export const generateMetadata = route.generateMetadata;
export default route.Page;
