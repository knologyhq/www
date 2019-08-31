
<template>
  <Layout :title="$page.people.name">
    <v-container>
      <v-row>
        <v-col cols="6">
          <h1 v-html="$page.people.name" class="title" />
          <h2 v-html="$page.people.jobTitle" class="subtitle text-uppercase" />
          <h2 v-html="$page.people.education" class="subtitle font-italic font-weight-regular" />
          <v-row>
            <v-col>
              <v-btn
                v-if="$page.people.email"
                x-large
                color="orange"
                class="mr-3"
                elevation="0"
                :href="`mailto:${$page.people.email}`"
              >Email</v-btn>
              <v-btn
                v-if="$page.people.website"
                x-large
                color="orange"
                elevation="0"
                :href="$page.people.website"
              >Website</v-btn>
            </v-col>
          </v-row>
          <div v-html="marked($page.people.bio)" />
          <!-- class="pillar pr-1 grey--text subtitle-1" -->
          <v-subheader>Expertise in</v-subheader>
          <v-btn
            v-for="pillar in $page.people.expertise"
            :key="pillar.id"
            text
            :to="`/category/${pillar.slug}`"
          >{{ pillar.title }}</v-btn>
        </v-col>
        <v-col cols="6">
          <img
            v-if="$page.people.photo.url"
            :src="`${$page.people.photo.url}?auto=compress&w=900&fit=fillmax`"
            :alt="`Photo of ${$page.people.name}`"
            style="max-width: 100%"
          />
        </v-col>
      </v-row>
    </v-container>
    <v-item-group class="grey lighten-2" fluid>
      <v-container v-if="$page.posts.belongsTo.edges[0]">
        <div class="subtitle">Recent Posts by {{$page.people.name}}</div>
        <v-row class="mb-6">
          <v-col cols="4" v-for="post in $page.posts.belongsTo.edges" :key="post.node.id">
            <PostCardLarge :post="post.node" :key="post.node.id" />
          </v-col>
        </v-row>
      </v-container>
    </v-item-group>
  </Layout>
</template>

<page-query>

  query Dato($id: String!)  {
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
      title: this.$page.people.title
    };
  }
};
</script>
