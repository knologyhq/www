
<template>
  <Layout :title="$page.posts.title">
    <template slot="textBanner">
      <v-responsive
        class="white--text py-12"
        :style="`background: linear-gradient(to right, #266093, #00A2AE)`"
      >
        <v-container>
          <v-row>
            <v-card-text>
              <h1 class="display-2 font-weight-thin mb-4" v-html="$page.posts.title" />
            </v-card-text>
          </v-row>
        </v-container>
      </v-responsive>
    </template>
    <v-container>
      <v-row>
        <v-col id="main" cols="8">
          <div v-html="marked($page.posts.description)" />
        </v-col>

        <v-col cols="4">
          <Sidebar />
        </v-col>
      </v-row>
    </v-container>
  </Layout>
</template>

<page-query>

query Dato($id: String!)  {
  posts: jobsPosts(id: $id) {
    title
    description  
    }
  }


</page-query>

<script>
import Layout from "~/layouts/Default.vue";
import Sidebar from "~/components/Sidebar.vue";
import Cta from "~/components/Cta.vue";

export default {
  components: {
    Layout,
    Cta,
    Sidebar
  },
  metaInfo() {
    return {
      title: `Careers with Knology - ${this.$page.posts.title}`
    };
  }
};
</script>

<style lang="postcss" scoped>
.banner {
  background-size: cover;
}
</style>



