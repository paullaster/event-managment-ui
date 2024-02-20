<template>
  <v-container
    fluid
    class="fill-height d-flex flex-row align-center"
    style="background-color: rgba(255, 255, 255, 0.65)"
  >
    <v-row>
      <v-col class="text-center" md="6" sm="12" offset-md="3">
        <v-card>
          <v-card-text>
            <v-icon style="font-size: 150px" color="secondary"
              >mdi-check-circle</v-icon
            >

            <h1
              class="text-center mb-3 font-weight-light"
              style="font-size: 40px"
            >
              Success
            </h1>

            <p class="mt-5 subtitle-1">
              Your account has been created, <br />an email with an activation
              link has been sent to your inbox. Make sure to check you junk
              folder also for the email.
            </p>
            <v-btn
              :to="{ name: 'login' }"
              class="mt-5"
              x-large
              color="secondary"
              >Login</v-btn
            >
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "Success",
};
</script>

<style scoped></style>
