import { capabilityRoute } from "@/lib/cms-routes";
import { applicationsPages } from "@/content/applications";
import { APPLICATIONS_NAV } from "@/lib/navigation";

const route = capabilityRoute(applicationsPages.aerospace, APPLICATIONS_NAV);
export const generateMetadata = route.generateMetadata;
export default route.Page;
