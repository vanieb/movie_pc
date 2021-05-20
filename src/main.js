import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import VueRouter from "vue-router";
import router from "./router";
import axios from "axios";
import VueAwesomeSwiper from "vue-awesome-swiper";
import "swiper/swiper-bundle.min.css";
import Vue2Filters from "vue2-filters";
import { handleError } from "@/utils/handleError";

Vue.use(Vue2Filters);
Vue.use(VueRouter);
Vue.use(VueAwesomeSwiper /* { default options with global component } */);

Vue.config.productionTip = false;

let url = window.location.href;
const HTTPS = process.env.HTTPS;
if (HTTPS && HTTPS.replace(/"/g, "") === "1") {
  if (window.location.protocol === "http:") {
    window.location.replace(url.replace(/http:/, "https:"));
  }
}
const host = process.env.VUE_APP_API_URL;
Vue.prototype.$http = axios;
axios.options.root = host;
axios.defaults.headers["Content-Type"] = "application/json;charset=UTF-8";

axios.interceptors.response.use(
  (response) => {
    if (response.data.status === "OK") {
      return response.data;
    } else if (response.status === 401) {
      router.push({
        path: "/",
        query: {
          next: router.fullPath,
        },
      });
    } else {
      return Promise.reject(handleError(response.data.message));
    }
  },
  (error) => {
    if (error.response.status === 401) {
      router.push({
        path: "/",
        query: {
          next: router.fullPath,
        },
      });
    }
  },
  () => {
    return Promise.reject(
      Vue.config.lang === "cn"
        ? "服务异常，请稍后再试"
        : "An error occured. Please try again later."
    );
  }
);
router.beforeEach((to, from, next) => {
  next();
});

router.afterEach((route) => {
  document.title = route.meta.title;
});

new Vue({
  router,
  vuetify,
  ...App,
}).$mount("#app");
