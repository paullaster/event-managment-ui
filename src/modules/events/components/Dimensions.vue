<template>
  <v-card flat>
    <v-card-text>
      <v-row>
        <v-col cols="12">
          <v-row>
            <v-col cols="6">
              <v-autocomplete
                v-model="formData.globalDimension1Code"
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
                v-model="formData.globalDimension2Code"
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
                v-model="formData.globalDimension3Code"
                :items="dimension3"
                :item-text="(item) => item.code + ' - ' + item.name"
                :item-value="(item) => item.code"
                v-if="dimension3.length > 0"
                :label="`Select ${dimension3[0]['dimensionApi']['codeCaption']}`"
              ></v-autocomplete>
            </v-col>
            <v-col cols="6">
              <v-autocomplete
                v-model="formData.globalDimension4Code"
                :items="dimension4"
                :item-text="(item) => item.code + ' - ' + item.name"
                :item-value="(item) => item.code"
                v-if="dimension4.length > 0"
                :label="`Select ${dimension4[0]['dimensionApi']['codeCaption']}`"
              ></v-autocomplete>
            </v-col>
            <v-col cols="6">
              <v-autocomplete
                v-model="formData.globalDimension5Code"
                :items="dimension5"
                :item-text="(item) => item.code + ' - ' + item.name"
                :item-value="(item) => item.code"
                v-if="dimension5.length > 0"
                :label="`Select ${dimension5[0]['dimensionApi']['codeCaption']}`"
              ></v-autocomplete>
            </v-col>
            <v-col cols="6">
              <v-autocomplete
                v-model="formData.globalDimension6Code"
                :items="dimension6"
                :item-text="(item) => item.code + ' - ' + item.name"
                :item-value="(item) => item.code"
                v-if="dimension6.length > 0"
                :label="`Select ${dimension6[0]['dimensionApi']['codeCaption']}`"
              ></v-autocomplete>
            </v-col>
            <v-col cols="6">
              <v-autocomplete
                v-model="formData.globalDimension7Code"
                :items="dimension7"
                :item-text="(item) => item.code + ' - ' + item.name"
                :item-value="(item) => item.code"
                v-if="dimension7.length > 0"
                :label="`Select ${dimension7[0]['dimensionApi']['codeCaption']}`"
              ></v-autocomplete>
            </v-col>
            <v-col cols="6">
              <v-autocomplete
                v-model="formData.globalDimension8Code"
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
    </v-card-text>
  </v-card>
</template>

<script>
import DimensionMixin from "../DimensionMixin.js";

export default {
  name: "Dimensions",
  mixins: [DimensionMixin],
  props: {
    dimensionValues: {
      type: Array,
      default: () => [],
    },
    formData: {
      type: Object,
      default: () => ({}),
    },
    displayImprestLineActions: Boolean,
  },
  data() {
    return {
      // globalDimension5Code: "",
      // globalDimension6Code: "",
      // globalDimension7Code: "",
      // globalDimension8Code: "",
    };
  },
  computed: {},
};
</script>
