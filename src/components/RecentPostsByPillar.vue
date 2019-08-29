<template>
  <v-container>
    <v-row>
      <v-col>
        <h3 v-html="`Recent Posts in ${pillar.title}`" class="subtitle-1" />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-row>
          <v-col xs="12" md="6" v-for="post in $static[pillar.slug].edges" :key="post.id">
            <PostCardLarge :post="post.node" />
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>
<static-query>

query {
  media: allMediaPosts(limit: 2, sortBy: "publishDate", order: DESC ) {
    edges {
      node {
        slug
        authors {
          name
        }
        title
        publishDate
        image {
            url
          }
      }
    }
  }
  wellness: allWellnessPosts(limit: 2, sortBy: "publishDate", order: DESC ) {
    edges {
      node {
        slug
        authors {
          name
        }
        title
        publishDate
        image {
            url
          }
      }
    }
  }
  biosphere: allBiospherePosts(limit: 2, sortBy: "publishDate", order: DESC ) {
    edges {
      node {
        slug
        authors {
          name
        }
        title
        publishDate
        image {
            url
          }
      }
    }
  }
  culture: allCulturePosts(limit: 2, sortBy: "publishDate", order: DESC ) {
    edges {
      node {
        slug
        authors {
          name
        }
        title
        publishDate
        image {
            url
          }
      }
    }
  }
  processes: allProcessPosts(limit: 2, sortBy: "publishDate", order: DESC ) {
    edges {
      node {
        slug
        authors {
          name
        }
        title
        publishDate
        image {
            url
          }
      }
    }
  }
  systems: allSystemsPosts(limit: 2, sortBy: "publishDate", order: DESC ) {
    edges {
      node {
        slug
        authors {
          name
        }
        title
        publishDate
        image {
            url
          }
      }
    }
  }
}
</static-query>

<style lang="postcss">
</style>

<script>
import PostCardLarge from "~/components/PostCardLarge.vue";

export default {
  name: "RecentPostsByPillar",
  props: ["pillar"],
  components: {
    PostCardLarge
  }
};
</script>