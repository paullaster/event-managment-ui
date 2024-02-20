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
            SET PASSWORD
          </v-card-title>
          <v-card-subtitle class="text-center">
            Set a new password
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
              type="password"
              label="New Password"
              placeholder="Enter a secure password"
              v-model="formData.password"
              ref="password"
              :rules="rules.password"
            />

            <v-text-field
              dense
              outlined
              type="password"
              label="Confirm Password"
              placeholder="Enter Password again"
              v-model="formData.confirmPassword"
              ref="confirmPassword"
              :rules="rules.confirmPassword"
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
  name: "Password",
  mixins: [RouterMixin],
  data: function () {
    return {
      formData: {
        password: "",
        confirmPassword: "",
      },
    };
  },

  beforeRouteEnter(to, from, next) {
    next((v) => {
      console.log(v);
    });
  },

  computed: {
    rules() {
      return {
        password: [(v) => !!v || "Password is required"],
        confirmPassword: [
          (v) => !!v || "Password is required",
          (v) => v === this.formData.password || "Password does not match",
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

      this.formData.token = this.$route.params.code;

      if (isValid)
        this.$store.dispatch("Auth/resetPassword", { ...this.formData });
    },
  },
};
</script>

<style scoped></style>
