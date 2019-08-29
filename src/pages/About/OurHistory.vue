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
          <v-btn color="orange" to="#main">Read More →</v-btn>
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

      <v-timeline>
        <v-timeline-item
          v-for="milestone in $page.milestones.edges"
          :key="milestone.node.id"
          color="red lighten-2"
          large
        >
          <!-- <template v-slot:opposite>
            <span>Tus eu perfecto</span>
          </template>-->
          <v-card class="elevation-2">
            <v-img
              height="200px"
              :src="`${milestone.node.image.url}?auto=compress&w=500&fit=fillmax`"
            />
            <v-card-title class="headline">{{ milestone.node.title }}</v-card-title>
            <v-card-text>
              <div v-html="marked(milestone.node.description)" />
            </v-card-text>
          </v-card>
        </v-timeline-item>
      </v-timeline>
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

export default {
  components: {
    Cta
  }
};
</script>
<style lang="postcss" scoped>
.banner {
  background-size: cover;
}
</style>