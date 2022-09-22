const axios = require("axios");
const nodeExternals = require("webpack-node-externals");
const netlifyFormsUrl = `https://api.netlify.com/api/v1/forms/${process.env.APPROVED_COMMENTS_FORM_ID}/submissions/?access_token=${process.env.API_AUTH}`;
module.exports = function(api) {
  api.chainWebpack((config, { isServer }) => {
    if (isServer) {
      config.externals([
        nodeExternals({
          whitelist: [/^Vuetify/, /^vuetify/]
        })
      ]);
    }
  });

  api.loadSource(async store => {
    const site = store.addCollection({
      typeName: "Site"
    });
    const home = store.addCollection({
      typeName: "Home"
    });
    const contact = store.addCollection({
      typeName: "Contact"
    });

    const donate = store.addCollection({
      typeName: "Donate"
    });

    const archive = store.addCollection({
      typeName: "Archive"
    });

    const community = store.addCollection({
      typeName: "Community"
    });

    const ethics = store.addCollection({
      typeName: "Ethics"
    });
    const privacy = store.addCollection({
      typeName: "Privacy"
    });
    const about = store.addCollection({
      typeName: "About"
    });
    const alumni = store.addCollection({
      typeName: "Alumni"
    });

    const careers = store.addCollection({
      typeName: "CareersPage"
    });
    const sidebar = store.addCollection({
      typeName: "Sidebar"
    });
    const jobsPosts = store.addCollection({
      typeName: "JobsPosts",
      route: "job/:slug"
    });
    const ourTeam = store.addCollection({
      typeName: "OurTeam"
    });
    const people = store.addCollection({
      typeName: "People",
      route: "person/:slug"
    });
    const posts = store.addCollection({
      typeName: "Posts",
      route: "article/:slug"
    });

    const ideaBreweryPosts = store.addCollection({
      typeName: "IdeaBreweryPosts"
    });

    const initiatives = store.addCollection({
      typeName: "Initiatives",
      route: "initiative/:slug"
    });
    const milestones = store.addCollection({
      typeName: "Milestones"
    });
    const wellnessPosts = store.addCollection({
      typeName: "WellnessPosts",
      route: "category/:slug"
    });
    const mediaPosts = store.addCollection({
      typeName: "MediaPosts"
    });
    const processPosts = store.addCollection({
      typeName: "ProcessPosts"
    });
    const systemsPosts = store.addCollection({
      typeName: "SystemsPosts"
    });
    const biospherePosts = store.addCollection({
      typeName: "BiospherePosts"
    });
    const culturePosts = store.addCollection({
      typeName: "CulturePosts"
    });
    // using a different pillar overview template here
    // Pillars (model name and old term) == Categories (interface/paths) == Research Areas (internal term)
    const pillars = store.addCollection({
      typeName: "Pillars",
      route: "category/:slug"
    });
    const categories = store.addCollection({
      typeName: "Categories",
      route: "articles/category/:slug"
    });

    const tags = store.addCollection({
      typeName: "Tags",
      route: "articles/tag/:slug"
    });
    const comments = store.addCollection({
      typeName: "Comments"
    });
    const roles = store.addCollection({
      typeName: "Roles"
    });

    posts.addReference("peopleList", "People");
    posts.addReference("initiativeList", "Initiatives");
    posts.addReference("pillarList", "Pillars");
    posts.addReference("tagList", "Tags");

    people.addReference("initiativeList", "Initiatives");
    people.addReference("pillarList", "Pillars");

    pillars.addReference("initiativeList", "Initiatives");
    comments.addReference("post", "Posts");

    const datoPages = await axios({
      method: "POST",
      url: "https://graphql.datocms.com/",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${process.env.DATO_TOKEN}`
      },
      data: {
        query: ` 
          query SingleInstances {
            sidebar {
              featuredPosts {
                title
                subtitle
                publishDate
                slug
                image {
                  url
                }
                authors {
                  name
                }
                categories {
                  title
                  id
                }
              }
            }
            alumni: alumniPage {
              title
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
              body
            }
            careers: careersPage {
              title
              bannerImage {
                url
              }
              bannerCopy
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

  ourTeam: ourTeamPage {
    title
    bannerImage {
      url
    }
    bannerCopy
    introCopy
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
    body
  }
  ethics: ethicsPage {
    colour {
      hex
    }
    colour2 {
      hex
    }
    body
    title
    cta {
      title
      id
      colour2 {
        hex
      }
      colour {
        hex
      }
      buttonText
      buttonLink
      body
    }
  }
  privacy: privacyPolicyPage {
    colour {
      hex
    }
    colour2 {
      hex
    }
    body
    title
    cta {
      title
      id
      colour2 {
        hex
      }
      colour {
        hex
      }
      buttonText
      buttonLink
      body
    }
  }
  community: communityPage {
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
    partners {
      logo {
        url
      }
      title
      url
      id
    }
    featuredPosts {
      title
      subtitle
      publishDate
      slug
      image {
        url
      }
      authors {
        name
      }
      categories {
        title
        id
      }
    }
    title
    introCopy
    id
    bannerCopy
    bannerImage {
      url
    }
    affiliations {
      id
      title
      url
      logo {
        url
      }
    }
  }
  home: homePage {
    alert
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
    featuredPosts {
      title
      subtitle
      publishDate
      slug
      image {
        url
      }
      authors {
        name
      }
      categories {
        title
        id
      }
    }
  }
  contact: contactPage {
    phone
    featureImage {
      url
    }
    mailingAddress
    emailAddresses {
      email
      label
    }
    fax
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


donate: donatePage {
  title
  bannerImage{
    url
  }
  bannerCopy
  body
}

archive: archivePage{
  title
  bannerImage{
    url
  }
  introCopy
  bannerCopy
}



}


      `
      }
    }).then(result => {
      home.addNode({
        ...result.data.data.home
      });
      sidebar.addNode({
        ...result.data.data.sidebar
      });
      ethics.addNode({
        ...result.data.data.ethics
      });
      privacy.addNode({
        ...result.data.data.privacy
      });
      contact.addNode({
        ...result.data.data.contact
      });
      community.addNode({
        ...result.data.data.community
      });
      alumni.addNode({
        ...result.data.data.alumni
      });
      ourTeam.addNode({
        ...result.data.data.ourTeam
      });
      careers.addNode({
        ...result.data.data.careers
      });
      donate.addNode({
        ...result.data.data.donate
      });
      archive.addNode({
        ...result.data.data.archive
      });
    });

    const netlifyComments = await axios.get(netlifyFormsUrl).then(response => {
      for (const item of response.data) {
        // create reference to parent post
        let post = item.data.postId;
        comments.addNode({
          ...item,
          post: post
        });
      }
    });

    const dato = await axios({
      method: "POST",
      url: "https://graphql.datocms.com/",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${process.env.DATO_TOKEN}`
      },
      data: {
        query: `
          fragment postFields on PostRecord {
            image {
              url
              title
            }
            title
            subtitle
            additionalAuthors
            body
            publishDate
            slug
            id
            allowComments
          }
          

          query Collections {
            tags: allTags(first: 100) {
              title
              id
              slug
            }
            roles: allRoles(first: 100) {
              title
              id
            }


            jobs: allJobs {
              title
              description
              slug
              open
            }

            about: allAboutSectionPages {
              id
              slug
              title
              introCopy
              position
              body
              readMoreButton
              bannerImage {
                url
              }
              bannerCopy
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
            milestones: allTimelineItems(orderBy: position_ASC) {
              description
              id
              image {
                url
              }
              title
              position
              link
            }
            
            pillars: allPillars {
              id
              title
              description
              slug
              svgIcon
              colour {
                hex
              }
              initiative {
                id
                title
                slug
              }
            }
            initiatives: allInitiatives {
              id
              title
              slug
              description
              collaborators {
                title
                link
              }
            }
            
            posts: allPosts(first: 100) {
              ...postFields
              dataFile
              dataFileLabel
              tags {
                id
                title
                slug
              }
              postFile {
                url
              }
              postType {
                title
                id
              }
              authors {
                name
                slug
                id
              }
              categories {
                title
                id
                slug
              }
              initiatives {
                id
                title
                slug
              }
              exclude
              recent
            }

            posts2: allPosts(first: 100, skip: 100) {
              ...postFields
              dataFile
              dataFileLabel
              tags {
                id
                title
                slug
              }
              postFile {
                url
              }
              postType {
                title
                id
              }
              authors {
                name
                slug
                id
              }
              categories {
                title
                id
                slug
              }
              initiatives {
                id
                title
                slug
              }
              exclude
              recent
            }

            ideaBreweryPosts: allPosts(filter: {tags: {anyIn: ["1435043"]} } ) {
              ...postFields
              authors {
                name
              }
            }

            wellnessPosts: allPosts(filter: {categories: {anyIn: ["1366606"]}}) {
              ...postFields
              authors {
                name
              }
              recent
            }
            mediaPosts: allPosts(filter: {categories: {anyIn: ["1366604"]}}) {
              authors {
                name
              }
              ...postFields
              recent
            }
            processPosts: allPosts(filter: {categories: {anyIn: ["1366603"]}}) {
              authors {
                name
              }
              ...postFields
              recent
            }
            systemsPosts: allPosts(filter: {categories: {anyIn: ["1366605"]}}) {
              authors {
                name
              }
              ...postFields
              recent
            }
            biospherePosts: allPosts(filter: {categories: {anyIn: ["1366598"]}}) {
              authors {
                name
              }
              ...postFields
              recent
            }
            culturePosts: allPosts(filter: {categories: {anyIn: ["1366602"]}}) {
              authors {
                name
              }
              ...postFields
              recent
            }
            people: allPeople(first: 100) {
              role {
                id
                title
              }
              id
              bio
              slug
              education
              email
              expertise {
                title
                id
                slug
              }
              initiatives {
                title
                id
              }
              jobTitle
              name
              team
              photo {
                url
              }
              website
            }
            _site {
              globalSeo {
                siteName
                fallbackSeo {
                  description
                }
              }
            }
          }
        `
      }
    }).then(result => {
      site.addNode({
        ...result.data.data._site
      });
      for (const item of result.data.data.about) {
        about.addNode({
          ...item
        });
      }
      for (const item of result.data.data.jobs) {
        jobsPosts.addNode({
          ...item
        });
      }
      for (const item of result.data.data.people) {
        // create reference to initiatives
        let initiatives = item.initiatives;
        let initiativeList = initiatives.map(function(initiative) {
          return initiative.id;
        });

        // create reference to categories
        let pillars = item.expertise;
        let pillarList = pillars.map(function(p) {
          return p.id;
        });

        people.addNode({
          ...item,
          initiativeList: initiativeList,
          pillarList: pillarList
        });
      }
      
      // 20220915 adding this as a bandaid for the 100 post limit issue
      let combinedPosts = result.data.data.posts.concat(result.data.data.posts2);

      for (const item of combinedPosts) {
        // create reference to initiatives
        let initiatives = item.initiatives;
        let initiativeList = initiatives.map(function(initiative) {
          return initiative.id;
        });

        // create reference to pillars
        let pillars = item.categories;
        let pillarList = pillars.map(function(e) {
          return e.id;
        });

        // create reference to tags
        let tags = item.tags;
        let tagList = tags.map(function(tag) {
          return tag.id;
        });

        // create reference to people
        let people = item.authors;
        let peopleList = people.map(function(person) {
          return person.id;
        });
        posts.addNode({
          ...item,
          initiativeList: initiativeList,
          peopleList: peopleList,
          pillarList: pillarList,
          tagList: tagList
        });
      }
      for (const item of result.data.data.roles) {
        roles.addNode({
          ...item
        });
      }

      for (const item of result.data.data.tags) {
        tags.addNode({
          ...item
        });
      }

      for (const item of result.data.data.pillars) {
        categories.addNode({
          ...item
        });
      }

      for(const item of result.data.data.ideaBreweryPosts){
        ideaBreweryPosts.addNode({
          ...item
        });
      }

      for (const item of result.data.data.wellnessPosts) {
        wellnessPosts.addNode({
          ...item
        });
      }
      for (const item of result.data.data.culturePosts) {
        culturePosts.addNode({
          ...item
        });
      }
      for (const item of result.data.data.mediaPosts) {
        mediaPosts.addNode({
          ...item
        });
      }
      for (const item of result.data.data.biospherePosts) {
        biospherePosts.addNode({
          ...item
        });
      }
      for (const item of result.data.data.systemsPosts) {
        systemsPosts.addNode({
          ...item
        });
      }
      for (const item of result.data.data.processPosts) {
        processPosts.addNode({
          ...item
        });
      }
      for (const item of result.data.data.pillars) {
        // create reference to initiatives
        let initiatives = item.initiative;

        let initiativeList = initiatives.map(function(initiative) {
          return initiative.id;
        });

        pillars.addNode({
          ...item,
          initiativeList: initiativeList
        });
      }
      for (const item of result.data.data.initiatives) {
        initiatives.addNode({
          ...item
        });
      }
      for (const item of result.data.data.milestones) {
        milestones.addNode({
          ...item
        });
      }
    });
  });
};
