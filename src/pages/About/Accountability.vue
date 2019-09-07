<template>
  <Layout>
    <v-container>
      <v-card
        flat
        class="mb-4 banner"
        :style="`background-image: url(${$page.about.edges[0].node.bannerImage.url})`"
        height="300"
      >
        <v-card-text>
          <div class="title" v-html="marked($page.about.edges[0].node.bannerCopy)" />
          <ReadMoreButton />
        </v-card-text>
      </v-card>

      <h1>{{ $page.about.edges[0].node.title }}</h1>

      <v-row>
        <v-col
          cols="12"
          md="8"
          id="main"
          class="body"
          v-html="marked($page.about.edges[0].node.body)"
        />
      </v-row>

      <h3 class="subtitle-1">Annual Reports</h3>
      <v-row class="mb-6">
        <v-col id="reports" cols="3" v-for="post in $page.reports.edges" :key="post.id">
          <PostCardLarge :post="post.node" />
        </v-col>
      </v-row>
    </v-container>
    <template slot="cta">
      <Cta :cta="$page.about.edges[0].node.cta" />
    </template>
  </Layout>
</template>
<page-query>

{
  about: allAbout(filter: {id: {eq: "1407758"}}) {
    edges {
      node {
        bannerCopy
        bannerImage {
          url
        }
        body
        id
        introCopy
        slug
        title
        cta {
          buttonLink
          buttonText
          class
          body
          colour2 {
            hex
          }
          colour {
            hex
          }    
        }
      }
    }
  }
  reports: allPosts(filter: {postType: {id: {eq: "1367706"}}},sortBy: "publishDate", order: ASC) {
      edges {
        node {
          slug
          title
          publishDate
          postType {
            title
          }
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
import ReadMoreButton from "~/components/ReadMoreButton.vue";

export default {
  components: {
    Cta,
    PostCardLarge,
    ReadMoreButton
  }
};
</script>
<style lang="postcss" scoped>
.banner {
  background-size: cover;
}
</style>