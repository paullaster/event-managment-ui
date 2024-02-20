export default {
  namespaced: true,
  state: {
    deviceConnected: false,
  },
  mutations: {
    SET_DEVICE_CONNECTED: (state, payload) => {
      state.deviceConnected = payload;
    },
  },
  getters: {
    deviceConnected: (state) => state.deviceConnected,
  },
  actions: {
    setFingerprint({ dispatch }, payload) {
      if (!payload.allowCheckin && payload.isRegistered && !payload.isCheckin) {
        Event.$emit(
          "ApiError",
          "Maximum Fingerprints registered, kindly checkin the delegate"
        );
      } else if (!payload.allowCheckin && payload.isCheckin) {
        Event.$emit(
          "ApiError",
          "Delegate not registered, kindly register the delegate to checkin"
        );
      } else {
        dispatch("Dashboard/setFingerprint", payload, { root: true });
      }
    },
  },
};
