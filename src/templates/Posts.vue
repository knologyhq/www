
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
      <div
        class="overline category pr-1 grey--text"
        v-for="category in $page.posts.categories"
        :key="category.id"
      >
        <g-link :to="`/articles/category/${ category.slug }`">{{ category.title }}</g-link>
      </div>
      <br />

      <div class="overline category pr-1 grey--text" v-for="tag in $page.posts.tags" :key="tag.id">
        <g-link :to="`/articles/tag/${ tag.slug }`">{{ tag.title }}</g-link>
      </div>
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
            class="deep-orange lighten1 white--text mr-3"
            elevation="0"
            :href="$page.posts.dataFile"
          >Download Data</v-btn>
          <v-btn
            v-if="$page.posts.postFile"
            x-large
            class="deep-orange lighten1 white--text"
            elevation="0"
            :href="$page.posts.postFile.url"
          >Download Post</v-btn>
        </v-col>
      </v-row>
      <v-row id="main">
        <v-col cols="8">
          <div v-html="marked($page.posts.body)" />

          <!-- todo: make a component for comment block -->
          <v-container id="comments" v-if="$page.posts.allowComments == true">
            <v-row v-if="$page.comments.belongsTo.edges[0]">
              <v-col cols="6" md="12">
                <div class="title">Comments</div>
                <span
                  cols="8"
                  v-for="comment in $page.comments.belongsTo.edges"
                  :key="comment.node.id"
                >
                  <v-card class="mx-auto mb-4" light flat tile>
                    <v-card-text class="body-1" v-html="comment.node.data.comment" />

                    <v-card-actions>
                      <v-list-item class="grow">
                        <v-list-item-content>
                          <v-list-item-title
                            v-html="`By ${comment.node.data.first_name} ${comment.node.data.last_name}`"
                          />
                        </v-list-item-content>

                        <v-row align="center" justify="end">
                          <span
                            class="subheading"
                          >On {{comment.node.created_at | moment("dddd, MMMM D, YYYY")}}</span>
                        </v-row>
                      </v-list-item>
                    </v-card-actions>
                  </v-card>
                </span>
              </v-col>
            </v-row>
            <v-row no-gutters>
              <v-col cols="6" md="12">
                <div class="title mb-2">Join the Conversation</div>
                <v-alert
                  type="success"
                  v-if="submitted"
                >Thank you for your submission, {{ formData.first_name }}. Our editors will review your comment shortly.</v-alert>

                <v-form
                  ref="form"
                  name="comments-queue"
                  id="comments-queue"
                  data-netlify="true"
                  method="POST"
                  action
                  v-if="!submitted"
                  @submit.prevent="handleSubmit"
                >
                  <v-row>
                    <v-col cols="12" md="12">
                      <v-textarea
                        name="comment"
                        outlined
                        label="Leave your reply…"
                        required
                        v-model="formData.comment"
                      ></v-textarea>
                    </v-col>
                    <v-col cols="12" md="6">
                      <v-text-field
                        name="first_name"
                        outlined
                        label="First Name"
                        required
                        v-model="formData.first_name"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" md="6">
                      <v-text-field
                        name="last_name"
                        outlined
                        label="Last Name"
                        required
                        v-model="formData.last_name"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <input type="hidden" name="form-name" value="comments-queue" />
                  <input
                    type="hidden"
                    name="path"
                    id="path"
                    label="path"
                    :value="`/article/${$page.posts.slug}`"
                  />
                  <input
                    type="hidden"
                    name="postId"
                    label="postId"
                    id="postId"
                    :value="$page.posts.postId"
                  />

                  <v-btn color="success" type="submit" class="mr-4" elevation="0">Submit</v-btn>
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

  comments: posts(id: $id) {
    postId: id
  
    belongsTo(filter: {typeName: {eq: Comments}}) {
      edges {
        node {
          ...on Comments {
            created_at
            data {
              first_name
              last_name
              comment
            }
          }
        }
      }
    }
  }


  posts(id: $id) {
    allowComments
    postId: id
    title
    body
    categories {
      title
      slug
      id
    }
    tags {
      title
      id
      slug
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
      formData: {},
      submitted: false,
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
  },
  methods: {
    encode(data) {
      return Object.keys(data)
        .map(
          key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key])
        )
        .join("&");
    },
    handleSubmit(e) {
      fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: this.encode({
          "form-name": e.target.getAttribute("name"),
          path: e.target.querySelector("#path").value,
          postId: e.target.querySelector("#postId").value,
          ...this.formData
        })
      })
        .then(response => {
          this.submitted = true;
        })
        .catch(error => {
          console.log("====================================");
          console.log(`error in submiting the form data:${error}`);
          console.log("====================================");
        });
    }
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



