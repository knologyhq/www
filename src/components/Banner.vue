<template>
  <v-sheet
    class="mb-4 pa-12 elevation-6 banner"
    :style="`background-image: linear-gradient(to bottom, rgba(38,96,147,0.85), rgba(38,96,147,0.577468487394958)), url(${banner.image})`"
  >
    <h1
      v-html="banner.title"
      :class="`white--text font-weight-black text-uppercase mb-4 ${$vuetify.breakpoint.smAndDown ? 'subtitle' : 'display-2'}`"
    />
    <div class="title white--text mb-12" v-html="marked(banner.copy)" />
    <ReadMoreButton v-if="banner.button == true" />
  </v-sheet>
</template>

<style lang="postcss" scoped>
.banner {
  min-height: 380px;
}
</style>

<script>
import ReadMoreButton from "~/components/ReadMoreButton.vue";

export default {
  name: "Banner",
  props: ["banner"],
  components: {
    ReadMoreButton
  }
};
</script>