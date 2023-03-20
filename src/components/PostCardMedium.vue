<template>
  <v-card class="mx-auto mb-2" flat tile :to="`/article/${post.slug}`">
    <span
      class="category pr-1 grey--text body-2 py-2 overline"
      v-for="category in post.categories"
      :key="category.id"
    >{{ category.title }}</span>
    <v-card-title class="fill-height pa-0 my-2">
      <div class="black--text d-block font-weight-black title">{{ post.title }}</div>
      <p
        v-if="post.subtitle"
        color="grey"
        class="darken-1 body-1 my-2"
      >{{ post.subtitle }}</p>
    </v-card-title>
    <v-card-text v-if="post.authors[0]" class="px-0 pr-1">
      <div class="grey--text subheader font-italic">
        By {{post.authors[1] ? `${post.authors[0].name} et al.` : post.authors[0].name }} •
        {{post.publishDate | moment("MMM D, YYYY") }}
      </div>
    </v-card-text>
    <v-card-text v-else-if="post.additionalAuthors[0]" class="px-0 pr-1">
      <div class="grey--text subheader font-italic">
        By {{post.additionalAuthors[1] ? `${post.additionalAuthors[0]} et al.` : post.additionalAuthors[0] }} •
        {{post.publishDate | moment("MMM D, YYYY") }}
      </div>
    </v-card-text>
    <v-card-text v-else class="px-0 pr-1">
      <div class="grey--text subheader font-italic">
        {{post.publishDate | moment("MMM D, YYYY") }}
      </div>
    </v-card-text>
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
  name: "PostCardMedium",
  props: ["post"]
};
</script>