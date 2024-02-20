<template>
  <v-container
    fluid
    class="fill-height d-flex flex-row align-center"
    style="background-color: rgba(255, 255, 255, 0.65)"
  >
    <v-row>
      <v-col md="4" sm="12" offset-md="4">
        <v-card class="pa-5">
          <v-img
            :src="`data:image/png;base64,${$store.getters['Setup/companyInformation'].logo}`"
            height="100"
            contain
            class="mb-5"
          />

          <v-card-title class="text-h4 d-flex flex-row justify-center">
            FORGOT PASSWORD
          </v-card-title>
          <v-card-subtitle class="text-center">
            Get a password reset link
          </v-card-subtitle>

          <v-card-text class="text-justify mt-4 pb-0">
            <v-alert
              outlined
              v-if="$store.getters['Auth/alert'].status"
              dense
              border="left"
              :type="
                $store.getters['Auth/alert'].status === 'success'
                  ? 'success'
                  : 'error'
              "
              class="mb-10"
            >
              {{ $store.getters["Auth/alert"].message }}
            </v-alert>

            <v-text-field
              dense
              outlined
              type="email"
              label="Email Address"
              placeholder="Enter your Email Address"
              v-model="formData.email"
              ref="email"
              :rules="rules.email"
            />
          </v-card-text>

          <v-card-actions class="">
            <v-row>
              <v-col cols="12">
                <v-btn @click="reset" color="primary" block> Reset </v-btn>
              </v-col>
            </v-row>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import RouterMixin from "../../../router/RouterMixin";

export default {
  name: "ForgotPassword",
  mixins: [RouterMixin],
  data: function () {
    return {
      formData: {
        email: "",
      },
    };
  },

  computed: {
    rules() {
      return {
        email: [
          (v) => !!v || "E-mail is required",
          (v) => /.+@.+/.test(v) || "E-mail must be valid",
        ],
      };
    },
  },

  methods: {
    reset: function () {
      let isValid = true;
      for (const key in this.formData) {
        isValid = isValid ? this.$refs[key].validate(true) : false;
      }

      if (isValid)
        this.$store.dispatch("Auth/forgotPassword", { ...this.formData });
    },
  },
};
</script>

<style scoped></style>
