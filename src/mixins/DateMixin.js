import moment from "moment/moment";

export default {
  methods: {
    formatDate: function (date, type = 3) {
      switch (type) {
        case 1:
          return moment(date).format("LT"); // 1:03 PM
        case 2:
          return moment(date).format("LTS"); // 1:03:13 PM
        case 3:
          return moment(date).format("L"); // 09/29/2021
        case 4:
          return moment(date).format("l"); // 9/29/2021
        case 5:
          return moment(date).format("LL"); // September 29, 2021
        case 6:
          return moment(date).format("ll"); // Sep 29, 2021
        case 7:
          return moment(date).format("LLL"); // September 29, 2021 1:03 PM
        case 8:
          return moment(date).format("lll"); // Sep 29, 2021 1:03 PM
        case 9:
          return moment(date).format("LLLL"); // Wednesday, September 29, 2021 1:03 PM
        case 10:
          return moment(date).format("llll"); // Wed, Sep 29, 2021 1:03 PM
      }
    },

    currentDate: function () {
      return this.formatDate(new moment(), 8);
    },
  },
};
