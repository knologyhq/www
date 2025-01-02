<template>
  <v-card
    class="mx-auto mb-2"
    flat
    tile
    tag="a"
    :href="post.url"
    target="_blank"
    rel="noopener noreferrer"
  >
    <v-card-title class="fill-height pa-0 my-2">
      <div class="black--text d-block font-weight-black title">{{ post.title }}</div>
      <p
        v-if="post.subtitle"
        color="grey"
        class="darken-1 body-1 my-2"
      >{{ post.subtitle }}</p>
    </v-card-title>
  </v-card>
</template>

<style lang="postcss" scoped>
.category + .category:before {
  content: " | ";
}
.title {
  line-height: 1.4rem;
}
</style>
<script>
export default {
  name: "LinkCardMedium",
  props: ["post"]
};
</script>
