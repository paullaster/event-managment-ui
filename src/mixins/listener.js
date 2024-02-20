const listener = {
  mounted: function () {
    // Global Event Listeners
    Event.$on("login", () => {
      window.location = "/dashboard";
    });

    Event.$on("logout", () => {
      this.$router.push("/auth/login");
    });

    Event.$on("ApiError", (message) => {
      this.$toast.warning(message, {
        position: "top-center",
        timeout: 5000,
        closeOnClick: true,
        pauseOnFocusLoss: true,
        pauseOnHover: true,
        draggable: true,
        draggablePercent: 0.6,
        showCloseButtonOnHover: false,
        hideProgressBar: false,
        closeButton: "button",
        icon: true,
        rtl: false,
      });
    });

    Event.$on("ApiSuccess", (message) => {
      this.$toast.success(message, {
        position: "top-center",
        timeout: 5000,
        closeOnClick: true,
        pauseOnFocusLoss: true,
        pauseOnHover: true,
        draggable: true,
        draggablePercent: 0.6,
        showCloseButtonOnHover: false,
        hideProgressBar: false,
        closeButton: "button",
        icon: true,
        rtl: false,
      });
    });

    Event.$on("ApiInfo", (message) => {
      this.$toast.info(message, {
        position: "top-center",
        timeout: 5000,
        closeOnClick: true,
        pauseOnFocusLoss: true,
        pauseOnHover: true,
        draggable: true,
        draggablePercent: 0.6,
        showCloseButtonOnHover: false,
        hideProgressBar: false,
        closeButton: "button",
        icon: true,
        rtl: false,
      });
    });

    Event.$on("ApiWarning", (message) => {
      this.$toast.warning(message, {
        position: "top-center",
        timeout: 5000,
        closeOnClick: true,
        pauseOnFocusLoss: true,
        pauseOnHover: true,
        draggable: true,
        draggablePercent: 0.6,
        showCloseButtonOnHover: false,
        hideProgressBar: false,
        closeButton: "button",
        icon: true,
        rtl: false,
      });
    });

    Event.$on("reload", () => {
      this.$router.go();
    });

    Event.$on("scanFingerprint", ({ samples, type }) => {
      let delegate = {};
      if (this.$route.query.isEdit) {
        delegate =
          this.$store.getters["Dashboard/dashboardGetters"]("delegate");
        delegate.allowCheckin = false;
        delegate.isCheckin = false;
      } else {
        delegate =
          this.$store.getters["Dashboard/dashboardGetters"]("checkinDelegate");
        delegate.allowCheckin = delegate.isRegistered;
        delegate.isCheckin = true;
      }
      const payload = {
        ...delegate,
        samples,
      };
      if (type == "verify" && window.location.pathname.includes("delegates")) {
        this.$store.dispatch("Dashboard/verifyFingerprint", payload);
      } else {
        this.$store.dispatch("Fingerprint/setFingerprint", payload);
      }
    });

    Event.$on("deviceError", () => {
      Event.$emit("ApiError", "Device Error. Device not connected");
    });

    Event.$on("deviceConnected", () => {
      console.log("Device Connected");
    });

    Event.$on("goBack", () => {
      this.$router.back();
    });
  },
};
export default listener;
