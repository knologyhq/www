<template>
  <Layout>
    <h1 class="title">Our Team</h1>
    <v-container>
      <template>
        <v-card class="mx-auto" flat tile>
          <v-card-text>
            <v-chip-group column active-class="primary--text" v-model="selectedRole">
              <v-chip class="ma-2" value="All" filter>All</v-chip>
              <v-chip
                class="ma-2"
                :value="role.node.title"
                filter
                v-for="role in $page.allRoles.edges"
                :key="role.node.id"
              >{{ role.node.title}}</v-chip>
            </v-chip-group>
          </v-card-text>
        </v-card>
      </template>

      <v-row class="mb-6">
        <v-col cols="3" v-for="person in filteredPeople" :key="person.id">
          <PersonCard :person="person.node" />
        </v-col>
      </v-row>
    </v-container>
  </Layout>
</template>
<page-query>
  query {
    allRoles {
      edges {
        node {
          title
          id
        }
      }
    }
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
          role {
            id
            title
          }
        }
      }
    }
  }
</page-query>
<script>
import PersonCard from "~/components/PersonCard.vue";

export default {
  computed: {
    people() {
      return this.$page.allPeople.edges;
    },
    filteredPeople() {
      var role = this.selectedRole;
      if (role === "All") {
        return this.people;
      } else {
        return this.people.filter(function(person) {
          return person.node.role[0].title === role;
        });
      }
    }
  },

  data() {
    return {
      active: false,
      selectedRole: "All"
    };
  },
  metaInfo: {
    title: "Our Team"
  },
  components: {
    PersonCard
  }
};
</script>
<style lang="postcss">
</style>
