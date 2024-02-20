<template>
  <v-card class="mx-auto" elevation="0">
    <div class="d-flex justify-space-between">
      <div class="headline">Add Event Packages</div>
      <v-btn
        class="primary text-capitalize"
        @click="addFormPackage"
        :disabled="!isEdit"
      >
        <v-icon left>mdi-plus</v-icon>
        Add Event Package
      </v-btn>
    </div>
    <v-data-table
      :headers="headers"
      :items="eventFormPackages"
      :single-expand="true"
      :expanded.sync="expanded"
      item-key="packageCode"
      class="elevation-0"
      fixed-header
    >
      <!--eslint-disable-next-line -->
      <template v-slot:item.revenueGL="{ item }">
        <v-autocomplete
          v-model="item.revenueGL"
          :items="expenseItems"
          :item-text="(p) => `${p.no} - ${p.name}`"
          :item-value="(p) => p.no"
          label="Expenditure G/L"
          :readonly="!isEdit"
          single-line
          class="mb-n3 mt-3"
          dense
        ></v-autocomplete>
      </template>
      <!--eslint-disable-next-line -->
      <template v-slot:item.accountType="{ item }">
        <v-autocomplete
          v-model="item.accountType"
          :items="accountTypes"
          :item-text="(p) => p.text"
          :item-value="(p) => p.code"
          label="Account Type"
          :readonly="!isEdit"
          single-line
          class="mb-n3 mt-3"
          dense
        ></v-autocomplete>
      </template>
      <!--eslint-disable-next-line -->
      <template v-slot:item.accountNo="{ item }">
        <v-autocomplete
          v-model="item.accountNo"
          v-if="item.accountType === 'Vendor'"
          :items="vendors"
          :item-text="(p) => `${p.number} - ${p.displayName}`"
          :item-value="(p) => p.number"
          label="Account No"
          :readonly="!isEdit"
          single-line
          class="mb-n3 mt-3"
          dense
        ></v-autocomplete>
        <v-autocomplete
          v-model="item.accountNo"
          v-else-if="item.accountType === 'Employee'"
          :items="employees"
          :item-text="(p) => `${p.number} - ${p.search_name}`"
          :item-value="(p) => p.number"
          label="Account No"
          :readonly="!isEdit"
          single-line
          class="mb-n3 mt-3"
          dense
        />
      </template>
      <!--eslint-disable-next-line -->
      <template v-slot:item.packageCode="{ item }">
        <v-autocomplete
          v-model="item.packageCode"
          :items="packages"
          :item-text="(p) => p.description"
          :item-value="(p) => p.code"
          label="Package Code"
          :readonly="!isEdit"
          single-line
          class="mb-n3 mt-3"
          dense
          @change="insertPackageDescription($event, item)"
        ></v-autocomplete>
      </template>
      <!--eslint-disable-next-line -->
      <template v-slot:item.description="{ item }">
        <v-text-field
          v-model="item.description"
          label="Package Description"
          :readonly="!isEdit"
          single-line
          class="mb-n3 mt-3"
          dense
        ></v-text-field>
      </template>
      <!--eslint-disable-next-line -->
        <template v-slot:item.paymentBasis="{ item }">
        <v-autocomplete
          :items="paymentBasis"
          item-text="item"
          item-value="item"
          v-model="item.paymentBasis"
          dense
          outlined
          persistent-placeholder
          placeholder="Payment Basis"
          :readonly="!isEdit"
        >
        </v-autocomplete>
      </template>
      <!--eslint-disable-next-line -->
      <template v-slot:item.amountExclVAT="{ item }">
        <v-text-field
          v-model="item.amountExclVAT"
          label="Amount"
          type="number"
          :readonly="!isEdit"
          single-line
          class="mb-n3 mt-3"
          dense
        ></v-text-field>
      </template>
      <!-- eslint-disable vue/valid-v-slot -->
      <template v-slot:item.dimensions="slotData">
        <v-btn
          color="primary"
          class="white--text text-capitalize"
          @click="viewDimensions(slotData)"
        >
          Dimensions <v-icon class="mx-2">mdi-chevron-down</v-icon>
        </v-btn>
      </template>
      <!--eslint-disable-next-line -->
      <template v-slot:item.actions="{ item }">
        <v-tooltip top>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              v-bind="attrs"
              v-on="on"
              icon
              v-if="isEdit"
              :disabled="item.isDefault"
              class="deep-orange lighten-4 deep-orange--text text--darken-4"
              @click="removeItem(item)"
            >
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </template>
          <span>Remove Package</span>
        </v-tooltip>
      </template>
      <!--eslint-disable-next-line -->
      <template v-slot:body.append>
        <tr>
          <th><h3>TOTAL AMOUNT</h3></th>
          <th><h3></h3></th>
          <th><h3></h3></th>
          <th><h3></h3></th>
          <th><h3></h3></th>
          <th>
            <h3>{{ packageTotal | currency }}</h3>
          </th>
        </tr>
      </template>
      <template v-slot:expanded-item="{ item }">
        <td :colspan="headers.length">
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-row>
                  <v-col cols="6">
                    <v-autocomplete
                      v-model="item.globalDimension1Code"
                      :items="dimension1"
                      :item-text="(item) => item.code + ' - ' + item.name"
                      :item-value="(item) => item.code"
                      v-if="dimension1.length > 0"
                      :label="`Select ${dimension1[0]['dimensionApi']['codeCaption']}`"
                    >
                    </v-autocomplete>
                  </v-col>
                  <v-col cols="6">
                    <v-autocomplete
                      v-model="item.globalDimension2Code"
                      :items="dimension2"
                      :item-text="(item) => item.code + ' - ' + item.name"
                      :item-value="(item) => item.code"
                      v-if="dimension2.length > 0"
                      :label="`Select ${dimension2[0]['dimensionApi']['codeCaption']}`"
                    ></v-autocomplete>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="6">
                    <v-autocomplete
                      v-model="item.globalDimension3Code"
                      :items="dimension3"
                      :item-text="(item) => item.code + ' - ' + item.name"
                      :item-value="(item) => item.code"
                      v-if="dimension3.length > 0"
                      :label="`Select ${dimension3[0]['dimensionApi']['codeCaption']}`"
                    ></v-autocomplete>
                  </v-col>
                  <v-col cols="6">
                    <v-autocomplete
                      v-model="item.globalDimension4Code"
                      :items="dimension4"
                      :item-text="(item) => item.code + ' - ' + item.name"
                      :item-value="(item) => item.code"
                      v-if="dimension4.length > 0"
                      :label="`Select ${dimension4[0]['dimensionApi']['codeCaption']}`"
                    ></v-autocomplete>
                  </v-col>
                  <v-col cols="6">
                    <v-autocomplete
                      v-model="item.globalDimension5Code"
                      :items="dimension5"
                      :item-text="(item) => item.code + ' - ' + item.name"
                      :item-value="(item) => item.code"
                      v-if="dimension5.length > 0"
                      :label="`Select ${dimension5[0]['dimensionApi']['codeCaption']}`"
                    ></v-autocomplete>
                  </v-col>
                  <v-col cols="6">
                    <v-autocomplete
                      v-model="item.globalDimension6Code"
                      :items="dimension6"
                      :item-text="(item) => item.code + ' - ' + item.name"
                      :item-value="(item) => item.code"
                      v-if="dimension6.length > 0"
                      :label="`Select ${dimension6[0]['dimensionApi']['codeCaption']}`"
                    ></v-autocomplete>
                  </v-col>
                  <v-col cols="6">
                    <v-autocomplete
                      v-model="item.globalDimension7Code"
                      :items="dimension7"
                      :item-text="(item) => item.code + ' - ' + item.name"
                      :item-value="(item) => item.code"
                      v-if="dimension7.length > 0"
                      :label="`Select ${dimension7[0]['dimensionApi']['codeCaption']}`"
                    ></v-autocomplete>
                  </v-col>
                  <v-col cols="6">
                    <v-autocomplete
                      v-model="item.globalDimension8Code"
                      :items="dimension8"
                      :item-text="(item) => item.code + ' - ' + item.name"
                      :item-value="(item) => item.code"
                      v-if="dimension8.length > 0"
                      :label="`Select ${dimension8[0]['dimensionApi']['codeCaption']}`"
                    ></v-autocomplete>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-container>
        </td>
      </template>
    </v-data-table>
  </v-card>
