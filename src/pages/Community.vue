<template>
  <Layout>
    <v-container>
      <Banner
        :banner="{ image: $page.allCommunity.edges[0].node.bannerImage.url, title: $page.allCommunity.edges[0].node.title, copy: $page.allCommunity.edges[0].node.bannerCopy, button: true }"
      />

      <v-row>
        <v-col
          cols="12"
          id="main"
          class="idea-brewery-intro-copy"
          v-html="marked($page.allCommunity.edges[0].node.introCopy)"
        />
      </v-row>
      <v-row>
        <template v-if="$page.allCommunity.edges[0].node.featuredPosts[0]">
          <v-col id="featured-posts" cols="12" md="6" lg="4">
            <div class="title font-weight-black black--text mb-2">Featured Ideas</div>
            <div class="divider mb-4">
              <span />
            </div>
            <PostCardLarge
              :post="post"
              v-for="post in $page.allCommunity.edges[0].node.featuredPosts"
              :key="post.id"
            />
          </v-col>
        </template>






        <template v-if="$page.newposts.edges">
          <v-col id="new-posts" cols="12" md="6" lg="4">
            <div class="title font-weight-black black--text mb-2">
              Recent Ideas
              <g-link
                class="subtitle font-weight-bold black--text float-right"
                style="text-decoration: none"
                to="/articles/tag/idea-brewery"
              >View All ></g-link>
            </div>
            <div class="divider mb-4">
              <span />
            </div>
            <template v-for="edge in $page.newposts.edges[0]">
              <div v-for="post in edge" :key="post.id">
                <PostCardMedium :post="item.node" v-for="item in post.edges" :key="item.id" />
              </div>
            </template>
          </v-col>
        </template>
        <v-col id="affiliates" cols="12" md="12" lg="4">
          <template v-if="$page.allCommunity.edges[0].node.affiliations[0]">
            <div class="title mb-4 font-weight-black">Our Affiliations</div>

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
            <div class="title mb-4 font-weight-black">Partners</div>
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
          featuredPosts {
            title
            subtitle
            publishDate
            slug
            image {
              url
            }
            authors {
              name
            }
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
import PostCardLarge from "~/components/PostCardLarge.vue";
import PostCardMedium from "~/components/PostCardMedium.vue";
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
    PostCardLarge,
    PostCardMedium,
    Sidebar,
    Banner
  }
};
</script>
<style lang="postcss">
.banner {
  background-size: cover;
}

.idea-brewery-intro-copy {
  max-width: 60%!important;
}


  @media (max-width:1264px) {

.idea-brewery-intro-copy {
  max-width: 100%!important;
}
  }

</style>
