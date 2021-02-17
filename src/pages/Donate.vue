<template>
  <Layout>
    <template slot="fluidLayout">
      <v-container fluid id="donate-page">
        <v-row class="mb-12">
          <v-col id="donate-left" cols="12" md="5" class="white--text mx-0 pa-0" fill-height>
            <v-card
              
              class="mx-auto my-2 py-12 px-12 white--text"
              flat
              tile
              height="100%"
              :style="`background-image: linear-gradient(to right, rgba(38,96,147,1), rgba(19, 102, 96, .5)), url(${$page.allDonate.edges[0].node.bannerImage.url}); background-size: cover; background-position: 50% 50%`"
            >
              <v-card-title class="display-2 mb-1 font-weight-black">{{$page.allDonate.edges[0].node.title}}</v-card-title>

              <div class="mb-1 donate-subtitle" v-html="marked($page.allDonate.edges[0].node.bannerCopy)" />

                    <v-btn
        color="secondary"
        class="white--text ml-2"
        elevation="10"
        target="_blank"
        href="https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=YR9RTSD34X6NY&source=url"
      >Donate</v-btn>

              <div class="guidestar">
                <a href="https://www.guidestar.org/profile/45-4393574" target="_blank"><img src="https://widgets.guidestar.org/gximage2?o=9237384&l=v4" /></a>
              </div>

            </v-card>
          </v-col>
          <v-col cols="12" md="7" class="col-offset-md-1" fill-height id="donate-right">
            <v-card class="mx-auto my-2 pa-4 pt-12 px-12" flat tile height="100%">
              <v-card-title class="display-1 mb-1 font-weight-black">Got Change? Make Change</v-card-title>
              <v-container>
                  <v-row>
                    <v-col cols="12" md="8">
                       <div v-html="marked($page.allDonate.edges[0].node.body)" />
                    </v-col>
                  </v-row>
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
  allDonate{
    edges{
      node{
        title
        body
        bannerCopy
        bannerImage{
         url
        }
      }
    }
  }
}
</page-query>
<script>
import Banner from "~/components/Banner.vue";

export default {
  metaInfo() {
    return {
      title: "Donate"
    };
  },
  components: {
    Banner
  }
};
</script>
<style lang="postcss">
.banner {
  background-size: cover;
}


div#donate-left .v-sheet {
  padding-left: 20%!important;
  padding-top:80px!important;
  padding-bottom: 240px!important;
}

#donate-right .v-sheet {padding-left:20%important;}
.donate-subtitle {
  padding-left:16px!important;
  margin-top:30px!important;
}

.donate-subtitle h2 {margin-bottom:10px!important;}

#donate-left a.v-btn {
  margin-left: 16px!important;
  display: block!important;
    width: 160px;
    height: 50px;
    border-radius: 5px;
    margin-top:60px!important;
}

#donate-left a.v-btn span{
height: 50px!important;
    font-size: 1rem;
    font-weight: 700;

}

</style>