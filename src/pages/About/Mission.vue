<template>
  <Layout>
    <v-container>
      <Banner
        :banner="{ image: $page.about.edges[0].node.bannerImage.url, title: $page.about.edges[0].node.title, copy: $page.about.edges[0].node.bannerCopy, button: $page.about.edges[0].node.readMoreButton }"
      />

      <v-row justify="center">
        <v-col cols="12" md="8" lg="8" id="main" v-html="marked($page.about.edges[0].node.introCopy)" />
      </v-row>
      <v-row justify="center">
        <v-col cols="12" md="8" lg="8" class="body" v-html="marked($page.about.edges[0].node.body)" />
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
  mounted() {
    console.log(this.$vuetify.breakpoint);
  },
  metaInfo() {
    return {
      title:this.$page.about.edges[0].node.title,
      meta: [
        { name: "author", content: "Knology" },
        { name: "description", content: "Knology is a collective of scientists, writers, and educators dedicated to studying and untangling complex social issues. Equity, transparency, and deliberation are the foundation of our work process. We recognize that no issue exists in isolation from its social and environmental context. Our research is embedded in real-world application to develop practical approaches to thorny problems. We are committed to serving the public good by sharing our data and clearly reporting our results."},
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:site", content: "@KnologyResearch" },
        { name: "twitter:title", content: this.$page.about.edges[0].node.title },
        {
          name: "twitter:description",
          content:
           "Knology is a collective of scientists, writers, and educators dedicated to studying and untangling complex social issues. Equity, transparency, and deliberation are the foundation of our work process. We recognize that no issue exists in isolation from its social and environmental context. Our research is embedded in real-world application to develop practical approaches to thorny problems. We are committed to serving the public good by sharing our data and clearly reporting our results."
        },
        {
          name: "twitter:image",
          content: this.$page.about.edges[0].node.bannerImage.url
        }
      ]
    };

  },
  components: {
    Cta,
    Banner
  }
};
</script>
<style lang="postcss">
.body {
  max-width: 800px;
  margin: 0 auto;
}
.banner {
  background-size: cover;
  background-position-y: center;
}
</style>