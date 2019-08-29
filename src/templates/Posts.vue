
<template>
  <Layout :title="$page.posts.title">
    <template slot="imageBanner">
      <v-responsive
        fluid
        height="500"
        class="white--text py-12 banner"
        :style="`background-image: url(${$page.posts.image.url});`"
      />
    </template>

    <v-container>
      <span
        class="overline category pr-1 grey--text"
        v-for="category in $page.posts.categories"
        :key="category.id"
      >{{ category.title }}</span>
      <h1 class="display-2" v-html="marked($page.posts.title)" />
      <div v-if="$page.posts.subtitle">
        <h1 class="display-1" v-html="marked($page.posts.subtitle)" />
      </div>
      <div class="pr-1 grey--text subtitle-1">
        <template v-if="$page.posts.authors[0]">
          By
          <span
            class="author subtitle-1"
            v-for="author in $page.posts.authors"
            :key="author.id"
          >{{ author.name }}</span>
        </template>
        <div class="pr-1 grey--text subtitle-1">{{$page.posts.publishDate}}</div>
      </div>

      <v-row>
        <v-col>
          <v-btn
            v-if="$page.posts.dataFile"
            x-large
            color="orange"
            class="mr-3"
            elevation="0"
            :href="$page.posts.dataFile"
          >Download Data</v-btn>
          <v-btn
            v-if="$page.posts.postFile"
            x-large
            color="orange"
            elevation="0"
            :href="$page.posts.postFile.url"
          >Download Post</v-btn>
        </v-col>
      </v-row>

      <v-row>
        <v-col id="main" cols="8">
          <div v-html="marked($page.posts.body)" />
          <v-container id="comments">
            <v-row>
              <v-col cols="6" md="12">
                <div class="title">Comments</div>
              </v-col>
            </v-row>
            <v-row no-gutters>
              <v-col cols="6" md="12">
                <div class="title mb-2">Join the Conversation</div>

                <v-form ref="form">
                  <v-row>
                    <v-col cols="12" md="12">
                      <v-textarea outlined name="input-7-4" label="Leave your reply…" value></v-textarea>
                    </v-col>
                    <v-col cols="12" md="6">
                      <v-text-field outlined label="First Name" required></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6">
                      <v-text-field outlined label="Last Name" required></v-text-field>
                    </v-col>
                  </v-row>

                  <v-btn color="success" class="mr-4" elevation="0">Submit</v-btn>
                </v-form>
              </v-col>
            </v-row>
          </v-container>
        </v-col>

        <v-col cols="4">
          <Sidebar />
        </v-col>
      </v-row>
    </v-container>

    <template slot="cta">
      <Cta :cta="cta" />
    </template>
  </Layout>
</template>

<page-query>

query Dato($id: String!)  {
  posts(id: $id) {
    title
    body
    categories {
    title
    }
    authors {
      name
    }
    title
    subtitle
    publishDate
    image {
      url
    }
    slug
    image {
      url
    }
    dataFile
    postFile {
      url
    }

  }

}

</page-query>

<script>
import Layout from "~/layouts/Default.vue";
import Sidebar from "~/components/Sidebar.vue";
import Cta from "~/components/Cta.vue";

export default {
  data() {
    return {
      cta: {
        buttonLink: "https://www.knology.org/donate",
        buttonText: "Donate",
        body: "Support research that has a real world impact.",
        colour2: {
          hex: "#00A2AE"
        },
        colour: { hex: "#266093" }
      }
    };
  },
  components: {
    Layout,
    Cta,
    Sidebar
  },
  metaInfo() {
    return {
      title: this.$page.posts.title
    };
  }
};
</script>

<style lang="postcss" scoped>
.banner {
  background-size: cover;
}
.category + .category:before {
  content: "| ";
}
.author + .author:before {
  content: ", ";
}
</style>



