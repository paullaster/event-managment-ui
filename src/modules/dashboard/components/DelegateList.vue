<template>
  <v-container fluid @click="scanFingerprint()">
    <v-btn ref="hiddenBtn" @click="scanFingerprint()" v-show="false"></v-btn>
    <v-card tile class="mt-3">
      <v-card-title class="text-uppercase overline">
        <v-btn class="mr-3" @click="$router.back()" text>
          <v-icon left>mdi-arrow-left</v-icon>
          Back
        </v-btn>

        <v-spacer />

        {{
          event
            ? `${event.description} , ${formatDate(
                event.startDate,
                6
              )} - ${formatDate(event.endDate, 6)}, ${event.location}`
            : "" | capitalize("also this")
        }}

        <v-spacer />

        <v-tooltip bottom>
          <template v-slot:activator="{ on, attrs }">
            <v-btn v-on="on" v-bind="attrs" text @click="refreshFingerprint()">
              <v-icon>mdi-fingerprint</v-icon>
            </v-btn>
          </template>
          <span>Refresh Fingerprint Scanner</span>
        </v-tooltip>

        <v-btn text @click="search = !search" :color="search ? 'info' : ''">
          <v-icon>mdi-magnify</v-icon>
        </v-btn>

        <v-btn text @click="refreshDelegates()">
          <v-icon>mdi-refresh</v-icon>
        </v-btn>

        <v-btn
          text
          @click="toggleFullscreen()"
          :color="fullscreen ? 'info' : ''"
        >
          <v-icon>{{
            fullscreen ? "mdi-fullscreen-exit" : "mdi-fullscreen"
          }}</v-icon>
        </v-btn>

        <v-btn text @click="syncAttendance()">
          <v-icon>mdi-web-sync</v-icon>
        </v-btn>
      </v-card-title>

      <v-card-text v-if="search" class="grey lighten-3 px-10">
        <div class="d-flex justify-end">
          <v-btn @click="search = false" color="info" x-small text class="ma-3">
            hide search
          </v-btn>
        </div>

        <v-text-field
          label=""
          color="primary"
          v-model="searchTerm"
          placeholder="Search by ID Number"
          outlined
          @keyup.enter="searchDelegate"
          hide-details
          autofocus
          elevation-12
        />
      </v-card-text>
      <v-row class="pa-5">
        <v-col cols="12" md="3">
          <v-card elevation="3" dark color="primary">
            <div class="ml-2">
              Day {{ day }} of {{ event ? event.eventDurationDays : "" }}
            </div>

            <v-card-actions class="overline">
              All Delegates
              <v-spacer />
              <v-tooltip right>
                <template v-slot:activator="{ on, attrs }">
                  <v-chip
                    dark
                    v-bind="attrs"
                    v-on="on"
                    @click="filterDelegates('All')"
                    style="cursor: pointer"
                    color="primary lighten-5"
                    text-color="primary darken-4"
                  >
                    {{ delegates.length }}
                  </v-chip>
                </template>
                <span>Show all delegates</span>
              </v-tooltip>
            </v-card-actions>
            <v-divider />

            <v-card-actions class="overline">
              Slots Available
              <v-spacer />
              <v-chip
                dark
                style="cursor: pointer"
                color="primary lighten-5"
                text-color="primary darken-4"
              >
                {{ event ? event.slotsAvailable : 0 }}
              </v-chip>
            </v-card-actions>

            <v-divider />

            <v-card-actions class="overline">
              Checked In
              <v-spacer />
              <v-tooltip right>
                <template v-slot:activator="{ on, attrs }">
                  <v-chip
                    dark
                    style="cursor: pointer"
                    @click="filterDelegates('isAttendedToday')"
                    color="primary lighten-5"
                    text-color="primary darken-4"
                    v-bind="attrs"
                    v-on="on"
                  >
                    {{ checkedIn?.length }}
                  </v-chip>
                </template>
                <span>Filter Checked In</span>
              </v-tooltip>
            </v-card-actions>

            <v-divider />

            <!-- <v-card-actions class="overline">
              Total Registered
              <v-spacer />
              <v-tooltip right>
                <template v-slot:activator="{ on, attrs }">
                  <v-chip
                    dark
                    style="cursor: pointer"
                    @click="filterDelegates('isRegistered')"
                    color="primary lighten-5"
                    text-color="primary darken-4"
                    v-bind="attrs"
                    v-on="on"
                  >
                    {{ totalRegistered.length }}
                  </v-chip>
                </template>
                <span>Filter Total Registered</span>
              </v-tooltip>
            </v-card-actions> -->
          </v-card>
        </v-col>
        <v-col cols="12" md="9">
          <div class="d-flex justify-space-between">
            <span class="text-lg-h5 font-weight-bold mb-0"
              >Delegate Register</span
            >
            <v-spacer />
            <v-btn color="primary text-capitalize" @click="addDelegate">
              <v-icon left>mdi-plus</v-icon>
              New Delegate
            </v-btn>
          </div>
          <div>
            <v-responsive>
              <v-data-table
                :headers="headers"
                :items="isFilter ? delegateFilter : delegates"
                :search="searchTerm"
                class="elevation-0"
              >
                <!--eslint-disable-next-line -->
                <template v-slot:item.attendance="{ item }">
                  <v-chip x-small color="secondary darken-2" text-color="white">
                    {{ getAttendanceLength(item.attendance) }}
                    /
                    {{ event ? event.eventDurationDays : 0 }}
                  </v-chip>
                </template>
                <!--eslint-disable-next-line -->
                <template v-slot:item.attendees="{ item }">
                  <span> {{ totalAttendeesPay(item) | currency }} </span>
                </template>
                <!--eslint-disable-next-line -->
                <template v-slot:item.actions="{ item }">
                  <v-btn-toggle>
                    <v-tooltip bottom>
                      <template v-slot:activator="{ on, attrs }">
                        <v-btn
                          @click="viewItem(item)"
                          v-bind="attrs"
                          v-on="on"
                          small
                          elevation="0"
                          class="primary lighten-4 primary--text text--darken-4 text-capitalize"
                        >
                          <v-icon left class="mx-1">mdi-eye</v-icon>
                        </v-btn>
                      </template>
                      <span>View/Edit Delegate</span>
                    </v-tooltip>
                  </v-btn-toggle>
                </template>
              </v-data-table>
            </v-responsive>
          </div>
        </v-col>
      </v-row>
    </v-card>
    <DelegateCard />
  </v-container>
