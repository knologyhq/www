<template>
  <v-toolbar flat>
    <v-toolbar-title>
      <v-img src="/logo.png" class="mr-5" contain height="48" width="48" />
    </v-toolbar-title>

    <v-spacer></v-spacer>

    <v-toolbar-items>
      <v-btn text v-for="item in items" :key="item.id">
        <v-menu
          v-if="item.action === 'menu' && item.title == 'Publication'"
          :close-on-content-click="false"
          bottom
          offset-y
          full-width
          min-width="100%"
          z-index="10000000"
        >
          <template v-slot:activator="{ on }">
            <span text id="pub-btn" color="primary" v-on="on">{{ item.title }}</span>
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

        <template v-if="item.action === 'menu' && item.title == 'About'">
          <v-menu offset-y :key="item.id">
            <template v-slot:activator="{ on }">
              <span text color="primary" v-on="on">{{item.title}}</span>
            </template>
            <v-list>
              <v-list-item v-for="page in $static.about.edges" :key="page.id">
                <v-list-item-content>
                  <g-link :to="`/about/${page.node.slug}`">{{page.node.title}}</g-link>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-menu>
        </template>

        <span text v-else-if="item.action !== 'menu'">
          <g-link class="nav__link" :to="item.to">{{ item.title }}</g-link>
        </span>
      </v-btn>
      <v-btn rounded color="info" elevation="0" to="/donate">Donate</v-btn>
    </v-toolbar-items>

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

<script>
export default {
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
