
<template>
  <Layout :title="$page.posts.title">
    <template slot="imageBanner">
      <v-responsive
        v-if="$page.posts.image"
        fluid
        height="500"
        class="white--text py-12 banner post-banner-image"
        :style="`background-image: url(${$page.posts.image.url})`"
      />
      <v-responsive
        v-else
        fluid
        height="200"
        class="white--text py-12 banner"
        style="background-color: #00A2AE"
      />
    </template>

    <v-container>
      <v-row id="main">
        <v-col cols="12" md="8">
          <v-card flat id="post-category-container" class="mb-8" v-if="$page.posts.categories[0]">
            <v-card-text class="pa-0 mb-0 ml-n3">
              <span class="category" v-for="category in $page.posts.categories" :key="category.id">
                <v-btn
                  text
                  color="grey darken-2"
                  :to="`/articles/category/${ category.slug }`"
                >{{ category.title }}</v-btn>
              </span>
              <br />
            </v-card-text>
          </v-card>

          <div class="post-title-container black--text font-weight-black display-1" v-html="marked($page.posts.title)" />
          <div v-if="$page.posts.subtitle">
            <div
              class="grey--text font-italic font-weight-normal subtitle"
              v-html="marked($page.posts.subtitle)"
            />
          </div>

          <span class="font-italic">
            <template v-if="$page.posts.authors[0]">
              by
              <span class="author" v-for="author in $page.posts.authors" :key="author.id">
                <g-link :to="`/person/${author.slug}`" class="subtitle-1">{{ author.name }}</g-link>
              </span>
            </template>
            <template v-if="$page.posts.additionalAuthors">
              <span
                class="author subtitle-1"
                v-for="author in $page.posts.additionalAuthors"
                :key="author.id"
              >{{ author }}</span>
            </template>
          </span>

          <div
            class="pr-1 black--text subtitle-1 mb-2"
          >{{$page.posts.publishDate | moment("MMM D, YYYY") }}</div>

          <v-row id="post-button-container">
            <v-col>
              <v-btn
                v-if="$page.posts.dataFile"
                x-large
                class="deep-orange lighten1 white--text mr-3"
                elevation="0"
                :href="$page.posts.dataFile"
              >{{$page.posts.dataFileLabel ? $page.posts.dataFileLabel : "Download Data"}}</v-btn>
              <v-btn
                v-if="$page.posts.postFile"
                x-large
                class="deep-orange lighten1 white--text"
                elevation="0"
                :href="$page.posts.postFile.url"
              >Full Document</v-btn>
            </v-col>
          </v-row>
          <div id="post-body" v-html="marked($page.posts.body)" />
            <div class="post-tag-container">
              <span v-for="tag in $page.posts.tags" :key="tag.id" class="my-2 post-tags">
                <v-btn
                  text
                  elevation="0"
                  color="secondary"
                  dark
                  :to="`/articles/tag/${ tag.slug }`"
                >{{ tag.title }}</v-btn>
              </span>
           </div>

          <!-- todo: make a component for comment block -->
          <template id="comments" v-if="$page.posts.allowComments == true">
            <v-row v-if="$page.comments.belongsTo.edges[0]">
              <v-col sm="12" class="mt-12">
                <div class="title">Comments</div>
                <span
                  cols="12"
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
              <v-col sm="12" class="mt-12">
                <div class="title mb-2 font-weight-black">Join the Conversation</div>
                <div id="comment-subtitle" class="subtitle mb-2">What did you think of this? How did you use it? Is there something else we should be thinking of?</div>
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
          </template>
        </v-col>

        <v-col cols="12" md="4">
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

query Dato($id: ID!)  {

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
    additionalAuthors
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
      slug
      id
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
    dataFileLabel
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
      title:this.$page.posts.title,
      meta: [
        { name: "author", content: "Knology" },
        { name: "description", content:this.$page.posts.body},
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:site", content: "@KnologyResearch" },
        { name: "twitter:title", content: this.$page.posts.title},
        {
          name: "twitter:description",
          content:
            this.$page.posts.body
        },
        {
          name: "twitter:image",
          content: this.$page.posts.image.url
        }
      ]
    };

  },
  watch: {
    $route(to, from) {
      this.submitted = false;
    }
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

<style lang="postcss">
.banner {
  background-size: cover;
}
.category + .category:before {
  content: " | ";
}
.author + .author:before {
  content: ", ";
}

#comment-subtitle {
  margin-bottom:30px!important;
}

#post-body {
  p {
    img {
      max-width: 100%;
    }
  }
}
</style>



