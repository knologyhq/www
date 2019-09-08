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
      <v-col cols="12" md="4">
        <Logo />
        <SubscribeFormInline />
      </v-col>
      <v-col cols="12" md="2">
        <v-card flat tile>
          <v-list dense>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title
                  class="text--black font-weight-black text-uppercase"
                >General Inquiries</v-list-item-title>
                <v-list-item-subtitle>
                  <a href="mailto:contact@knology.com">contact@knology.com</a>
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title
                  class="text--black font-weight-black text-uppercase"
                >Press Inquiries</v-list-item-title>
                <v-list-item-subtitle>
                  <a href="mailto:press@knology.com">press@knology.com</a>
                </v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card>
      </v-col>
      <v-col cols="12" md="6">
        <v-container fluid>
          <v-row no-gutters class="pa-0">
            <v-col cols="12" md="4">
              <v-list dense>
                <v-list-item class="pl-1" text v-for="item in col1Items" :key="item.id">
                  <v-list-item-content class="my-0 py-0" dense>
                    <v-list-item-title>
                      <g-link
                        style="text-decoration: none"
                        class="text--black text-uppercase font-weight-bold black--text"
                        color="black"
                        :to="item.to"
                      >{{ item.title }}</g-link>
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-col>
            <v-col cols="12" md="4">
              <v-list dense>
                <v-list-item class="pl-1" text v-for="item in col2Items" :key="item.id">
                  <v-list-item-content class="my-0 py-0" dense>
                    <v-list-item-title>
                      <g-link
                        style="text-decoration: none"
                        class="text--black text-uppercase font-weight-bold black--text"
                        color="black"
                        :to="item.to"
                      >{{ item.title }}</g-link>
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
            </v-col>
            <v-col cols="12" md="4">
              <v-list dense>
                <v-list-item class="pl-1" text v-for="item in col3Items" :key="item.id">
                  <v-list-item-content class="my-0 py-0" dense>
                    <v-list-item-title>
                      <g-link
                        style="text-decoration: none"
                        class="text--black text-uppercase font-weight-bold black--text"
                        color="black"
                        :to="item.to"
                      >{{ item.title }}</g-link>
                    </v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </v-list>
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
import SubscribeFormInline from "~/components/SubscribeFormInline.vue";

export default {
  data() {
    return {
      searchMenu: null,
      drawer: null,
      col1Items: [
        { title: "Mission &amp; Vision", to: "/about/mission" },
        { title: "Community", to: "/community" },
        { title: "Our Team", to: "/our-team" },
        { title: "Contact", to: "/contact" }
      ],
      col2Items: [
        { title: "Jobs", to: "/careers" },
        { title: "Archive", to: "/archive" }
      ],
      col3Items: [
        { title: "Ethics", to: "/ethics" },
        { title: "Privacy Information", to: "/privacy" }
      ]
    };
  },
  components: {
    Toolbar,
    Logo,
    SubscribeFormInline
  }
};
</script>


