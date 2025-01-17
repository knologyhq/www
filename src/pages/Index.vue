<template>
  <Layout>
    <template slot="alertBanner">
      <v-alert
        v-if="$page.allHome.edges[0].node.alert"
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
          <div class="title font-weight-black black--text mb-2">Featured Collaborations</div>

          <div class="divider mb-4">
            <span />
          </div>
          <PostCardLargeNoDate
            :post="post"
            v-for="post in $page.allHome.edges[0].node.featuredPosts"
            :key="post.id"
          />
        </v-sheet>
      </v-col>
      <v-col id="new-posts" cols="12" sm="12" md="4" lg="4" order-md="2">
        <v-sheet>
          <div class="title font-weight-black black--text mb-2">
            Recent Articles
            <g-link
              class="subtitle font-weight-normal black--text float-right"
              to="/articles"
              style="text-decoration: none;"
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
            imageThumb {
              url
            }
            slug
          }
        }
      }
    }
      allPillars(filter: {slug: {ne: "general"}}, sortBy: "position", order: ASC) {

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

    newposts: allPosts(filter: {postType: {title: {eq: "Article"}}, recent: {ne: true}}, order: DESC, sortBy: "publishDate", perPage: 4, limit: 8, page: $page) @paginate {
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
          additionalAuthors
          image {
            url
          }
          imageThumb {
            url
          }
        }
      }
    }
  }
</page-query>
<script>
import RecentPostsByPillar from "~/components/RecentPostsByPillar.vue";
import PostCardLargeNoDate from "~/components/PostCardLargeNoDate.vue";
import PostCardMedium from "~/components/PostCardMedium.vue";
import Logo from "~/components/Logo.vue";
import Cta from "~/components/Cta.vue";
import Sidebar from "~/components/Sidebar.vue";
import { Pager } from "gridsome";

export default {
  metaInfo() {
    return {
      title:"Knology",
      titleTemplate:'%s - Practical social science for a better world',
      meta: [
        { name: "author", content: "Knology" },
        { name: "description", content:"Knology is a collective of scientists, writers, and educators dedicated to studying and untangling complex social issues. Equity, transparency, and deliberation are the foundation of our work process. We recognize that no issue exists in isolation from its social and environmental context. Our research is embedded in real-world application to develop practical approaches to thorny problems. We are committed to serving the public good by sharing our data and clearly reporting our results."},
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:site", content: "@KnologyResearch" },
        { name: "twitter:title", content: "Knology - Practical social science for a better world" },
        {
          name: "twitter:description",
          content:
            "Knology is a collective of scientists, writers, and educators dedicated to studying and untangling complex social issues. Equity, transparency, and deliberation are the foundation of our work process. We recognize that no issue exists in isolation from its social and environmental context. Our research is embedded in real-world application to develop practical approaches to thorny problems. We are committed to serving the public good by sharing our data and clearly reporting our results."
        },
        {
          name: "twitter:image",
          content: "https://www.datocms-assets.com/15254/1568599985-social-seo-card.png"
        }
      ]
    };

  },

  data: () => ({
    alert: true
  }),
  components: {
    Cta,
    Logo,
    Pager,
    PostCardLargeNoDate,
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
#mc-embedded-subscribe-form .v-text-field--outlined .v-input__append-outer {
    margin-top: -14px;
}
a.mx-auto.mb-2.v-card.v-card--flat.v-card--link.v-sheet.theme--light.rounded-0 {
  margin-bottom: 1.5rem !important;
}
</style>
