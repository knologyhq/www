<template>
  <div>
    <v-toolbar flat>
      <template v-if="$route.path !== '/'">
        <g-link to="/">
          <Logo logoClasses="logo small" />
        </g-link>
      </template>
      <v-spacer></v-spacer>

      <div v-for="item in items" :key="item.id" class="hidden-sm-and-down">

        <template v-if="item.action === 'menu' && item.title == 'About'">
          <v-btn text class="primary--text mx-2">
            <v-menu :offset-y="true" bottom :key="item.id">
              <template v-slot:activator="{ on }">
                <span text class="menu-toggle" color="primary" v-on="on">
                  {{ item.title }}
                  <v-icon right>mdi-chevron-down</v-icon>
                </span>
              </template>
              <v-list>
                <v-list-item
                  v-for="page in $static.about.edges"
                  :key="page.id"
                  :to="`/about/${page.node.slug}`"
                >{{ page.node.title }}</v-list-item>
              </v-list>
            </v-menu>
          </v-btn>
        </template>

        <template v-if="item.action === 'menu' && item.title == 'Services'">
          <v-btn text class="primary--text mx-2">
            <v-menu :offset-y="true" bottom :key="item.id">
              <template v-slot:activator="{ on }">
                <span text class="menu-toggle" color="primary" v-on="on">
                  {{ item.title }}
                  <v-icon right>mdi-chevron-down</v-icon>
                </span>
              </template>
              <v-list>
                <v-list-item
                  v-for="page in $static.services.edges"
                  :key="page.id"
                  :to="`/services/${page.node.slug}`"
                >{{ menuLabelFromSlug(page.node) }}</v-list-item>
              </v-list>
            </v-menu>
          </v-btn>
        </template>

        <template v-else-if="item.action !== 'menu'">
          <v-btn text class="primary--text mx-2" :to="item.to">{{ item.title }}</v-btn>
        </template>
      </div>

      <v-btn
        color="secondary"
        class="white--text ml-2 hidden-sm-and-down"
        elevation="0"
        href="/donate"
      >Donate</v-btn>

      <div class="hidden-md-and-up">
        <v-icon color="primary" @click.stop="drawer = !drawer">mdi-menu</v-icon>
      </div>
      <SearchForm />
    </v-toolbar>

    <v-navigation-drawer
      app
      v-model="drawer"
      width="100%"
      hide-overlay
      temporary
      :clipped="true"
      id="drawer"
    >
      <v-toolbar flat>
        <v-spacer />
        <v-btn icon right dark @click="drawer = false">
          <v-icon color="primary">mdi-close</v-icon>
        </v-btn>
      </v-toolbar>
      <v-list nav>
        <v-list-item v-for="item in items" :key="item.id" :to="item.to">
          <template v-if="item.to">
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </template>

          <template v-else-if="item.action === 'menu' && item.title == 'About'">
            <v-list-item>
              <v-list-group active-class="active-research-menu">
                <template v-slot:activator>
                  <v-list-item-title>{{ item.title }}</v-list-item-title>
                </template>
                <v-list-item-content>
                  <v-list>
                    <v-list-item
                      v-for="page in $static.about.edges"
                      :key="page.id"
                      :to="`/about/${page.node.slug}`"
                    >{{ page.node.title }}</v-list-item>
                  </v-list>
                </v-list-item-content>
              </v-list-group>
            </v-list-item>
          </template>

          <template v-else-if="item.action === 'menu' && item.title == 'Services'">
            <v-list-item>
              <v-list-group active-class="active-research-menu">
                <template v-slot:activator>
                  <v-list-item-title>{{ item.title }}</v-list-item-title>
                </template>
                <v-list-item-content>
                  <v-list>
                    <v-list-item
                      v-for="page in $static.services.edges"
                      :key="page.id"
                      :to="`/services/${page.node.slug}`"
                    >{{ menuLabelFromSlug(page.node) }}</v-list-item>
                  </v-list>
                </v-list-item-content>
              </v-list-group>
            </v-list-item>
          </template>

        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<static-query>
query  {
  pillars: allPillars(filter: {slug: {ne: "general"}}, sortBy: "position", order: ASC) {
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
  services: allServices {
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
.menu-toggle {
  padding: 10px 0;
}

svg.logo.small {
  width: 160px;
  height: 56px;
}
</style>
<script>
import SearchForm from "~/components/SearchForm.vue";
import Logo from "~/components/Logo.vue";

export default {
  components: { SearchForm, Logo },
  data() {
    return {
      dialog: false,
      drawer: null,
      offset: true,
      items: [
        { title: "Home", to: "/" },
        { title: "Research", to: "/articles" },
        { title: "Community", to: "/community" },
        { title: "Our Team", to: "/our-team" },
        { title: "About", action: "menu" },
        { title: "Services", action: "menu" },
        { title: "Contact", to: "/contact" }
      ]
    };
  },
  methods: {
    // Turn "research-services-from-knology" → "Research Services from Knology"
    slugToTitle(slug) {
      if (!slug) return "";
      const smallWords = new Set([
        "a","an","and","as","at","but","by","for","from","in","into","nor","of",
        "on","onto","or","per","the","to","via","vs","with"
      ]);
      const words = slug.replace(/[-_]+/g, " ").trim().split(/\s+/);
      return words
        .map((w, i) => {
          const lower = w.toLowerCase();
          // Keep small words lowercase unless first/last
          if (i > 0 && i < words.length - 1 && smallWords.has(lower)) return lower;
          // Basic capitalization
          return lower.charAt(0).toUpperCase() + lower.slice(1);
        })
        .join(" ");
    },
    menuLabelFromSlug(node) {
      // Prefer slug-derived Title Case; fall back to node.title
      return node?.slug ? this.slugToTitle(node.slug) : (node?.title || "");
    }
  }
};
</script>
