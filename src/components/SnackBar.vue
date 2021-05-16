<template>
  <v-snackbar
    v-model="showSnackBar"
    :bottom="snackbar.y === 'bottom'"
    :color="color"
    :left="snackbar.x === 'left'"
    :multi-line="snackbar.mode === 'multi-line'"
    :right="snackbar.x === 'right'"
    :timeout="snackbar.timeout"
    :top="snackbar.y === 'top'"
    :vertical="snackbar.mode === 'vertical'"
  >
    {{ text }}
  </v-snackbar>
</template>
<script>
export default {
  props: {
    text: {
      type: String,
    },
    color: {
      type: String,
    },
    show: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      snackbar: {
        mode: "",
        timeout: 3000,
        x: null,
        y: "top",
      },
      showSnackBar: this.show,
    };
  },
  watch: {
    show(newObj) {
      this.showSnackBar = newObj;
    },
  },
};
</script>
