import call from "../../service/http";
import constant from "./SetupConstants";

export default {
  namespaced: true,
  state: {
    companyInformation: {},
    countries: [],
    counties: [],
    postalcodes: [],
    error: "",
    categories: [],
    vendors: [],
    employees: [],
    expenseCodes: [],
    dimensions: [],
    paymentBasis: [],
    currencies: [],
  },
  mutations: {
    SET_COMPANY_INFORMATION: (state, payload) => {
      state.companyInformation = payload;
    },
    SET_COUNTRIES: (state, payload) => {
      state.countries = payload;
    },
    SET_POSTAL_CODES: (state, payload) => {
      state.postalcodes = payload;
    },
    SET_COUNTIES: (state, payload) => {
      state.counties = payload;
    },
    SET_ERROR: (state, payload) => {
      state.error = payload;
    },
    SET_CATEGORIES: (state, payload) => {
      state.categories = payload;
    },
    SET_VENDORS: (state, payload) => {
      state.vendors = payload;
    },
    SET_EMPLOYEES: (state, payload) => {
      state.employees = payload;
    },
    SET_DIMENSION_VALUES: (state, payload) => {
      state.dimensions = payload;
    },
    SET_EXPENSE_CODES: (state, payload) => {
      state.expenseCodes = payload;
    },
    SET_CURRENCIES: (state, payload) => {
      state.currencies = payload;
    },
    SET_PAYMENT_BASIS: (state, payload) => {
      state.paymentBasis = payload;
    },
  },
  getters: {
    companyInformation: (state) => state.companyInformation,
    countries: (state) => state.countries,
    counties: (state) => state.counties,
    postalcodes: (state) => state.postalcodes,
    error: (state) => state.error,
    categories: (state) => state.categories,
    vendors: (state) => state.vendors,
    employees: (state) => state.employees,
    currencies: (state) => state.currencies,
    dimensions: (state) => state.dimensions,
    expenseCodes: (state) => state.expenseCodes,
    paymentBasis: (state) => state.paymentBasis,
  },
  actions: {
    getCompanyInformation: ({ commit }) => {
      commit("Loader/SET_LOADING", true, { root: true });
      call("get", constant.companyInformation).then((res) => {
        commit("SET_COMPANY_INFORMATION", res.data.data);
        commit("Loader/SET_LOADING", false, { root: true });
      });
    },

    getCountries: ({ commit }) => {
      commit("Loader/SET_LOADING", true, { root: true });
      call("get", constant.countries).then((res) => {
        commit("SET_COUNTRIES", res.data.data);
        commit("Loader/SET_LOADING", false, { root: true });
      });
    },

    getPostalcodes: ({ commit }) => {
      commit("Loader/SET_LOADING", true, { root: true });
      call("get", constant.postcodes).then((res) => {
        commit("SET_POSTAL_CODES", res.data.data);
        commit("Loader/SET_LOADING", false, { root: true });
      });
    },

    getCounties: ({ commit }) => {
      commit("Loader/SET_LOADING", true, { root: true });
      call("get", constant.counties).then((res) => {
        commit("SET_COUNTIES", res.data.data);
        commit("Loader/SET_LOADING", false, { root: true });
      });
    },

    getCategories: ({ commit }) => {
      commit("Loader/SET_LOADING", true, { root: true });
      call("get", constant.categories).then((res) => {
        commit("SET_CATEGORIES", res.data.data);
        commit("Loader/SET_LOADING", false, { root: true });
      });
    },

    getEmployees: ({ commit }) => {
      commit("Loader/SET_LOADING", true, { root: true });
      call("get", constant.employees).then((res) => {
        commit("SET_EMPLOYEES", res.data.data);
        commit("Loader/SET_LOADING", false, { root: true });
      });
    },

    getVendors: ({ commit }) => {
      commit("Loader/SET_LOADING", true, { root: true });
      call("get", constant.vendors).then((res) => {
        commit("SET_VENDORS", res.data.data);
        commit("Loader/SET_LOADING", false, { root: true });
      });
    },

    getDimensionValues: ({ commit }) => {
      commit("Loader/SET_LOADING", true, { root: true });
      call("get", constant.DIMENSIONS)
        .then((res) => {
          commit("SET_DIMENSION_VALUES", res.data.data);
          commit("Loader/SET_LOADING", false, { root: true });
        })
        .catch((err) => {
          Event.$emit("ApiError", err.response.data.message);
          commit("Loader/SET_LOADING", false, { root: true });
        });
    },

    getExpenseCodes: ({ commit }) => {
      commit("Loader/SET_LOADING", true, { root: true });
      call("get", constant.EXPENSECODES)
        .then((res) => {
          commit("SET_EXPENSE_CODES", res.data.data);
          commit("Loader/SET_LOADING", false, { root: true });
        })
        .catch((err) => {
          Event.$emit("ApiError", err.response.data.message);
          commit("Loader/SET_LOADING", false, { root: true });
        });
    },

    getCurrencies: ({ commit }) => {
      call("get", constant.currencies)
        .then((res) => {
          commit("SET_CURRENCIES", res.data.data);
        })
        .catch((err) => {
          console.log("ApiError", err.response.data.message);
        });
    },

    getPaymentBasis: ({ commit }) => {
      call("get", constant.PAYMENTBASIS)
        .then((res) => {
          commit("SET_PAYMENT_BASIS", res.data.data);
        })
        .catch((err) => {
          console.log("ApiError", err.response.data.message);
        });
    },
  },
};
