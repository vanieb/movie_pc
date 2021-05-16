<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" md="4" style="padding:0px;" v-for="i in artists" :key="i.title">
        <v-card flat class="rounded-0">
          <v-img
            :src="`${host}${i.image_url}`"
            class="grey darken-4"
          ></v-img>
          <v-card-title class="title">
            {{i.name}}
          </v-card-title>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import api from "@/api/api";
export default {
  name: "Bio",
  components: {},
  data() {
    return {
      artists: {},
      host: process.env.VUE_APP_API_URL.slice(0,-1),
    };
  },
  created() {
    this.getArtists();
  },
  methods: {
    getArtists() {
      this.$http.get(api.artists).then((response) => {
        this.artists = response.data.results;
      });
    },
  }
};
</script>
<style scoped lang="scss"></style>
