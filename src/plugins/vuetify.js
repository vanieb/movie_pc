import Vue from "vue";
import Vuetify from "vuetify/lib/framework";
import '@mdi/font/css/materialdesignicons.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    themes: {
      dark: { background: "#032636", color: "#FFFFFF" },
      light: { background: "#032636", color: "#FFFFFF" },
    },
  },
  icons: {
    iconfont: "md",
  },
});
