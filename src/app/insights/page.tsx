import { capabilityRoute } from "@/lib/cms-routes";
import { insightsPage } from "@/content/insights";

const route = capabilityRoute(insightsPage);
export const generateMetadata = route.generateMetadata;
export default route.Page;
