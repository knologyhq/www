<template>
  <v-form ref="form">
    <v-text-field label="Subscribe to our newsletter" color="primary">
      <template v-slot:append>
        <v-btn depressed tile color="primary" class="ma-0">Subscribe</v-btn>
      </template>
    </v-text-field>
  </v-form>
</template>

<style lang="postcss">
</style>

<script>
export default {
  name: "SubscribeInlineForm"
};
</script>