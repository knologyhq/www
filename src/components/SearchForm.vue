<template>
  <div>
    <!-- <v-text-field v-model="searchTerm" />
    <p>{{ searchResults }}</p>-->
    <!-- :close-on-content-click="true" -->

    <v-menu
      offset-y
      bottom
      full-width
      min-width="100%"
      z-index="10000000"
      :close-on-content-click="false"
    >
      <template v-slot:activator="{ on }">
        <v-btn icon v-on="on" class="ml-2">
          <!-- @click="setFocus()" -->
          <SearchIcon color="#FF7043" />
          <!-- <font-awesome :icon="['fa', 'search']" /> -->
        </v-btn>
      </template>
      <v-list class="pa-4" tile>
        <v-form ref="search">
          <v-text-field v-model="searchTerm" placeholder="Search articles" />
          <v-list-item v-for="post in searchResults" :key="post.id" :to="`/article/${post.slug}`">
            <v-list-item-content>
              <v-list-item-title v-text="post.title" />
              <v-list-item-subtitle v-if="post.subtitle" v-text="post.subtitle" />
            </v-list-item-content>
          </v-list-item>
        </v-form>
      </v-list>
    </v-menu>
  </div>
</template>

<static-query>
query Posts {
  posts: allPosts {
    edges {
      node {
        slug
        subtitle
        body
        title
        id
      }
    }
  }
}
</static-query>

<script>
import Flexsearch from "flexsearch";
import SearchIcon from "~/components/SearchIcon";
import colors from "vuetify/lib/util/colors";
export default {
  // methods: {
  //   setFocus: function() {
  // alert("hey");
  // this.$nextTick(() => this.$refs.search.$el.input.focus());
  //   }
  // },
  components: {
    SearchIcon
  },
  data() {
    return {
      searchMenu: null,
      index: null,
      searchTerm: ""
    };
  },
  beforeMount() {
    this.index = new Flexsearch({
      tokenize: "forward",
      doc: {
        id: "id",
        field: ["title", "subtitle", "body"]
      }
    });
    this.index.add(this.$static.posts.edges.map(e => e.node));
  },
  computed: {
    searchResults() {
      if (this.index === null || this.searchTerm.length < 2) return [];
      return this.index.search({
        query: this.searchTerm,
        limit: 10
      });
    }
  }
};
</script>
