<template>
  <Layout>
    <v-container>
      <Banner
        :banner="{
          image: $page.allCareersPage.edges[0].node.bannerImage.url,
          title: $page.allCareersPage.edges[0].node.title,
          copy: $page.allCareersPage.edges[0].node.bannerCopy,
          button: false
        }"
      />
    </v-container>
    
    <v-container>
      <v-row>
        <v-col id="main" cols="8">
          <template v-if="$page.allJobsPosts.edges.length">
            <v-card class="mx-auto job-posts" tile flat>
              <v-list-item
                v-for="job in $page.allJobsPosts.edges"
                :key="job.node.slug"
                :to="`/job/${job.node.slug}`"
              >
                <v-list-item-content>
                  <v-list-item-title>{{ job.node.title }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-card>
          </template>
          <template v-else>
            <v-alert outlined color="purple">
              Currently there are no openings at Knology. Please check back later.
            </v-alert>
          </template>
        </v-col>

        <v-col cols="4">
          <Sidebar />
        </v-col>
      </v-row>
    </v-container>

    <!-- Footer Section -->
    <v-container v-if="$page.allCareersPage.edges[0].node.footer" class="footer">
      <v-row justify="center">
        <v-col cols="12">
          <p v-html="marked($page.allCareersPage.edges[0].node.footer)"></p>
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
  allJobsPosts(filter: { open: { eq: true } }) {
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
import Banner from "~/components/Banner.vue";
import ReadMoreButton from "~/components/ReadMoreButton.vue";

export default {
  metaInfo() {
    const pageData = this.$page.allCareersPage.edges[0].node;
    return {
      title: pageData.title,
      meta: [
        { name: "author", content: "Knology" },
        { name: "description", content: pageData.bannerCopy },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:site", content: "@KnologyResearch" },
        { name: "twitter:title", content: pageData.title },
        {
          name: "twitter:description",
          content: pageData.bannerCopy
        },
        {
          name: "twitter:image",
          content: pageData.bannerImage.url
        }
      ]
    };
  },
  components: {
    Sidebar,
    Banner,
    ReadMoreButton
  }
};
</script>

<style lang="postcss">
.banner {
  background-size: cover;
}
.job-posts a {
  margin-bottom: 20px;
  max-width: 450px;
  border-radius: 5px !important;
  background: #266093;
  color: white !important;
  padding-top: 10px;
  padding-bottom: 10px;
}
.job-posts a .v-list-item__title {
  color: white !important;
}
.footer {
  margin-top: 40px;
  padding-top: 20px;
}
</style>
