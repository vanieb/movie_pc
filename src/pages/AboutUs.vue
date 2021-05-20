<template>
  <v-container>
    <v-layout>
      <div
        align="justify"
        class="white--text"
        style="font-style: SourceHanSansCN-Regular !important;"
      >
        <p style="text-indent: 30pt;">
          Budd Rogers Releasing Corporation was founded in 1949 as Rogers &
          Unger, by Budd Rogers, a motion picture executive for 51 years, who
          was better known as executive vice president of Embassy Pictures
          Corporation and president of the Pathe - America Distributing Company
          Inc. in the 50s.
        </p>
        <p style="text-indent: 30pt;">
          During the 50s, Budd Rogers Releasing Corporation had released several
          movies including The Dark Mirror, Magic Town, A Double Life, Secret
          Beyond the Door and Mr. Peabody and the Mermaid.
        </p>
        <p style="text-indent: 30pt;">
          In 1962, Budd Rogers organized the Ultra Pictures Corporation and Budd
          Rogers Releasing Corporation was then merged into Melange Pictuures,
          subsidiary of Paramount Pictures, who was later merged into ViacomCBS
          group.
        </p>
        <p style="text-indent: 30pt;">
          From 1994, Budd Rogers Releasing Corporation reformed its business
          into investmment. That strategic impulse is a common thread among the
          transformation in the film industry. in late 20th century.
        </p>
        <p style="text-indent: 30pt;">
          Budd Rogers Releasing Corporation has till now invested in 23 movies,
          among which is life of Pi and Mission: Impossible are on top of the
          highest-grossing films. With average Return of investment of 37%, Budd
          Rogers releasing Corporation is still now one of the most
          transformative company in the film industry.
        </p>
      </div>
    </v-layout>
    <br />
    <v-row>
      <v-col cols="6" sm="3" v-for="(i, index) in images" :key="index">
        <v-img :src="require(`../assets/images/a${i.id}.jpg`)"> </v-img>
        <p class="p1 white--text text-center align-center">{{ i.name }}</p>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  name: "About",
  components: {},
  data() {
    return {
      images: [
        {
          id: 1,
          name: "Budd Rogers",
        },
        {
          id: 2,
          name: "Titanic (1997)",
        },
        {
          id: 3,
          name: "Mission: Impossible (1996)",
        },
        {
          id: 4,
          name: "Irrfan Khan of Life of Pi (2012)",
        },
      ],
    };
  },
};
</script>
<style scoped lang="scss">
.v-image__image,
.v-image__placeholder {
  width: 24px !important;
}
.p1 {
  background: #000000;
  opacity: 0.6;
  vertical-align: middle;
  padding: 20px;
}
</style>
