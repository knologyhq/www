<template>
  <v-btn text icon color="deep-orange" :href="account.profileUrl">
    <v-icon v-html="`mdi-${account.platform}`" />
  </v-btn>
</template>

<style lang="postcss">
</style>

<script>
export default {
  name: "Social",
  props: ["account"]
};
</script>