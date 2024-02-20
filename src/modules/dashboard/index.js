import DashboardRoutes from "./DashboardRoutes";
import DashboardStore from "./DashboardStore";
import { AuthRoutes, AuthStore } from "../auth";

export default {
  install(Vue, options) {
    if (options.router) {
      options.router.addRoutes(DashboardRoutes);
      options.router.addRoutes(AuthRoutes);
    }

    if (options.store) {
      options.store.registerModule("Auth", AuthStore);
      options.store.registerModule("Dashboard", DashboardStore);
    }
  },
};
