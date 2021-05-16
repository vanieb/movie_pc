<template>
  <v-container>
    <v-layout class="justify-center">
      <h1 class="white--text">OFFICES</h1>
    </v-layout>
    <br />
    <v-row>
      <v-col cols="6" sm="8">
        <v-img src="../assets/images/c1.png" contain></v-img>
      </v-col>
      <v-col cols="6" sm="4">
        <v-container fill-height>
          <v-card color="#032636">
            <v-layout align-center justify-center>
              <v-card-text class="justify-center align-center">
                <v-row>
                  <v-col cols="12" sm="2">
                    <v-img
                      src="../assets/images/cl1.png"
                      height="20"
                      contain
                    ></v-img>
                  </v-col>
                  <v-col cols="12" sm="10">
                    <span class="white--text">Call: ：020-400-400-40</span>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" sm="2">
                    <v-img
                      src="../assets/images/cl2.png"
                      height="20"
                      contain
                    ></v-img>
                  </v-col>
                  <v-col cols="12" sm="10">
                    <span class="white--text">Email：1234567@163.com</span>
                  </v-col>
                </v-row>
                <v-row>
                  <v-col cols="12" sm="2">
                    <v-img
                      src="../assets/images/cl3.png"
                      height="25"
                      contain
                    ></v-img>
                  </v-col>
                  <v-col cols="12" sm="10">
                    <span class="white--text"
                      >WhatsApp：上海市XXXX区XXX街道XXX号F</span
                    >
                  </v-col>
                </v-row>
              </v-card-text>
            </v-layout>
          </v-card>
        </v-container>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  name: "Contact",
  components: {},
  data() {
    return {};
  },
};
</script>
<style scoped lang="scss"></style>
