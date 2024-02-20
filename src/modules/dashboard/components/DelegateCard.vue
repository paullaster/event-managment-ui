<template>
  <v-dialog v-model="dialog" max-width="90%" persistent>
    <v-card class="mx-auto" width="100%" v-if="isDelegate">
      <v-toolbar dense class="toolbar--top" flat>
        <span class="headline"
          >{{ editable ? "Edit/View" : "Add" }} Delegate</span
        >
        <v-spacer />
        <span class="headline mx-2" v-if="editable">
          <v-chip class="primary mx-2" small label v-if="delegate"
            >{{ delegate.no }}
            {{ isAttended ? "Already Attended" : "" }}</v-chip
          >
        </span>
        <v-btn
          v-if="editable && !isCheckin"
          elevation="0"
          small
          class="cyan lighten-4 cyan--text text--darken-4 font-weight-bold"
        >
          <v-icon class="mx-2">mdi-fingerprint</v-icon>
          {{ delegate.fingerprintTemplates.length }} Fingerprint(s) Captured
        </v-btn>
        <span class="headline mx-2 text-body-1" v-if="editable">
          <v-chip class="primary mx-2 text-body-1" small label v-if="delegate"
            >Total Delegate Pay {{ totalDelegatePay | currencyFormat }}</v-chip
          >
        </span>
        <v-btn
          depressed
          color="primary"
          class="mx-2"
          v-if="!isEmptyObject(attendees)"
          @click="attendeesDialog = true"
          >Attendeees</v-btn
        >
        <v-btn
          class="green accent4 white--text mx-2"
          v-if="!isAttended && $route.params.no"
          @click="CheckinDelegate(false)"
        >
          Checkin
          <v-icon class="mx-2">mdi-login</v-icon>
        </v-btn>
        <v-tooltip bottom v-if="!isAttended && checkin">
          <template v-slot:activator="{ on, attrs }">
            <v-btn v-on="on" v-bind="attrs" text @click="scanFingerprint()">
              <v-icon>mdi-fingerprint</v-icon>
            </v-btn>
          </template>
          <span>Refresh Fingerprint Scanner</span>
        </v-tooltip>
      </v-toolbar>
      <v-divider />
      <v-card-text>
        <v-form ref="delegateForm" v-model="isValid">
          <v-row dense>
            <v-col cols="12" md="12" sm="12">
              <v-row dense>
                <!--Full Names-->
                <v-col
                  cols="12"
                  md="4"
                  :class="$vuetify.breakpoint.mobile ? 'mt-n2' : 'mt-3'"
                >
                  <div>
                    Enter Your Full Name<span class="mx-2" style="color: red"
                      >*</span
                    >
                  </div>
                  <v-text-field
                    ref="name"
                    :rules="delegateRules.name"
                    v-model="delegateForm.name"
                    placeholder="Full Name"
                    outlined
                    dense
                    clearable
                  >
                    <template v-slot:prepend-inner>
                      <v-icon color="primary" class="mt-n1" size="30"
                        >mdi-account</v-icon
                      >
                    </template>
                  </v-text-field>
                </v-col>

                <!--ID/Passport-->
                <v-col
                  cols="12"
                  md="4"
                  :class="$vuetify.breakpoint.mobile ? 'mt-n2' : 'mt-3'"
                >
                  <div>
                    Enter ID/Passport No.<span class="mx-2" style="color: red"
                      >*</span
                    >
                  </div>
                  <v-text-field
                    ref="idNo"
                    :rules="delegateRules.idNo"
                    v-model="delegateForm.identificationDocumentNo"
                    placeholder="ID number/Passport Number"
                    outlined
                    dense
                    clearable
                  >
                    <template v-slot:prepend-inner>
                      <v-icon color="primary" class="mt-n1" size="30"
                        >mdi-badge-account-horizontal</v-icon
                      >
                    </template>
                  </v-text-field>
                </v-col>

                <!--Gender-->
                <v-col
                  cols="12"
                  md="4"
                  :class="$vuetify.breakpoint.mobile ? 'mt-n2' : 'mt-3'"
                >
                  <div>
                    Gender<span class="mx-2" style="color: red">*</span>
                  </div>
                  <v-select
                    placeholder="Enter Gender"
                    v-model="delegateForm.gender"
                    :items="['Male', 'Female', 'Other']"
                    ref="gender"
                    :rules="delegateRules.gender"
                    dense
                    outlined
                  >
                    <template v-slot:prepend-inner>
                      <v-icon color="primary" class="mt-n1" size="30"
                        >mdi-account</v-icon
                      >
                    </template>
                  </v-select>
                </v-col>

                <!--Email-->
                <v-col cols="12" md="4" class="mt-n5">
                  <div>Email</div>
                  <v-text-field
                    v-model="delegateForm.eMail"
                    placeholder="Email"
                    outlined
                    dense
                    clearable
                  >
                    <template v-slot:prepend-inner>
                      <v-icon color="primary" class="mt-n1" size="30"
                        >mdi-email</v-icon
                      >
                    </template>
                  </v-text-field>
                </v-col>

                <!--Phone-->
                <v-col cols="12" md="4" class="mt-n5">
                  <div>
                    Phone Number<span class="mx-2" style="color: red">*</span>
                  </div>
                  <vue-tel-input-vuetify
                    ref="phoneNo"
                    v-model="delegateForm.phoneNo"
                    :onlyCountries="['KE', 'TZ', 'UG']"
                    defaultCountry="KE"
                    mode="international"
                    :rules="delegateRules.phoneNo"
                    placeholder="Enter Phone Number"
                    :validate-on-blur="true"
                    :valid-characters-only="true"
                    outlined
                    dense
                    clearable
                  >
                    <template v-slot:prepend-inner>
                      <v-icon color="primary" class="mt-n1" size="30"
                        >mdi-phone</v-icon
                      >
                    </template>
                  </vue-tel-input-vuetify>
                </v-col>

                <v-col cols="12" md="4" class="mt-n5">
                  <div>Institution</div>
                  <v-text-field
                    v-model="delegateForm.address"
                    placeholder="Enter Delegate INSTITUTION"
                    outlined
                    dense
                    clearable
                  />
                </v-col>

                <v-col cols="12" md="4" class="mt-n5">
                  <div>
                    Confirm Category<span class="mx-2" style="color: red"
                      >*</span
                    >
                  </div>
                  <v-autocomplete
                    ref="category"
                    :items="categories"
                    :rules="delegateRules.category"
                    :item-value="(item) => item.code"
                    :item-text="(item) => item.description"
                    v-model="delegateForm.delegateCategory"
                    placeholder="Category"
                    outlined
                    dense
                    clearable
                  />
                </v-col>

                <v-col cols="12" md="4" class="mt-n5">
                  <div>
                    Country
                    <span class="mx-2" style="color: red">*</span>
                  </div>
                  <v-autocomplete
                    v-model="delegateForm.country"
                    :items="countries"
                    :item-value="(item) => item.code"
                    :item-text="(item) => item.name"
                    placeholder="Enter Delegate Country"
                    outlined
                    dense
                    clearable
                  />
                </v-col>

                <v-col cols="12" md="4" class="mt-n5">
                  <div>Delegate County</div>
                  <v-autocomplete
                    v-model="delegateForm.county"
                    :items="counties"
                    :item-value="(item) => item.countyNo"
                    :item-text="(item) => item.countyName"
                    placeholder="Enter Delegate County"
                    outlined
                    dense
                    clearable
                  />
                </v-col>

                <v-col cols="12" md="4" class="mt-n5">
                  <div>City</div>
                  <v-autocomplete
                    v-model="delegateForm.city"
                    :items="postalcodes"
                    :item-value="(item) => item.city"
                    :item-text="(item) => `${item.city} - ${item.county}`"
                    placeholder="Enter Delegate City"
                    outlined
                    dense
                    clearable
                  />
                </v-col>

                <v-col cols="12" md="4" class="mt-n5">
                  <div>Postal Code</div>
                  <v-autocomplete
                    v-model="delegateForm.postCode"
                    :items="postalcodes"
                    :item-value="(item) => item.code"
                    :item-text="(item) => `${item.code} - ${item.city}`"
                    placeholder="Enter Delegate Postal Code"
                    outlined
                    dense
                    clearable
                  />
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-btn
          elevation="0"
          @click="closeDialog()"
          color="red lighten-4 red--text text--darken-4 text-capitalize"
        >
          <v-icon class="mx-2">mdi-close</v-icon>
          Close
        </v-btn>
        <v-spacer />
        <v-btn
          v-if="!isCheckin"
          color="primary lighten-4 primary--text text--darken-4 text-capitalize"
          elevation="0"
          @click="
            editable ? editDelegate('save-close') : saveDelegate('save-close')
          "
          >Save & close</v-btn
        >
      </v-card-actions>
      <dialog-spinner />
    </v-card>
    <v-card class="mx-auto" width="100%" v-else>
      <v-toolbar flat dense>
        <v-skeleton-loader type="text"></v-skeleton-loader>
        <v-spacer />
        <v-skeleton-loader type="actions"></v-skeleton-loader>
      </v-toolbar>
      <v-skeleton-loader type="divider"></v-skeleton-loader>
      <v-card-text>
        <v-row class="mt-5">
          <v-col cols="12" md="4">
            <v-skeleton-loader type="image"></v-skeleton-loader>
            <v-skeleton-loader type="text"></v-skeleton-loader>
          </v-col>
          <v-col cols="12" md="8">
            <v-row>
              <v-col cols="12" md="4" v-for="n in 10" :key="n">
                <v-skeleton-loader type="text"></v-skeleton-loader>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions>
        <v-skeleton-loader type="actions"></v-skeleton-loader>
        <v-spacer />
        <v-skeleton-loader type="actions"></v-skeleton-loader>
      </v-card-actions>
    </v-card>
    <v-dialog v-model="attendeesDialog" persistent max-width="89%">
      <v-card>
        <v-card-title>Attendee's Pay</v-card-title>

        <v-card-text>
          <v-row>
            <v-col cols="6" md="3">
              <label for="delegate-number" class="text--disabled">
                Delegate Number:
              </label>
              <v-text-field
                disabled
                id="delegate-number"
                solo-inverted
                flat
                dense
                v-model="attendees.delegateNo"
              ></v-text-field>
            </v-col>
            <v-col cols="6" md="3">
              <label for="delegate-name" class="text--disabled">
                Delegate Name:
              </label>
              <v-text-field
                disabled
                id="delegate-name"
                solo-inverted
                flat
                dense
                v-model="attendees.name"
              ></v-text-field>
            </v-col>
            <v-col cols="6" md="3">
              <label for="date" class="text--disabled">Attendance Date: </label>
              <v-text-field
                disabled
                id="date"
                solo-inverted
                flat
                dense
                v-model="attendees.attendanceDate"
              ></v-text-field>
            </v-col>
            <v-col cols="6" md="3">
              <label for="delegate-pay" class="text--disabled">
                Delegate Pay:
              </label>
              <v-text-field
                disabled
                solo-inverted
                flat
                id="delegate-pay"
                dense
                prefix="KES"
                v-model="attendees.delegatePay"
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" class="d-flex">
              <v-spacer></v-spacer>
              <v-btn color="primary" @click="newLine">
                <v-icon>mdi-plus</v-icon>
                add package
              </v-btn>
            </v-col>
          </v-row>
          <v-data-table :headers="headers" :items="attendees.attendeePay">
            <!--eslint-disable-next-line -->
            <template v-slot:item.packageCode="{ item,index }">
              <div class="py-auto">
                <v-autocomplete
                  :items="packages"
                  :item-text="(item) => item.description"
                  :item-value="(item) => item.lineNo"
                  v-if="editingIndex === index"
                  v-model="item.lineNo"
                  @input="addDescription($event, index)"
                  placeholder="Package"
                  filled
                  dense
                  class="mt-4"
                  return-object
                >
                </v-autocomplete>
                <span v-else>{{ item.packageCode }}</span>
              </div>
            </template>
            <!--eslint-disable-next-line -->
            <template v-slot:item.amount="{ item, index }">
              <div class="py-auto">
                <v-text-field
                  v-if="editingIndex === index"
                  v-model="item.amount"
                  placeholder="Delegate Pay"
                  dense
                  filled
                  clearable
                  class="mt-4"
                >
                </v-text-field>
                <span v-else>{{ item.amount | currencyFormat }}</span>
              </div>
            </template>
            <!--eslint-disable-next-line -->
            <template v-slot:item.actions="{ item, index }">
              <v-icon
                @click="editItem(index)"
                v-if="editingIndex !== index"
                color="blue"
              >
                mdi-pencil
              </v-icon>
              <v-icon
                @click="closeEditing(item)"
                v-if="editingIndex === index"
                color="success"
              >
                mdi-check
              </v-icon>
            </template>
          </v-data-table>
        </v-card-text>

        <v-card-actions>
          <v-btn
            depressed
            @click="attendeesDialog = false"
            color="red lighten-4 red--text text--darken-4 text-capitalize"
          >
            <v-icon class="mr-2">mdi-close</v-icon>
            Close
          </v-btn>

          <v-spacer></v-spacer>

          <v-btn
            depressed
            @click="addItem()"
            color="green lighten-4 green--text text--darken-4 text-capitalize"
          >
            <v-icon class="mr-2">mdi-content-save</v-icon>
            save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-dialog>
