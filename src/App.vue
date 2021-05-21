<template>
  <v-app :style="{ background: $vuetify.theme.themes.dark.background }">
    <v-app-bar color="#022C3F" dark prominent flat app>
      <v-container fluid>
        <v-layout class="justify-center pb-2">
          <v-img
            src="./assets/images/h1.png"
            width="416 "
            height="20"
            contain
          ></v-img>
        </v-layout>
        <h6 class="text-center">
          <small>
            Classics cast civilizations, civilization inherits classics</small
          >
        </h6>
        <div></div>
        <v-spacer></v-spacer>
        <v-tabs v-model="tab" background-color="transparent" centered>
          <v-tab v-for="item in items" :key="item.name" :to="item.path" link>
            {{ item.name }}
          </v-tab>
        </v-tabs>
      </v-container>
    </v-app-bar>
    <v-main>
      <router-view ></router-view>
    </v-main>
    <v-container>
      <v-row class="align-center">
        <v-col cols="12" sm="2"> </v-col>
        <v-col v-for="i in logos" cols="12" sm="1" :key="i.id">
          <a :href="i.website_link" target="_blank">
            <v-img :src="`${host}${i.image_url}`" contain height="41"></v-img>
          </a>
        </v-col>
      </v-row>
    </v-container>
    <v-footer
      class="justify-center white--text"
      color="#032230"
      style="line-height: 30px;"
    >
      <small>&#169; 2015 by BUDD ROGERS</small>
    </v-footer>
  </v-app>
</template>

<script>
import api from "@/api/api";
import axios from "axios";
export default {
  name: "App",
  components: {},
  data: () => ({
    host: process.env.VUE_APP_API_URL.slice(0, -1),
    colors: ["primary", "secondary", "yellow darken-2", "red", "orange"],
    tab: 0,
    logos: [],
    items: [
      {
        name: "Home",
        path: "/",
      },
      {
        name: "About Us",
        path: "/about",
      },
      {
        name: "Executives Biography",
        path: "/bio",
      },
      {
        name: "Our Projects",
        path: "/projects",
      },
      {
        name: "Investment Portfolio",
        path: "/portfolio",
      },
      {
        name: "Contact Us",
        path: "/contact",
      },
    ],
  }),
  created() {
    this.getLogos();
  },
  methods: {
    getLogos() {
      axios.get(`${api.logos}?offset=0&limit=20`).then((data) => {
        this.logos = data.data.results;
      });
    },
  },
};
</script>
<style scoped lang="scss">
.v-tab {
  text-transform: none !important;
}
</style>
