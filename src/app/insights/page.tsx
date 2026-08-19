import { insightsRoute } from "@/lib/cms-routes";

const route = insightsRoute();
export const generateMetadata = route.generateMetadata;
export default route.Page;