</template>
<script>
import { tempUrl } from "@/environment/environment";
import { helper } from "@/utils";
import DashboardMixins from "../DashboardMixins";
import DateMixin from "../../../mixins/DateMixin";
import moment from "moment";

export default {
  name: "DelegateCard",
  mixins: [DashboardMixins, DateMixin],
  data() {
    return {
      dialog: false,
      isValid: false,
      image_url: "",
      delegateForm: {
        eMail: "",
        identificationDocumentNo: "",
        gender: "",
        name: "",
        phoneNo: "",
        address: "",
        country: "",
        county: "",
        city: "",
        postCode: "",
        delegateCategory: "",
        image: undefined,
        registeredBy: "",
      },
      attendeesDialog: false,
      editing: false,
      editingIndex: -1,
    };
  },
  beforeRouteEnter(to, from, next) {
    next((v) => {
      v.dialog = true;
      v.$store.dispatch("Setup/getCountries");
      v.$store.dispatch("Setup/getPostalcodes");
      v.$store.dispatch("Setup/getCounties");
      v.$store.dispatch("Setup/getCategories");
      if (to.query.isEdit && to.params.no) {
        v.$store.dispatch("Dashboard/getDelegate", { no: to.params.no });
      }
    });
  },
  mounted() {
    Event.$on("save-clear", () => {
      this.resetDelegateForm();
    });
    Event.$on("save-close", (delegate) => {
      this.loadBiometricScripts();
      this.$scanner.scan();
      this.$router.push({
        name: "DelegateCard",
        params: { event: this.$route.params.event, no: delegate.no },
        query: {
          isEdit: btoa(true),
        },
      });
    });
    Event.$on("reloadTemplateScripts", () => {
      this.loadBiometricScripts();
      this.$scanner.scan();
    });
    Event.$on("stopEditing", () => {
      this.editing = false;
    });
  },
  computed: {
    delegateRules() {
      return {
        name: [(v) => !!v || "Name is required."],
        idNo: [(v) => !!v || "ID/Passport is required."],
        gender: [(v) => !!v || "Gender is required."],
        category: [(v) => !!v || "Category is required."],
        phoneNo: [
          (v) => !!v || "Phone Number is required.",
          (v) => {
            const transformedV = v.replace(/\s/g, "");
            const validInput = /^\+\d+$/;
            return (
              (v &&
                transformedV.length >= 13 &&
                transformedV.length <= 25 &&
                validInput.test(transformedV)) ||
              "Phone number must be between 13 and 25 digits."
            );
          },
        ],
        amount: [(v) => !!v || "amount is required."],
        packageCode: [(v) => !!v || "packageCode is required."],
        image: [
          (v) => {
            return this.editable && !!v
              ? v.size < 10000000 || "Attachment should be less than 10MB"
              : true;
          },
          (v) => {
            return this.editable && !!v
              ? v.type.includes("image") || "Attachment must be an image"
              : true;
          },
        ],
      };
    },
    isAttended() {
      return this.delegate
        ? this.delegate.attendance
          ? this.delegate.attendance.filter((d) => {
              return (
                d.eventNo === this.$route.params.event &&
                new Date(d.attendanceDate).getDate() === new Date().getDate()
              );
            }).length > 0
          : false
        : false;
    },
    profilePicture() {
      let delegateImage = this.delegateForm.image;
      if (this.image_url) return this.image_url;
      return delegateImage
        ? delegateImage.picture
          ? `data:image/png;base64,${delegateImage.picture}`
          : null
        : null;
    },
    defaultProfilePicture() {
      return require("@/assets/default-profile.svg");
    },
    editable() {
      return this.$route.query.isEdit;
    },
    isCheckin() {
      return this.$route.query.isCheckin;
    },
    countries() {
      return this.$store.getters["Setup/countries"];
    },
    categories() {
      return this.$store.getters["Setup/categories"];
    },
    postalcodes() {
      return this.$store.getters["Setup/postalcodes"].filter(
        (p) => p.county === this.delegateForm.county
      );
    },
    counties() {
      return this.$store.getters["Setup/counties"];
    },
    delegate() {
      return this.$store.getters["Dashboard/dashboardGetters"]("delegate");
    },
    isDelegate() {
      return this.$route.params.no
        ? this.delegateForm.no && this.editable
        : true;
    },
    totalDelegatePay() {
      return this.delegate
        ? this.delegate.attendees
            .filter((a) => a.eventNo === this.$route.params.event)
            .reduce((a, b) => a + b.delegatePay, 0)
        : 0;
    },
    headers() {
      return [
        { text: "Package Code", value: "packageCode" },
        { text: "Description", value: "description" },
        { text: "Amount", value: "amount" },
        { text: "Actions", value: "actions" },
      ];
    },
    defaultLineItem() {
      return {
        delegateNo: this.delegate.no,
        packageCode: "",
        eventNo: "",
        description: "",
        amount: "",
      };
    },
    event: function () {
      return this.$store.getters["Events/eventsGetters"]("events").filter(
        (e) => e.no === this.$route.params.event
      )[0];
    },
    attendees() {
      if (this.delegate.attendees && Array.isArray(this.delegate.attendees)) {
        const attendee = this.delegate.attendees.find(
          (d) => d.eventNo === this.$route.params.event
        );
        return attendee === undefined ? {} : attendee;
      }
      return {};
    },
    packages: function () {
      return this.event
        ? this.event.eventPackages.filter(
            (p) => p.packageCode !== this.attendees.attendeePay.packageCode
          )
        : [];
    },
  },
  methods: {
    phoneNumberLength(value) {
      const validInput = /^(\+)\d{3}\s\d{3}\s\d{6}$/;
      console.log(validInput.test(value));
      console.log(value);
      console.log(value.trim().length);
      if (
        value &&
        value.length >= 13 &&
        value.length <= 25 &&
        validInput.test(value)
      ) {
        return true;
      }
      return "Phone number must be between 13 and 25 digits.";
    },
    async saveDelegate(type) {
      if (!this.isValid) {
        this.$refs.delegateForm.validate();
      } else {
        const { phoneNo } = this.delegateForm;
        const formattedPhoneNumber = phoneNo.replace(/[ +]/g, "");
        // console.log(formattedPhoneNumber);
        const data = {
          ...this.delegateForm,
          phoneNo: formattedPhoneNumber,
          type,
          registeredBy: this.employeeNo,
        };
        this.$store.dispatch("Dashboard/saveDelegate", data);
      }
    },
    async editDelegate(type) {
      if (!this.isValid) {
        this.$refs.delegateForm.validate();
      } else {
        const data = {
          ...this.delegateForm,
          type,
        };
        if (data.image) {
          data.image = await helper.toBase64(data.image);
          data.image = data.image.split(",")[1];
        } else {
          delete data.image;
        }
        this.$store.dispatch("Dashboard/updateDelegate", data);
      }
    },
    resetDelegateForm() {
      this.$refs.delegateForm.reset();
    },
    attachProfilePicture: function () {
      this.image_url = URL.createObjectURL(this.delegateForm.image);
    },
    closeDialog() {
      this.$router.push({
        name: "DelegateList",
        params: { event: this.$route.params.event },
      });
    },
    scanFingerprint: function () {
      this.$scanner.scan("add");
    },
    CheckinDelegate: function (verified) {
      this.delegate.eventNo = this.$route.params.event;
      this.$confirm.show({
        title: "Checkin Delegate",
        text: "Are you sure you want to checkin this delegate?",
        onConfirm: () => {
          const data = {
            delegateNo: this.delegate.no,
            checkinTime: moment().format("HH:mm:ss"),
            attendanceDate: moment().format("YYYY-MM-DD"),
            verified,
            companyNo: this.delegate.companyNo,
            eventNo: this.$route.params.event,
            name: this.delegate.name,
            registeredBy: this.employeeNo,
          };
          this.$store.dispatch("Dashboard/manualCheckin", data);
        },
      });
    },
    isEmptyObject(obj) {
      return Object.keys(obj).length === 0;
    },
    closeEditing(item) {
      item.delegatePay = parseInt(item.delegatePay);
      this.editItem(-1);
    },
    newLine() {
      const addObj = Object.assign({}, this.defaultLineItem);
      addObj.id = this.attendees.attendeePay.length + 1;
      this.attendees.attendeePay.unshift(addObj);
      this.editItem(0);
    },
    editItem(index) {
      this.editingIndex = -1;
      this.editingIndex = index;
    },
    addDescription(event, index) {
      console.log("Event ", event);
      this.attendees.attendeePay[index].packageCode = event.packageCode;
      this.attendees.attendeePay[index].description = event.description;
      this.attendees.attendeePay[index].eventNo = event.eventNo;
      this.attendees.attendeePay[index].packageLineNo = event.lineNo;
    },
    addItem() {
      this.attendeesDialog = false;
      console.log(this.attendees.attendeePay);
      const data = this.attendees.attendeePay.map((item) => {
        const { lineNo, ...data } = item;
        console.log(lineNo);
        return {
          ...data,
          amount: parseInt(data.amount),
        };
      });
      this.$store.dispatch("Dashboard/addAttendeePay", { attendeePays: data });
    },
  },
  watch: {
    delegate: {
      handler: async function (val) {
        if (val) {
          this.delegateForm = {
            ...val,
            image:
              val.image.length > 0
                ? await helper.getFileBlob(
                    tempUrl + val.image,
                    "delegateimage.png"
                  )
                : "",
          };
          this.loadBiometricScripts();
          if (this.isCheckin) {
            this.CheckinDelegate(true);
          } else {
            this.scanFingerprint(val);
          }
          if (val.image !== "") {
            this.image_url = tempUrl + val.image;
          }
        }
      },
      deep: true,
    },
  },
};
</script>
<style>
.toolbar--top {
  position: sticky;
  top: 0;
  z-index: 1;
}
.v-input__slot::before {
  border-style: none !important;
}
</style>
