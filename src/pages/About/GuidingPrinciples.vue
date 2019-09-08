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
import ReadMoreButton from "~/components/ReadMoreButton.vue";

export default {
  components: {
    Cta,
    ReadMoreButton
  }
};
</script>
<style lang="postcss" scoped>
.body {
  columns: 2 auto;
  orphans: 3;
}
.banner {
  background-size: cover;
}
</style>