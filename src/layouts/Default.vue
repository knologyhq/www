<template>
  <v-app id="knology">
    <div v-if="$slots.alertBanner">
      <slot name="alertBanner" />
    </div>
    <header class="header">
      <toolbar />
    </header>
    <div v-if="$slots.textBanner">
      <slot name="textBanner" />
    </div>
    <div v-if="$slots.imageBanner">
      <slot name="imageBanner" />
    </div>
    <v-content>
      <v-container>
        <v-slide-y-transition mode="out-in">
          <v-row>
            <v-col cols="12">
              <slot />
            </v-col>
          </v-row>
        </v-slide-y-transition>
      </v-container>
    </v-content>
    <div v-if="$slots.textBannerAppend">
      <slot name="textBannerAppend" />
    </div>
    <div id="cta" v-if="$slots.cta">
      <slot name="cta" />
    </div>
    <v-footer padless color="white">
      <v-col cols="3">
        <Logo />
        <h4 class="subtitle-1">Subscribe to our newsletter</h4>
        <v-text-field></v-text-field>
        <v-btn small color="primary">Subscribe</v-btn>
      </v-col>
      <v-col cols="3">
        <v-card flat tile>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>General Inquiries</v-list-item-title>
              <v-list-item-subtitle>contact@knology.com</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-content>
              <v-list-item-title>Press Inquiries</v-list-item-title>
              <v-list-item-subtitle>press@knology.com</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-card>
      </v-col>
      <v-col cols="6">
        <v-container>
          <v-row no-gutters>
            <v-col cols="sm">
              <v-list-item text v-for="item in col1Items" :key="item.id">
                <v-list-item-content>
                  <v-list-item-title>
                    <g-link class="nav__link" :to="item.to">{{ item.title }}</g-link>
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-col>
            <v-col cols="sm">
              <v-list-item text v-for="item in col2Items" :key="item.id">
                <v-list-item-content>
                  <v-list-item-title>
                    <g-link class="nav__link" :to="item.to">{{ item.title }}</g-link>
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-col>
            <v-col cols="sm">
              <v-list-item text v-for="item in col3Items" :key="item.id">
                <v-list-item-content>
                  <v-list-item-title>
                    <g-link class="nav__link" :to="item.to">{{ item.title }}</g-link>
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-col>
          </v-row>
        </v-container>
      </v-col>

      <v-col
        class="primary lighten-2 py-4 white--text"
        cols="12"
      >Unless otherwise noted this site and its contents are licensed under a Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported License</v-col>
    </v-footer>
  </v-app>
</template>

<static-query>
query {
  metaData {
    siteName
  }

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
</static-query>

<style lang="postcss">
body {
  font-family: var(--font-family-body);
}
h1,
h2,
h3 {
  font-family: var(--font-family-headers);
}
</style>
<script>
import Toolbar from "~/components/Toolbar.vue";
import Logo from "~/components/Logo.vue";

export default {
  data() {
    return {
      searchMenu: null,
      drawer: null,
      col1Items: [
        { title: "About", to: "/about/mission" },
        { title: "Publications", to: "/?publications" },
        { title: "Our Team", to: "/our-team" },
        { title: "Careers", to: "/careers" }
      ],

      col2Items: [
        { title: "Community", to: "/community" },
        { title: "Contact", to: "/contact" },
        { title: "Ethics", to: "/ethics" }
      ],
      col3Items: [
        { title: "Archive", to: "/archive" },
        { title: "Privacy Policy", to: "/privacy" }
      ]
    };
  },
  components: {
    Toolbar,
    Logo
  }
};
</script>


