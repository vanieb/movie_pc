<template>
  <v-container>
    <v-row>
      <v-col
        cols="12"
        md="4"
        style="padding:0px;"
        v-for="i in artists"
        :key="i.title"
      >
        <v-container>
          <v-card flat class="rounded-0">
            <v-img
              :src="`${host}${i.image_url}`"
              class="grey darken-4 rela"
              contain
              height="auto"
            >
              <div class="abs">{{ i.description }}</div>
            </v-img>
            <v-card-title class="title align-center">
              {{ i.name }}
            </v-card-title>
          </v-card>
        </v-container>
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
      host: process.env.VUE_APP_API_URL.slice(0, -1),
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
  },
};
</script>
<style scoped lang="scss">
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
  padding: 20px;
  font-size: 12px;
  z-index: 999;
  background: rgba(0, 0, 0, 0.2);
  text-align: center;
}
</style>
