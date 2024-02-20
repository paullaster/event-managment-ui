const SnackBar = {
  install(Vue) {
    Vue.prototype.$snack = {
      show(params) {
        Event.$emit("snack-show", params);
      },
    };
  },
};

export default SnackBar;
