<template>
  <Layout>
    <v-container>
      <v-row align="center" justify="center">
        <v-col>
          <v-card
            class="mb-4 banner py-12"
            :style="`background-image: url(${$page.allCommunity.edges[0].node.bannerImage.url})`"
            height="300"
          >
            <v-card-text>
              <div
                class="title white--text"
                v-html="marked($page.allCommunity.edges[0].node.bannerCopy)"
              />
              <ReadMoreButton />
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <v-row>
        <v-col
          cols="12"
          id="main"
          class="body"
          v-html="marked($page.allCommunity.edges[0].node.introCopy)"
        />
      </v-row>
      <v-row>
        <v-col cols="6">
          <v-row v-if="$page.allCommunity.edges[0].node.featuredPosts[0]">
            <v-col id="featured-posts" cols="12">
              <h3 class="title">Featured Posts</h3>
              <PostCardLarge
                :post="post"
                v-for="post in $page.allCommunity.edges[0].node.featuredPosts"
                :key="post.id"
              />
            </v-col>
          </v-row>
          <v-row v-if="$page.newposts.edges[0].node">
            <v-col id="new-posts" cols="12">
              <h3 class="title">New Posts</h3>
              <template v-for="edge in $page.newposts.edges[0]">
                <div v-for="post in edge" :key="post.id">
                  <PostCardMedium :post="item.node" v-for="item in post.edges" :key="item.id" />
                </div>
              </template>
            </v-col>
            <g-link
              class="subtitle font-weight-bold black--text float-right"
              style="text-decoration: none"
              to="/articles/tag/idea-brewery"
            >More ></g-link>
          </v-row>
        </v-col>
        <v-col cols="6">
          <v-row v-if="$page.allCommunity.edges[0].node.affiliations[0]">
            <v-col id="affiliations" cols="12">
              <div class="title">Affiliations</div>
              <v-container fluid>
                <v-row>
                  <v-col
                    v-for="affiliate in $page.allCommunity.edges[0].node.affiliations"
                    :key="affiliate.id"
                    cols="4"
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
            </v-col>
          </v-row>
          <v-row v-if="$page.allCommunity.edges[0].node.affiliations[0]">
            <v-col id="partners" cols="12">
              <div class="title">Our Partners</div>
              <v-container fluid>
                <v-row>
                  <v-col
                    v-for="partner in $page.allCommunity.edges[0].node.partners"
                    :key="partner.id"
                    cols="2"
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
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>

    <template slot="cta">
      <Cta :cta="$page.allCommunity.edges[0].node.cta" />
    </template>
  </Layout>
</template>



<page-query>
  query Dato {
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
            publishDate
            slug
            image {
              url
            }
            authors {
              name
            }
            categories {
              title
              id
            }
          }

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
    
    newposts: allTags(filter: {id: {eq: "1435043"}}) {
      edges {
        node {
          title
          belongsTo {
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
import PostCardLarge from "~/components/PostCardLarge.vue";
import PostCardMedium from "~/components/PostCardMedium.vue";
import Sidebar from "~/components/Sidebar.vue";
import ReadMoreButton from "~/components/ReadMoreButton.vue";

export default {
  metaInfo: {
    title: "Knology Home"
  },
  components: {
    Cta,
    PostCardLarge,
    PostCardMedium,
    Sidebar,
    ReadMoreButton
  }
};
</script>
<style lang="postcss">
.banner {
  background-size: cover;
}
</style>
