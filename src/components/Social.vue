<template>
  <v-btn text icon color="secondary" :href="account.profileUrl">
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