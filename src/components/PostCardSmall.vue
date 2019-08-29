<template>
  <v-row>
    <v-col cols="12" class="py-0 my-2">
      <v-card flat tile :to="`/article/${post.slug}`">
        <v-list-item three-line>
          <v-avatar class="profile shrink mr-3" color="grey" size="80" tile>
            <v-img tile :src="`${post.image.url}?auto=compress&w=80&h=80&fit=crop`" />
          </v-avatar>

          <v-list-item-content>
            <v-list-item-title class="subtitle mb-1" v-html="post.title" />
            <v-list-item-subtitle v-if="post.authors">
              <div class="pr-1 grey--text subtitle-1">By {{post.authors[0].name}}</div>
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-card>
    </v-col>
  </v-row>
</template>

<style lang="postcss">
</style>

<script>
export default {
  name: "PostCardSmall",
  props: ["post"]
};
</script>

