<template>
  <v-dialog v-model="dialog" persistent max-width="350">
    <v-card>
      <v-card-title class="text-h6 text-capitalize">
        {{ params.title }}
      </v-card-title>
      <v-card-text>
        {{ params.text }}
      </v-card-text>
      <v-card-text>
        <v-textarea
          v-if="params.input"
          v-model="input"
          :placeholder="params.label"
        />
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="grey" text @click="cancel">
          {{ params.rejectLabel || "No" }}
        </v-btn>
        <v-btn color="green darken-1" text @click="confirm">
          {{ params.acceptLabel || "Yes" }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "Confirmation",
  data: function () {
    return {
      dialog: false,
      params: {
        title: "",
        text: "",
        input: false,
        label: "",
        rejectLabel: "",
        acceptLabel: "",
        onConfirm: {},
        onCancel: {},
      },
      input: "",
      hasErrors: false,
    };
  },

  mounted() {
    Event.$on("show", (params) => {
      this.show(params);
    });
  },

  methods: {
    show: function (params) {
      this.params = params;
      this.dialog = true;
    },

    hide: function () {
      this.dialog = false;
    },

    confirm: function () {
      if (typeof this.params.onConfirm === "function") {
        if (this.params.input === true && this.input === "") {
          this.hasErrors = true;
        } else {
          this.hasErrors = false;
          this.params.onConfirm(this.input);
          this.input = "";
          this.hide();
        }
      } else {
        this.hide();
        this.input = "";
      }
    },

    cancel: function () {
      if (typeof this.params.onCancel === "function") {
        this.params.onCancel();
        this.hide();
        this.input = "";
      } else {
        this.hide();
        this.input = "";
      }
    },
  },
};
</script>

<style scoped></style>
