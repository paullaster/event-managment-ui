<template>
  <router-view />
</template>

<script>
import SetupMixin from "@/modules/setup/SetupMixin";

export default {
  name: "App",
  mixins: [SetupMixin],
  mounted() {
    this.getSetups(["getCompanyInformation"]);
  },
};
</script>
