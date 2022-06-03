<template>
  <Layout>
    <v-container>
      <Banner
        :banner="{ image: $page.about.edges[0].node.bannerImage.url, title: $page.about.edges[0].node.title, copy: $page.about.edges[0].node.bannerCopy, button: $page.about.edges[0].node.readMoreButton }"
      />

      <v-row cols="6">
        <v-col id="main" class="body" v-html="marked($page.about.edges[0].node.body)" />
      </v-row>
    </v-container>
    <template slot="cta">
      <Cta :cta="$page.about.edges[0].node.cta" />
    </template>
  </Layout>
</template>
<page-query>

{
  about: allAbout(filter: {title: {eq: "Diversity, Equity, Access, & Inclusion"}}) {
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
  columns: 1;

  @media (--tablet), (--desktop) {
    columns: 2 auto;
    orphans: 3;
  }
}
.banner {
  background-size: cover;
}
</style>