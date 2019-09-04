<template>
  <Layout>
    <template slot="textBanner">
      <v-responsive
        class="white--text py-12"
        :style="`background: linear-gradient(to right, #266093, #00A2AE)`"
      >
        <v-container>
          <v-row>
            <v-card-text>
              <h1 class="display-2 font-weight-thin mb-4">Articles Archive</h1>
            </v-card-text>
          </v-row>
        </v-container>
      </v-responsive>
    </template>

    <v-container>
      <v-row>
        <v-col cols="8">
          <v-row>
            <v-col id="featured-posts" cols="12">
              <PostCardLarge :post="post.node" v-for="post in $page.allPosts.edges" :key="post.id" />
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="4">
          <Sidebar />
        </v-col>
      </v-row>
    </v-container>

    <!-- <template slot="cta">
      <Cta :cta="$page.allCommunity.edges[0].node.cta" />
    </template>-->
  </Layout>
</template>



<!-- pagination allPosts(filter: {postType: {title: {eq: "Article"}}}, order: DESC, sortBy: "publishDate", perPage: 4, limit: 8, page: $page) @paginate {
  -->

<page-query>
query Dato {
 allPosts(filter: {postType: {title: {eq: "Article"}}}, order: DESC, sortBy: "publishDate") {
    pageInfo {
      totalPages
      currentPage
    }
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

</page-query>
<script>
import Cta from "~/components/Cta.vue";
import PostCardLarge from "~/components/PostCardLarge.vue";
import Sidebar from "~/components/Sidebar.vue";
import { Pager } from "gridsome";

export default {
  metaInfo: {
    title: "Knology Home"
  },
  components: {
    Cta,
    Pager,
    PostCardLarge,
    Sidebar
  }
};
</script>
<style lang="postcss">
.banner {
  background-size: cover;
}
</style>
