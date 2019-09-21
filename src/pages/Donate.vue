<template>
  <Layout>
    <v-container>
      <Banner
        :banner="{ image: $page.allDonate.edges[0].node.bannerImage.url, title: $page.allDonate.edges[0].node.title, copy: $page.allDonate.edges[0].node.bannerCopy, button:false }"
      />

      <v-row cols="6">
        <v-col id="main" class="body" v-html="marked($page.allDonate.edges[0].node.body)" />
      </v-row>

      <v-row cols="12">
          <v-btn color="secondary" class="white--text" to="#main">Donate To Us</v-btn>
      </v-row>

    </v-container>
  </Layout>
</template>
<page-query>
query Dato {
  allDonate{
    edges{
      node{
        title
        body
        bannerCopy
        bannerImage{
         url
        }
      }
    }
  }
}
</page-query>
<script>
import Banner from "~/components/Banner.vue";

export default {
  metaInfo() {
    return {
      title: "Donate"
    };
  },
  components: {
    Banner
  }
};
</script>
<style lang="postcss">
.banner {
  background-size: cover;
}
</style>