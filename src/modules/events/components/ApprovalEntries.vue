<template>
  <v-card flat>
    <v-card-title class="ml-3"> Approval Entries </v-card-title>
    <v-timeline dense class="ml-n3">
      <v-timeline-item
        v-for="(item, i) in event.approvalEntry"
        :key="i"
        :color="getColor(item.status).icon_color"
        small
        fill-dot
        v-show="item.status !== 'Canceled'"
        :icon="getColor(item.status).icon"
      >
        <div v-if="item.status !== 'Canceled'" class="d-flex ml-n10">
          <div class="">
            <v-list-item dense>
              <v-list-item-avatar
                class="pl-2"
                :color="getColor(item.status).icon_color"
                style="color: rgb(0, 68, 139)"
                size="34"
              >
                {{
                  getEmployeeName(item.approverID).first_name[0] +
                  getEmployeeName(item.approverID).last_name[0]
                }}
              </v-list-item-avatar>
              <v-list-item-content>
                <v-list-item-title>
                  <div class="d-flex">
                    <div>
                      {{
                        getEmployeeName(item.approverID).first_name +
                        " " +
                        getEmployeeName(item.approverID).last_name
                      }}
                    </div>
                    <v-chip
                      label
                      class="mx-1"
                      :color="getColor(item.status).icon_color"
                      x-small
                      ><span class="view-page">{{ item.status }}</span>
                    </v-chip>
                  </div>
                </v-list-item-title>
                <v-list-item-subtitle class="">
                  {{ getEmployeeName(item.approverID).email }}
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </div>
          <div class="comments">
            <v-list-item dense>
              <v-list-item-content>
                <v-list-item-title class="font-weight-bold">
                  Comment
                </v-list-item-title>
                <v-card
                  flat
                  class="text--secondary"
                  v-for="(item, i) in getComment(item)"
                  :key="i"
                >
                  {{ item.comment }}
                </v-card>
              </v-list-item-content>
            </v-list-item>
          </div>
        </div>
      </v-timeline-item>
    </v-timeline>
  </v-card>
</template>
<script>
import { helper } from "@/utils";
export default {
  name: "ApprovalEntries",
  props: {
    event: {
      type: Object,
      default: () => {},
    },
  },

  computed: {
    allEmployees() {
      return this.$store.getters["Setup/employees"];
    },
  },

  methods: {
    getEmployeeName(id) {
      return this.allEmployees.filter((el) => el.user_id === id).shift();
    },
    getEmployeeByID(id) {
      return this.allEmployees.filter((el) => el.user_id === id).shift();
    },
    getColor(status) {
      return helper.getColorGlobal(status);
    },
    getEntryDateFormat(date) {
      return helper.getEntryDateFormat(date);
    },
    splitApproverID(id) {
      console.log(id);
      return id + id.split("\\")[1][0];
    },
    ApproverID(id) {
      console.log(id);
      return id + id.split("-")[1][0];
    },
    getComment(comment) {
      const user = comment.approverID;
      const commented = comment.approvalComments
        ? comment.approvalComments.filter((d) => d.userID === user)
        : [];
      return commented;
    },
  },
};
</script>
<style scoped>
/* @import url("../styles/styles.css"); */
</style>
