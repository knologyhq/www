<template>
  <v-toolbar flat>
    <v-toolbar-title>
      <g-link to="/">
        <v-img src="/logo.png" class="mr-5" contain height="48" width="48" />
      </g-link>
    </v-toolbar-title>

    <v-spacer></v-spacer>
    <div v-for="item in items" :key="item.id">
      <template v-if="item.action === 'menu' && item.title == 'Publication'">
        <v-btn text class="deep-orange--text lighten-1 mx-2">
          <v-menu
            :close-on-content-click="false"
            bottom
            offset-y
            class="mt-4"
            full-width
            min-width="100%"
            z-index="10000000"
          >
            <template v-slot:activator="{ on }">
              <span text id="pub-btn" v-on="on">
                {{ item.title }}
                <v-icon right>mdi-chevron-down</v-icon>
              </span>
            </template>
            <v-card class="pa-0 ma-0">
              <v-container fluid class="pa-0 ma-0">
                <v-row no-gutters>
                  <v-col cols="2" v-for="pillar in $static.pillars.edges" :key="pillar.id">
                    <v-card
                      flat
                      tile
                      height="300"
                      class="pa-3 ma-0"
                      :color="`${pillar.node.colour ? pillar.node.colour.hex : 'light-blue'}`"
                    >
                      <v-list color="transparent">
                        <v-list-item-group>
                          <v-list-item :to="`/category/${pillar.node.slug}`">
                            <v-list-item-content>
                              <v-list-item-title
                                class="white--text font-weight-bold"
                              >{{pillar.node.title}}</v-list-item-title>
                            </v-list-item-content>
                          </v-list-item>
                          <v-list-item
                            :to="`/initiative/${initiative.slug}`"
                            v-for="initiative in pillar.node.initiative"
                            :key="initiative.id"
                          >
                            <v-list-item-content>
                              <v-list-item-title class="white--text">{{initiative.title}}</v-list-item-title>
                            </v-list-item-content>
                          </v-list-item>
                        </v-list-item-group>
                      </v-list>
                    </v-card>
                  </v-col>
                </v-row>
              </v-container>
            </v-card>
          </v-menu>
        </v-btn>
      </template>

      <template v-if="item.action === 'menu' && item.title == 'About'">
        <v-btn text class="deep-orange--text lighten-1 mx-2">
          <v-menu offset-y :key="item.id">
            <template v-slot:activator="{ on }">
              <span text color="primary" v-on="on">
                {{item.title}}
                <v-icon right>mdi-chevron-down</v-icon>
              </span>
            </template>
            <v-list>
              <v-list-item
                v-for="page in $static.about.edges"
                :key="page.id"
                :to="`/about/${page.node.slug}`"
              >{{page.node.title}}</v-list-item>
            </v-list>
          </v-menu>
        </v-btn>
      </template>
      <template v-else-if="item.action !== 'menu'">
        <v-btn text class="deep-orange--text lighten-1 mx-2" :to="item.to">{{ item.title }}</v-btn>
      </template>
    </div>

    <v-btn
      rounded
      color="deep-orange"
      class="lighten-1 white--text ml-2"
      elevation="0"
      to="/donate"
    >Donate</v-btn>
    <SearchForm />

    <!-- <template v-if="$vuetify.breakpoint.smAndDown">
      <v-btn icon>Menu</v-btn>
    </template>-->
  </v-toolbar>
</template>

<static-query>
query  {
  pillars: allPillars(sortBy: "position", order: ASC) {
    edges {
      node {
        title
        id
        slug
        colour { hex }
        initiative {
          title
          slug
        }
      }
    }
  }
  about: allAbout {
    edges {
      node {
        slug
        title
        id
      }
    }
  }
}

</static-query>

<style lang="postcss">
.v-toolbar .v-btn__content {
  text-transform: none;
  letter-spacing: 0;
}
</style>
<script>
import SearchForm from "~/components/SearchForm.vue";

export default {
  components: {
    SearchForm
  },
  data() {
    return {
      drawer: null,
      items: [
        { title: "Home", to: "/" },
        { title: "Publication", to: "/publication", action: "menu" },
        { title: "Community", to: "/community" },
        { title: "Our Team", to: "/our-team" },
        { title: "About", to: "/about", action: "menu" },
        { title: "Contact", to: "/contact" }
      ]
    };
  }
};
</script>
