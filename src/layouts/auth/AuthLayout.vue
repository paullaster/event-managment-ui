<template>
  <v-app>
    <v-app-bar app dark color="primary">
      <v-img
        alt="Logo"
        class="shrink mr-2"
        contain
        :src="`data:image/png;base64,${companyInformation.logo}`"
        transition="scale-transition"
        width="50"
        @click="$router.push('/')"
      />
      <v-spacer />

      <v-btn
        v-if="auth.check()"
        @click="$store.dispatch('Auth/logout')"
        text
        class="ml-2"
        color="white"
        light
      >
        <span class="mr-2">Logout</span>
        <v-icon>mdi-logout</v-icon>
      </v-btn>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>

    <spinner />

    <Footer opacity="0.65" />
  </v-app>
</template>

<script>
import Footer from "../../components/Footer";
import { AuthService } from "../../modules/auth";
import SetupMixin from "../../modules/setup/SetupMixin";

export default {
  name: "AuthLayout",
  mixins: [SetupMixin],
  components: { Footer },
  beforeRouteEnter(to, from, next) {
    next((v) => {
      if (AuthService.check()) {
        v.$router.push({ name: "EventList" });
      }
    });
  },

  computed: {
    auth() {
      return AuthService;
    },
  },

  mounted() {
    Event.$emit("snack-bar", {});
  },

  watch: {
    "$route.name": {
      handler: function (n, o) {
        if (n !== o) this.$store.commit("Auth/SET_ALERT", null);
      },
    },
  },
};
</script>

<style scoped></style>
