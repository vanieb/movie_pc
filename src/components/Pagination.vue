<template>
  <v-container>
    <v-layout justify-center v-if="loading">
      <v-progress-circular
        indeterminate
        color="blue-grey"
      ></v-progress-circular>
    </v-layout>
    <v-layout v-else>
      <v-layout v-if="!myQueryset.length && !loading" justify-center>
        <small class="white--text">No Record</small>
      </v-layout>
      <v-layout justify-end v-if="myQueryset.length">
        <div>
          <div class="d-inline-block mr-2 align-center justify-center">
            <small class="white--text">Rows per page:</small>
          </div>
          <div class="d-inline-block" style="font-size: 12px;">
            <v-select
              item-text="value"
              item-value="value"
              :items="items"
              style="width: 100px;"
              v-model="pageSize"
              dense
              dark
              outlined
            ></v-select>
          </div>
          <div class="d-inline-block mr-2 ml-2">
            <small class="white--text">Showing </small>
          </div>
          <div class="d-inline-block">
            <v-text-field
              dark
              :rules="[rules.max, rules.min]"
              :disabled="countPage == 1"
              outlined
              dense
              style="width: 75px;"
              v-model.number="pageInput"
            ></v-text-field>
          </div>
          <div class="d-inline-block mr-2 ml-2">
            <small class="white--text">
              of {{ countPage }} Pages ({{ count }} Items)</small
            >
          </div>
          <div class="d-inline-block">
            <v-pagination
              color="blue-grey"
              :disabled="countPage == 1"
              v-model="page"
              :length="countPage"
              :total-visible="7"
            >
            </v-pagination>
          </div>
        </div>
      </v-layout>
    </v-layout>
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
// import Vue from "vue";
import SnackBar from "./SnackBar";
import axios from "axios";
// to perform a pulling, parent componet need to boardcast 'rebase' event
// once the comopnent is ready, and might trigger 'rebase' everytime needed
export default {
  components: {
    SnackBar,
  },
  props: {
    queryset: {
      required: true,
      type: [Array, Object],
    },
    query: {
      required: true,
      type: Object,
    },
    extra: {
      default: "",
      type: String,
    },
    api: {
      type: String,
    },
    optexpand: {
      default: 1,
    },
    export_query: {
      default: false,
    },
    persistentQuery: {
      default: () => ({}),
      type: Object,
    },
  },
  data() {
    return {
      pageSize: {
        value: 20,
      },
      snackbar: {
        color: "",
        text: "",
        show: false,
      },
      items: [{ value: 20 }, { value: 50 }, { value: 100 }, { value: 200 }],
      count: 0,
      limit: 20,
      next: "",
      page: 1,
      busy: false,
      loading: true,
      pageInput: 1,
      showPageGo: 1,
      offset: 0,
      countPage: 0,
      pageNum: [],
      myQueryset: this.queryset,
      myQuery: "",
      rules: {
        max: (value) =>
          value < this.countPage || `should be < ${this.countPage}.`,
        min: (value) => value >= 1 || `should be > 1.`,
      },
    };
  },
  watch: {
    page(newObj) {
      if (newObj !== this.newObj) {
        this.newObj = newObj;
        this.pageInput = newObj;
        let offset = parseInt(this.limit) * (parseInt(newObj) - 1);
        this.offset = offset;
        this.rebase();
      }
    },
    limit() {
      this.loading = true;
      this.getPage();
      this.rebase();
    },
    pageSize(newObj) {
      this.limit = newObj;
      this.showPageGo = 1;
      this.pageInput = 1;
      this.offset = 0;
    },
    pageInput(newObj) {
      if (newObj <= this.countPage && this.showPageGo !== newObj) {
        this.page = newObj;
      }
    },
  },
  methods: {
    // debounceGo: _.debounce(function() {
    //   this.loading = true
    //   if (this.pageInput > this.countPage) {
    //     this.pageInput = this.countPage
    //   } else if (this.pageInput < 1) {
    //     this.pageInput = 1
    //   }
    //   if (this.pageInput && this.showPageGo !== this.pageInput) {
    //     this.pageGo(this.pageInput)
    //   } else {
    //     this.loading = false
    //   }
    // },
    //     700),
    pageGo(showPageGo = this.showPageGo) {
      if (showPageGo !== this.showPageGo) {
        this.showPageGo = showPageGo;
        this.pageInput = showPageGo;
        let offset = parseInt(this.limit) * (parseInt(showPageGo) - 1);
        this.offset = offset;
        this.rebase();
      }
    },
    nextPage() {
      this.showPageGo = parseInt(this.showPageGo) + 1;
      this.offset = this.limit * (this.showPageGo - 1);
      this.loading = true;
      this.rebase();
    },
    prevPage() {
      this.showPageGo = parseInt(this.showPageGo) - 1;
      this.offset = this.limit * (this.showPageGo - 1);
      this.loading = true;
      this.rebase();
    },
    getPage() {
      this.countPage = Math.ceil(this.count / this.limit);
    },
    rebase() {
      this.next = this.buildUrl(
        this.api,
        `offset=${this.offset}&limit=${this.limit}`
      );
      this.myQueryset = [];
      this.pull();
    },
    pull() {
      this.busy = true;
      this.loading = true;
      axios.get(this.next).then(
        (response) => {
          if (
            response &&
            response.length === 0 &&
            response.data.count &&
            this.showPageGo > 1
          ) {
            this.prevPage();
            return;
          }
          this.count = response.data.count;
          this.getPage();
          this.busy = false;
          this.myQueryset = [];
          this.myQueryset = this.myQueryset.concat(response.data.results);
          this.$emit("query-data", this.myQueryset);
          this.next = response.next;
          this.loading = false;
        },
        () => {
          this.snackbar = {
            color: "error",
            show: true,
            text: "Server Error",
          };
        }
      );
      this.$emit("query-param", this.myQuery);
    },
    buildUrl(api, defaultQuery) {
      const additionalQuery = Object.keys(this.persistentQuery)
        .map((key) => {
          return `${key}=${this.persistentQuery[key]}`;
        })
        .join("&");

      const url = `${api}${defaultQuery ? `?${defaultQuery}` : ""}${
        additionalQuery ? `&${additionalQuery}` : ""
      }`;
      const params = [];
      const query = this.$route.query;

      for (const x in query) {
        if (query[x] === "" || query[x] === undefined) {
          delete query[x];
        }
      }
      this.myQuery = query;
      for (let x in query) {
        params.push(x + "=" + query[x]);
      }
      return params.length
        ? url + (defaultQuery ? "&" : "?") + params.join("&")
        : url;
    },
    getExportQuery() {
      let query = this.query;
      for (let x in query) {
        if (query[x] === "" || query[x] === undefined || !query[x].length) {
          delete query[x];
        }
      }
      let params = [];
      let exportQuery = this.export_query;
      for (let x in query) {
        if (query[x]) {
          params.push(x + "=" + query[x]);
        }
      }
      exportQuery = params.join("&");
      this.$emit("export-query", exportQuery);
    },
    submit() {
      let query = this.query;
      this.offset = 0;
      this.showPageGo = 1;
      let basePath = this.$route.path;
      // let format = "YYYY-MM-DD";
      for (let x in query) {
        if (query[x] === "" || query[x] === undefined) {
          delete query[x];
          // } else if (Vue.moment.isDate(query[x])) {
          //   query[x] = Vue.moment(query[x]).format(format);
        }
        if (query[x] instanceof Array) {
          query[x].forEach(function(value, index, array) {
            if (value) {
              query[x] = `${array}`;
            }
          });
        }
      }
      this.$router.push({ path: basePath, query }).catch(() => {});
    },
  },
  computed: {
    isPageOne() {
      return this.showPageGo === 1;
    },
  },
};
</script>
<style lang="scss">
.v-text-field {
  input {
    color: white;
  }
}
.v-text-field--outlined >>> fieldset {
  border-color: white !important;
}
.v-application .transparent {
  border-color: white !important;
}
</style>
