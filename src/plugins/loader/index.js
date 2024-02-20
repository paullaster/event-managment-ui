import Spinner from "./views/Spinner";
import DialogSpinner from "./views/DialogSpinner";
import ScannerLoader from "./views/ScannerLoader";
import store from "./store";

export default {
  install(Vue, options) {
    options.store.registerModule("Loader", store);
    Vue.component("spinner", Spinner);
    Vue.component("dialog-spinner", DialogSpinner);
    Vue.component("scanner-loader", ScannerLoader);
  },
};
