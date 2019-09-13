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
              <h1 class="display-2 white--text font-weight-black text-uppercase mb-4">All Articles</h1>
            </v-card-text>
          </v-row>
        </v-container>
      </v-responsive>
    </template>

    <v-container>
      <v-row>
        <v-col cols="12" md="8">
          <v-row>
            <v-col
              id="featured-posts"
              cols="12"
              v-for="post in posts.slice(0,postsShown)"
              :key="post.id"
            >
              <PostCardLargeAlt :post="post.node" />
            </v-col>
          </v-row>

          <div class="text-center">
            <v-btn
              class="ma-2"
              outlined
              color="indigo"
              v-if="posts.length > 4 && postsShown < posts.length"
              @click="loadMore"
            >Load more posts</v-btn>
          </div>
        </v-col>
        <v-col cols="12" md="4">
          <Sidebar />
        </v-col>
      </v-row>
    </v-container>

    <!-- <template slot="cta">
      <Cta :cta="$page.allCommunity.edges[0].node.cta" />
    </template>-->
  </Layout>
</template>




<page-query>
query posts {

  allPosts(filter: {postType: {title: {eq: "Article"}}}, order: DESC, sortBy: "publishDate") {

    edges {
      node {
        slug
        title
        subtitle
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
import PostCardLargeAlt from "~/components/PostCardLargeAlt.vue";
import Sidebar from "~/components/Sidebar.vue";
import { Pager } from "gridsome";

export default {
  computed: {
    posts() {
      return this.$page.allPosts.edges;
    }
  },
  data() {
    return {
      postsShown: 4
    };
  },
  methods: {
    loadMore() {
      this.postsShown *= 2;
    }
  },
  metaInfo: {
    title: "Knology Home"
  },
  components: {
    Cta,
    Pager,
    PostCardLargeAlt,
    Sidebar
  }
};
</script>
<style lang="postcss">
.banner {
  background-size: cover;
}
</style>