</template>
<script>
import DateMixin from "@/mixins/DateMixin";
import DelegateCard from "./DelegateCard.vue";
import { AuthService } from "@/modules/auth";
import DashboardMixins from "../DashboardMixins";
import moment from "moment";

export default {
  name: "DelegateList",
  mixins: [DateMixin, DashboardMixins],
  components: { DelegateCard },
  data: function () {
    return {
      search: false,
      searchTerm: "",
      dialog: false,
      event: null,
      delegateFilter: [],
      isFilter: false,
      isRegistered: true,
      fullscreen: false,
    };
  },
  mounted() {
    Event.$on("reloadScripts", () => {
      this.loadBiometricScripts();
      this.$scanner.scan("verify");
    });
    Event.$on("openCheckin", (delegate) => {
      this.$router.push({
        name: "DelegateCard",
        params: { event: this.$route.params.event, no: delegate },
        query: {
          isEdit: btoa(false),
          isCheckin: true,
        },
      });
    });
    this.$store.dispatch("Dashboard/getDelegates");
    this.$store.dispatch("Events/getEvents");
  },
  computed: {
    delegates: function () {
      return this.$store.getters["Dashboard/dashboardGetters"]("delegates");
    },
    isDelegate() {
      return this.delegate.no;
    },
    user() {
      return AuthService.user;
    },
    events: function () {
      return this.$store.getters["Events/eventsGetters"]("events");
    },
    delegate() {
      return this.$store.getters["Dashboard/dashboardGetters"](
        "checkinDelegate"
      );
    },
    packages: function () {
      return this.event
        ? this.event.eventPackages.filter(
            (p) => p.packageCode === this.$route.params.package
          )
        : [];
    },
    day() {
      if (!this.event) return 0;
      let diff = moment().diff(moment(this.event.startDate), "days");
      if (diff < 0) return 0;
      if (diff > this.event.eventDurationDays)
        return this.event.eventDurationDays;
      return diff + 1;
    },
    checkedIn() {
      let attendance = [];
      this.delegates.map((d) => {
        attendance.push(...d.attendance);
      });
      return attendance.filter((d) => {
        return (
          d.eventNo === this.$route.params.event &&
          new Date(d.attendanceDate).getDate() === new Date().getDate()
        );
      });
    },
    totalCheckedIn() {
      let attendance = [];
      this.delegates.map((d) => {
        attendance.push(...d.attendance);
      });
      return attendance.filter((d) => {
        return d.eventNo === this.$route.params.event;
      });
    },
    totalRegistered() {
      return this.delegates.filter((d) => {
        return d.isRegistered;
      });
    },
    headers: function () {
      return [
        {
          text: "Name",
          align: "start",
          sortable: false,
          value: "name",
        },
        { text: "Email", value: "eMail" },
        { text: "Identification No.", value: "identificationDocumentNo" },
        { text: "Phone No.", value: "phoneNo" },
        { text: "Attendance", value: "attendance" },
        {
          text: "Total Delegate Pay",
          value: "attendees",
        },
        { text: "Actions", value: "actions", sortable: false },
      ];
    },
  },
  methods: {
    totalAttendeesPay(delegate) {
      return delegate.attendees
        .filter((a) => a.eventNo === this.$route.params.event)
        .reduce((a, b) => {
          return a + b.delegatePay;
        }, 0);
    },
    viewItem: function (item) {
      this.$router.push({
        name: "DelegateCard",
        params: { event: this.$route.params.event, no: item.no },
        query: {
          isEdit: btoa(true),
        },
      });
    },
    filterDelegates: function (filter) {
      this.isFilter = true;
      this.delegateFilter =
        filter === "All"
          ? [...this.delegates]
          : [...this.delegates.filter((d) => d[filter])];
      // if (filter == "isRegistered") {
      //   this.isRegistered = true;
      //   this.scanFingerprint();
      // }
    },
    unsetFilters() {
      this.isFilter = false;
    },
    addDelegate: function () {
      this.$router.push({
        name: "DelegateCard",
        params: {
          event: this.$route.params.event,
        },
      });
    },
    isAttendedToday(delegate) {
      return (
        this.checkedIn.filter((d) => d.delegateNo === delegate.no).length > 0
      );
    },
    searchDelegate: function () {
      if (this.search.length === 0 && !this.isFilter) {
        this.$store.commit("Dashboard/MUTATE", {
          state: "checkinDelegate",
          data: {},
        });
      } else {
        this.$store.dispatch("Dashboard/searchDelegate", {
          identificationDocumentNo: this.search,
        });
      }
    },
    scanFingerprint() {
      this.$scanner.scan("verify");
    },
    refreshDelegates() {
      this.scanFingerprint();
      this.$store.dispatch("Dashboard/getDelegates");
    },
    toggleFullscreen: function () {
      if (this.fullscreen) {
        document.exitFullscreen();
        this.fullscreen = false;
      } else {
        document.documentElement.requestFullscreen();
        this.fullscreen = true;
      }
    },
    syncAttendance() {
      this.$store.dispatch("Dashboard/syncAttendance", {
        ...this.$store.getters["Dashboard/dashboardGetters"]("request_stack"),
      });
      this.$store.dispatch("Dashboard/syncDelegates", {
        ...this.$store.getters["Dashboard/dashboardGetters"]("delegates"),
      });
    },
    getAttendanceLength(attendance) {
      return attendance.filter((a) => a.eventNo === this.$route.params.event)
        .length;
    },
    refreshFingerprint() {
      window.location.reload();
    },
  },
  watch: {
    events: {
      handler: function () {
        this.event = this.events
          .filter((e) => {
            return e.no === this.$route.params.event;
          })
          .shift();
      },
      immediate: true,
      deep: true,
    },
  },
};
</script>

<style>
.search-delegate > .v-input__control {
  padding-top: 0.8%;
  margin-right: -1%;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}

.search-delegate > .v-input__control > .v-input__slot {
  min-height: 2.5rem !important;
}

.search-btn.v-btn:not(.v-btn--round).v-size--default {
  margin: 0 !important;
  min-height: 2.5rem;
}
.search-btn.v-btn {
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}
</style>
