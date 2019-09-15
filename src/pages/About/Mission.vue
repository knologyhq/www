<template>
  <Layout>
    <v-container>
      <Banner
        :banner="{ image: $page.about.edges[0].node.bannerImage.url, title: $page.about.edges[0].node.title, copy: $page.about.edges[0].node.bannerCopy, button: $page.about.edges[0].node.readMoreButton }"
      />

      <v-row>
        <v-col cols="12" id="main" v-html="marked($page.about.edges[0].node.introCopy)" />
      </v-row>
      <v-row>
        <v-col cols="12" id="main" class="body" v-html="marked($page.about.edges[0].node.body)" />
      </v-row>
    </v-container>
    <template slot="cta">
      <Cta :cta="$page.about.edges[0].node.cta" />
    </template>
  </Layout>
</template>
<page-query>

{
  about: allAbout(filter: {title: {eq: "Mission & Vision"}}) {
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
  mounted() {
    console.log(this.$vuetify.breakpoint);
  },

  components: {
    Cta,
    Banner
  }
};
</script>
<style lang="postcss">
.body {
  columns: 2;

  @media (--tablet), (--desktop) {
    columns: 2 auto;
    orphans: 3;
  }
}
.banner {
  background-size: cover;
}
</style>