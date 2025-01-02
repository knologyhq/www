<template>
  <Layout>
    <v-container>
      <Banner
        :banner="{ image: $page.allCommunity.edges[0].node.bannerImage.url, title: $page.allCommunity.edges[0].node.title, copy: $page.allCommunity.edges[0].node.bannerCopy, button: false }"
      />

      <v-row>
        <template v-if="$page.allCommunity.edges[0].node.featuredLinks[0]">
          <v-col id="featured-links" cols="12" md="12" lg="8">
            <div class="title font-weight-black black--text mb-2">Recent Ideas</div>
            
            <div class="divider mb-4">
              <span />
            </div>

            <div
                class="idea-brewery-intro-copy"
                v-html="marked($page.allCommunity.edges[0].node.introCopy)"
            ></div>

            <LinkCardMedium
              :post="post"
              v-for="post in $page.allCommunity.edges[0].node.featuredLinks"
              :key="post.id"
            />
          </v-col>
        </template>

        <v-col id="affiliates" cols="12" md="12" lg="4">
          <template v-if="$page.allCommunity.edges[0].node.affiliations[0]">
            <div class="title mb-4 font-weight-black">Partner Websites</div>

            <v-container fluid>
              <v-row align="center" justify="center">
                <v-col
                  v-for="affiliate in $page.allCommunity.edges[0].node.affiliations"
                  :key="affiliate.id"
                  cols="4"
                  md="3"
                  lg="6"
                >
                  <template v-if="affiliate.url">
                    <a :href="affiliate.url" target="_blank">
                      <v-img
                        :src="affiliate.logo.url"
                        class="image"
                        max-width="100%"
                        max-height="100%"
                        contain
                      />
                    </a>
                  </template>
                  <template v-else>
                    <v-img
                      :src="affiliate.logo.url"
                      class="image"
                      max-width="100%"
                      max-height="100%"
                      contain
                    />
                  </template>
                </v-col>
              </v-row>
            </v-container>
          </template>
        </v-col>
        <v-col align-self="center" id="affiliates" cols="12">
          <template v-if="$page.allCommunity.edges[0].node.partners[0]">
            <div class="title mb-4 font-weight-black">Featured Partners</div>
            <v-container fluid>
              <v-row align="center" justify="center">
                <v-col
                  v-for="partner in $page.allCommunity.edges[0].node.partners"
                  :key="partner.id"
                  cols="4"
                  md="3"
                  lg="2"
                >
                  <template v-if="partner.url">
                    <a :href="partner.url" target="_blank">
                      <v-img
                        :src="partner.logo.url"
                        class="image"
                        max-width="100%"
                        max-height="100%"
                        contain
                      />
                    </a>
                  </template>
                  <template v-else>
                    <v-img
                      :src="partner.logo.url"
                      class="image"
                      max-width="100%"
                      max-height="100%"
                      contain
                    />
                  </template>
                </v-col>
              </v-row>
            </v-container>
          </template>
        </v-col>
      </v-row>
    </v-container>

    <template slot="cta">
      <Cta :cta="$page.allCommunity.edges[0].node.cta" />
    </template>
  </Layout>
</template>



<page-query>
  query Dato ($page: Int) {
    allCommunity {
      edges {
        node {
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
          partners {
            logo {
              url
            }
            title
            url
            id
          }
          featuredLinks {
            title
            subtitle
            url
          }
          title
          introCopy
          id
          bannerCopy
          bannerImage {
            url
          }
          affiliations {
            id
            title
            url
            logo {
              url
            }
          }
        }
      }
    }
    
    listOfAllTags: allTags {
    edges {
    node{
    title
    id
    slug
  }
  }
  }

    newposts: allTags(filter: {slug: {eq: "idea-brewery"}}, perPage: 4, limit: 8, page: $page) @paginate {
      pageInfo {
        totalPages
        currentPage
      }
      edges {
        node {
          title
          slug
          id
          belongsTo (order: DESC, sortBy: "publishDate", perPage: 4) {
            edges {
              node {
                ... on Posts {
                  slug
                  title
                  publishDate
                  categories {
                    title
                  }
                  authors {
                    name
                  }
                  image {
                    url
                  }
                }
              }
            }
          }
        }
      }
    }
  }
</page-query>
<script>
import Cta from "~/components/Cta.vue";
import LinkCardMedium from "~/components/LinkCardMedium.vue";
import Sidebar from "~/components/Sidebar.vue";
import Banner from "~/components/Banner.vue";

export default {
  metaInfo() {
    return {
      title:this.$page.allCommunity.edges[0].node.title,
      meta: [
        { name: "author", content: "Knology" },
        { name: "description", content:this.$page.allCommunity.edges[0].node.introCopy},
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:site", content: "@KnologyResearch" },
        { name: "twitter:title", content: this.$page.allCommunity.edges[0].node.title },
        {
          name: "twitter:description",
          content:
            this.$page.allCommunity.edges[0].node.introCopy
        },
        {
          name: "twitter:image",
          content: this.$page.allCommunity.edges[0].node.bannerImage.url
        }
      ]
    };

  } ,
  components: {
    Cta,
    LinkCardMedium,
    Sidebar,
    Banner
  }
};
</script>
<style lang="postcss">
.banner {
  background-size: cover;
}
#featured-links {margin-bottom: 2em;}
#featured-links a.v-card--link {margin: 2em 0;}

</style>
