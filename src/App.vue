<template>
  <v-app :style="{ background: $vuetify.theme.themes.dark.background }">
    <v-app-bar color="#022C3F" dark prominent flat app>
      <v-container fluid>
        <v-layout class="justify-center pb-2">
        <v-img src="./assets/images/h1.png" width="416 " height="20" contain></v-img>
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
    <br />
    <v-main>
      <router-view></router-view>
    </v-main>
    <v-container>
      <v-row class="align-center">
        <v-col cols="12" sm="2">
        </v-col>
        <v-col v-for="i in 9" cols="12" sm="1" :key="i">
          <v-img :src="require(`./assets/images/f${i}.png`)" contain height="41"></v-img>
        </v-col>
      </v-row>
    </v-container>
    <v-footer class="justify-center white--text" color="#032230">
      <small>&#169; 2021 by BUDD ROGERS</small>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: "App",
  components: {},

  data: () => ({
    model: 0,
    colors: ["primary", "secondary", "yellow darken-2", "red", "orange"],
    tab: null,
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
};
</script>
<style scoped lang="scss">
.v-tab {
  text-transform: none !important;
}
</style>
