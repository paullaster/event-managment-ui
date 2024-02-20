import { loadScript } from "vue-plugin-load-script";
import { AuthService } from "@/modules/auth";
export default {
  mounted() {
    this.loadBiometricScripts();
  },
  computed: {
    employeeNo() {
      return AuthService.user.employee ? AuthService.user.employee.number : "";
    },
  },
  methods: {
    loadBiometricScripts() {
      loadScript("../../../modules/WebSdk/index.js");
      loadScript(
        "../../../node_modules/@digitalpersona/devices/dist/es5.bundles/index.umd.min.js"
      );
    },
  },
};
