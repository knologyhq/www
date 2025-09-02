<template>
  <Layout>
    <v-container class="impacts">
      <Banner
        :banner="{ image: $page.services.edges[0].node.bannerImage.url, title: $page.services.edges[0].node.title, copy: $page.services.edges[0].node.bannerCopy, button: $page.services.edges[0].node.readMoreButton }"
      />

      <v-row justify="center">
        <v-col cols="12" md="8" lg="8" class="intro" v-html="marked($page.services.edges[0].node.introCopy)" />
      </v-row>
      <v-row justify="center">
        <v-col cols="12" md="8" lg="8" id="main" class="body has-floats" v-html="marked($page.services.edges[0].node.body)" />
      </v-row>
    </v-container>

    <!-- Footer Section -->
    <v-container v-if="$page.services.edges[0].node.footer" class="footer">
      <v-row justify="center">
        <v-col cols="12">
          <p v-html="marked($page.services.edges[0].node.footer)"></p>
        </v-col>
      </v-row>
    </v-container>
    
    <template slot="cta">
      <Cta :cta="$page.services.edges[0].node.cta" />
    </template>
  </Layout>
</template>
<page-query>

{
  services: allServices(filter: {id: {eq: "c2uEavXKTmSi0ohRi7gkCQ"}}) {
    edges {
      node {
        bannerCopy
        bannerImage {
          url
        }
        readMoreButton
        body
        id
        introCopy
        slug
        title
        footer
        cta {
          buttonLink
          buttonText
          class
          body
          colour2 {
            hex
          }
          colour {
            hex
          }    
        }
      }
    }
  }
  
}
</page-query>
<script>
import Cta from "~/components/Cta.vue";
import Banner from "~/components/Banner.vue";

export default {
  mounted() {
    console.log(this.$vuetify.breakpoint);
  },
  metaInfo() {
    return {
      title:this.$page.services.edges[0].node.title,
      meta: [
        { name: "author", content: "Knology" },
        { name: "description", content: "Knology is a collective of scientists, writers, and educators dedicated to studying and untangling complex social issues. Equity, transparency, and deliberation are the foundation of our work process. We recognize that no issue exists in isolation from its social and environmental context. Our research is embedded in real-world application to develop practical approaches to thorny problems. We are committed to serving the public good by sharing our data and clearly reporting our results."},
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:site", content: "@KnologyResearch" },
        { name: "twitter:title", content: this.$page.services.edges[0].node.title },
        {
          name: "twitter:description",
          content:
           "Knology is a collective of scientists, writers, and educators dedicated to studying and untangling complex social issues. Equity, transparency, and deliberation are the foundation of our work process. We recognize that no issue exists in isolation from its social and environmental context. Our research is embedded in real-world application to develop practical approaches to thorny problems. We are committed to serving the public good by sharing our data and clearly reporting our results."
        },
        {
          name: "twitter:image",
          content: this.$page.services.edges[0].node.bannerImage.url
        }
      ]
    };

  },
  components: {
    Cta,
    Banner
  }
};
</script>
<style lang="postcss">
.body {
  columns: 1;

  @media (--desktop) {
    columns: 2 auto;
    orphans: 3;
  }
}
.banner {
  background-size: cover;
}
.intro {
  margin-top: 2em;
}
.hire-us {
  margin-top: 3em;
  margin-bottom: 3em;
}

/* Disable multi-columns when floating figures */
.body.has-floats {
  column-count: 1 !important;
}

/* If you can't touch the template, this also works in modern browsers */
.body:has(figure.testimonial) {
  column-count: 1 !important;
}

/* Let following content clear the floats */
.body::after {
  content: "";
  display: block;
  clear: both;
}

/* Floatable testimonials inside the CMS body */
.body figure.testimonial {
  width: clamp(220px, 40%, 360px);
  background: #fff;
  padding: .5rem;
  box-sizing: border-box;
  margin: 0 0 1rem 1rem;  /* default: right float spacing */
  float: right;
  shape-outside: inset(0 round .5rem);
}

.body figure.testimonial.left {
  float: left;
  margin: 0 1rem 1rem 0;
}

.body figure.testimonial img {
  display: block;
  width: 100%;
  height: auto;
}

.body figure.testimonial figcaption {
  display: block;
  width: 100%;
  margin-top: .5rem;
  line-height: 1.35;
  font-size: 0.9rem;
}

.body h2 {
  clear: both;
}

/* Mobile: stack, and let some figures render narrower than 100% */
@media (max-width: 768px) {
  .body figure.testimonial {
    float: none;
    width: 100%;
    margin: 1rem 0;
    text-align: center; /* center the narrower block */
    --sm-img-w: 100%;   /* default if not provided inline */
  }

  /* Tie image and caption widths together */
  .body figure.testimonial img,
  .body figure.testimonial figcaption {
    max-width: var(--sm-img-w);
    margin-left: auto;
    margin-right: auto;
  }

  /* Optional: cap vertical growth for tall (portrait/square) images */
  .body figure.testimonial.compact img {
    max-height: 260px;
    width: auto;        /* respect the height cap */
    max-width: 100%;    /* but never overflow the container */
  }

  /* Keep caption readable */
  .body figure.testimonial figcaption {
    display: block;
    margin-top: .5rem;
    line-height: 1.35;
  }
}

</style>