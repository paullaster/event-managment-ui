import eventsRoutes from "./eventsRoutes";
import eventsStore from "./eventsStore";

export default {
  install(Vue, options) {
    if (options.router) {
      options.router.addRoutes(eventsRoutes);
    }

    if (options.store) {
      options.store.registerModule("Events", eventsStore);
    }
  },
};
