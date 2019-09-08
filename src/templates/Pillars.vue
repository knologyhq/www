
<template>
  <Layout :title="$page.pillars.title">
    <template slot="textBanner">
      <v-responsive
        class="white--text py-12"
        :style="`background-color: ${$page.pillars.colour.hex}`"
      >
        <v-container>
          <v-row>
            <v-card-text>
              <h1 class="display-2 font-weight-thin mb-4" v-html="$page.pillars.title" />
            </v-card-text>
          </v-row>
        </v-container>
      </v-responsive>
    </template>

    <v-container fluid>
      <v-row>
        <v-col cols="2">
          <div v-html="$page.pillars.svgIcon" />
        </v-col>
        <v-col cols="6">
          <div v-if="$page.pillars.description" v-html="marked($page.pillars.description)" />
        </v-col>

        <v-col cols="4">
          <v-list>
            <v-subheader>Initiatives</v-subheader>
            <v-list-item-group color="primary">
              <v-list-item v-for="initiative in $page.pillars.initiative" :key="initiative.id">
                <v-list-item-content>
                  <v-list-item-title>
                    <g-link :to="`/initiative/${initiative.slug}`">{{ initiative.title}}</g-link>
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
        <v-col cols="3" v-for="edge in $page.people.belongsTo.edges" :key="edge.node.id">
          <PersonCard :person="edge.node" :key="edge.node.id" />
        </v-col>
      </v-row>
    </v-container>
    <v-container v-if="$page.posts.belongsTo.edges">
      <div class="title text--black font-weight-black">Recent Posts About {{$page.pillars.title}}</div>
      <v-row class="mb-6">
        <v-col cols="3" v-for="edge in $page.posts.belongsTo.edges" :key="edge.node.id">
          <PostCardLarge :post="edge.node" :key="edge.node.id" />
        </v-col>
      </v-row>
    </v-container>
  </Layout>
</template>

<page-query>
query CategoryData($id: String!) {
  pillars(id: $id) {
    title
    description
    svgIcon
    colour {
      hex
    }
    initiative {
      title
      slug
    }
  }


  pillars (id: $id) {
    belongsTo(filter: {typeName: {eq: Pillars}}) {
      edges {
        node {
          __typename
          ... on Pillars {
            title
            slug
            svgIcon
          }
        }
      }
    }
  }
  posts: pillars(id: $id) {
    belongsTo(filter: {typeName: {eq: Posts}}) {
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
  people: pillars(id: $id) {
    belongsTo(filter: {typeName: {eq: People}}) {
      edges {
        node {
          __typename
          ...on People {
            name
            jobTitle
            slug
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
      title: this.$page.pillars.title
    };
  }
};
</script>
