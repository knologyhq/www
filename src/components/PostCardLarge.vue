<template>
  <v-card class="mx-auto" flat tile :to="`/article/${post.slug}`">
    <v-img height="200px" :src="`${post.image.url}?auto=compress&w=500&fit=fillmax`" />
    <v-card-title class="align-end fill-height title">
      <span
        class="category pr-1 grey--text subtitle-1"
        v-for="category in post.categories"
        :key="category.id"
      >{{ category.title }}</span>
      <div>{{ post.title }}</div>
    </v-card-title>
    <v-card-text v-if="post.authors">
      <div class="pr-1 grey--text subtitle-1">By {{post.authors[0].name}} • {{post.publishDate}}</div>
    </v-card-text>
  </v-card>
</template>

<style lang="postcss">
.category + .category:before {
  content: "| ";
}
</style>

<script>
export default {
  name: "PostCardLarge",
  props: ["post"]
};
</script>