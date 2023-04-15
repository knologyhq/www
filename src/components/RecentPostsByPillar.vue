<template>
  <v-col lg="6" md="12">
    <v-row>
      <v-col>
        <h3 class="subtitle-1 mb-2 font-weight-bold">
          Recent Articles in {{pillar.title}}
          <g-link
            :to="`/category/${pillar.slug}`"
            class="subtitle font-weight-bold black--text float-right"
            style="text-decoration: none"
          >More ></g-link>
        </h3>
        <div class="divider-1">
          <span :style="`background-color: ${pillar.colour.hex}`"></span>
        </div>
      </v-col>
    </v-row>
    <v-row>
      <v-col xs="12" md="6" v-for="post in $static[pillar.slug].edges" :key="post.id">
        <PostCardLarge :post="post.node" />
      </v-col>
    </v-row>
  </v-col>
</template>
<static-query>

query {
  media: allMediaPosts(filter: {recent: {ne: true}}, limit: 2, sortBy: "publishDate", order: DESC ) {
    edges {
      node {
        slug
        authors {
          name
        }
        additionalAuthors
        title
        subtitle
        publishDate
        image {
            url
          }
      }
    }
  }
  wellbeing: allWellbeingPosts(filter: {recent: {ne: true}}, limit: 2, sortBy: "publishDate", order: DESC ) {
    edges {
      node {
        slug
        authors {
          name
        }
        additionalAuthors
        title
        subtitle
        publishDate
        image {
            url
          }
      }
    }
  }
  biosphere: allBiospherePosts(filter: {recent: {ne: true}}, limit: 2, sortBy: "publishDate", order: DESC ) {
    edges {
      node {
        slug
        authors {
          name
        }
        additionalAuthors
        title
        subtitle
        publishDate
        image {
            url
          }
      }
    }
  }
  culture: allCulturePosts(filter: {recent: {ne: true}}, limit: 2, sortBy: "publishDate", order: DESC ) {
    edges {
      node {
        slug
        authors {
          name
        }
        additionalAuthors
        title
        subtitle
        publishDate
        image {
            url
          }
      }
    }
  }
  behaviors: allProcessPosts(filter: {recent: {ne: true}}, limit: 2, sortBy: "publishDate", order: DESC ) {
    edges {
      node {
        slug
        authors {
          name
        }
        additionalAuthors
        title
        subtitle
        publishDate
        image {
            url
          }
      }
    }
  }
  systems: allSystemsPosts(filter: {recent: {ne: true}}, limit: 2, sortBy: "publishDate", order: DESC ) {
    edges {
      node {
        slug
        authors {
          name
        }
        additionalAuthors
        title
        subtitle
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
.divider-1 {
  border-bottom: 1px solid #fff;
  background-color: #ddd;
  height: 2px;
  span {
    display: block;
    width: 80px;
    height: 8px;
    position: relative;
    top: -8px;
    border-radius: 4px;
    background-color: var(--color);
  }
}
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