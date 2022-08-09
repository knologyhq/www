<template>
  <Layout :title="$page.initiatives.title">
    <template slot="textBanner">
      <v-responsive
        class="white--text py-12"
        :style="`background-color: ${$page.pillars.belongsTo.edges[0].node.colour.hex}`"
      >
        <v-container>
          <v-row>
            <v-card-text>
              <h1 class="display-2 font-weight-bold ma-0" v-html="$page.initiatives.title" />
            </v-card-text>
          </v-row>
        </v-container>
      </v-responsive>
    </template>

    <v-container fluid>
      <v-row>
        <v-col cols="12" md="2">
          <div
            v-if="$page.pillars.belongsTo.edges[0]"
            v-html="$page.pillars.belongsTo.edges[0].node.svgIcon"
          />
        </v-col>
        <v-col cols="12" md="6">
          <div class="title black--text font-weight-black">Description</div>

          <div v-if="$page.initiatives.description" v-html="marked($page.initiatives.description)" />
        </v-col>

        <v-col cols="12" md="4">
          <v-list dense>
            <div class="title black--text font-weight-black">Research Area</div>
            <v-list-item-group color="primary">
              <v-list-item dense>
                <v-list-item-content>
                  <v-list-item-title>
                    <g-link
                      v-if="$page.pillars.belongsTo.edges[0]"
                      :to="`/category/${$page.pillars.belongsTo.edges[0].node.slug}`"
                      class="title"
                    >{{$page.pillars.belongsTo.edges[0].node.title}}</g-link>
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>

          <v-list dense v-if="$page.initiatives.collaborators[0]">
            <div class="title black--text font-weight-black">Collaborators &amp; Partners</div>
            <v-list-item-group color="primary">
              <v-list-item
                dense
                v-for="collaborator in $page.initiatives.collaborators"
                :key="collaborator.id"
              >
                <v-list-item-content>
                  <v-list-item-title>
                    <a :href="collaborator.link">{{ collaborator.title}}</a>
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-col>
      </v-row>
    </v-container>

    <v-container fluid v-if="$page.people.belongsTo.edges[0]">
      <div class="title text--black font-weight-black">Meet Our Experts in this Research Area</div>

      <v-row class="mb-6">
        <v-col cols="12" md="3" v-if="edge.node.team" v-for="edge in $page.people.belongsTo.edges" :key="edge.node.id">
          <PersonCard :person="edge.node" :key="edge.node.id" />
        </v-col>
      </v-row>
    </v-container>
    <v-container v-if="$page.posts.belongsTo.edges[0]">
      <div
        class="title text--black font-weight-black"
      >Recent Posts About {{$page.initiatives.title}}</div>
      <v-row class="mb-6">
        <v-col cols="12" md="3" v-for="edge in $page.posts.belongsTo.edges" :key="edge.node.id">
          <PostCardLarge :post="edge.node" :key="edge.node.id" />
        </v-col>
      </v-row>
    </v-container>
  </Layout>
</template>

<page-query>
query InitativeData($id: ID!) {
  initiatives(id: $id) {
    title
    description

    collaborators {
      title
      link
    }
  }


  pillars: initiatives(id: $id) {
    belongsTo(filter: {typeName: {eq: Pillars}}) {
      edges {
        node {
          __typename
          ... on Pillars {
            title
            slug
            svgIcon
            colour {
              hex
            }
          }
        }
      }
    }
  }
  posts: initiatives(id: $id) {
    belongsTo(filter: {typeName: {eq: Posts}} , sortBy: "publishDate", order: DESC) {
      edges {
        node {
          __typename
          ...on Posts {
            id
            title
            slug
            image {
              url
            }
            authors {
              name
            }
            publishDate
          }
        }
      }
    }
  }
  people: initiatives(id: $id) {
    belongsTo(filter: {typeName: {eq: People}},  sortBy: "name", order: ASC) {
      edges {
        node {
          __typename
          ...on People {
            name
            jobTitle
            slug
            team
            photo {
              url
            }
          }
        }
      }
    }
  }
}

</page-query>

<script>
import Layout from "~/layouts/Default.vue";
import PostCardLarge from "~/components/PostCardLarge.vue";
import PersonCard from "~/components/PersonCard.vue";

export default {
  components: {
    Layout,
    PostCardLarge,
    PersonCard
  },
  metaInfo() {
    return {
      title:this.$page.initiatives.title,
      meta: [
        { name: "author", content: "Knology" },
        { name: "description", content:this.$page.initiatives.description},
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:site", content: "@KnologyResearch" },
        { name: "twitter:title", content: this.$page.initiatives.title},
        {
          name: "twitter:description",
          content:
            this.$page.initiatives.description
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
