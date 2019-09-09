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
        <v-col
          cols="12"
          md="8"
          id="main"
          class="body"
          v-html="marked($page.about.edges[0].node.body)"
        />
      </v-row>

      <v-row>
        <v-col
          v-for="pillar in $page.pillars.edges"
          :key="pillar.node.id"
          cols="12"
          md="6"
          class="pillar"
        >
          <div v-html="pillar.node.svgIcon" />
          <h3 class="subtitle">{{ pillar.node.title }}</h3>
          <div v-html="marked(pillar.node.description)" />
          <v-btn
            :color="`${pillar.node.colour ? pillar.node.colour.hex : 'orange' }`"
            :to="`/category/${pillar.node.slug}`"
            class="white--text"
          >Read More →</v-btn>
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
  about: allAbout(filter: {title: {eq: "Our Approach"}}) {
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
  pillars: allPillars(sortBy: "position", order: ASC) {
      edges {
        node {
          title
          slug
          description
          svgIcon
          colour {
            hex
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
  }
};
</script>
<style lang="postcss" scoped>
.banner {
  background-size: cover;
}
</style>