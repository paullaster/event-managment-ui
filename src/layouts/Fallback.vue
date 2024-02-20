<template>
  <v-app>
    <v-container
      fluid
      class="fill-height"
      style="
        background: url('/img/nothing.jpg') no-repeat;
        background-size: cover;
      "
    >
      <v-overlay opacity=".7">
        <div class="text-uppercase d-flex flex-column align-center">
          <h1 class="text-h1 mb-5">404</h1>
          <h3 class="text-h5 mb-3">Nothing here</h3>
          <v-btn text large to="/">Go Back</v-btn>
        </div>
      </v-overlay>
    </v-container>
  </v-app>
</template>

<script>
export default {
  name: "Fallback",
};
</script>

<style scoped></style>
