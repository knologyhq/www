
<template>
  <Layout :title="$page.people.name">
    <v-container>
      <v-row>
        <v-col cols="12" md="6" order-xs="2">
          <h1 v-html="$page.people.name" class="display-1 font-weight-black mb-2" />
          <h2 v-html="$page.people.jobTitle" class="body-1 font-weight-bold text-uppercase" />
          <div v-html="$page.people.education" class="body-1 font-italic font-weight-regular" />
          <v-row>
            <v-col>
              <v-btn
                v-if="$page.people.email"
                x-large
                class="deep-orange lighten1 white--text mr-3"
                elevation="0"
                :href="`mailto:${$page.people.email}`"
              >Email</v-btn>
              <v-btn
                v-if="$page.people.website"
                x-large
                class="deep-orange lighten1 white--text"
                elevation="0"
                :href="$page.people.website"
              >Website</v-btn>
            </v-col>
          </v-row>
          <div v-html="marked($page.people.bio)" />
        </v-col>
        <v-col cols="12" md="6" order-xs="1">
          <img
            v-if="$page.people.photo !== null"
            :src="`${$page.people.photo.url}?auto=compress&w=900&fit=fillmax`"
            :alt="`Photo of ${$page.people.name}`"
            style="max-width: 100%"
          />
        </v-col>
      </v-row>
    </v-container>

    <template slot="textBannerAppend">
      <v-responsive class="grey lighten-4">
        <v-item-group fluid>
          <v-container v-if="$page.posts.belongsTo.edges[0]" fluid>
            <div class="title text--black font-weight-black">Posts by {{$page.people.name}}</div>
            <v-row class="mb-0">
              <v-col
                cols="12"
                sm="6"
                md="4"
                lg="3"
                v-for="post in $page.posts.belongsTo.edges"
                :key="post.node.id"
              >
                <PostCardLarge postClasses="grey lighten-4" :post="post.node" :key="post.node.id" />
              </v-col>
            </v-row>
          </v-container>
        </v-item-group>
      </v-responsive>
    </template>
  </Layout>
</template>

<page-query>

  query Dato($id: ID!)  {
    people(id: $id) {
      name
      jobTitle
      education
      email
      website
      expertise {
        title
        id
        slug
      }
      photo {
        url
      }
      bio
      
    }

  posts: people(id: $id) {
    belongsTo {
      edges {
        node {
          ... on Posts {
            id
            categories {
              title
              id
            }
            authors {
              name
            }
            title
            slug
            image {
              url
            }
            publishDate
          }
        }
      }
    }
  }
}

</page-query>
<style lang="postcss">
v-btn__content.pillar + .pillar:before {
  content: "| ";
}
.title.text--black.font-weight-black {
  margin-bottom: 2rem;
}
</style>
<script>
import Layout from "~/layouts/Default.vue";
import PostCardLarge from "~/components/PostCardLarge.vue";

export default {
  components: {
    Layout,
    PostCardLarge
  },
  metaInfo() {
    return {
      title:this.$page.people.name,
      meta: [
        { name: "author", content: "Knology" },
        { name: "description", content:this.$page.people.bio},
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:site", content: "@KnologyResearch" },
        { name: "twitter:title", content: this.$page.people.name},
        {
          name: "twitter:description",
          content:
            this.$page.people.bio
        },
        {
          name: "twitter:image",
          content: "https://www.datocms-assets.com/15254/1568599985-social-seo-card.png"
        }
      ]
    };
  }
};
</script>
