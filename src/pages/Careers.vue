<template>
  <Layout>
    <v-container>
      <v-row align="center" justify="center">
        <v-col>
          <v-card
            class="mb-4 banner py-12"
            flat
            :style="`background-image: url(${$page.allCareersPage.edges[0].node.bannerImage.url})`"
            height="300"
          >
            <v-card-text>
              <h1
                class="display-2 white--text mb-4"
                v-html="$page.allCareersPage.edges[0].node.title"
              />
              <div
                class="title white--text"
                v-html="marked($page.allCareersPage.edges[0].node.bannerCopy)"
              />
              <v-btn color="orange" to="#main">Read More →</v-btn>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <v-container>
      <v-row>
        <v-col id="main" cols="8">
          <template>
            <v-card class="mx-auto" tile flat>
              <v-list-item
                v-for="job in $page.allJobsPosts.edges"
                :key="job.id"
                :to="`/job/${job.node.slug}`"
              >
                <v-list-item-content>
                  <v-list-item-title>{{ job.node.title }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-card>
          </template>
        </v-col>

        <v-col cols="4">
          <Sidebar />
        </v-col>
      </v-row>
    </v-container>
  </Layout>
</template>
<page-query>

query Dato {
  allCareersPage {
    edges {
      node {
        title
        bannerImage {
          url
        }
        bannerCopy
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
  allJobsPosts {
    edges {
      node {
        title
        description
        slug
      }
    }
  }
}

</page-query>
<script>
import Sidebar from "~/components/Sidebar.vue";
export default {
  metaInfo() {
    return {
      title: "Careers at Knology"
    };
  },
  components: {
    Sidebar
  }
};
</script>
<style lang="postcss">
.banner {
  background-size: cover;
}
</style>