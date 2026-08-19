import { capabilityRoute } from "@/lib/cms-routes";
import { sustainabilityPage } from "@/content/sustainability";

const route = capabilityRoute(sustainabilityPage);
export const generateMetadata = route.generateMetadata;
export default route.Page;
