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
      <div v-if="post.authors[0]" class="px-0 pr-1">
        <div class="grey--text body-1 font-italic">
          By {{post.authors[1] ? `${post.authors[0].name} et al.` : post.authors[0].name }} •
          {{post.publishDate | moment("MMM D, YYYY") }}
        </div>
      </div>
      <div v-else-if="post.additionalAuthors[0]" class="px-0 pr-1">
        <div class="grey--text body-1 font-italic">
          By {{post.additionalAuthors[1] ? `${post.additionalAuthors[0]} et al.` : post.additionalAuthors[0] }} •
          {{post.publishDate | moment("MMM D, YYYY") }}
        </div>
      </div>
      <div v-else class="px-0 pr-1">
        <div class="grey--text body-1 font-italic">
          {{post.publishDate | moment("MMM D, YYYY") }}
        </div>
      </div>
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
  name: "PostCardLarge",
  props: ["post", "postClasses"]
};
</script>

