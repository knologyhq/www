<template>
  <Layout>
    <template slot="fluidLayout">
      <v-container fluid>
        <v-row class="mb-12">
          <v-col cols="12" md="4" class="white--text mx-0 pa-0" fill-height>
            <v-card
              class="mx-auto my-2 pa-4 pt-12 white--text"
              flat
              tile
              height="100%"
              :style="`background-image: linear-gradient(to right, rgba(38,96,147,1), rgba(19, 102, 96, .5)), url(${$page.allContact.edges[0].node.featureImage.url}); background-size: cover; background-position: 50% 50%`"
            >
              <v-card-title class="display-1 mb-1 font-weight-black">Contact Us</v-card-title>
              <v-card-text>
                <template v-for="email in $page.allContact.edges[0].node.emailAddresses">
                  <p class="subtitle white--text" :key="email.id">
                    <b>{{email.label}}</b>
                    <br />
                    <a :href="`mailto:${email.email}`" class="white--text">{{email.email}}</a>
                  </p>
                </template>
                <p class="subtitle white--text">Telephone: {{$page.allContact.edges[0].node.phone}}</p>

                <div
                  v-for="account in $page.allContact.edges[0].node.socialMedia"
                  :key="account.id"
                >
                  <Social :account="account" color="white" />
                </div>
              </v-card-text>

              <v-card-title class="headline mb-1">Mailing Address</v-card-title>
              <v-card-text>
                <p
                  class="white--text"
                  v-html="marked($page.allContact.edges[0].node.mailingAddress)"
                />
              </v-card-text>
              <!-- <SubscribeFormInline color="white" /> -->
            </v-card>
          </v-col>
          <v-col cols="12" md="7" class="col-offset-md-1" fill-height>
            <v-card class="mx-auto my-2 pa-4 pt-12" flat tile height="100%">
              <v-card-title class="display-1 mb-1 font-weight-black">Office Locations</v-card-title>
              <v-container>
                <template v-for="location in $page.allContact.edges[0].node.location">
                  <v-row :key="location.id">
                    <v-col cols="6" md="6">
                      <v-img class="elevation-6" :src="`${location.image.url}?auto`" />
                    </v-col>
                    <v-col cols="6" md="6">
                      <div class="headline mb-1">{{ location.title }}</div>
                      <div v-html="marked(location.address)" />
                    </v-col>
                  </v-row>
                </template>
              </v-container>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </template>
  </Layout>
</template>
<page-query>

query Dato {
  allContact {
    edges {
      node {
        phone
        featureImage {
          url
        }
        emailAddresses {
          email
          label
        }
        fax
        mailingAddress
        socialMedia {
          handle
          platform
          profileUrl
        }
        location {
          address
          id
          image {
            url
          }
          title
        }
      }
    }
  }
}

</page-query>
<script>
import Social from "~/components/Social.vue";
import SubscribeFormInline from "~/components/SubscribeFormInline.vue";

export default {
  metaInfo: {
    title: "Knology Home"
  },
  components: {
    Social,
    SubscribeFormInline
  }
};
</script>
<style lang="postcss">
.social-icon {
  width: 48px;
  height: 48px;
}
</style>