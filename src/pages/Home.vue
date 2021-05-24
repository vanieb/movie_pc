<template>
  <v-container class="pa-0 home" fluid>
    <video
      controls
      :ref="`video`"
      :src="video_url"
      autoplay
      width="100%"
      muted="true"
      class="videosize"
    >
      <div v-if="loading" class="abs">
        <v-progress-circular
          indeterminate
          color="primary"
        ></v-progress-circular>
      </div>
    </video>
    <br />
    <v-flex align="center" justify="center">
      <v-row class="mr-2 ml-2 mb-2 ">
        <v-sheet class="mx-auto" max-width="98%" color="rgba(255, 0, 0, 0)">
          <swiper
            class="swiper"
            ref="swiper"
            :options="swiperOption"
            v-if="movies.length > 11"
          >
            <swiper-slide :key="i" v-for="(banner, i) in movies">
              <v-img
                :src="`${host}${banner.image_url}`"
                height="100"
                width="200"
                class="mr-2 ml-2 mt-4 mb-2 rela"
                contain
                @mouseover="videoKey = i"
                @mouseleave="videoKey = undefined"
                @click="showMovieTrailer(banner, i)"
                ><v-icon v-show="videoKey == i" dark class="abs"
                  >play_circle_filled</v-icon
                >
              </v-img>
            </swiper-slide>
            <div
              class="prev prev-change"
              slot="button-prev"
              @click="prev()"
            ></div>
            <div
              class="next next-change"
              slot="button-next"
              @click="next()"
            ></div>
          </swiper>
          <div v-else>
            <v-row>
              <v-col :key="i" v-for="(banner, i) in movies">
                <v-img
                  :src="`${host}${banner.image_url}`"
                  height="100"
                  width="100"
                  class="mt-4 mb-2 rela"
                  contain
                  @mouseover="videoKey = i"
                  @mouseleave="videoKey = undefined"
                  @click="showMovieTrailer(banner, i)"
                  ><v-icon v-show="videoKey == i" dark class="abs"
                    >play_circle_filled</v-icon
                  >
                </v-img>
              </v-col>
            </v-row>
          </div>
        </v-sheet>
      </v-row>
    </v-flex>
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
      loading: false,
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
        slidesPerView: 11,
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
    async getMovies() {
      await axios.get(api.movies).then((data) => {
        this.movies = data.data.results;
        this.video_url = `${this.host}${this.movies[0].video_url}`;
        this.$nextTick(() => {
          this.$refs["video"].autoplay = true;
          this.$refs["video"].play();
        });
      });
    },
    async showMovieTrailer(movie, i) {
      this.videoKey = i;
      this.loading = true;
      this.video_url = `${this.host}${movie.video_url}`;
      this.$nextTick(() => {
        this.$refs["video"].muted = false;
        this.$refs["video"].play();
        this.$refs["video"].autoplay = true;
      });
      this.loading = false;
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
.rela {
  position: relative;
  text-align: center;
  color: white;
}
.abs {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  font-size: 12px;
  z-index: 999;
  background: rgba(0, 0, 0, 0.2);
  text-align: center;
}
.videosize {
  display: flex;
  height: 50vh;
  max-width: 100%;
  max-height: 100%;
}
</style>
