<template>
  <Layout>
    <v-container>
      <Banner
        :banner="{ image: $page.about.edges[0].node.bannerImage.url, title: $page.about.edges[0].node.title, copy: $page.about.edges[0].node.bannerCopy, button: $page.about.edges[0].node.readMoreButton }"
      />

      <v-row>
        <v-col
          cols="12"
          md="8"
          id="main"
          class="body"
          v-html="marked($page.about.edges[0].node.body)"
        />
      </v-row>

      <v-row class="mb-6">
        <v-col
          id="reports"
          cols="12"
          md="6"
          lg="3"
          v-for="post in $page.reports.edges"
          :key="post.id"
        >
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
        readMoreButton
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
  reports: allPosts(filter: {postType: {id: {eq: "1367706"}}},sortBy: "publishDate", order: DESC) {
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
import Banner from "~/components/Banner.vue";



export default {
  components: {
    Cta,
    PostCardLarge,
    Banner
  },

  metaInfo() {
    return {
      title:this.$page.about.edges[0].node.title,
      meta: [
        { name: "author", content: "Knology" },
        { name: "description", content:this.$page.about.edges[0].node.bannerCopy},
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:site", content: "@KnologyResearch" },
        { name: "twitter:title", content: this.$page.about.edges[0].node.title },
        {
          name: "twitter:description",
          content:
            this.$page.about.edges[0].node.bannerCopy
        },
        {
          name: "twitter:image",
          content: this.$page.about.edges[0].node.bannerImage.url
        }
      ]
    };

  }

};
</script>
<style lang="postcss" scoped>
.banner {
  background-size: cover;
}
</style>