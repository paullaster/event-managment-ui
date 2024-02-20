const SetupMixin = {
  methods: {
    getSetups: function (setups = []) {
      setups.forEach((setup) => {
        this.$store.dispatch(`Setup/${setup}`);
      });
    },
  },

  computed: {
    companyInformation() {
      return this.$store.getters["Setup/companyInformation"];
    },
  },
};

export default SetupMixin;
