<template>
  <v-container class="mt-5">
    <v-row>
      <v-col cols="12" md="10" offset-md="1">
        <v-card v-if="currEvent[0]">
          <v-card-title class="text-uppercase">
            <v-btn class="mr-3" @click="$router.back()" text>
              <v-icon left>mdi-arrow-left</v-icon>
              Back
            </v-btn>

            Event Code: {{ currEvent[0].no }} &nbsp;

            <v-chip
              dark
              :color="
                currEvent[0].status === 'Active' ||
                currEvent[0].status === 'Released'
                  ? 'green darken-1'
                  : 'grey darken-1'
              "
            >
              {{ currEvent[0].status }}</v-chip
            >
          </v-card-title>

          <v-divider />

          <v-row class="mt-5">
            <v-col cols="12" md="10" offset-md="1">
              <v-card-text>
                <v-row>
                  <v-col cols="12" md="8">
                    <v-list-item two-line>
                      <v-list-item-content>
                        <v-list-item-title>Event</v-list-item-title>
                        <v-list-item-subtitle>
                          {{ currEvent[0].description }}
                        </v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>

                    <v-list-item two-line>
                      <v-list-item-content>
                        <v-list-item-title>Dates</v-list-item-title>
                        <v-list-item-subtitle>
                          {{ formatDate(currEvent[0].startDate, 6) }} -
                          {{ formatDate(currEvent[0].endDate, 6) }}
                        </v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>

                    <v-list-item two-line>
                      <v-list-item-content>
                        <v-list-item-title>Location</v-list-item-title>
                        <v-list-item-subtitle>
                          {{ currEvent[0].location }}
                        </v-list-item-subtitle>
                      </v-list-item-content>
                    </v-list-item>
                  </v-col>

                  <v-col cols="12" md="4">
                    <v-btn
                      class="mb-2"
                      color="primary"
                      block
                      v-if="!isUserCompany"
                      @click="
                        getReport(currEvent[0].no, 'GetEventAttendeeReport')
                      "
                      >ATTENDEE report</v-btn
                    >
                    <v-btn
                      class="mb-2"
                      color="primary"
                      block
                      v-if="!isUserCompany"
                      @click="
                        getReport(currEvent[0].no, 'GetEventAttandanceReport')
                      "
                      >ATTENDANCE report</v-btn
                    >
                    <v-btn
                      class="mb-1"
                      color="primary"
                      block
                      v-if="!isUserCompany"
                      @click="getReport(currEvent[0].no, 'GetEventReport')"
                      >Event Report</v-btn
                    >
                  </v-col>
                </v-row>
              </v-card-text>

              <v-data-table
                :headers="headers"
                :items="packages"
                class="elevation-1 my-10"
                hide-default-footer
                :items-per-page="100"
              >
                <template v-slot:item.mandatory="{ item }">
                  {{ item.mandatory ? "Yes" : "No " }}
                </template>
                <template v-slot:item.amountExclVAT="{ item }">
                  {{ item.amountExclVAT | currency }}
                </template>
                <template v-slot:item.action="{ item }">
                  <v-btn @click="checkin(item)" dark color="primary">
                    Check In
                    <v-icon>mdi-arrow-right</v-icon>
                  </v-btn>
                </template>
              </v-data-table>
            </v-col>
          </v-row>
        </v-card>

        <v-card v-else>
          <v-skeleton-loader type="card-heading, table" />
        </v-card>
      </v-col>
    </v-row>

    <v-dialog
      v-model="reportDialog"
      persistent
      max-width="450"
      :disabled="$store.getters['loading']"
    >
      <v-card :loading="$store.getters['loading']">
        <v-card-title class="text-h6 text-capitalize">
          Report
          <v-spacer />
          <v-btn text @click="reportDialog = false">Close</v-btn>
        </v-card-title>

        <v-card-actions>
          <v-btn text :href="report" color="primary">
            Download
            <v-icon right>mdi-download</v-icon>
          </v-btn>

          <v-spacer />

          <v-btn
            color="secondary"
            text
            target="_blank"
            :href="`https://docs.google.com/gview?url=${report}`"
          >
            Open
            <v-icon right>mdi-link</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import DateMixin from "@/mixins/DateMixin";
import FileMixin from "@/mixins/FileMixin";
import { AuthService } from "@/modules/auth";
export default {
  name: "Event",
  mixins: [DateMixin, FileMixin],
  data: function () {
    return {
      headers: [
        {
          text: "Package Code",
          align: "start",
          sortable: false,
          value: "packageCode",
        },
        { text: "Package description", value: "description" },
        { text: "Mandatory", value: "mandatory" },
        { text: "Package Cost", value: "amountExclVAT" },
        { text: "Action", value: "action" },
      ],
      reportDialog: false,
      currEvent: [],
    };
  },
  beforeRouteEnter(to, from, next) {
    next((v) => {
      v.$store.dispatch("Events/getEvents");
    });
  },
  computed: {
    events() {
      return this.$store.getters["Events/eventsGetters"]("events");
    },
    report() {
      return this.$store.getters["Dashboard/report"];
    },
    packages() {
      return this.currEvent[0].eventPackages.filter((p) => p.requiresCheckin);
    },
    isUserCompany() {
      return this.user.company !== null;
    },
    user() {
      return AuthService.user;
    },
  },
  methods: {
    getReport: function (no, entity) {
      this.$router.push({
        name: "Report",
        params: { no, entity },
      });
    },
    checkin: function (item) {
      this.$router.push({
        name: "DelegateList",
        params: { event: item.eventNo },
      });
    },
  },
  watch: {
    events: {
      handler: function () {
        this.currEvent = this.events.filter((e) => {
          return e.no === this.$route.params.code;
        });
      },
      immediate: true,
      deep: true,
    },
  },
};
</script>
