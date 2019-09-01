<template>
  <Layout>
    <v-container>
      <v-card
        flat
        class="mb-4 banner"
        :style="`background-image: url(${$page.allCommunity.edges[0].node.bannerImage.url})`"
        height="300"
      >
        <v-card-text>
          <div
            class="title white--text"
            v-html="marked($page.allCommunity.edges[0].node.bannerCopy)"
          />
          <v-btn color="orange" to="#main">Read More →</v-btn>
        </v-card-text>
      </v-card>

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

          <v-row v-if="$page.newposts.edges[0]">
            <v-col id="new-posts" cols="12">
              <h3 class="title">New Posts</h3>
              <PostCardMedium
                :post="post.node"
                v-for="post in $page.newposts.edges"
                :key="post.id"
              />
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="6">
          <v-row v-if="$page.allCommunity.edges[0].node.affiliations[0]">
            <v-col id="affiliations" cols="12">
              <div class="title">Our Affiliations</div>
              <v-container fluid>
                <v-row>
                  <v-col
                    v-for="affiliate in $page.allCommunity.edges[0].node.affiliations"
                    :key="affiliate.id"
                    cols="4"
                  >
                    <img :src="affiliate.logo.url" class="image" width="100%" height="100%" />
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
                    class="d-flex justify-center .justify-space-around mb-6"
                    v-for="partner in $page.allCommunity.edges[0].node.partners"
                    :key="partner.id"
                    cols="2"
                  >
                    <img :src="partner.logo.url" class="image" width="100%" height="100%" />
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
    
    newposts: allPosts(limit: 4, order: DESC, sortBy: "publishDate", filter: {tags: {contains: "Idea Brewery"}}) {
      edges {
        node {
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
</page-query>
<script>
import Cta from "~/components/Cta.vue";
import PostCardLarge from "~/components/PostCardLarge.vue";
import PostCardMedium from "~/components/PostCardMedium.vue";
import Sidebar from "~/components/Sidebar.vue";

export default {
  metaInfo: {
    title: "Knology Home"
  },
  components: {
    Cta,
    PostCardLarge,
    PostCardMedium,
    Sidebar
  }
};
</script>
<style lang="postcss">
.banner {
  background-size: cover;
}
</style>
