<template>
  <v-container class="pa-0 home" fluid>
    <video width="100%" height="400px;" controls>
      <source :src="video_url" type="video/mp4" :key="videoKey" />
    </video>
    <br />
    <v-row class="mr-2 ml-2 mb-2">
      <v-sheet class="mx-auto" max-width="98%" color="rgba(255, 0, 0, 0)">
        <swiper class="swiper" ref="swiper" :options="swiperOption">
          <swiper-slide :key="i" v-for="(banner, i) in movies">
            <v-img
              :src="`${host}${banner.image_url}`"
              height="100"
              width="200"
              class="mr-2 ml-2 mt-4 mb-2"
              contain
              @click="showMovieTrailer(banner)"
            ></v-img>
          </swiper-slide>
          <!-- <div class="swiper-pagination" slot="pagination"></div> -->
          <div
            v-if="movies.length > 11"
            class="prev prev-change"
            slot="button-prev"
            @click="prev()"
          ></div>
          <div
            v-if="movies.length > 11"
            class="next next-change"
            slot="button-next"
            @click="next()"
          ></div>
          <!-- <div class="swiper-button-next" slot="button-next" @click="next()"></div> -->
        </swiper>
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
      swiperOption: {
        spaceBetween: 5,
        direction: "horizontal",
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
        on: {
          resize: () => {
            this.$refs.swiper.$swiper.changeDirection(
              window.innerWidth <= 960 ? "vertical" : "horizontal"
            );
          },
        },
      },
    };
  },
  created() {
    this.getMovies();
  },
  methods: {
    getMovies() {
      axios.get(api.movies).then((data) => {
        this.movies = data.data.results;
        this.$refs.swiper.$swiper.params.slidesPerView = this.movies.length > 11 ? 11 : this.movies.length
      });
    },
    showMovieTrailer(movie) {
      this.video_url = `${this.host}${movie.video_url}`;
      this.videoKey = movie.id;
    },
    prev() {
      this.$refs.swiper.$swiper.slidePrev();
    },
    next() {
      this.$refs.swiper.$swiper.slideNext();
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
.prev,
.next {
  width: 30px;
  height: 30px;
  position: absolute;
  top: 52px;
  background: rgb(0, 0, 0, 0.4);
  z-index: 999;
  border-radius: 30px;
}
.prev-change {
  left: 10px;
}
.prev::before {
  content: "<";
  margin-left: 10px;
  color: white;
  line-height: 30px;
}
.next-change {
  right: 10px;
}
.next::before {
  content: ">";
  margin-left: 12px;
  color: white;
  line-height: 30px;
}
</style>

<style lang="scss">
.home {
  .theme--light.v-sheet {
    background-color: none;
  }
}
</style>
