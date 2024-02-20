import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import VueTelInputVuetify from "vue-tel-input-vuetify/lib";
import confirmation from "./plugins/confirmtion";
import snack from "./plugins/snack";
import { filters } from "./utils";
import listener from "./mixins/listener";
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import loader from "./plugins/loader";

/** initalize scanner */
import scanner from "./plugins/digitalpersona";

Vue.config.productionTip = false;

// eslint-disable-next-line no-global-assign
Event = new Vue();

const options = { router, store };

import Dashboard from "./modules/dashboard";
import Setup from "./modules/setup";
import Landing from "./modules/landing";
import Events from "./modules/events";

Vue.use(confirmation);
Vue.use(snack);
Vue.use(Toast);
Vue.use(loader, options);
Vue.use(scanner, options);

Vue.use(VueTelInputVuetify, {
  vuetify,
});

Vue.use(Dashboard, options);
Vue.use(Setup, options);
Vue.use(Landing, options);
Vue.use(Events, options);

/* Register Filters */
filters.forEach((f) => {
  Vue.filter(f.name, f.execute);
});

new Vue({
  router,
  store,
  vuetify,
  mixins: [listener],
  render: (h) => h(App),
}).$mount("#app");
