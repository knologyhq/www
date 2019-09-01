<template>
  <Layout>
    <template slot="textBanner">
      <v-responsive
        class="white--text py-12"
        :style="`background: linear-gradient(to right, #266093, #00A2AE)`"
      >
        <v-container>
          <v-row>
            <v-card-text>
              <h1
                class="display-2 font-weight-thin mb-4"
                v-html="$page.allAlumni.edges[0].node.title"
              />
            </v-card-text>
          </v-row>
        </v-container>
      </v-responsive>
    </template>

    <v-container>
      <v-row>
        <v-col id="main" cols="8">
          <div v-html="marked($page.allAlumni.edges[0].node.body)" />
          <template>
            <v-card class="mx-auto" tile flat>
              <v-list-item v-for="person in $page.allPeople.edges" :key="person.id">
                <v-list-item-content>
                  <v-list-item-title>{{ person.node.name }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-card>
          </template>
        </v-col>

        <v-col cols="4">
          <Sidebar />
        </v-col>
      </v-row>
    </v-container>
  </Layout>
</template>
<page-query>

query Dato {
allAlumni {
    edges {
      node {
        title
        body
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
      }
    }
}
  allPeople(filter: {team: {eq: false}}) {
    edges {
      node {
        name
      }
    }
  }
}

</page-query>
<script>
import Sidebar from "~/components/Sidebar.vue";
export default {
  metaInfo() {
    return {
      title: "Alumni"
    };
  },
  components: {
    Sidebar
  }
};
</script>
<style lang="postcss">
</style>