import { capabilityRoute } from "@/lib/cms-routes";
import { careersPage } from "@/content/careers";

const route = capabilityRoute(careersPage);
export const generateMetadata = route.generateMetadata;
export default route.Page;
