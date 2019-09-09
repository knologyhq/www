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
        <v-col id="main" cols="12" md="8" v-html="marked($page.allEthics.edges[0].node.body)" />

        <v-col cols="12" md="4">
          <Sidebar />
        </v-col>
      </v-row>
    </v-container>

    <template slot="cta">
      <Cta :cta="$page.allEthics.edges[0].node.cta" />
    </template>
  </Layout>
</template>
<page-query>

query Dato {
  allEthics {
    edges {
      node {
        title
        body
        colour {
          hex
        }
        colour2 {
          hex
        }
        cta {
          buttonLink
          buttonText
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
}

</page-query>
<script>
import Sidebar from "~/components/Sidebar.vue";
import Cta from "~/components/Cta.vue";
export default {
  metaInfo() {
    return {
      title: this.$page.allEthics.edges[0].node.title
    };
  },
  components: {
    Sidebar,
    Cta
  }
};
</script>
<style lang="postcss">
</style>