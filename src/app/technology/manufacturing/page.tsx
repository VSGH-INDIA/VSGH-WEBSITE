import { capabilityRoute } from "@/lib/cms-routes";
import { technologyPages } from "@/content/technology";
import { TECHNOLOGY_NAV } from "@/lib/navigation";

const route = capabilityRoute(technologyPages.manufacturing, TECHNOLOGY_NAV);
export const generateMetadata = route.generateMetadata;
export default route.Page;
