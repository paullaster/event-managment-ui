<template>
  <v-container>
    <v-card class="my-5 elevation-0" height="100%">
      <v-card-title>
        <v-btn text small @click="$router.back()">
          <v-icon left> mdi-arrow-left </v-icon>
          Back
        </v-btn>
        <span>{{ $route.params.entity }}</span>
        <v-spacer />
        <v-btn small color="primary" @click="downloadFile(report)">
          <v-icon left> mdi-download </v-icon>
          Download
        </v-btn>
      </v-card-title>
      <v-divider />

      <v-row>
        <v-col cols="8" offset="2">
          <v-card-text class="elevation-1 my-1">
            <pdf
              style="display: block; width: 100%"
              :src="`data:application/pdf;base64,${report}`"
              v-for="i in pageCount(report)"
              :key="i"
              :page="i"
            />
          </v-card-text>
        </v-col>
      </v-row>
    </v-card>
  </v-container>
</template>

<script>
import pdf from "vue-pdf";
import FileMixin from "@/mixins/FileMixin";
export default {
  name: "Report",
  mixins: [FileMixin],
  components: { pdf },
  beforeRouteEnter(to, from, next) {
    next((v) => {
      v.$store.dispatch("Dashboard/getReport", v.$route.params);
    });
  },
  computed: {
    report() {
      return this.$store.getters["Dashboard/dashboardGetters"]("report");
    },
  },
};
</script>
