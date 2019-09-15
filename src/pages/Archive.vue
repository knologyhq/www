<template>
  <Layout>
    <v-container>
<!--       <Banner :banner="{ image: $page.allArchive.edges[0].node.bannerImage.url, title: $page.allArchive.edges[0].node.title, copy: $page.allArchive.edges[0].node.bannerCopy, button: false }" />

      <v-row>
        <v-col cols="12" id="main" v-html="marked($page.allArchive.edges[0].node.introCopy)" />
      </v-row>
 -->
      <v-sheet class="mt-4">
        <v-tabs v-model="tab" color="primary" left>
          <v-tab>2019</v-tab>
          <v-tab>2018</v-tab>
        </v-tabs>
        <v-tabs-items v-model="tab">
          <v-tab-item>
            <v-data-table :headers="headers" :items="$page.alldataSheet2019.edges"></v-data-table>
          </v-tab-item>
          <v-tab-item>
            <v-data-table :headers="headers" :items="$page.alldataSheet2018.edges"></v-data-table>
          </v-tab-item>
        </v-tabs-items>
      </v-sheet>
    </v-container>
<!--     <template slot="cta">
      <Cta :cta="$page.allArchive.edges[0].node.cta" />
    </template> -->

<!--       query Dato {
    allArchive {
      edges {
         node {
           title
           bannerCopy
           introCopy
           bannerImage{
             url
            }
        }
      }
    }
  } -->

  </Layout>
</template>


<page-query>



  query GoogleData {
    alldataSheet2019(filter: {Row_Should_Be_Visible_on_Website_: { eq: "Yes"}}) {
      edges {
        node {
          Row_Should_Be_Visible_on_Website_       
          Publication_Title
          Funder_Name
          Grant_Number
          Project_Name
          Research_Area
          Initiative
          Authors
          Publication_Date
          Citation
          Instruments___Data_URL__When_Available_     
        }
      }
    }
    alldataSheet2018(filter: {Row_Should_Be_Visible_on_Website_: { eq: "Yes"}}) {
      edges {
        node {
          Row_Should_Be_Visible_on_Website_       
          Publication_Title
          Funder_Name
          Grant_Number
          Project_Name
          Research_Area
          Initiative
          Authors
          Publication_Date
          Citation
          Instruments___Data_URL__When_Available_
        }
      }
    }
  }

</page-query>

<script>
import Banner from "~/components/Banner.vue";
import Cta from "~/components/Cta.vue";

export default {
  components: {
    Cta,
    Banner
  },
  data() {
    return {
      tab: null,
      headers: [
        {
          sortable: true,
          text: "Title",
          value: "node.Publication_Title"
        },
        {
          sortable: false,
          text: "Funder Name",
          value: "node.Funder_Name"
        },
        {
          sortable: false,
          text: "Grant Number",
          value: "node.Grant_Number"
        },
        {
          sortable: true,
          text: "Project Name",
          value: "node.Project_Name"
        },
        {
          sortable: false,
          text: "Research Area",
          value: "node.Research_Area"
        },
        {
          sortable: false,
          text: "Initiative",
          value: "node.Initiative"
        },
        {
          sortable: false,
          text: "Authors",
          value: "node.Authors"
        },
        {
          sortable: true,
          text: "Publication Date",
          value: "node.Publication_Date"
        },
        {
          sortable: false,
          text: "Citation",
          value: "node.Citation"
        },
        {
          sortable: false,
          text: "Instruments & Data URL (When Available)",
          value: "node.Instruments___Data_URL__When_Available_"
        }
      ]
    };
  }
};
</script>

<style lang="postcss" scoped>
.body {
  columns: 2 auto;
  orphans: 3;
}
.banner {
  background-size: cover;
}
</style>