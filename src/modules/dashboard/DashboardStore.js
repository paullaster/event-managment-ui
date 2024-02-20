import call from "../../service/http";
import constants from "./DashboardConstants";

export default {
  namespaced: true,
  state: {
    delegates: [],
    delegate: {},
    report: "",
    checkinDelegate: {},
    request_stack: [],
  },
  mutations: {
    MUTATE: (state, payload) => {
      state[payload.state] = payload.data;
    },
    PERSIST_ATTENDANCE: (state, payload) => {
      state.delegates.forEach((del) => {
        if (del.no === payload.delegateNo) del.attendance.push(payload);
      });
    },
    PERSIST_REQUEST_STACK: (state, payload) => {
      state.request_stack.push(payload);
    },
    PERSIST_DELEGATE: (state, payload) => {
      switch (payload.type) {
        case "update":
          state.delegates.forEach((del) => {
            if (del.no === payload.no) {
              del = payload.delegate;
            }
          });
          break;
        case "add":
          state.delegates.push(payload.delegate);
          break;
        default:
          break;
      }
    },
  },
  getters: {
    dashboardGetters: (state) => (val) => state[val],
  },
  actions: {
    getDelegates: ({ commit }) => {
      commit("Loader/SET_LOADING", true, { root: true });
      call("get", constants.DELEGATES)
        .then((res) => {
          commit("Loader/SET_LOADING", false, { root: true });
          commit("MUTATE", { state: "delegates", data: res.data.data });
        })
        .catch((err) => {
          commit("Loader/SET_LOADING", false, { root: true });
          Event.$emit("ApiError", err.response.data.message);
        });
    },
    getDelegate: ({ commit }, payload, type = "pull") => {
      commit("Loader/SET_LOADING", true, { root: true });
      call("get", constants.GET_DELEGATE(payload))
        .then((res) => {
          commit("Loader/SET_LOADING", false, { root: true });
          commit("MUTATE", {
            state: type === "checkin" ? "checkinDelegate" : "delegate",
            data: res.data.data.shift(),
          });
        })
        .catch((err) => {
          commit("Loader/SET_LOADING", false, { root: true });
          Event.$emit("ApiError", err.response.data.message);
        });
    },
    searchDelegate: ({ commit }, payload) => {
      commit("Loader/SET_LOADING", true, { root: true });
      call("get", constants.GET_DELEGATE(payload))
        .then((res) => {
          commit("Loader/SET_LOADING", false, { root: true });
          commit("MUTATE", {
            state: "checkinDelegate",
            data: res.data.data.shift(),
          });
        })
        .catch((err) => {
          commit("Loader/SET_LOADING", false, { root: true });
          Event.$emit("ApiError", err.response.data.message);
        });
    },
    saveDelegate: ({ commit, dispatch }, payload) => {
      commit("Loader/SET_DIALOG_LOADING", true, { root: true });
      commit("PERSIST_DELEGATE", { type: "add", delegate: payload });
      call("post", constants.DELEGATES, payload)
        .then((res) => {
          commit("Loader/SET_DIALOG_LOADING", false, { root: true });
          Event.$emit("ApiSuccess", "Saved Successfully");
          const delegate = res.data.data.shift();
          Event.$emit(payload.type, delegate);
          dispatch("getDelegate", { no: delegate.no });
          dispatch("getDelegates");
        })
        .catch((err) => {
          commit("Loader/SET_DIALOG_LOADING", false, { root: true });
          Event.$emit("ApiError", err.response.data.message);
        });
    },
    updateDelegate: ({ commit, dispatch }, payload) => {
      commit("Loader/SET_DIALOG_LOADING", true, { root: true });
      commit("PERSIST_DELEGATE", { type: "update", delegate: payload });
      call("post", constants.UPDATE_DELEGATE, payload)
        .then((res) => {
          commit("Loader/SET_DIALOG_LOADING", false, { root: true });
          Event.$emit("ApiSuccess", "Updated Successfully");
          const delegate = res.data.data.shift();
          Event.$emit(payload.type, delegate);
          dispatch("getDelegate", { no: delegate.no });
          dispatch("getDelegates");
        })
        .catch((err) => {
          commit("Loader/SET_DIALOG_LOADING", false, { root: true });
          Event.$emit("ApiError", err.response.data.message);
        });
    },
    deleteDelegate: ({ commit }, payload) => {
      commit("Loader/SET_DIALOG_LOADING", true, { root: true });
      call("post", constants.DELETE_DELEGATE(payload))
        .then(() => {
          commit("Loader/SET_DIALOG_LOADING", false, { root: true });
          Event.$emit("ApiSuccess", "Deleted Successfully");
          Event.$emit(payload.type);
        })
        .catch((err) => {
          commit("Loader/SET_DIALOG_LOADING", false, { root: true });
          Event.$emit("ApiError", err.response.data.message);
        });
    },
    submitAttendance: ({ commit, dispatch }, data) => {
      commit("Loader/SET_LOADING", true, { root: true });
      call("post", constants.submitAttendance, data)
        .then((res) => {
          Event.$emit("ApiSuccess", res.data.data);
          dispatch("getDelegates");
          commit("Loader/SET_LOADING", false, { root: true });
        })
        .catch((err) => {
          Event.$emit("ApiError", err.response.data.message);
          commit("Loader/SET_LOADING", false, { root: true });
        });
    },
    getReport: ({ commit }, data) => {
      commit("Loader/SET_LOADING", true, { root: true });
      call("get", constants.getReport(data))
        .then((res) => {
          commit("MUTATE", { state: "report", data: res.data.data.shift() });
          commit("Loader/SET_LOADING", false, { root: true });
        })
        .catch((err) => {
          Event.$emit("ApiError", err.response.data.message);
          commit("Loader/SET_LOADING", false, { root: true });
        });
    },
    setFingerprint: ({ commit, dispatch }, data) => {
      commit("Loader/SET_LOADING", true, { root: true });
      call("post", constants.REGISTER_FINGERPRINT, data)
        .then(() => {
          commit("Loader/SET_LOADING", false, { root: true });
          Event.$emit("reloadTemplateScripts");
          Event.$emit("ApiSuccess", "Fingerprint registered successfully");
          dispatch("getDelegate", { no: data.no });
        })
        .catch((err) => {
          Event.$emit("reloadTemplateScripts");
          Event.$emit("ApiError", err.response.data.message);
          commit("Loader/SET_LOADING", false, { root: true });
        });
    },
    verifyFingerprint: ({ commit }, data) => {
      commit("Loader/SET_LOADING", true, { root: true });
      call("post", constants.VERIFY_FINGERPRINT, data)
        .then((res) => {
          commit("Loader/SET_LOADING", false, { root: true });
          Event.$emit("reloadScripts");
          Event.$emit("ApiSuccess", "Fingerprint verified successfully");
          Event.$emit("openCheckin", res.data.data);
        })
        .catch((err) => {
          Event.$emit("reloadScripts");
          Event.$emit("ApiError", err.response.data.message);
          commit("Loader/SET_LOADING", false, { root: true });
        });
    },
    manualCheckin: ({ commit }, data) => {
      commit("Loader/SET_LOADING", true, { root: true });
      call("post", constants.MANUAL_CHECKIN, data)
        .then(() => {
          commit("Loader/SET_LOADING", false, { root: true });
          Event.$emit("ApiSuccess", "Checked in successfully");
          Event.$emit("goBack");
          commit("PERSIST_ATTENDANCE", data);
          commit("PERSIST_REQUEST_STACK", data);
        })
        .catch((err) => {
          Event.$emit("ApiError", err.response.data.message);
          commit("Loader/SET_LOADING", false, { root: true });
        });
    },
    syncAttendance: ({ commit }, data) => {
      commit("Loader/SET_LOADING", true, { root: true });
      call("post", constants.SYNC_ATTENDANCE, data)
        .then(() => {
          Event.$emit("ApiSuccess", "Attendance Synced successfully");
          commit("Loader/SET_LOADING", false, { root: true });
        })
        .catch((err) => {
          Event.$emit("ApiError", err.response.data.message);
          commit("Loader/SET_LOADING", false, { root: true });
        });
    },
    editAttendeePay: ({ commit, dispatch }, data) => {
      commit("Loader/SET_LOADING", true, { root: true });
      call("post", constants.editAttendeePay, data)
        .then((res) => {
          Event.$emit("ApiSuccess", res.data.message);
          console.log(res[0]);
          dispatch("getDelegate", { no: data.delegateNo });
          Event.$emit("stopEditing");
          commit("Loader/SET_LOADING", false, { root: true });
        })
        .catch((err) => {
          Event.$emit("ApiError", err.response.data.message);
          commit("Loader/SET_LOADING", false, { root: true });
        });
    },
    addAttendeePay: ({ commit, dispatch }, data) => {
      commit("Loader/SET_LOADING", true, { root: true });
      call("post", constants.addAttendeePay, data)
        .then((res) => {
          Event.$emit("ApiSuccess", res.data.message);
          dispatch("getDelegate", { no: data.attendeePays[0].delegateNo });
          Event.$emit("stopEditing");
          commit("Loader/SET_LOADING", false, { root: true });
        })
        .catch((err) => {
          Event.$emit("ApiError", err.response.data.message);
          commit("Loader/SET_LOADING", false, { root: true });
        });
    },
    syncDelegates: ({ commit }, data) => {
      commit("Loader/SET_LOADING", true, { root: true });
      call("post", constants.syncDelegates, data)
        .then((res) => {
          Event.$emit("ApiSuccess", res.data.message);
          commit("Loader/SET_LOADING", false, { root: true });
        })
        .catch((err) => {
          Event.$emit("ApiError", err.response.data.message);
          commit("Loader/SET_LOADING", false, { root: true });
        });
    },
  },
};
