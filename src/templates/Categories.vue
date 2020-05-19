
<template>
  <Layout :title="$page.pillars.title">
    <template slot="textBanner">
      <v-responsive
        class="white--text py-12"
        :style="`background: linear-gradient(to right, #266093, #00A2AE)`"
      >
        <v-container>
          <v-row>
            <v-card-text>
              <h1 class="display-2 font-weight-thin mb-4" v-html="$page.pillars.title" />
            </v-card-text>
          </v-row>
        </v-container>
      </v-responsive>
    </template>

    <v-container v-if="$page.pillars.belongsTo.edges[0]">
      <v-row class="mb-6">
        <v-col cols="12" md="8">
          <template v-for="edge in posts.slice(0,postsShown)">
            <PostCardLargeAlt :post="edge.node" :key="edge.node.id" />
          </template>
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
  </Layout>
</template>

<page-query>

query Pillars($id: ID!) {
  pillars(id: $id) {
    title
    belongsTo(filter: {typeName: {eq: Posts}}) { 
      edges {
        node {
          ... on Posts {
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
            id
          }
        }
      }
    }
  }
}

</page-query>

<script>
import Layout from "~/layouts/Default.vue";
import PostCardLargeAlt from "~/components/PostCardLargeAlt.vue";
import Sidebar from "~/components/Sidebar.vue";

export default {
  computed: {
    posts() {
      return this.$page.pillars.belongsTo.edges;
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
  components: {
    Layout,
    PostCardLargeAlt,
    Sidebar
  },
  metaInfo() {
    return {
      title: this.$page.pillars.title
    };
  }
};
</script>
