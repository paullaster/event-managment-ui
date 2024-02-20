import LandingRoutes from "./LandingRoutes";
import LandingStore from "./LandingStore";

export default {
  install(Vue, options) {
    if (options.router) {
      options.router.addRoutes(LandingRoutes);
    }

    if (options.store) {
      options.store.registerModule("Landing", LandingStore);
    }
  },
};
