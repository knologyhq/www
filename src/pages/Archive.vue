<template>
  <Layout>
    <v-container>
      <div class="display-2 mb-4">Archive</div>
      <v-data-table :headers="headers" :items="$page.alldataSheet.edges"></v-data-table>
    </v-container>
  </Layout>
</template>
<page-query>


  query GoogleData {
    alldataSheet {
      edges {
        node {
          Project_Name
          Initiative
          Research_Area
          Authors
          Date
          Title
          Citation
          Instruments___Data_URL__When_Available_         
        }
      }
    }
  }
  

</page-query>
<script>
export default {
  data() {
    return {
      headers: [
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
          text: "Date",
          value: "node.Date"
        },
        {
          sortable: true,
          text: "Title",
          value: "node.Title"
        },
        {
          sortable: true,
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