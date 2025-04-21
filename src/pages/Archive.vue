<template>
  <Layout>
    <v-container>
      <Banner
        v-if="allArchiveData"
        :banner="{
          image: allArchiveData.bannerImage.url,
          title: allArchiveData.title,
          copy: allArchiveData.bannerCopy,
          button: false
        }"
        id="archiveBanner"
      />
      <v-row v-if="allArchiveData">
        <v-col cols="12" id="main" v-html="marked(allArchiveData.introCopy)" />
      </v-row>

      <v-sheet class="mt-4" v-if="years.length">
        <v-tabs v-model="tab" color="primary" left>
          <v-tab v-for="(year, index) in years" :key="index">{{ year }}</v-tab>
        </v-tabs>
        <v-tabs-items v-model="tab">
          <v-tab-item v-for="(year, index) in years" :key="index">
            <div>
              <template v-if="getDataForYear(year).length">
                <v-data-table
                  :headers="headers"
                  :items="getDataForYear(year)"
                  dense
                >
                  <template v-slot:[`item.node.Instruments___Data_URL__When_Available_`]="{ item }">
                    <span v-if="isValidUrl(item.node.Instruments___Data_URL__When_Available_)">
                      <a
                        :href="item.node.Instruments___Data_URL__When_Available_"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {{ item.node.Instruments___Data_URL__When_Available_ }}
                      </a>
                    </span>
                    <span v-else>
                      {{ item.node.Instruments___Data_URL__When_Available_ }}
                    </span>
                  </template>
                </v-data-table>
              </template>
              <p v-else>No data available for {{ year }}</p>
            </div>
          </v-tab-item>
        </v-tabs-items>
      </v-sheet>
      <p v-else>No years available.</p>
    </v-container>
  </Layout>
</template>

<page-query>
query ArchiveData {
  allArchive {
    edges {
      node {
        title
        bannerImage {
          url
        }
        bannerCopy
        introCopy
      }
    }
  }
  # Dynamically fetch all years
  allDataSheet2025: allDataSheet2025(filter: { Row_Should_Be_Visible_on_Website_: { eq: "Yes" } }) {
    edges {
      node {
        Publication_Title
        Funder_Name
        Grant_Number
        Project_Name
        Publication_Date
        Citation
        Instruments___Data_URL__When_Available_
      }
    }
  }
  allDataSheet2024: allDataSheet2024(filter: { Row_Should_Be_Visible_on_Website_: { eq: "Yes" } }) {
    edges {
      node {
        Publication_Title
        Funder_Name
        Grant_Number
        Project_Name
        Publication_Date
        Citation
        Instruments___Data_URL__When_Available_
      }
    }
  }
  allDataSheet2023: allDataSheet2023(filter: { Row_Should_Be_Visible_on_Website_: { eq: "Yes" } }) {
    edges {
      node {
        Publication_Title
        Funder_Name
        Grant_Number
        Project_Name
        Publication_Date
        Citation
        Instruments___Data_URL__When_Available_
      }
    }
  }
  allDataSheet2022: allDataSheet2022(filter: { Row_Should_Be_Visible_on_Website_: { eq: "Yes" } }) {
    edges {
      node {
        Publication_Title
        Funder_Name
        Grant_Number
        Project_Name
        Publication_Date
        Citation
        Instruments___Data_URL__When_Available_
      }
    }
  }
  allDataSheet2021: allDataSheet2021(filter: { Row_Should_Be_Visible_on_Website_: { eq: "Yes" } }) {
    edges {
      node {
        Publication_Title
        Funder_Name
        Grant_Number
        Project_Name
        Publication_Date
        Citation
        Instruments___Data_URL__When_Available_
      }
    }
  }
  allDataSheet2020: allDataSheet2020(filter: { Row_Should_Be_Visible_on_Website_: { eq: "Yes" } }) {
    edges {
      node {
        Publication_Title
        Funder_Name
        Grant_Number
        Project_Name
        Publication_Date
        Citation
        Instruments___Data_URL__When_Available_
      }
    }
  }
  allDataSheet2019: allDataSheet2019(filter: { Row_Should_Be_Visible_on_Website_: { eq: "Yes" } }) {
    edges {
      node {
        Publication_Title
        Funder_Name
        Grant_Number
        Project_Name
        Publication_Date
        Citation
        Instruments___Data_URL__When_Available_
      }
    }
  }
  allDataSheet2018: allDataSheet2018(filter: { Row_Should_Be_Visible_on_Website_: { eq: "Yes" } }) {
    edges {
      node {
        Publication_Title
        Funder_Name
        Grant_Number
        Project_Name
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

export default {
  metaInfo: {
    title: "Archive of Publications and Datasets",
  },
  components: {
    Banner,
  },
  data() {
    return {
      tab: 0,
      years: [2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018],
      headers: [
        { sortable: true, text: "Title", value: "node.Publication_Title" },
        { sortable: false, text: "Funder Name", value: "node.Funder_Name" },
        { sortable: false, text: "Grant Number", value: "node.Grant_Number" },
        { sortable: true, text: "Project Name", value: "node.Project_Name" },
        { sortable: true, text: "Publication Date", value: "node.Publication_Date" },
        { sortable: false, text: "Citation", value: "node.Citation" },
        {
          sortable: false,
          text: "Instruments & Data URL (When Available)",
          value: "node.Instruments___Data_URL__When_Available_",
        },
      ],
    };
  },
  computed: {
    allArchiveData() {
      return this.$page?.allArchive?.edges[0]?.node || null;
    },
  },
  methods: {
    getDataForYear(year) {
      const dataset = this.$page?.[`allDataSheet${year}`];
      if (!dataset) {
        console.warn(`No data found for year: ${year}`);
      }
      return dataset?.edges || [];
    },
    isValidUrl(value) {
      try {
        return Boolean(new URL(value));
      } catch {
        return false;
      }
    },
  },
};
</script>

<style scoped>
.archive-page {
  columns: 2 auto;
  orphans: 3;
}
.banner {
  background-size: cover;
}
</style>
