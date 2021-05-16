<template>
  <v-container class="pa-0" fluid>
    {{video_url}}
    <video width="100%" height="400px;" controls>
      <source :src="video_url" type="video/mp4" :key="videoKey"/>
      Your browser does not support the video tag.
    </video>
    <br />
    <v-row class="mr-2 ml-2 mb-2">
      <v-sheet class="mx-auto" max-width="700">
        <v-slide-group multiple show-arrows>
          <v-slide-item v-for="(item, i) in movies" :key="i">
            <a @click="showMovieTrailer(item)">
              <v-img
                :src="`${host}${item.image_url}`"
                height="200"
                width="200"
                class="mr-2 ml-2 mt-4 mb-2"
              ></v-img>
            </a>
          </v-slide-item>
        </v-slide-group>
      </v-sheet>
    </v-row>
  </v-container>
</template>
<script>
import api from "@/api/api";
import axios from "axios";
export default {
  name: "Home",
  components: {},
  data() {
    return {
      host: process.env.VUE_APP_API_URL.slice(0, -1),
      images: [],
      movies: [],
      video_url: "",
      videoKey: 0,
      snackbar: {
        color: "",
        text: "",
        show: false,
      },
    };
  },
  created() {
    this.getMovies();
  },
  methods: {
    getMovies() {
      // let headers = {
      //   "Content-Type": "application/json;charset=UTF-8",
      // };
      axios.get(api.movies).then((data) => {
        this.movies = data.data.results;
        console.log(this.movies);
      });
    },
    showMovieTrailer(movie) {
      this.video_url = `${this.host}${movie.video_url}`;
      this.videoKey = movie.id
      console.log(this.video_url)
    },
  },
};
</script>
<style scoped lang="scss">
.form-title {
  background-color: #607d8b;
  color: white;
  height: 50px;
  padding: 10px 12px 10px;
}
</style>
