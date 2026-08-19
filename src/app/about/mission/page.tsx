import { aboutRoute } from "@/lib/cms-routes";
import { aboutPages } from "@/content/about";

const route = aboutRoute(aboutPages.mission);
export const generateMetadata = route.generateMetadata;
export default route.Page;
