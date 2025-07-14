<template>
  <v-card :class="`mx-auto mb-8 ${postClasses}`" flat tile :to="`/article/${post.slug}`">
    <v-img
      v-if="post.imageThumb"
      height="200px"
      :src="`${post.imageThumb.url}?auto=compress&w=500&fit=fillmax`"
    />
    <v-img
      v-else="post.image"
      height="200px"
      :src="`${post.image.url}?auto=compress&w=500&fit=fillmax`"
    />
    <v-card-title class="pa-0 mb-0 mt-2">
      <div class="black--text font-weight-black subtitle mb-2">{{ post.title }}</div>
      <p v-if="post.subtitle" color="grey" class="darken-1 body-1 mb-2">{{ post.subtitle }}</p>
    </v-card-title>
  </v-card>
</template>

<style lang="postcss" scoped>
.subtitle {
  line-height: 1.7rem;
  margin-top: 1rem;
}
</style>

<script>
export default {
  name: "PostCardLargeNoDate",
  props: ["post", "postClasses"]
};
</script>

