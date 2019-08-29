<template>
  <Layout>
    <h1 class="title">Our Team</h1>
    <v-container>
      <v-row class="mb-6">
        <v-col cols="3" v-for="person in $page.allPeople.edges" :key="person.node.id">
          <PersonCard :person="person.node" />
        </v-col>
      </v-row>
    </v-container>
  </Layout>
</template>
<page-query>
  query {
    allPeople(filter: {team: {eq: true}}) {
      edges {
        node {
          bio
          slug
          education
          email
          expertise {
            title
          }
          jobTitle
          name
          team
          photo {
            url
          }
          website
        }
      }
    }
  }
</page-query>
<script>
import PersonCard from "~/components/PersonCard.vue";

export default {
  metaInfo: {
    title: "About Knology"
  },

  components: {
    PersonCard
  }
};
</script>
<style lang="postcss">
</style>
