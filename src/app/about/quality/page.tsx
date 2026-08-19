import { aboutRoute } from "@/lib/cms-routes";
import { aboutPages } from "@/content/about";

const route = aboutRoute(aboutPages.quality);
export const generateMetadata = route.generateMetadata;
export default route.Page;
