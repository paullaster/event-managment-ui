<template>
  <div>
    <v-container
      fluid
      class="pa-0"
      style="
        background-size: cover;
        background: url('/img/attendance.jpg') no-repeat center center;
      "
    >
      <v-sheet
        class="py-16"
        style="background-color: rgba(4, 4, 4, 0.57); min-height: 50vh"
      >
        <v-row>
          <v-col cols="10" offset="1" md="6" offset-md="3" class="my-5">
            <h4 class="text-h3 white--text text-center font-weight-bold my-10">
              BIOMETRIC ATTENDANCE MANAGEMENT
            </h4>

            <h3 class="text-h5 white--text text-center">
              Manage biometric Attendance like never before
            </h3>
          </v-col>
        </v-row>
      </v-sheet>
    </v-container>

    <v-container fluid class="py-16">
      <v-row>
        <v-col cols="2" offset="5">
          <v-divider dark />
        </v-col>

        <v-col cols="12" class="mb-5 text-center">
          <h1 class="font-weight-bold text-h4 capitalize">
            <span class="primary--text">AVAILABLE ATTENDANCE MODULES</span>
          </h1>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="10" offset="1">
          <v-row class="justify-center">
            <v-col
              md="4"
              cols="12"
              class="d-flex"
              v-for="(method, i) in attendanceMethods"
              :key="i"
            >
              <v-hover v-slot="{ hover }" open-delay="100" style="width: 100%">
                <v-card
                  :elevation="hover ? 16 : 2"
                  :class="{ 'on-hover': hover }"
                  class="py-10"
                >
                  <v-card-text class="text-center">
                    <div style="min-height: 150px">
                      <v-icon color="secondary" x-large>
                        {{ method.icon }}</v-icon
                      >

                      <h3 class="text-uppercase display-5 primary--text my-4">
                        {{ method.name }}
                      </h3>
                      <p class="">{{ method.description }}</p>
                    </div>
                  </v-card-text>
                </v-card>
              </v-hover>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>

    <v-main>
      <v-sheet dark min-height="30vh" class="pa-10" color="grey darken-4">
        <v-row>
          <v-col cols="12" md="6" offset-md="3">
            <v-img
              class="mb-5"
              src="img/logo-white.png"
              max-height="220"
              max-width="220"
              contain
              @click="$router.push('/')"
            ></v-img>

            <p class="pa-2 my-2 text-center">
              <v-icon small class="mr-2">mdi-phone</v-icon>
              +257 782757774
            </p>

            <p class="pa-2 my-2 text-center">
              <v-icon small class="mr-2">mdi-email</v-icon>
              solutions@kinetics.co.ke
            </p>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12">
            <p class="text-center">Terms of Use, Disclaimer, Privacy Policy.</p>
          </v-col>
        </v-row>
      </v-sheet>
    </v-main>
  </div>
</template>

<script>
export default {
  name: "Landing",
  data: function () {
    return {
      attendanceMethods: [
        {
          name: "Biometric Attendance",
          icon: "mdi-fingerprint",
          description: "Biometric attendance using fingerprint scanners",
        },
      ],
    };
  },
  methods: {},
};
</script>

<style scoped></style>
