import store from "./store";
import scanner from "./FingerprintSigninControl.js";

export default {
  install(Vue, options) {
    options.store.registerModule("Fingerprint", store);
    Vue.prototype.$scanner = {
      scan: async (type) => {
        await scanner.initiateClass().init(type);
      },
    };
  },
};
