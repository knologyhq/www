<template>
  <v-responsive
    class="white--text py-12"
    :style="`background: linear-gradient(to right, ${cta.colour.hex ? cta.colour.hex : '#266093' }, ${cta.colour2.hex ? cta.colour2.hex : '#00A2AE'})`"
  >
    <LogoSmall />
    <v-card-text>
      <h1 class="display-2 font-weight-thin mb-4" v-html="cta.body" />
      <v-btn x-large color="white" v-html="cta.buttonText" :to="cta.buttonLink" />
    </v-card-text>
  </v-responsive>
</template>

<style lang="postcss">
</style>

<script>
import LogoSmall from "~/components/LogoSmall.vue";

export default {
  name: "Cta",
  props: ["cta"],
  components: { LogoSmall }
};
</script>