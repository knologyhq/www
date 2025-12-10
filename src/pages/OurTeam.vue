<template>
  <Layout>
    <v-container>
      <Banner
        :banner="{ image: $page.allOurTeam.edges[0].node.bannerImage.url, title: $page.allOurTeam.edges[0].node.title, copy: $page.allOurTeam.edges[0].node.bannerCopy }"
      />
      <v-row v-if="$page.allOurTeam.edges[0].node.introCopy">
        <v-col
          cols="12"
          id="main"
          class="body"
          v-html="marked($page.allOurTeam.edges[0].node.introCopy)"
        />
      </v-row>
      <template>
        <v-chip-group column class="mx-auto" active-class="primary--text" v-model="selectedRole">
          <v-chip class="ma-2" value="All" filter>All</v-chip>
          <v-chip
            class="ma-2"
            :value="role.node.title"
            filter
            v-for="role in sortedRoles"
            :key="role.node.id"
          >
            {{ role.node.title }}
          </v-chip>
        </v-chip-group>
      </template>
      <v-row class="mb-6">
        <v-col cols="12" xs="12" sm="6" md="3" v-for="person in filteredPeople" :key="person.id">
          <PersonCard :person="person.node" />
        </v-col>
      </v-row>
    </v-container>
  </Layout>
</template>
<page-query>
query {
  allOurTeam {
    edges {
      node {
        title
        bannerImage {
          url
        }
        bannerCopy
        introCopy
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
        body
      }
    }
  }
  allRoles {
    edges {
      node {
        title
      }
    }
  }
  allPeople(filter: {team: {eq: true}}, sortBy: "name", order: ASC) {
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
import Banner from "~/components/Banner.vue";
import { filter } from "minimatch";
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
        return this.getMatchingPeople(this.people, role);
      }
    },
    sortedRoles() {
      return this.$page.allRoles.edges
        .slice()
        .sort((a, b) => a.node.title.localeCompare(b.node.title));
    }
  },
  methods: {
    getMatchingPeople(people, role) {
      const results = this.people.filter(person => {
        const matchingRoles = person.node.role.filter(filteredRole => {
          return filteredRole.title == role;
        });
        return matchingRoles && matchingRoles.length > 0;
      });
      return results;
    }
  },
  data() {
    return {
      active: false,
      selectedRole: "All"
    };
  },

  metaInfo() {
    return {
      title:this.$page.allOurTeam.edges[0].node.title,
      meta: [
        { name: "author", content: "Knology" },
        { name: "description", content:this.$page.allOurTeam.edges[0].node.bannerCopy},
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:site", content: "@KnologyResearch" },
        { name: "twitter:title", content: this.$page.allOurTeam.edges[0].node.title },
        {
          name: "twitter:description",
          content:
            this.$page.allOurTeam.edges[0].node.bannerCopy
        },
        {
          name: "twitter:image",
          content: this.$page.allOurTeam.edges[0].node.bannerImage.url
        }
      ]
    };

  },
  components: {
    PersonCard,
    Banner
  }
};
</script>
<style lang="postcss">
</style>