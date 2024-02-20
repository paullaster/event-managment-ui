import Vue from "vue";
import Vuetify from "vuetify/lib/framework";

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      light: {
        primary: "#05439c",
        secondary: "#e67e22",
        accent: "#736755",
        error: "#b71c1c",
        info: "#2196F3",
        success: "#4CAF50",
        warning: "#FFC107",
      },
    },
  },

  icons: {
    iconfont: "mdi",
  },
});
