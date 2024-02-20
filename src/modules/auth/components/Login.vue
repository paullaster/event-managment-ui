<template>
  <v-container
    fluid
    class="fill-height d-flex flex-row align-center"
    style="background-color: rgba(255, 255, 255, 0.65)"
    @keypress.enter="login"
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

          <v-card-title
            class="text-h5 d-flex flex-row justify-center text-capitalize"
          >
            Login to {{ appName.toLowerCase() }}
          </v-card-title>

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
              label="Email Address"
              placeholder="Enter your Email Address"
              v-model="formData.email"
              ref="email"
              :rules="rules.email"
            />

            <v-text-field
              dense
              outlined
              label="Password"
              placeholder="Enter your password"
              v-model="formData.password"
              ref="password"
              :rules="rules.password"
              :append-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
              :type="showPassword ? 'text' : 'password'"
              @click:append="showPassword = !showPassword"
            />
          </v-card-text>

          <v-btn text :to="{ name: 'forgotPassword' }"> Forgot password?</v-btn>

          <v-card-actions class="">
            <v-btn @click="login" color="primary" block> Login </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import RouterMixin from "../../../router/RouterMixin";
import { appName } from "@/environment/environment";

export default {
  name: "Login",
  mixins: [RouterMixin],
  data: function () {
    return {
      formData: {
        email: "",
        password: "",
      },
      showPassword: false,
    };
  },

  computed: {
    rules() {
      return {
        email: [
          (v) => !!v || "E-mail is required",
          (v) => /.+@.+/.test(v) || "E-mail must be valid",
        ],
        password: [(v) => !!v || "Password is required"],
      };
    },

    appName() {
      return appName;
    },
  },

  methods: {
    login: function () {
      let isValid = true;
      for (const key in this.formData) {
        if (this.$refs[key])
          isValid = isValid ? this.$refs[key].validate(true) : false;
      }

      if (isValid) this.$store.dispatch("Auth/login", { ...this.formData });
    },
  },
};
</script>

<style scoped></style>