</template>
<style>
tbody tr:hover {
  background-color: transparent !important;
}
</style>

<script>
import DimensionMixin from "../DimensionMixin.js";

export default {
  name: "EventPackages",
  props: {
    eventData: {
      type: Object,
      default: () => {},
    },
    eventPackages: {
      type: Array,
      default: () => [],
    },
    isEdit: {
      type: Boolean,
      default: false,
    },
  },
  mixins: [DimensionMixin],
  data: function () {
    return {
      formData: {
        packageCode: "",
        description: "",
        amountExclVAT: "",
        accountNo: "",
        accountType: "",
        revenueGL: "",
        globalDimension1Code: "",
        globalDimension2Code: "",
        globalDimension3Code: "",
        globalDimension4Code: "",
        globalDimension5Code: "",
        globalDimension6Code: "",
        globalDimension7Code: "",
        globalDimension8Code: "",
        paymentBasis: "",
        lineNo: "",
      },
      singleExpand: true,
      expanded: [],
      accountTypes: [
        {
          code: "Vendor",
          text: "Vendor",
        },
        {
          code: "Employee",
          text: "Employee",
        },
      ],
    };
  },
  computed: {
    headers() {
      return [
        {
          text: "Expense Item",
          value: "revenueGL",
          align: "start",
        },
        {
          text: "Account Type",
          value: "accountType",
          align: "start",
        },
        {
          text: "Account No",
          value: "accountNo",
          align: "start",
        },
        {
          text: "Package Code",
          value: "packageCode",
          align: "start",
        },
        {
          text: "Package Description",
          value: "description",
        },
        {
          text: "Payment Basis",
          value: "paymentBasis",
        },
        {
          text: "amount",
          value: "amountExclVAT",
        },
        {
          text: "dimensions",
          value: "dimensions",
        },
        {
          text: "Actions",
          value: "actions",
        },
        { text: "", value: "data-table-expand" },
      ];
    },
    eventFormPackages: {
      get() {
        return this.eventPackages;
      },
      set(value) {
        this.$emit("update:eventPackages", value);
      },
    },
    packageTotal() {
      return this.eventFormPackages.reduce((total, item) => {
        return parseInt(total) + parseInt(item.amountExclVAT);
      }, 0);
    },
    packages() {
      return this.$store.getters["Events/eventsGetters"]("eventPackages");
    },
    expenseItems() {
      return this.$store.getters["Setup/expenseCodes"];
    },
    vendors() {
      return this.$store.getters["Setup/vendors"];
    },
    employees() {
      return this.$store.getters["Setup/employees"];
    },
    dimensionValues() {
      return this.$store.getters["Setup/dimensions"];
    },
    paymentBasis() {
      return this.$store.getters["Setup/paymentBasis"];
    },
  },
  methods: {
    removeItem(item) {
      if (item.lineNo) {
        this.$confirm.show({
          title: "Remove Package",
          text: "Are you sure you want to remove this package?",
          onConfirm: () => {
            this.$store.dispatch("Events/deletePackage", item);
          },
        });
      } else {
        this.eventFormPackages.splice(this.eventFormPackages.indexOf(item), 1);
      }
    },
    addFormPackage() {
      const data = { ...this.formData };
      const eventData = { ...this.eventData };
      data.globalDimension1Code = eventData.globalDimension1Code;
      data.globalDimension2Code = eventData.globalDimension2Code;
      data.globalDimension3Code = eventData.globalDimension3Code;
      data.globalDimension4Code = eventData.globalDimension4Code;
      data.globalDimension5Code = eventData.globalDimension5Code;
      data.globalDimension6Code = eventData.globalDimension6Code;
      data.globalDimension7Code = eventData.globalDimension7Code;
      data.globalDimension8Code = eventData.globalDimension8Code;
      this.eventFormPackages.push(data);
    },
    insertPackageDescription(event, item) {
      const packageDescription = this.packages.find((p) => p.code === event);
      item.description = packageDescription.description;
    },
    viewDimensions(slotData) {
      const indexExpanded = this.expanded.findIndex((i) => i === slotData.item);
      if (indexExpanded > -1) {
        this.expanded.splice(indexExpanded, 1);
      } else {
        this.expanded.push(slotData.item);
      }
    },
  },
  watch: {
    "formData.amountExclVAT": {
      handler: function (val) {
        if (val) {
          this.formData.amountExclVAT = parseInt(val);
        }
      },
      deep: true,
    },
  },
};
</script>
