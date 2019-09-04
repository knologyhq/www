<template>
  <v-card class="mx-auto mb-4" flat tile :to="`/article/${post.slug}`">
    <v-img
      v-if="post.image"
      height="200px"
      :src="`${post.image.url}?auto=compress&w=500&fit=fillmax`"
    />
    <v-card-title class="align-end fill-height px-0">
      <div
        class="category pr-1 grey--text body-2 py-2 overline d-block"
        v-for="category in post.categories"
        :key="category.id"
      >{{ category.title }}</div>
      <div class="black--text font-weight-black subtitle">{{ post.title }}</div>
    </v-card-title>
    <v-card-text v-if="post.authors" class="px-0 pr-1">
      <div class="grey--text subheader font-italic">
        By {{post.authors[1] ? `${post.authors[0].name} et. al` : post.authors[0].name }} •
        {{post.publishDate | moment("MMM D, YYYY") }}
      </div>
    </v-card-text>
  </v-card>
</template>

<style lang="postcss" scoped>
.category + .category:before {
  content: "| ";
}
.subtitle {
  line-height: 1.7rem;
}
</style>

<script>
export default {
  name: "PostCardLarge",
  props: ["post"]
};
</script>