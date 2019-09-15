<template>
  <v-app id="knology">
    <div v-if="$slots.alertBanner">
      <slot name="alertBanner" />
    </div>
    <header class="header mt-6">
      <toolbar />
    </header>
    <div v-if="$slots.textBanner">
      <slot name="textBanner" />
    </div>
    <div v-if="$slots.imageBanner">
      <slot name="imageBanner" />
    </div>
    <!-- regular pages in contained layout -->
    <template v-if="!$slots.fluidLayout">
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
    </template>
    <!-- full-width (fluid) pages -->

    <div v-if="$slots.fluidLayout">
      <slot name="fluidLayout" />
    </div>

    <div v-if="$slots.textBannerAppend">
      <slot name="textBannerAppend" />
    </div>
    <div id="cta" v-if="$slots.cta">
      <slot name="cta" />
    </div>
    <v-footer padless color="white">
      <v-container fluid class="mb-0 pb-0">
        <v-row align-content="start" class="py-12">
          <v-col cols="12" md="3" class="footer-logo">
            <Logo logoClasses="logo small" />
            <SubscribeFormBlock />
          </v-col>
          <v-col cols="12" md="3" class="py-sm-0 my-sm-8 my-md-0">
            <ul class="footer-contact">
              <li class="mb-12">
                <p class="text--black font-weight-black text-uppercase mb-0">General Inquiries</p>
                <p>
                  <a
                    class="grey--text darken-2"
                    href="mailto:info@knology.org"
                  >info@knology.org</a>
                </p>
              </li>
              <!--
              <li>
                <p class="text--black font-weight-black text-uppercase mb-0">Press Inquiries</p>
                <p>
                  <a class="grey--text darken-2" href="mailto:press@knology.com">press@knology.com</a>
                </p>
                -->
              </li>
            </ul>
            <div v-for="account in $static.allContact.edges[0].node.socialMedia" :key="account.id">
              <Social :account="account" color="primary" />
            </div>
          </v-col>

          <v-col cols="12" md="2" class="py-sm-0">
            <ul>
              <li v-for="item in col1Items" :key="item.id" class="mb-sm-3 mb-md-6">
                <g-link
                  style="text-decoration: none"
                  class="text--black text-uppercase font-weight-bold black--text"
                  color="black"
                  :to="item.to"
                >{{ item.title }}</g-link>
              </li>
            </ul>
          </v-col>
          <v-col cols="12" md="2" class="py-sm-0">
            <ul>
              <li v-for="item in col2Items" :key="item.id" class="mb-sm-3 mb-md-6">
                <g-link
                  style="text-decoration: none"
                  class="text--black text-uppercase font-weight-bold black--text"
                  color="black"
                  :to="item.to"
                >{{ item.title }}</g-link>
              </li>
            </ul>
          </v-col>
          <v-col cols="12" md="2" class="pt-sm-0">
            <ul>
              <li v-for="item in col3Items" :key="item.id" class="mb-sm-3 mb-md-6">
                <g-link
                  style="text-decoration: none"
                  class="text--black text-uppercase font-weight-bold black--text"
                  color="black"
                  :to="item.to"
                >{{ item.title }}</g-link>
              </li>
            </ul>
          </v-col>
        </v-row>

        <v-row>
          <v-col
            class="primary py-4 white--text"
            cols="12"
          >Unless otherwise noted this site and its contents are licensed under a Creative Commons Attribution-NonCommercial-ShareAlike 3.0 Unported License</v-col>
        </v-row>
      </v-container>
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
  allContact {
    edges {
      node {
        socialMedia {
          handle
          platform
          profileUrl
        }
      }
    }
  }
}
</static-query>
<style lang="postcss">
#app {
  footer {
    ul {
      list-style: none;
      margin: 0;
      padding: 0;
      li {
        margin: 0;
        padding: 0;
      }
    }
    .footer-contact {
      li {
        margin-bottom:10px!important;
      }
    }
  }
}

.footer-logo {
  padding-top:0!important;
}

footer .v-input__slot {
  width:80%!important;
}
</style>

<script>
import Toolbar from "~/components/Toolbar.vue";
import Logo from "~/components/Logo.vue";
import SubscribeFormBlock from "~/components/SubscribeFormBlock.vue";
import Social from "~/components/Social.vue";

export default {
  watch: {
    $route(to, from) {
      this.searchMenu = null;
    }
  },
  data() {
    return {
      searchMenu: null,
      drawer: null,
      alert: true,
      col1Items: [
        { title: "Mission & Vision", to: "/about/mission" },
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
    SubscribeFormBlock,
    Social
  }
};
</script>


