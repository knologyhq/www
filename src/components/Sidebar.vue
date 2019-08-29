<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <SubscribeFormInline />
      </v-col>
    </v-row>
    <v-row id="featured-new-bites">
      <v-container>
        <h4 class="subtitle">Featured New Bites</h4>
        <PostCardSmall
          :post="post.node"
          v-for="post in $static.newposts.edges"
          :key="post.node.id"
        />
      </v-container>
    </v-row>
    <div id="tags"></div>
  </v-container>
</template>

<static-query>
query  {
  newposts: allPosts(limit: 4, order: DESC, sortBy: "publishDate") {
      edges {
        node {
          slug
          title
          publishDate
          categories {
            title
          }
          authors {
            name
          }
          image {
            url
          }
        }
      }
    }
}

</static-query>

<script>
import PostCardSmall from "~/components/PostCardSmall.vue";
import SubscribeFormInline from "~/components/SubscribeFormInline.vue";

export default {
  components: { PostCardSmall, SubscribeFormInline }
};
</script>
