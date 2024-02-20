import call from "../../service/http";
import constants from "./eventsConstants";

export default {
  namespaced: true,
  state: {
    events: [],
    event: {},
    currencies: [],
    eventPackages: [],
    paymentBasis: [],
  },
  mutations: {
    MUTATE: (state, payload) => {
      state[payload.state] = payload.data;
    },
  },
  getters: {
    eventsGetters: (state) => (val) => state[val],
  },
  actions: {
    getEvents: ({ commit }) => {
      commit("Loader/SET_LOADING", true, { root: true });
      call("get", constants.EVENTS)
        .then((res) => {
          commit("MUTATE", { state: "events", data: res.data.data });
          commit("Loader/SET_LOADING", false, { root: true });
        })
        .catch((err) => {
          Event.$emit("ApiError", err.response.data.message);
          commit("Loader/SET_LOADING", false, { root: true });
        });
    },

    addEvent: ({ commit, dispatch }, data) => {
      commit("Loader/SET_LOADING", true, { root: true });
      call("post", constants.SAVE_EVENT, data)
        .then(() => {
          Event.$emit("ApiSuccess", "Event saved successfully");
          Event.$emit("goBack");
          dispatch("getEvents");
          // const event = res.data.data.shift();
          // dispatch("sendForApproval", { docNo: event.no });
        })
        .catch((err) => {
          Event.$emit("ApiError", err.response.data.message);
          commit("Loader/SET_LOADING", false, { root: true });
        });
    },

    getEvent: ({ commit }, data) => {
      commit("Loader/SET_LOADING", true, { root: true });
      call("get", constants.SHOW_EVENT(data))
        .then((res) => {
          commit("MUTATE", { state: "event", data: res.data.data.shift() });
          commit("Loader/SET_LOADING", false, { root: true });
        })
        .catch((err) => {
          Event.$emit("ApiError", err.response.data.message);
          commit("Loader/SET_LOADING", false, { root: true });
        });
    },

    updateEvent: ({ commit, dispatch }, data) => {
      commit("Loader/SET_LOADING", true, { root: true });
      call("post", constants.UPDATE_EVENT, data)
        .then(() => {
          Event.$emit("ApiSuccess", "Event updated successfully");
          Event.$emit("goBack");
          dispatch("getEvents");
          // const event = res.data.data.shift();
          // dispatch("sendForApproval", { docNo: event.no });
        })
        .catch((err) => {
          Event.$emit("ApiError", err.response.data.message);
          commit("Loader/SET_LOADING", false, { root: true });
        });
    },

    deleteEvent: ({ commit, dispatch }, payload) => {
      commit("Loader/SET_LOADING", true, { root: true });
      call("post", constants.DELETE_EVENT, payload)
        .then(() => {
          commit("Loader/SET_LOADING", false, { root: true });
          Event.$emit("ApiSuccess", "Event Deleted Successfully");
          dispatch("getEvents");
          // Event.$emit("goBack");
        })
        .catch((err) => {
          commit("Loader/SET_LOADING", false, { root: true });
          Event.$emit("ApiError", err.response.data.message);
        });
    },

    deletePackage: ({ commit, dispatch }, payload) => {
      commit("Loader/SET_LOADING", true, { root: true });
      call("post", constants.DELETE_PACKAGE, payload)
        .then(() => {
          commit("Loader/SET_LOADING", false, { root: true });
          Event.$emit("ApiSuccess", "Package Deleted Successfully");
          dispatch("getEvent", payload.eventNo);
        })
        .catch((err) => {
          commit("Loader/SET_LOADING", false, { root: true });
          Event.$emit("ApiError", err.response.data.message);
        });
    },

    getEventPackages: ({ commit }) => {
      call("get", constants.eventPackages)
        .then((res) => {
          commit("MUTATE", {
            state: "eventPackages",
            data: res.data.data,
          });
        })
        .catch((err) => {
          console.log("ApiError", err.response.data.message);
        });
    },

    sendForApproval: ({ commit, dispatch }, data) => {
      call("post", constants.SEND_FOR_APPROVAL, data)
        .then(() => {
          commit("Loader/SET_LOADING", false, { root: true });
          Event.$emit("ApiSuccess", "Sent for approval successfully");
          dispatch("getEvents");
          Event.$emit("goBack");
        })
        .catch((err) => {
          Event.$emit("ApiError", err.response.data.message);
          commit("Loader/SET_LOADING", false, { root: true });
        });
    },

    cancelApproval: ({ commit, dispatch }, data) => {
      commit("Loader/SET_LOADING", true, { root: true });
      call("post", constants.CANCEL_APPROVAL, data)
        .then(() => {
          commit("Loader/SET_LOADING", false, { root: true });
          Event.$emit("ApiSuccess", "Approval cancelled successfully");
          dispatch("getEvents");
          Event.$emit("goBack");
        })
        .catch((err) => {
          Event.$emit("ApiError", err.response.data.message);
          commit("Loader/SET_LOADING", false, { root: true });
        });
    },

    reopenDocument: ({ commit, dispatch }, data) => {
      commit("Loader/SET_LOADING", true, { root: true });
      call("post", constants.REOPEN_DOCUMENT, data)
        .then(() => {
          commit("Loader/SET_LOADING", false, { root: true });
          Event.$emit("ApiSuccess", "Document reopened successfully");
          dispatch("getEvents");
          Event.$emit("goBack");
        })
        .catch((err) => {
          Event.$emit("ApiError", err.response.data.message);
          commit("Loader/SET_LOADING", false, { root: true });
        });
    },

    activateEvent: ({ commit, dispatch }, data) => {
      commit("Loader/SET_LOADING", true, { root: true });
      call("post", constants.ACTIVATE_EVENT, data)
        .then(() => {
          commit("Loader/SET_LOADING", false, { root: true });
          Event.$emit("ApiSuccess", "Event activated successfully");
          dispatch("getEvents");
        })
        .catch((err) => {
          Event.$emit("ApiError", err.response.data.message);
          commit("Loader/SET_LOADING", false, { root: true });
        });
    },

    endEvent: ({ commit, dispatch }, data) => {
      commit("Loader/SET_LOADING", true, { root: true });
      call("post", constants.END_EVENT, data)
        .then(() => {
          commit("Loader/SET_LOADING", false, { root: true });
          Event.$emit("ApiSuccess", "Event ended successfully");
          dispatch("getEvents");
          Event.$emit("goBack");
        })
        .catch((err) => {
          Event.$emit("ApiError", err.response.data.message);
          commit("Loader/SET_LOADING", false, { root: true });
        });
    },

    deleteAttachment: ({ commit, dispatch }, payload) => {
      commit("Loader/SET_LOADING", true, { root: true });
      call("post", constants.DELETE_ATTACHMENT, payload)
        .then(() => {
          commit("Loader/SET_LOADING", false, { root: true });
          Event.$emit("ApiSuccess", "Attachment Deleted Successfully");
          dispatch("getEvent", payload.no);
        })
        .catch((err) => {
          commit("Loader/SET_LOADING", false, { root: true });
          Event.$emit("ApiError", err.response.data.message);
        });
    },
  },
};
