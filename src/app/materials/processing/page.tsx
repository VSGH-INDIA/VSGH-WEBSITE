import { capabilityRoute } from "@/lib/cms-routes";
import { materialsPages } from "@/content/materials";
import { MATERIALS_NAV } from "@/lib/navigation";

const route = capabilityRoute(materialsPages.processing, MATERIALS_NAV);
export const generateMetadata = route.generateMetadata;
export default route.Page;
