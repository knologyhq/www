<template>
  <Layout>
    <v-container>
      <Banner
        :banner="{ image: $page.about.edges[0].node.bannerImage.url, title: $page.about.edges[0].node.title, copy: $page.about.edges[0].node.bannerCopy, button: $page.about.edges[0].node.readMoreButton }"
      />

      <v-row v-if="$page.about.edges[0].node.body">
        <v-col
          cols="12"
          md="8"
          id="main"
          class="body"
          v-html="marked($page.about.edges[0].node.body)"
        />
      </v-row>

      <v-card
        tile
        flat
        v-for="(milestone, index) in $page.milestones.edges"
        :key="milestone.node.id"
        class="my-12"
      >
        <v-row class="ml-0 pl-0">
          <v-col size="200" tile class="col-sm-3 col-md-4 ml-0 pl-0">
            <v-img :src="`${milestone.node.image.url}?auto=compress&w=500&fit=fillmax`"></v-img>
          </v-col>
          <v-col class="col-sm-9 col-md-8 ml-0 pl-4">
            <div class="display-1 font-weight-black mb-2" v-text="milestone.node.title"></div>

            <div class="body-1" v-html="marked(milestone.node.description)" />
          </v-col>
        </v-row>
        <v-col tile class="col-sm-3 col-md-4 col-lg-4 ma-0 pa-0">
          <v-divider
            v-if="$page.milestones.edges.length !== index + 1"
            vertical
            style="height: 120px; display: flex; text-align: center; margin: 0 auto"
            class="our-history-divider"
          ></v-divider>
        </v-col>
      </v-card>
    </v-container>
    <template slot="cta">
      <Cta :cta="$page.about.edges[0].node.cta" />
    </template>
  </Layout>
</template>
<page-query>

{
  about: allAbout(filter: {title: {eq: "Our History"}}) {
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
  milestones: allMilestones(sortBy: "position", order: ASC ) {
    edges {
      node {
        description
        id
        image {
          url
        }
        title
        position
        link
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
.banner {
  background-size: cover;
}

.our-history-divider {
  margin-top:50px!important;
}
</style>