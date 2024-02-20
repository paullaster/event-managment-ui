<template>
  <v-app id="inspire">
    <v-app-bar app color="white" flat>
      <v-img
        alt="Logo"
        class="shrink mr-2"
        contain
        :src="`data:image/png;base64,${companyInformation.logo}`"
        transition="scale-transition"
        width="50"
        @click="$router.push('/')"
      />

      <span class="headline">
        {{ companyInformation.displayName }} Biometric Registration
      </span>

      <v-spacer />

      <v-btn color="primary" @click="$store.dispatch('Auth/logout')"
        >Logout</v-btn
      >
    </v-app-bar>

    <v-main class="grey lighten-3">
      <router-view name="view" />
      <router-view name="action" />
    </v-main>

    <spinner />

    <scanner-loader />

    <confirmation />

    <snack-bar />

    <Footer />
  </v-app>
</template>

<script>
import { appName, hasEms } from "@/environment/environment";
import Confirmation from "@/plugins/confirmtion/Confirmation";
import Footer from "@/components/Footer";
import SetupMixin from "@/modules/setup/SetupMixin";
import { AuthService } from "@/modules/auth";
import SnackBar from "@/plugins/snack/SnackBar";
// import { DashboardService } from "@/modules/dashboard";

export default {
  name: "DashboardLayout",

  mixins: [SetupMixin],

  components: { SnackBar, Footer, Confirmation },

  data: function () {
    return {
      loading: false,
    };
  },

  // created() {
  //   DashboardService.subscribe();
  // },

  computed: {
    appName() {
      return appName;
    },

    user() {
      return AuthService.user;
    },

    hasEms() {
      return hasEms === "true";
    },
  },
};
</script>

<style scoped></style>
