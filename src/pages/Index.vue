<template>
  <Layout>
    <template slot="textBanner">
      <!-- todo: If takeover banners will be used regularly, this should be added as a model in Dato -->
      <v-responsive
        class="white--text py-12"
        :style="`background: linear-gradient(to right, #266093, #00A2AE)`"
      >
        <v-container>
          <v-row align="center" justify="center">
            <h1 class="display-2 font-weight-thin mb-4">New Name, Same People</h1>
            <h4
              class="subheading text-center font-weight-regular"
            >In 2019, New Knowledge Organization Ltd. became Knology. With this change, we’ve renewed our commitment to studying and untangling complex social issues. We’re proud that our new website puts more social science research into the hands of people who can make a difference.</h4>
          </v-row>
        </v-container>
      </v-responsive>
    </template>

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
      <Logo :tagline="true" />
    </v-container>

    <v-container>
      <v-row>
        <v-col id="featured-posts" cols="4">
          <v-sheet>
            <div class="title font-weight-black black--text mb-2">Featured Posts</div>
            <v-divider></v-divider>
            <PostCardLarge
              :post="post"
              v-for="post in $page.allHome.edges[0].node.featuredPosts"
              :key="post.id"
            />
          </v-sheet>
        </v-col>
        <v-col id="new-posts" cols="4">
          <v-sheet>
            <div class="title font-weight-black black--text mb-2">New Posts</div>
            <v-divider></v-divider>
            <PostCardMedium :post="post.node" v-for="post in $page.newposts.edges" :key="post.id" />
          </v-sheet>

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
