export default [
  {
    name: "number",
    execute: (value) => {
      if (!value) return 0;
      value = parseFloat(value).toFixed(2);
      return value;
    },
  },
];
