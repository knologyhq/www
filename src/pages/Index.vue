<template>
  <Layout>
    <template slot="alertBanner">
      <v-alert
        v-model="alert"
        close-text="Close"
        tile
        dark
        dismissible
        class="white--text py-4 text-center mb-0"
        :style="`background: linear-gradient(to right, #266093, #00A2AE)`"
      >
        <div class="alert-text" v-html="marked($page.allHome.edges[0].node.alert)" />
      </v-alert>
    </template>

    <Logo logoClasses="logo large" />

    <p
      class="headline grey--text lighten-1 mb-8"
    >{{ $page.allSite.edges[0].node.globalSeo.fallbackSeo.description }}</p>
    <v-row>
      <v-col id="featured-posts" cols="12" sm="12" md="8" lg="4" order-md="1">
        <v-sheet>
          <div class="title font-weight-black black--text mb-2">Featured Posts</div>

          <div class="divider mb-4">
            <span />
          </div>
          <PostCardLarge
            :post="post"
            v-for="post in $page.allHome.edges[0].node.featuredPosts"
            :key="post.id"
          />
        </v-sheet>
      </v-col>
      <v-col id="new-posts" cols="12" sm="12" md="4" lg="4" order-md="2">
        <v-sheet>
          <div class="title font-weight-black black--text mb-2">
            New Ideas
            <g-link
              class="subtitle font-weight-normal black--text float-right"
              to="/articles"
              style="text-decoration: none"
            >View All ></g-link>
          </div>

          <div class="divider mb-4">
            <span />
          </div>
          <PostCardMedium :post="post.node" v-for="post in $page.newposts.edges" :key="post.id" />
        </v-sheet>
      </v-col>
      <v-col cols="12" sm="12" md="4" lg="4" order-md="4" order-lg="3">
        <Sidebar />
      </v-col>

      <v-col order-md="3" sm="12" md="8" lg="12">
        <v-row>
          <RecentPostsByPillar
            :pillar="pillar.node"
            :key="pillar.id"
            v-for="pillar in $page.allPillars.edges"
          />
        </v-row>
      </v-col>
    </v-row>

    <template slot="cta">
      <Cta :cta="$page.allHome.edges[0].node.cta" />
    </template>
  </Layout>
</template>



<page-query>
  query Dato($page: Int) {
    allSite {
      edges {
        node {
          globalSeo {
            siteName
            fallbackSeo {
              description
            }
          }
        }
      }
    }
    allHome {
      edges {
        node {
          alert
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
            subtitle
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
          colour {
            hex
          }
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
          subtitle
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
    title: "Knology"
  },
  data: () => ({
    alert: true
  }),
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
svg.logo.large {
  width: 300px;
}
.alert-text p {
  margin: 0;
  a {
    color: inherit;
  }
}
</style>
