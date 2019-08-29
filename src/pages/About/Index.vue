<template>
  <Layout>
    <h1>{{ $page.allSite.edges[0].node.globalSeo.siteName }}</h1>
  </Layout>
</template>
<page-query>

query Dato {
  allSite {
    edges {
      node {
        globalSeo {
          siteName
        }
      }
    }
  }
}

</page-query>
<script>
export default {
  metaInfo: {
    title: "About Knology"
  }
};
</script>
<style lang="postcss">
</style>