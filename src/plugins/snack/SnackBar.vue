<template>
  <v-snackbar
    :timeout="params.timeout"
    v-model="params.snackbar"
    :multi-line="params.multiLine"
    centered
    tile
    transition="scroll-y-transition"
    dark
    top
    :color="params.color"
  >
    <v-icon left color="white">mdi-check-circle</v-icon>
    {{ params.text }}

    <template v-slot:action="{ attrs }">
      <v-btn color="red" text v-bind="attrs" @click="params.snackbar = false">
        Close
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
export default {
  name: "SnackBar",
  data: function () {
    return {
      params: {
        multiLine: false,
        snackbar: false,
        text: "I'm a multi-line snackbar.",
        color: "success",
        timeout: 2000,
      },
    };
  },

  mounted() {
    Event.$on("snack-show", (params) => {
      this.show(params);
    });
  },

  methods: {
    show: function (params) {
      this.params = { ...params };
      this.params.snackbar = true;

      setTimeout(() => {
        this.params.snackbar = false;
      }, this.params.timeout);
    },
  },
};
</script>

<style scoped></style>
