<template>
  <v-avatar class="profile mr-3" size="52" tile>
    <div class="social-icon" v-html="account.icon" />
  </v-avatar>
</template>

<style lang="postcss">
</style>

<script>
export default {
  name: "Social",
  props: ["account"]
};
</script>