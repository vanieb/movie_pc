<template>
  <v-container class="pa-0" fluid>
    <video width="100%" height="400px;" controls>
      <source :src="video_url" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
    <br />
    <v-row v-for="i in movies" :key="i">
      <v-col cols="6" sm="1">
        <v-img
          :src="`${i.image_url}`"
          height="100"
          width="100"
          @click="showMovieTrailer(i)"
        ></v-img>
      </v-col>
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
      images: [],
      movies: [],
      video_url: "",
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
        this.movies = data;
        console.log(this.movies);
      });
    },
    showMovieTrailer(movie) {
      this.video_url = movie.video_url;
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
