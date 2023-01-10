<template>
  <div>
    <div class="title font-weight-black black--text mb-2">Subscribe to our Newsletter</div>
    <div class="divider mb-4">
      <span />
    </div>
    <SubscribeFormInline />
    <div class="title font-weight-black black--text mb-2 mt-4">Featured New Bites</div>
    <div class="divider mb-4">
      <span />
    </div>
    <PostCardSmall
      :post="post"
      v-for="post in $static.sidebarPosts.edges[0].node.featuredPosts"
      :key="post.id"
    />
  </div>
</template>

<static-query>
query  {
  sidebarPosts: allSidebar(order: DESC, sortBy: "publishDate") {
    edges {
      node {
        featuredPosts {
          title
          subtitle
          publishDate
          slug
          image {
            url
          }
          imageThumb {
            url
          }
          authors {
            name
          }
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
