<template>
  <v-dialog v-model="dialog" max-width="50%" persistent>
    <v-card class="mx-auto" width="100%">
      <v-toolbar dense class="toolbar--top" flat>
        <span class="headline">Select Event</span>
        <v-spacer />
        <v-btn icon @click="close" color="red">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-toolbar>
      <v-card-text>
        <v-form ref="eventsForm" v-model="isValid">
          <v-autocomplete
            outlined
            dense
            v-model="selectedEvent"
            :items="events"
            :rules="rules"
            :item-text="(item) => item.description"
            :item-value="(item) => item.no"
          ></v-autocomplete>
        </v-form>
        <div class="mb-2 d-flex">
          <v-btn
            elevation="0"
            width="49%"
            @click="manualCheckin(delegate)"
            :disabled="events.length === 0"
            class="teal lighten-4 teal--text text--darken-4 font-weight-bold mr-3"
          >
            <v-icon class="mx-2">mdi-login</v-icon>
            Manual Checkin
          </v-btn>
          <v-btn
            elevation="0"
            width="49%"
            @click="scanFingerprint(delegate)"
            :disabled="events.length === 0"
            class="primary lighten-4 primary--text text--darken-4 font-weight-bold"
          >
            <v-icon class="mx-2">mdi-fingerprint</v-icon>
            Scan to checkin
          </v-btn>
        </div>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "EventsDialog",
  props: {
    dialog: {
      type: Boolean,
      default: false,
    },
    delegate: {
      type: Object,
      default: () => {},
    },
    events: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      selectedEvent: null,
      isValid: false,
      rules: [(v) => !!v || "Event is required"],
    };
  },
  methods: {
    close() {
      this.$emit("close");
    },
    scanFingerprint(delegate) {
      if (!this.isValid) {
        this.$refs.eventsForm.validate();
      } else {
        delegate.eventNo = this.selectedEvent;
        delegate.companyNo = this.delegate.companyNo || "";
        this.$emit("scan", delegate);
      }
    },
    manualCheckin(delegate) {
      if (!this.isValid) {
        this.$refs.eventsForm.validate();
      } else {
        delegate.eventNo = this.selectedEvent;
        delegate.companyNo = this.delegate.companyNo || "";
        this.$emit("manualCheckin", delegate);
      }
    },
  },
};
</script>
