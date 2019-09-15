<template>
  <Layout>

    <v-container>
      <v-row>
      <v-row>
      </v-row>       

        <v-col cols="4">
          <Sidebar />
        </v-col>
      </v-row>
    </v-container>
  </Layout>
</template>
<page-query>

</page-query>
<script>
import Sidebar from "~/components/Sidebar.vue";

export default {
  metaInfo() {
    return {
      title: "Donate"
    };
  },
  components: {
    Sidebar
  }
};
</script>
<style lang="postcss">
.banner {
  background-size: cover;
}
</style>