<template>
  <v-container>
    <v-card class="mx-auto">
      <v-card-title>
        <v-btn
          class="deep-orange lighten-4 deep-orange--text text--darken-4 mr-4 text-capitalize"
          elevation="0"
          @click="$router.back()"
        >
          <v-icon>mdi-arrow-left</v-icon>
          Go Back
        </v-btn>
        <div class="headline">Biometric Event</div>
        <v-spacer />
        <v-btn
          label
          v-if="$route.params.no"
          :class="`${getColor(event.status)} lighten-4 ${getColor(
            event.status
          )}--text text--darken-4 mx-2 text-capitalize`"
          elevation="0"
        >
          Status
          <v-divider
            vertical
            :class="`${getColor(event.status)} darken-4 mx-2`"
          />
          {{ event.status }}
        </v-btn>
        <v-chip class="primary" v-if="event.totalSlots">
          {{ event.totalSlots }}
        </v-chip>
        <v-btn
          class="primary text-capitalize mx-2"
          @click="addEvent"
          v-if="isEdit"
        >
          <v-icon class="mr-2">mdi-content-save-all-outline</v-icon>
          Save
        </v-btn>
        <v-btn
          class="orange text-capitalize mx-2 white--text"
          @click="sendForApproval"
          depressed
          v-if="$route.params.no && event.status === 'Open'"
        >
          Send for Approval
        </v-btn>
        <v-btn
          class="red text-capitalize mx-2 white--text"
          @click="endEvent(event.no)"
          depressed
          v-if="event.eventStatus === 'Active'"
        >
          End Event
        </v-btn>
        <v-btn
          class="orange text-capitalize mx-2 white--text"
          @click="cancelApproval"
          v-if="event.status === 'Pending Approval'"
        >
          Cancel Approval
        </v-btn>
        <v-btn
          class="teal text-capitalize mx-2 white--text"
          @click="reopenDocument"
          v-if="event.status === 'Cancelled' || event.status === 'Rejected'"
        >
          Reopen Document
        </v-btn>
      </v-card-title>
      <v-divider />
      <v-card-text>
        <v-form v-model="isValid" ref="eventForm">
          <v-row>
            <v-col cols="12" md="4" lg="4" sm="12">
              <v-text-field
                v-model="formData.description"
                dense
                outlined
                persistent-placeholder
                placeholder="Add Description"
                :readonly="!isEdit"
                :rules="eventRules.description"
              >
                <template v-slot:label>
                  <span>Description</span>
                  <span class="red--text">*</span>
                </template>
              </v-text-field>
            </v-col>
            <v-col cols="12" md="4" lg="4" sm="12">
              <v-select
                v-model="formData.eventType"
                :items="eventTypes"
                dense
                outlined
                :readonly="!isEdit"
                persistent-placeholder
                placeholder="Select Event Type"
                :rules="eventRules.eventType"
              >
                <template v-slot:label>
                  <span>Event Type</span>
                  <span class="red--text">*</span>
                </template>
              </v-select>
            </v-col>
            <v-col cols="12" md="4" lg="4" sm="12">
              <v-text-field
                v-model="formData.location"
                dense
                outlined
                :readonly="!isEdit"
                persistent-placeholder
                placeholder="Add Location"
                :rules="eventRules.location"
              >
                <template v-slot:label>
                  <span>Location</span>
                  <span class="red--text">*</span>
                </template>
              </v-text-field>
            </v-col>
            <v-col cols="12" md="4" lg="4" sm="12">
              <v-menu
                v-model="startDateCalendarButtonIcon"
                :close-on-content-click="false"
                :nudge-right="40"
                :disabled="!isEdit"
                transition="scale-transition"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="formData.startDate"
                    prepend-inner-icon="mdi-calendar"
                    color="primary"
                    dense
                    outlined
                    :readonly="!isEdit"
                    persistent-placeholder
                    placeholder="Select Start Date"
                    :rules="eventRules.startDate"
                    v-bind="attrs"
                    v-on="on"
                  >
                    <template v-slot:label>
                      <label>Start date<span class="red--text">*</span></label>
                    </template></v-text-field
                  >
                </template>
                <v-date-picker
                  v-model="formData.startDate"
                  :disabled="!isEdit"
                  @input="startDateCalendarButtonIcon = false"
                  :min="startDateMin"
                ></v-date-picker>
              </v-menu>
            </v-col>
            <v-col cols="12" md="4" lg="4" sm="12">
              <v-menu
                v-model="endDateCalendarButtonIcon"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                :disabled="!isEdit"
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="formData.endDate"
                    prepend-inner-icon="mdi-calendar"
                    color="primary"
                    dense
                    outlined
                    :readonly="!isEdit"
                    persistent-placeholder
                    placeholder="Select End Date"
                    :rules="eventRules.endDate"
                    v-bind="attrs"
                    v-on="on"
                  >
                    <template v-slot:label>
                      <label>End date<span class="red--text">*</span></label>
                    </template></v-text-field
                  >
                </template>
                <v-date-picker
                  v-model="formData.endDate"
                  :disabled="!isEdit"
                  @input="endDateCalendarButtonIcon = false"
                  :min="endDateMin"
                ></v-date-picker>
              </v-menu>
            </v-col>
            <v-col cols="12" md="4" lg="4" sm="12">
              <v-menu
                v-model="startTimeCalendarButtonIcon"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                :disabled="!isEdit"
                offset-y
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="formData.startTime"
                    prepend-inner-icon="mdi-clock"
                    color="primary"
                    dense
                    outlined
                    :readonly="!isEdit"
                    persistent-placeholder
                    placeholder="Select Start Time"
                    :rules="eventRules.startTime"
                    v-bind="attrs"
                    v-on="on"
                  >
                    <template v-slot:label>
                      <label>Start Time<span class="red--text">*</span></label>
                    </template></v-text-field
                  >
                </template>
                <v-time-picker
                  v-model="formData.startTime"
                  :disabled="!isEdit"
                  @input="startTimeCalendarButtonIcon = false"
                ></v-time-picker>
              </v-menu>
            </v-col>
            <v-col cols="12" md="4" lg="4" sm="12">
              <v-menu
                v-model="endTimeCalendarButtonIcon"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                :disabled="!isEdit"
                min-width="auto"
              >
                <template v-slot:activator="{ on, attrs }">
                  <v-text-field
                    v-model="formData.endTime"
                    prepend-inner-icon="mdi-clock"
                    color="primary"
                    dense
                    outlined
                    :readonly="!isEdit"
                    persistent-placeholder
                    placeholder="Select End Time"
                    :rules="eventRules.endTime"
                    v-bind="attrs"
                    v-on="on"
                  >
                    <template v-slot:label>
                      <label>End Time<span class="red--text">*</span></label>
                    </template></v-text-field
                  >
                </template>
                <v-time-picker
                  v-model="formData.endTime"
                  :disabled="!isEdit"
                  @input="endTimeCalendarButtonIcon = false"
                ></v-time-picker>
              </v-menu>
            </v-col>
            <!-- <v-col cols="12" md="4" lg="4" sm="12">
              <v-autocomplete
                :items="currencies"
                :item-text="(item) => `${item.symbol}${item.displayName}`"
                :item-value="(item) => item.code"
                v-model="formData.currencyCode"
                dense
                :readonly="!isEdit"
                outlined
                persistent-placeholder
              >
                <template v-slot:label>
                  <label>Select Currency (Optional)</label>
                </template></v-autocomplete
              >
            </v-col> -->
            <!-- <v-col cols="12" md="4" lg="4" sm="12">
              <v-autocomplete
                :items="paymentBasis"
                item-text="item"
                item-value="item"
                v-model="formData.paymentBasis"
                dense
                outlined
                persistent-placeholder
                placeholder="Payment Basis"
                :readonly="!isEdit"
              >
                <template v-slot:label>
                  <span>Payment Basis</span> -->
            <!-- <span class="red--text">*</span> -->
            <!-- </template>
              </v-autocomplete>
            </v-col> -->
            <v-col cols="12" md="4" lg="4" sm="12">
              <v-text-field
                v-model.number="formData.totalSlots"
                dense
                outlined
                :readonly="!isEdit"
                persistent-placeholder
                placeholder="Total Slots Available"
              >
                <template v-slot:label>
                  <span>Total Slots Available</span>
                  <span class="red--text">*</span>
                </template>
              </v-text-field>
            </v-col>
            <!-- prepend-inner-icon="mdi-paperclip" -->
            <!-- outlined -->
            <!-- persistent-placeholder -->
            <v-col cols="12">
              <v-file-input
                label="Add attachment"
                flat
                prepend-inner-icon="mdi-plus"
                prepend-icon=""
                accept="image/*, .pdf, .doc, .docx"
                @change="addAttachment"
                :disabled="!isEdit"
              ></v-file-input>
            </v-col>
            <v-col
              cols="12"
              v-for="(attachment, i) in formData.attachments"
              :key="i"
            >
              <div class="attachment-container">
                <v-card-text>
                  {{ attachment.no }}
                </v-card-text>
                <v-card-text>
                  {{ attachment.fileName }}
                </v-card-text>
                <v-card-text>
                  <v-chip
                    class="p-2 mr-4"
                    color="primary"
                    @click="
                      downloadBase64File(
                        attachment.attachment,
                        attachment.fileName
                      )
                    "
                    >Download
                    <v-icon>mdi-download</v-icon>
                  </v-chip>
                  <v-chip
                    v-if="isEdit"
                    class="p-2"
                    color="red"
                    dark
                    @click="deleteFile(attachment)"
                    >Delete
                    <v-icon>mdi-delete</v-icon>
                  </v-chip>
                </v-card-text>
              </div>
            </v-col>
            <!-- TODO : add event Logo and event Footer Logo if required -->
            <!-- <v-col cols="12" md="4" lg="4" sm="12">
              <v-file-input
                v-model="formData.eventLogo"
                dense
                outlined
                :disabled="!isEdit"
                :rules="eventRules.eventLogo"
                accept="image/*"
                prepend-inner-icon="mdi-image"
                label="Event Logo"
              ></v-file-input>
            </v-col> -->
            <!-- <v-col cols="12" md="4" lg="4" sm="12">
              <v-file-input
                v-model="formData.eventFooterLogo"
                dense
                outlined
                :disabled="!isEdit"
                :rules="eventRules.eventFooterLogo"
                accept="image/*"
                prepend-inner-icon="mdi-image"
                label="Event Footer Logo"
              ></v-file-input>
            </v-col> -->

            <!--BEGIN dimension panel-->

            <v-col cols="12">
              <v-expansion-panels v-model="panel">
                <v-expansion-panel>
                  <!--BEGIN dimensions-->
                  <v-expansion-panel-header>
                    <span class="table-font"
                      >Click to view &amp; add available dimensions</span
                    >
                  </v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <Dimensions
                      :dimensionValues="dimensionValues"
                      :formData="formData"
                    />
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-expansion-panels>
            </v-col>

            <!--END dimension panel-->

            <v-col cols="12" md="12" lg="12" sm="12">
              <EventPackages
                :eventPackages="formData.eventPackages"
                :isEdit="isEdit"
                :dimensionValues="dimensionValues"
                :eventData="formData"
              />
            </v-col>
          </v-row>
        </v-form>
        <ApprovalEntries v-if="displayApprovalEntries" :event="event" />
      </v-card-text>
    </v-card>
    <EventListVue v-if="eventEnded" />
  </v-container>
</template>
<script>
import EventPackages from "./EventPackages.vue";
import Dimensions from "./Dimensions.vue";
import { helper } from "@/utils";
import ApprovalEntries from "./ApprovalEntries.vue";
import EventListVue from "./EventList.vue";
import FileMixin from "../../../mixins/FileMixin";
export default {
  name: "EventCard",
  components: {
    EventPackages,
    Dimensions,
    ApprovalEntries,
    EventListVue,
  },
  mixins: [FileMixin],
  data: function () {
    return {
      dialog: false,
      formData: {
        description: "",
        startDate: "",
        endDate: "",
        paymentBasis: "",
        location: "",
        currencyCode: "",
        totalSlots: 0,
        eventType: "",
        startTime: "",
        endTime: "",
        attachments: [],
        eventPackages: [],
        globalDimension1Code: "",
        globalDimension2Code: "",
        globalDimension3Code: "",
        globalDimension4Code: "",
        globalDimension5Code: "",
        globalDimension6Code: "",
        globalDimension7Code: "",
        globalDimension8Code: "",
      },
      endTimeCalendarButtonIcon: false,
      startTimeCalendarButtonIcon: false,
      endDateCalendarButtonIcon: false,
      startDateCalendarButtonIcon: false,
      panel: [0],
      isValid: false,
      newFile: true,
      eventTypes: ["Budgeted", "UnBudgeted"],
      eventEnded: false,
    };
  },
  beforeRouteEnter(to, from, next) {
    next((v) => {
      v.$store.dispatch("Setup/getCurrencies");
      if (to.params.no) {
        v.$store.dispatch("Events/getEvent", to.params.no);
      }
      v.$store.dispatch("Events/getEventPackages");
      v.$store.dispatch("Setup/getEmployees");
      v.$store.dispatch("Setup/getVendors");
      v.$store.dispatch("Setup/getDimensionValues");
      v.$store.dispatch("Setup/getExpenseCodes");
      v.$store.dispatch("Setup/getPaymentBasis");
    });
  },
  computed: {
    eventRules: function () {
      return {
        description: [(v) => !!v || "Description is required"],
        startDate: [(v) => !!v || "Start date is required"],
        endDate: [(v) => !!v || "End date is required"],
        location: [(v) => !!v || "Location is required"],
        eventType: [(v) => !!v || "Event type is required"],
        startTime: [(v) => !!v || "Start time is required"],
        endTime: [(v) => !!v || "End time is required"],
      };
    },
    startDateMin() {
      const today = new Date();
      return today.toISOString().substr(0, 10);
    },
    endDateMin() {
      return this.formData.startDate.length > 0
        ? this.formData.startDate
        : this.startDateMin;
    },
    currencies() {
      return this.$store.getters["Setup/currencies"];
    },
    event() {
      return this.$store.getters["Events/eventsGetters"]("event");
    },
    isEdit() {
      return this.event
        ? this.$route.params.no
          ? this.event.status === "Open"
          : true
        : true;
    },
    dimensionValues() {
      return this.$store.getters["Setup/dimensions"];
    },
    // paymentBasis() {
    //   return this.$store.getters["Setup/paymentBasis"];
    // },
    displayApprovalEntries() {
      return this.event ? this.event.status !== "Open" : false;
    },
  },
  methods: {
    deleteFile(item) {
      const data = {
        documentType: item.documentType,
        id: item.id,
        lineNo: item.lineNo,
        no: item.no,
        tableID: item.tableID,
        fileName: item.fileName
      };
      this.$store.dispatch("Events/deleteAttachment",data);
    },
    async addAttachment(file) {
      if (file) {
        this.newFile = false;
        const base64File = await helper.toBase64(file);
        const attachment = base64File.split(",")[1];
        this.formData.attachments = [
          {
            fileName: file.name,
            attachment,
          },
        ];
      }
    },
    addEvent() {
      if (!this.isValid) {
        this.$refs.eventForm.validate();
      } else {
        let data = { ...this.formData };
        data.totalSlots = parseInt(data.totalSlots);
        data = helper.prepareFormData(data);
        if (this.$route.params.no) {
          this.$store.dispatch("Events/updateEvent", data);
        } else {
          this.$store.dispatch("Events/addEvent", data);
        }
      }
    },
    sendForApproval() {
      if (!this.isValid) {
        this.$refs.eventForm.validate();
      } else {
        this.$store.dispatch("Events/sendForApproval", {
          docNo: this.formData.no,
        });
      }
    },
    endEvent(docNo) {
      this.$confirm.show({
        title: "Confirm End Event",
        text: "Are you sure you want to end this event?",
        rejectLabel: "Cancel",
        acceptLabel: "End Event",
        onConfirm: () => {
          this.$store.dispatch("Events/endEvent", {
            docNo: docNo,
          });
        },
        onCancel: {},
      });
    },
    getColor(status) {
      return helper.getColor(status);
    },
    cancelApproval() {
      this.$store.dispatch("Events/cancelApproval", {
        docNo: this.event.no,
      });
    },
    reopenDocument() {
      this.$store.dispatch("Events/reopenDocument", {
        docNo: this.event.no,
      });
    },
  },
  watch: {
    event: {
      handler: function (val) {
        if (val) {
          const event = { ...val };
          Object.keys(this.formData).forEach((key) => {
            if (event[key]) {
              this.formData[key] = event[key];
            }
          });
          this.formData.eventPackages = event.eventPackages.map((item) => {
            return {
              packageCode: item.packageCode,
              description: item.description,
              amountExclVAT: item.amountExclVAT,
              lineNo: item.lineNo,
              eventNo: item.eventNo,
              accountNo: item.accountNo,
              accountType: item.accountType,
              revenueGL: item.revenueGL,
              isDefault: item.defaultPackage,
              globalDimension1Code: item.globalDimension1Code,
              globalDimension2Code: item.globalDimension2Code,
              globalDimension3Code: item.globalDimension3Code,
              globalDimension4Code: item.globalDimension4Code,
              globalDimension5Code: item.globalDimension5Code,
              globalDimension6Code: item.globalDimension6Code,
              globalDimension7Code: item.globalDimension7Code,
              globalDimension8Code: item.globalDimension8Code,
              paymentBasis: item.paymentBasis,
            };
          });
          this.formData.no = event.no;
        }
      },
      deep: true,
    },
  },
};
</script>
<style>
.attachment-container {
  display: flex;
  flex-direction: row; /* Horizontal direction */
  align-items: center; /* Vertically center the contents */
  justify-content: space-between; /* Space between the items */
}
</style>
