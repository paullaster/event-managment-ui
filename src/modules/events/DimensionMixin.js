export default {
  computed: {
    dimension1() {
      return this.dimensionValues.filter(
        (item) =>
          item.globalDimensionNo === 1 && item.dimensionValueType === "Standard"
      );
    },
    dimension2() {
      return this.dimensionValues.filter(
        (item) =>
          item.globalDimensionNo === 2 && item.dimensionValueType === "Standard"
      );
    },
    dimension3() {
      return this.dimensionValues.filter(
        (item) =>
          item.globalDimensionNo === 3 && item.dimensionValueType === "Standard"
      );
    },
    dimension4() {
      return this.dimensionValues.filter(
        (item) =>
          item.globalDimensionNo === 4 && item.dimensionValueType === "Standard"
      );
    },
    dimension5() {
      return this.dimensionValues.filter(
        (item) =>
          item.globalDimensionNo === 5 && item.dimensionValueType === "Standard"
      );
    },
    dimension6() {
      return this.dimensionValues.filter(
        (item) =>
          item.globalDimensionNo === 6 && item.dimensionValueType === "Standard"
      );
    },
    dimension7() {
      return this.dimensionValues.filter(
        (item) =>
          item.globalDimensionNo === 7 && item.dimensionValueType === "Standard"
      );
    },
    dimension8() {
      return this.dimensionValues.filter(
        (item) =>
          item.globalDimensionNo === 8 && item.dimensionValueType === "Standard"
      );
    },
  },
};
