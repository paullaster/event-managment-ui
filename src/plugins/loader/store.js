export default {
  namespaced: true,
  state: { loading: false, dialogLoading: false, scanning: false },
  mutations: {
    SET_LOADING: (state, payload) => {
      state.loading = payload;
    },
    SET_DIALOG_LOADING: (state, payload) => {
      state.dialogLoading = payload;
    },
    SET_SCANNING: (state, payload) => {
      state.scanning = payload;
    },
  },
  getters: {
    loading: (state) => state.loading,
    dialogLoading: (state) => state.dialogLoading,
    scanning: (state) => state.scanning,
  },
};
