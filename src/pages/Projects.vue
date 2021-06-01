<template>
  <v-container fluid>
    <v-layout>
      <v-row>
        <v-col cols="12" md="2">
          <v-card color="#022C3F" @click="filterMovies('previous')" dark>
            <v-card-title>Previous Projects</v-card-title>
            <v-card-text
              >Previous projects: 27 years, 43 movies, annualized ROI 31.3%, $7
              billion investment income</v-card-text
            >
          </v-card>
          <br />
          <v-spacer></v-spacer>
          <v-card color="#022C3F" @click="filterMovies('ongoing')" dark>
            <v-card-title>Ongoing Projects</v-card-title>
            <v-card-text
              >Ongoing projects: 3 movies in 2021, projected annualized ROI
              38%</v-card-text
            >
          </v-card>
        </v-col>
        <v-col cols="12" md="10">
          <v-layout>
            <v-layout class="justify-start" v-if="showTitle">
              <v-card-title class="white--text">{{
                query.type == "ongoing"
                  ? "Ongoing Projects"
                  : "Previous Projects"
              }}</v-card-title>
            </v-layout>
            <v-layout class="justify-end">
              <div style="width:400px;" class="mr-2">
                <v-select
                  color="white"
                  dark
                  item-name="text"
                  item-value="value"
                  :items="sortOptions"
                  v-model="sort"
                  hide-details="true"
                  placeholder="Sort"
                  outlined
                  :disabled="loading"
                  dense
                  @input="sortFunc"
                >
                  <template slot="selection" slot-scope="data">
                    <v-icon v-if="showIcon" :disabled="loading">{{
                      icon
                    }}</v-icon
                    ><span class="ml-3">{{ data.item.text }}</span>
                  </template>
                  <template slot="item" slot-scope="data">
                    <span class="ml-3">{{ data.item.text }}</span>
                  </template>
                </v-select>
              </div>
              <v-btn dark :loading="loading" @click="clearAll">
                Clear
              </v-btn>
            </v-layout>
          </v-layout>
          <v-data-table
            :headers="headers"
            class="white--text"
            :hide-default-footer="true"
            :items="querySet"
          >
            <template v-slot:header.investment="{ header }">
              <span>{{ header.text }}</span
              ><br />(in million USD)
            </template>
            <template v-slot:body="{ items }">
              <span v-if="!items">{{ items }}</span>
              <tbody>
                <tr v-for="item in querySet" :key="item.id">
                  <td
                    width="1%"
                    :style="item.confidential ? 'filter: blur(6.2px); ' : ''"
                  >
                    <v-img
                      lazy-src="https://picsum.photos/id/11/10/6"
                      :src="`${host}${item.image_url}`"
                      width="80"
                      class="ma-1"
                    ></v-img>
                  </td>
                  <td
                    width="15%"
                    :style="item.confidential ? 'filter: blur(6.2px); ' : ''"
                  >
                    <strong>{{ item.title }} ({{ item.year }})</strong>
                    <br />
                    <small>
                      Director: {{ item.director }}<br />
                      <span v-if="item.actors.length > 85"
                        >Artists: {{ item.actors | truncate(85, "...") }}</span
                      >
                      <span v-else>Artists: {{ item.actors }}</span>
                    </small>
                  </td>
                  <td
                    width="18%"
                    class="text-center align-center"
                    :style="item.confidential ? 'filter: blur(6.2px); ' : ''"
                  >
                    <span v-if="item.type == 'ongoing'">
                      Ongoing
                    </span>
                    <v-row v-else-if="item.awards.length > 0">
                      <v-col
                        v-for="i in item.awards"
                        :key="i"
                        cols="12"
                        :sm="item.awards.length <= 3 ? '' : 3"
                        class="align-center"
                      >
                        <v-img
                          :src="require(`../assets/images/a${i}.png`)"
                          height="20"
                          contain
                        >
                        </v-img>
                        <!-- <v-tooltip top>
                          <template v-slot:activator="{ on, attrs }">
                            <span v-bind="attrs" v-on="on"
                              ><v-img
                                :src="require(`../assets/images/a${i}.png`)"
                                height="20"
                                contain
                              >
                              </v-img
                            ></span>
                          </template>
                          <span>{{ award[i - 1] }}</span>
                        </v-tooltip> -->
                      </v-col>
                    </v-row>
                    <span v-else>No Award</span>
                  </td>
                  <td width="10%" class="text-center">
                    <span v-if="item.confidential">
                      Confidential
                    </span>
                    <span v-else>
                      <span v-if="item.type == 'ongoing'">
                        Ongoing
                      </span>
                      <span
                        v-else
                        :style="
                          item.confidential ? 'filter: blur(6.2px); ' : ''
                        "
                        >{{ item.imdb_score }}</span
                      >
                    </span>
                  </td>
                  <td
                    width="5%"
                    class="text-center"
                    :style="item.confidential ? 'filter: blur(6.2px); ' : ''"
                  >
                    {{ item.investment / 1000000 }}/{{ item.return / 1000000 }}
                  </td>
                  <td
                    width="9%"
                    class="text-center"
                    :style="item.confidential ? 'filter: blur(6.2px); ' : ''"
                  >
                    {{ item.payback }}
                  </td>
                  <td
                    width="10%"
                    class="text-center"
                    :style="item.confidential ? 'filter: blur(6.2px); ' : ''"
                  >
                    {{ item.return_rate }}
                  </td>
                </tr>
              </tbody>
            </template>
          </v-data-table></v-col
        >
      </v-row>
    </v-layout>
    <pagination
      :queryset="querySet"
      :api="moviesApi"
      :query="query"
      ref="pulling"
      @query-data="queryData"
      @query-param="queryParam"
    >
    </pagination>
    <!-- SNACKBAR -->
    <snack-bar
      :show="snackbar.show"
      :color="snackbar.color"
      :text="snackbar.text"
    >
    </snack-bar>
  </v-container>
