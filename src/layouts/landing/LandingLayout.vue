<template>
  <v-app>
    <v-app-bar app elevation="24">
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

      <v-btn v-if="isLoggedIn" color="secondary" to="/dashboard" class="mr-3"
        >Dashboard</v-btn
      >

      <v-btn
        v-if="isLoggedIn"
        color="primary"
        @click="$store.dispatch('Auth/logout')"
        >Logout</v-btn
      >

      <v-btn v-else color="primary" to="/auth">Login</v-btn>
    </v-app-bar>
    <v-main>
      <!-- Content-->
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import { AuthService } from "../../modules/auth";
import SetupMixin from "@/modules/setup/SetupMixin";

export default {
  name: "LandingLayout",
  mixins: [SetupMixin],
  beforeRouteEnter(to, from, next) {
    next((v) => {
      if (AuthService.check()) {
        v.$router.push({ name: "EventList" });
      }
    });
  },
  computed: {
    isLoggedIn() {
      return AuthService.check();
    },

    user() {
      return AuthService.user;
    },
  },
};
</script>

<style scoped></style>
