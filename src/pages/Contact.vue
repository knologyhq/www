<template>
  <Layout>
    <v-container fluid>
      <v-row>
        <v-col cols="5" class="white--text">
          <v-card class="mx-auto my-2" flat>
            <v-card-title class="headline mb-1">Contact Our Main Office</v-card-title>
            <v-card-text>
              <div>Email: {{$page.allContact.edges[0].node.email}}</div>
              <div>Telephone: {{$page.allContact.edges[0].node.phone}}</div>

              <div v-for="account in $page.allContact.edges[0].node.socialMedia" :key="account.id">
                <Social :account="account" color="secondary" />
              </div>
            </v-card-text>
          </v-card>
          <v-card class="mx-auto my-2" flat>
            <v-card-title class="headline mb-1">Mailing Address</v-card-title>
            <v-card-text>
              <div>{{$page.allContact.edges[0].node.mailingAddress}}</div>
            </v-card-text>
          </v-card>

          <SubscribeFormInline />
        </v-col>
        <v-col cols="7">
          <h4 class="title">Offices</h4>
          <div v-for="location in $page.allContact.edges[0].node.location" :key="location.id">
            <v-card class="mx-auto my-2" flat>
              <v-list-item three-line>
                <v-avatar class="profile mr-3" color="grey" size="200" tile>
                  <v-img tile :src="`${location.image.url}?auto=compress&h=200&fit=crop`" />
                </v-avatar>
                <v-list-item-content>
                  <v-list-item-title class="headline mb-1">{{ location.title }}</v-list-item-title>
                  <v-list-item-subtitle v-html="marked(location.address)" />
                </v-list-item-content>
              </v-list-item>
            </v-card>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </Layout>
</template>
<page-query>

query Dato {
  allContact {
    edges {
      node {
        phone
        email
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