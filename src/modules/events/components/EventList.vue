<template>
  <v-container>
    <v-sheet min-height="70vh" rounded="lg" class="pa-5">
      <v-data-table
        :items-per-page="15"
        :search="term"
        :headers="headers"
        :items="events"
        class="elevation-0"
      >
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title class="mr-2"> Active Events </v-toolbar-title>
            <v-spacer />
            <v-text-field
              class="mt-2"
              v-model="term"
              placeholder="Search Events ..."
              dense
              append-icon="mdi-magnify"
            >
              <template v-slot:append>
                <v-icon left>mdi-search</v-icon>
              </template>
            </v-text-field>
            <v-spacer />
            <v-btn class="primary" @click="addEvent" v-if="user.is_admin">
              <v-icon left>mdi-plus</v-icon>
              Add Event
            </v-btn>
          </v-toolbar>
        </template>

        <!--eslint-disable-next-line -->
        <template v-slot:item.eventType="{ item }">
          <v-chip
            :class="`${
              item.eventType === 'Budgeted' ? 'primary' : 'secondary'
            }`"
            label
            >{{ item.eventType }}</v-chip
          >
        </template>
        <!--eslint-disable-next-line -->
        <template v-slot:item.status="{ item }">
          <v-chip :class="`${statusColor(item.status)}`" label>{{
            item.status
          }}</v-chip>
        </template>
        <!--eslint-disable-next-line -->
        <template v-slot:item.startDate="{ item }">
          {{ formatDate(item.startDate, 6) }}
        </template>
        <!--eslint-disable-next-line -->
        <template v-slot:item.endDate="{ item }">
          {{ formatDate(item.endDate, 6) }}
        </template>
        <!--eslint-disable-next-line -->
        <template v-slot:item.action="{ item }">
          <div class="d-flex flex-row">
            <v-btn
              class="green text-capitalize mx-2 white--text"
              @click="activateEvent(item)"
              v-if="item.status === 'Released' && item.eventStatus !== 'Active'"
            >
              Activate Event
            </v-btn>
            <v-btn @click="viewEvent(item)" class="mr-4" color="teal">
              View
              <v-icon right>mdi-arrow-right</v-icon>
            </v-btn>
            <v-btn
              :to="{ name: 'EventView', params: { code: item.no } }"
              v-if="item.eventStatus === 'Active'"
              color="primary"
            >
              Checkin Attendees
              <v-icon right>mdi-arrow-right</v-icon>
            </v-btn>
            <v-btn
              @click="deleteEvent(item)"
              v-if="item.status === 'Open'"
              class="mx-2 error"
            >
              Delete
              <v-icon right>mdi-delete</v-icon>
            </v-btn>
          </div>
        </template>
      </v-data-table>
    </v-sheet>
  </v-container>
</template>

<script>
import DateMixin from "@/mixins/DateMixin";
import { AuthService } from "@/modules/auth";
import { helper } from "@/utils";
export default {
  name: "Dashboard",
  mixins: [DateMixin],
  data: function () {
    return {
      term: "",
      headers: [
        {
          text: "Event name",
          align: "start",
          sortable: false,
          value: "description",
        },
        { text: "Type", value: "eventType" },
        { text: "Status", value: "status" },
        { text: "Location", value: "location" },
        { text: "Start Date", value: "startDate" },
        { text: "End Date", value: "endDate" },
        { text: "Action", value: "action" },
      ],
      items: [],
    };
  },
  beforeRouteEnter: function (to, from, next) {
    next((v) => {
      v.$store.dispatch("Events/getEvents");
    });
  },
  computed: {
    user() {
      return AuthService.user;
    },
    events() {
      return this.$store.getters["Events/eventsGetters"]("events").filter(
        (e) => {
          if (this.term === undefined) return true;
          return (
            e.eventType.toLowerCase().indexOf(this.term.toLowerCase()) > -1 ||
            e.description.toLowerCase().indexOf(this.term.toLowerCase()) > -1 ||
            e.location.toLowerCase().indexOf(this.term.toLowerCase()) > -1 ||
            e.startDate.indexOf(this.term) > -1
          );
        }
      );
    },
  },
  methods: {
    addEvent() {
      this.$router.push({ name: "EventCard" });
    },
    viewEvent(event) {
      this.$router.push({ name: "EventCard", params: { no: event.no } });
    },
    deleteEvent(event) {
      this.$confirm.show({
        title: "Delete Event",
        text: "Are you sure you want to delete this event?",
        onConfirm: () => {
          this.$store.dispatch("Events/deleteEvent", event);
        },
      });
    },
    activateEvent(event) {
      this.$confirm.show({
        title: "Activate Event",
        text: "Are you sure you want to activate this event?",
        onConfirm: () => {
          this.$store.dispatch("Events/activateEvent", { docNo: event.no });
        },
      });
    },
    statusColor(status) {
      return helper.status(status);
    },
  },
};
</script>

<style scoped></style>
