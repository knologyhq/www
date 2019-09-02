<template>
  <v-card class="mx-auto mb-1" flat tile :to="`/article/${post.slug}`">
    <v-list-item three-line>
      <v-list-item-content>
        <div class="overline mb-4">
          <span
            class="category overline pr-1 grey--text subtitle-1"
            v-for="category in post.categories"
            :key="category.id"
          >{{ category.title }}</span>
        </div>
        <v-list-item-title class="headline mb-1">{{ post.title }}</v-list-item-title>

        <v-list-item-subtitle class="pr-1 grey--text subheader">
          By {{post.authors[1] ? `${post.authors[0].name} et. al` : post.authors[0].name }} •
          {{post.publishDate | moment("MMM D, YYYY") }}
        </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>
  </v-card>
</template>

<style lang="postcss">
</style>

<script>
export default {
  name: "PostCardMedium",
  props: ["post"]
};
</script>