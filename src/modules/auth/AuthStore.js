import call from "../../service/http";
import { AuthConstants } from "./index";
import AuthService from "./AuthService";

export default {
  namespaced: true,
  state: {
    terms: {},
    requirements: [],
    verified: "pending",
    alert: {
      status: "",
      message: "",
    },
  },
  mutations: {
    SET_TERMS: (state, payload) => {
      state.terms = payload;
    },

    SET_REQUIREMENTS: (state, payload) => {
      state.requirements = payload;
    },

    SET_VERIFY: (state, payload) => {
      state.verified = payload;
    },

    SET_ALERT: (state, payload) => {
      state.alert = payload || {
        status: "",
        message: "",
      };
    },
  },
  getters: {
    terms: (state) => state.terms,
    requirements: (state) => state.requirements,
    error: (state) => state.error,
    verified: (state) => state.verified,
    alert: (state) => state.alert,
  },
  actions: {
    getTerms: ({ commit }) => {
      commit("SET_ALERT", null);
      commit("Loader/SET_LOADING", true, { root: true });
      call("get", AuthConstants.terms)
        .then((res) => {
          commit("SET_TERMS", res.data.data);
          commit("Loader/SET_LOADING", false, { root: true });
        })
        .catch((err) => {
          commit("Loader/SET_LOADING", false, { root: true });
          commit("SET_ALERT", {
            status: "error",
            message: err.response.data.message,
          });
        });
    },

    getMembershipRequirements: ({ commit }) => {
      commit("SET_ALERT", null);
      commit("Loader/SET_LOADING", true, { root: true });
      call("get", AuthConstants.requirements)
        .then((res) => {
          commit("SET_REQUIREMENTS", res.data.data);
          commit("Loader/SET_LOADING", false, { root: true });
        })
        .catch((err) => {
          commit("Loader/SET_LOADING", false, { root: true });
          commit("SET_ALERT", {
            status: "error",
            message: err.response.data.message,
          });
        });
    },

    register: ({ commit }, data) => {
      commit("SET_ALERT", null);
      commit("Loader/SET_LOADING", true, { root: true });
      call("post", AuthConstants.register, data)
        .then(() => {
          commit("Loader/SET_LOADING", false, { root: true });
          Event.$emit("route-change", { name: "success", params: {} });
        })
        .catch((err) => {
          commit("Loader/SET_LOADING", false, { root: true });
          commit("SET_ALERT", {
            status: "error",
            message: err.response.data.message,
          });
        });
    },

    login: ({ commit }, data) => {
      commit("SET_ALERT", null);
      commit("Loader/SET_LOADING", true, { root: true });
      call("post", AuthConstants.login, data)
        .then((res) => {
          AuthService.login(res.data.data.token, res.data.data.user);
          commit("Loader/SET_LOADING", false, { root: true });
        })
        .catch((err) => {
          commit("Loader/SET_LOADING", false, { root: true });
          commit("SET_ALERT", {
            status: "error",
            message: err.response.data.message,
          });
        });
    },

    verify: ({ commit }, data) => {
      commit("SET_ALERT", null);
      commit("Loader/SET_LOADING", true, { root: true });
      call("post", AuthConstants.verify, data)
        .then(() => {
          commit("Loader/SET_LOADING", false, { root: true });
          commit("SET_VERIFY", "success");
        })
        .catch((err) => {
          commit("SET_VERIFY", "failed");
          commit("Loader/SET_LOADING", false, { root: true });
          commit("SET_ALERT", {
            status: "error",
            message: err.response.data.message,
          });
        });
    },

    forgotPassword: ({ commit }, data) => {
      commit("SET_ALERT", null);
      commit("Loader/SET_LOADING", true, { root: true });
      call("post", AuthConstants.passwordReset, data)
        .then((res) => {
          commit("Loader/SET_LOADING", false, { root: true });
          commit("SET_ALERT", {
            status: "success",
            message: res.data.data,
          });
        })
        .catch((err) => {
          commit("Loader/SET_LOADING", false, { root: true });
          commit("SET_ALERT", {
            status: "error",
            message: err.response.data.message,
          });
        });
    },

    resetPassword: ({ commit }, data) => {
      commit("SET_ALERT", null);
      commit("Loader/SET_LOADING", true, { root: true });
      console.log(data);
      call("post", AuthConstants.password, data)
        .then((res) => {
          commit("Loader/SET_LOADING", false, { root: true });
          commit("SET_ALERT", {
            status: "success",
            message: res.data.data.message,
          });
          setTimeout(() => {
            AuthService.login(res.data.data.token, res.data.data.user);
          }, 2000);
        })
        .catch((err) => {
          commit("Loader/SET_LOADING", false, { root: true });
          commit("SET_ALERT", {
            status: "error",
            message: err.response.data.message,
          });
        });
    },

    user: ({ commit }) => {
      commit("SET_ALERT", null);
      commit("Loader/SET_LOADING", true, { root: true });
      call("get", AuthConstants.user).then((res) => {
        AuthService.setUser(res.data.data);
        commit("Loader/SET_LOADING", false, { root: true });
      });
    },

    logout: () => {
      call("get", AuthConstants.logout).then(() => {
        AuthService.logout();
      });
    },
  },
};
