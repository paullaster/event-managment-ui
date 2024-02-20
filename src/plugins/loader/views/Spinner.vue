<template>
  <v-overlay
    z-index="10"
    color="#000000"
    opacity=".6"
    v-if="$store.getters['Loader/loading']"
  >
    <hollow-dots-spinner :animation-duration="2500" :size="65" />
  </v-overlay>
</template>

<script>
import { HollowDotsSpinner } from "epic-spinners";
export default {
  name: "Spinner",
  components: {
    HollowDotsSpinner,
  },
};
</script>

<style scoped></style>
