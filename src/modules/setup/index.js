import SetupStore from "./SetupStore";

export default {
  install(Vue, options) {
    if (options.store) {
      options.store.registerModule("Setup", SetupStore);
    }
  },
};
