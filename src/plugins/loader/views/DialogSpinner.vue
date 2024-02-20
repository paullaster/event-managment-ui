<template>
  <v-overlay
    z-index="10"
    color="#000000"
    opacity=".6"
    v-if="$store.getters['Loader/dialogLoading']"
  >
    <div clas="d-flex flex-column">
      <v-progress-circular
        indeterminate
        size="64"
        width="3"
        color="primary"
      ></v-progress-circular>
      <div class="mt-2 primary--text">saving ....</div>
    </div>
  </v-overlay>
</template>
<script>
export default {
  name: "DialogSpinner",
};
</script>