</template>
<script>
import api from "@/api/api";
// import axios from "axios";
import $ from "@/utils/util";
import Pagination from "@/components/Pagination";
import SnackBar from "@/components/SnackBar";
export default {
  name: "Projects",
  components: { Pagination, SnackBar },
  data() {
    return {
      movies: [],
      host: process.env.VUE_APP_API_URL.slice(0, -1),
      headers: [
        {
          sortable: false,
          text: "",
          value: "",
          width: "1%;",
        },
        {
          sortable: false,
          text: "Films",
          value: "title",
          class: "white--text",
        },
        {
          sortable: false,
          text: "Awards (winners and nominated)",
          value: "awards",
          class: "white--text",
          align: "center",
        },
        {
          sortable: false,
          text: "IMDB Rating",
          class: "white--text",
          align: "center",
        },
        {
          sortable: false,
          text: "Budget/Revenue",
          value: "investment",
          class: "white--text",
          align: "center",
        },
        {
          sortable: false,
          text: "Investment Returned in (month)",
          value: "payback",
          class: "white--text",
          align: "center",
        },
        {
          sortable: false,
          text: "Annualized Return on Investment (ROI)",
          value: "return_rate",
          class: "white--text",
          align: "center",
        },
      ],
      sortOptions: [
        { text: "Revenue", value: 1 },
        { text: "Annualized Return on Investment (ROI)", value: 2 },
        { text: "IMDB Rating", value: 3 },
        { text: "Title", value: 4 },
        { text: "Year", value: 5 },
      ],
      award: ["1", "2", "3", "4"],
      loading: true,
      showTitle: false,
      showIcon: false,
      querySet: [],
      moviesApi: api.movies,
      icon: "arrow_upward",
      snackbar: {
        color: "",
        text: "",
        show: false,
      },
      sort: "",
      query: {
        is_ascending: true,
      },
    };
  },
  filters: {
    truncate: function(text, length, suffix) {
      return text.substring(0, length) + suffix;
    },
  },
  watch: {
    $route: {
      handler() {
        this.loading = true;
        this.setQueryAll();
        this.$refs.pulling.rebase();
      },
      deep: true,
    },
  },
  created() {
    this.setQueryAll();
    this.$nextTick(() => {
      this.$refs.pulling.rebase();
    });
  },
  methods: {
    submit() {
      if (!$.compareQuery(this.query, this.$route.query)) {
        this.$refs.pulling.submit();
      }
    },
    filterMovies(type) {
      this.query.type = type;
      this.showTitle = true;
      this.submit();
    },
    showMovieTrailer(movie) {
      this.video_url = movie.video_url;
    },
    setQueryAll() {
      this.type = this.$route.query.type;
      if (this.$route.query.sort_by === "returnValue") {
        this.sort = 1;
      } else if (this.$route.query.sort_by === "returnRate") {
        this.sort = 2;
      } else if (this.$route.query.sort_by === "imdbScore") {
        this.sort = 3;
      } else if (this.$route.query.sort_by === "title") {
        this.sort = 4;
      } else if (this.$route.query.sort_by === "year") {
        this.sort = 5;
      }
      if (
        this.$route.query.is_ascending === true ||
        this.$route.query.is_ascending === "true"
      ) {
        this.icon = "arrow_upward";
        this.showIcon = true;
      } else {
        this.icon = "arrow_downward";
        this.showIcon = true;
      }
      // this.sort =
      // this.icon =
      //   this.$route.query.is_ascending === true ||
      //   this.$route.query.is_ascending === false ||
      //   this.$route.query.is_ascending === "true" ||
      //   this.$route.query.is_ascending === "false"
      //     ? "arrow_upward"
      //     : "arrow_downward";
      this.query = Object.assign({}, this.$route.query);
    },
    clearAll() {
      this.sort = "";
      this.query = {};
      this.showTitle = false;
      this.$nextTick(() => {
        this.$refs.pulling.submit();
      });
    },
    queryData(queryset) {
      this.loading = false;
      this.querySet = queryset;
    },
    queryParam(query) {
      this.query = Object.assign(this.query, query);
    },
    sortFunc(item) {
      this.showIcon = true;
      if (this.oldItem === item) {
        if (
          this.query.is_ascending == "true" ||
          this.query.is_ascending == true
        ) {
          this.query.is_ascending = false;
        } else if (
          this.query.is_ascending == "false" ||
          this.query.is_ascending == false
        ) {
          this.query.is_ascending = true;
        }
        this.icon = this.query.is_ascending ? "arrow_upward" : "arrow_downward";
      } else {
        this.icon = this.query.is_ascending ? "arrow_upward" : "arrow_downward";
        this.query.is_ascending = true;
        if (item == 1) {
          this.query.sort_by = "returnValue";
        } else if (item == 2) {
          this.query.sort_by = "returnRate";
        } else if (item == 3) {
          this.query.sort_by = "imdbScore";
        } else if (item == 4) {
          this.query.sort_by = "title";
        } else if (item == 5) {
          this.query.sort_by = "year";
        }
      }
      this.$refs.pulling.submit();
      this.oldItem = item;
    },
  },
};
</script>
<style scoped lang="scss">
.theme--light.v-data-table {
  background-color: #032636;
  color: #ffffff !important;
}
tbody {
  tr:hover {
    background-color: transparent !important;
  }
}
</style>
