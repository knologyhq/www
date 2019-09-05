
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
        <v-col cols="8">
          <template v-for="edge in $page.pillars.belongsTo.edges">
            <PostCardLarge :post="edge.node" :key="edge.node.id" />
          </template>
        </v-col>
        <v-col cols="4">
          <Sidebar />
        </v-col>
      </v-row>
    </v-container>
  </Layout>
</template>

<page-query>

query Pillars($id: String!) {
  pillars(id: $id) {
    title
    belongsTo(filter: {typeName: {eq: Posts}}) { 
      edges {
        node {
          ... on Posts {
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
import PostCardLarge from "~/components/PostCardLarge.vue";
import Sidebar from "~/components/Sidebar.vue";

export default {
  components: {
    Layout,
    PostCardLarge,
    Sidebar
  },
  metaInfo() {
    return {
      title: this.$page.pillars.title
    };
  }
};
</script>
