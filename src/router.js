import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);


export default new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
        name: "Home",
        path: "/",
        component: function(resolve) {
          require(["./pages/Home.vue"], resolve);
        },
        meta: {
          title: 'Home',
          auth: false,
        },
      },
    {
      name: "About Us",
      path: "/about",
      component: function(resolve) {
        require(["./pages/AboutUs.vue"], resolve);
      },
      meta: {
        title: 'About Us',
        auth: false,
      },
    },
    {
        name: "Executive Biography",
        path: "/bio",
        component: function(resolve) {
          require(["./pages/Bio.vue"], resolve);
        },
        meta: {
          title: 'Executive Biography',
          auth: false,
        },
      },
      {
        name: "Projects",
        path: "/projects",
        component: function(resolve) {
          require(["./pages/Projects.vue"], resolve);
        },
        meta: {
          title: 'Portfolio',
          auth: false,
        },
      },
      {
        name: "Portfolio",
        path: "/portfolio",
        component: function(resolve) {
          require(["./pages/Portfolio.vue"], resolve);
        },
        meta: {
          title: 'Portfolio',
          auth: false,
        },
      },
      {
        name: "Contact Us",
        path: "/contact",
        component: function(resolve) {
          require(["./pages/ContactUs.vue"], resolve);
        },
        meta: {
          title: 'Contact Us',
          auth: false,
        },
      },
  ],
});
