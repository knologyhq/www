<template>
  <div>
    <div class="title font-weight-black black--text mb-2">Subscribe to our Newsletter</div>
    <v-divider class="mb-2" />
    <SubscribeFormInline />
    <div class="title font-weight-black black--text mb-2 mt-4">Featured New Bites</div>
    <v-divider></v-divider>
    <PostCardSmall :post="post.node" v-for="post in $static.newposts.edges" :key="post.node.id" />
  </div>
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
