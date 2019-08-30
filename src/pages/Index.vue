<template>
  <Layout>
    <v-container>
      <template slot="tagline">
        <v-container grid-list-xs>
          <v-row>
            <v-col cols="5">
              <p>is a digital publication that explains ideas debated in culture with visual essays.</p>
            </v-col>
          </v-row>
        </v-container>
      </template>
      <Logo />

      <div id="banner" v-html="$page.allHome.edges[0].node.bannerCopy" />

      <v-row>
        <v-col id="featured-posts" cols="4">
          <h3 class="subtitle-1">Featured Posts</h3>
          <PostCardLarge
            :post="post"
            v-for="post in $page.allHome.edges[0].node.featuredPosts"
            :key="post.id"
          />
        </v-col>
        <v-col id="new-posts" cols="4">
          <h3 class="subtitle-1">New Posts</h3>
          <PostCardMedium :post="post.node" v-for="post in $page.newposts.edges" :key="post.id" />

          <div class="text-center">
            <v-container>
              <v-row justify="center">
                <v-col cols="8">
                  <v-container class="max-width">
                    <Pager linkClass="my-4" :info="$page.newposts.pageInfo" />
                  </v-container>
                </v-col>
              </v-row>
            </v-container>
          </div>
        </v-col>
        <v-col cols="4">
          <Sidebar />
        </v-col>
      </v-row>
      <v-row>
        <v-col md="6" sm="12" v-for="pillar in $page.allPillars.edges" :key="pillar.id">
          <RecentPostsByPillar :pillar="pillar.node" />
        </v-col>
      </v-row>
    </v-container>

    <template slot="cta">
      <Cta :cta="$page.allHome.edges[0].node.cta" />
    </template>
  </Layout>
</template>



<page-query>
  query Dato($page: Int) {
    allHome {
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
          featuredPosts{
            categories {
              title
            }
            authors {
              name
            }
            title
            publishDate
            image {
              url
            }
            slug
          }
          bannerCopy
        }
      }
    }
      allPillars(sortBy: "position", order: ASC) {

      edges {
        node {
          title
          slug
        }
      }
    } 

    newposts: allPosts(filter: {postType: {title: {eq: "Article"}}}, order: DESC, sortBy: "publishDate", perPage: 4, limit: 8, page: $page) @paginate {
      pageInfo {
        totalPages
        currentPage
      }
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
import RecentPostsByPillar from "~/components/RecentPostsByPillar.vue";
import PostCardLarge from "~/components/PostCardLarge.vue";
import PostCardMedium from "~/components/PostCardMedium.vue";
import Logo from "~/components/Logo.vue";
import Cta from "~/components/Cta.vue";
import Sidebar from "~/components/Sidebar.vue";
import { Pager } from "gridsome";

export default {
  metaInfo: {
    title: "Knology Home"
  },
  components: {
    Cta,
    Logo,
    Pager,
    PostCardLarge,
    PostCardMedium,
    RecentPostsByPillar,
    Sidebar
  }
};
</script>
<style lang="postcss">
</style>
