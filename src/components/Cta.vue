<template>
  <v-card
    tile
    class="white--text py-12 text-align-center"
    :style="`background: linear-gradient(to right, ${cta.colour.hex ? cta.colour.hex : '#266093' }, ${cta.colour2.hex ? cta.colour2.hex : '#00A2AE'})`"
  >
    <v-container fluid class="pa-0 ma-0" fill-height>
      <v-row justify-center align-self="center">
        <v-col cols="12" md="3" align-self="center">
          <LogoSmall />
        </v-col>
        <v-col cols="12" md="7" align-self="center" class="text-xs-center">
          <div class="display-2 font-weight-thin mb-0 mx-4" v-html="cta.body" />
        </v-col>
        <v-col cols="12" md="2" align-self="center">
          <v-btn x-large color="white" v-html="cta.buttonText" :href="cta.buttonLink" class="mx-4" />
        </v-col>
      </v-row>
    </v-container>
  </v-card>
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