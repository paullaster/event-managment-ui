export default [
  {
    name: "currency",
    execute: (value) => {
      if (!value) return "0.00";
      value = `${parseFloat(value).toFixed(2)}`;
      return value;
    },
  },
  {
    // this adds the commas to the number and floating point
    name: "currencyFormat",
    execute: (value) => {
      if (!value) return "0.00";
      value = parseFloat(value).toFixed(2);
      return new Intl.NumberFormat("en-KE", {
        minimumFractionDigits: 2,
      }).format(value);
    },
  },
];
