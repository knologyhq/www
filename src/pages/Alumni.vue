<template>
  <Layout>
    <template slot="textBanner">
      <v-responsive
        class="white--text py-12"
        :style="`background: linear-gradient(to right, ${$page.allEthics.edges[0].node.colour.hex ? $page.allEthics.edges[0].node.colour.hex : '#266093' }, ${$page.allEthics.edges[0].node.colour2.hex ? $page.allEthics.edges[0].node.colour2.hex : '#00A2AE'})`"
      >
        <v-container>
          <v-row>
            <v-card-text>
              <h1
                class="display-2 font-weight-thin mb-4"
                v-html="$page.allEthics.edges[0].node.title"
              />
            </v-card-text>
          </v-row>
        </v-container>
      </v-responsive>
    </template>

    <v-container>
      <v-row>
        <v-col id="main" cols="8" v-html="marked($page.allEthics.edges[0].node.body)" />

        <v-col cols="4">
          <Sidebar />
        </v-col>
      </v-row>
    </v-container>
  </Layout>
</template>
<page-query>

query Dato {
  allPeople(filter: {team: {eq: true}}) {
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