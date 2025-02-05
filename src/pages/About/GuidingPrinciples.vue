<template>
  <Layout>
    <v-container>
      <Banner
        :banner="{ image: $page.about.edges[0].node.bannerImage.url, title: $page.about.edges[0].node.title, copy: $page.about.edges[0].node.bannerCopy, button: $page.about.edges[0].node.readMoreButton }"
      />

      <v-row justify="center">
        <v-col cols="12" md="12" lg="8" id="main" class="body" v-html="marked($page.about.edges[0].node.body)" />
      </v-row>
    </v-container>

    <!-- Footer Section -->
    <v-container v-if="$page.about.edges[0].node.footer" class="footer">
      <v-row justify="center">
        <v-col cols="12">
          <p v-html="marked($page.about.edges[0].node.footer)"></p>
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
  about: allAbout(filter: {title: {eq: "Guiding Principles"}}) {
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
        footer
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
}
</page-query>
<script>
import Cta from "~/components/Cta.vue";
import Banner from "~/components/Banner.vue";

export default {
  components: {
    Cta,
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
.body {
  max-width: 800px;
  margin: 0 auto;
}
.banner {
  background-size: cover;
  background-position-y: center;
}
.body {
  margin-top: 2em;
}
</style>