<template>
  <v-footer
    class="mt-10"
    app
    padless
    :inset="true"
    elevation="12"
    :color="color"
  >
    <v-card class="flex" flat tile>
      <v-expand-transition>
        <v-card-text class="grey lighten-1 pa-0 ma-0" v-if="tray">
          <v-system-bar
            window
            :color="connection ? 'green darken-3' : 'red darken-3'"
            dark
          >
            <v-icon left>
              {{ connection ? "mdi-wifi" : "mdi-wifi-alert" }}
            </v-icon>
            {{ connection ? "" : "No" }} connection

            <v-spacer />

            <v-icon @click="tray = false"> mdi-close-circle </v-icon>
          </v-system-bar>

          <v-container fluid>
            <v-card
              color="transparent"
              flat
              style="font-size: 10px"
              class="green--text"
            >
              <v-card-subtitle> Pending Jobs </v-card-subtitle>

              <v-sheet
                color="transparent"
                v-for="(p, i) in $store.getters['Dashboard/requestStack']"
                :key="i"
                class="d-flex flex-row justify-space-around"
              >
                <span>
                  {{ p.method }}
                </span>

                <span>
                  {{ p.endpoint }}
                </span>

                {{ stringify(p.payload) }}
              </v-sheet>
            </v-card>

            <v-card
              color="transparent"
              flat
              class="mt-5 red--text"
              style="font-size: 10px"
            >
              <v-card-subtitle> Failed Jobs </v-card-subtitle>

              <v-sheet
                color="transparent"
                v-for="(p, i) in $store.getters['Dashboard/requestErrors']"
                :key="i"
                class="d-flex flex-row justify-space-around"
              >
                <span>
                  {{ p.method }}
                </span>

                <span>
                  {{ p.endpoint }}
                </span>

                {{ stringify(p.payload) }}
              </v-sheet>
            </v-card>
          </v-container>
        </v-card-text>
      </v-expand-transition>

      <v-card-actions class="pa-3">
        <v-spacer />

        <strong class="heading">
          {{ $store.getters["Setup/companyInformation"].displayName }}
          © {{ new Date().getFullYear() }}
        </strong>

        <v-spacer />

        <a
          class="text-decoration-none blue--text overline"
          href="https://kinetics.co.ke/"
          target="_blank"
        >
          Kinetics Technology LTD
        </a>
      </v-card-actions>
    </v-card>
  </v-footer>
</template>

<script>
import { appName } from "@/environment/environment";

export default {
  name: "Footer",
  data: function () {
    return {
      tray: false,
      connection: false,
    };
  },
  props: {
    opacity: {
      type: String,
      default: "1",
    },
  },

  mounted() {
    setInterval(() => {
      this.connection = navigator.onLine;
    }, 1000);
  },

  computed: {
    color() {
      return `rgba(255, 255, 255, ${this.opacity})`;
    },

    appName() {
      return appName;
    },
  },

  methods: {
    stringify: function (p) {
      return JSON.stringify(p);
    },
  },
};
</script>

<style scoped></style>
