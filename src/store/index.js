import Vue from "vue";
import Vuex from "vuex";
import VuexPersistence from "vuex-persist";
Vue.use(Vuex);

const vuexPersist = new VuexPersistence({
  storage: window.localStorage,
  modules: ["Dashboard"],
});

export default new Vuex.Store({
  plugins: [vuexPersist.plugin],
});
