<template>
  <v-card flat tile :to="`/article/${post.slug}`">
    <v-list-item three-line>
      <v-avatar v-if="post.imageThumb" class="profile shrink mr-3 pa-0" color="grey" size="80" tile>
        <v-img tile :src="`${post.imageThumb.url}?auto=compress&w=80&h=80&fit=crop`" />
      </v-avatar>
      <v-avatar v-else-if="post.image" class="profile shrink mr-3 pa-0" color="grey" size="80" tile>
        <v-img tile :src="`${post.image.url}?auto=compress&w=80&h=80&fit=crop`" />
      </v-avatar>
      <v-avatar v-else class="profile shrink mr-3 pa-0" color="#00A2AE" size="80" tile />

      <v-list-item-content>
        <div class="black--text font-weight-bold subtitle mb-1">
          {{ post.altTitle || post.title }}
        </div>

        <v-card-text v-if="post.authors[0]" class="px-0 pr-1">
          <div
            class="grey--text subheader font-italic"
          >By {{post.authors[1] ? `${post.authors[0].name} et al.` : post.authors[0].name }}</div>
        </v-card-text>
        <v-card-text v-else-if="post.additionalAuthors[0]" class="px-0 pr-1">
          <div
            class="grey--text subheader font-italic"
          >By {{post.additionalAuthors[1] ? `${post.additionalAuthors[0]} et al.` : post.additionalAuthors[0] }}</div>
        </v-card-text>
      </v-list-item-content>
    </v-list-item>
  </v-card>
</template>

<style lang="postcss" scoped>
.subtitle {
  line-height: 1.5rem;
}

.v-card__text {
padding-top:5px!important;
  
}

</style>


<script>
export default {
  name: "PostCardSmall",
  props: ["post"]
};
</script>

