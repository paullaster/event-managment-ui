export default {
  methods: {
    encodeRoute: function (param) {
      return btoa(param);
    },

    decodeRoute: function (param) {
      return atob(param);
    },
  },

  mounted() {
    Event.$on("route-change", (params) => {
      this.$router.push({ name: params.name, params: { ...params.params } });
    });
  },
};
