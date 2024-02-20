const ConfirmPlugin = {
  install(Vue) {
    Vue.prototype.$confirm = {
      show(params) {
        Event.$emit("show", params);
      },
    };
  },
};

export default ConfirmPlugin;
