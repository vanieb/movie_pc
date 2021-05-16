import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
// import colors from 'vuetify/lib/util/colors'

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes:
        {dark: {background: "#032636", color: "#FFFFFF"},
        light: {background: "#032636", color: "#FFFFFF"}}
    }
})
