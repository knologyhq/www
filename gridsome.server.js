const axios = require("axios");
const nodeExternals = require("webpack-node-externals");
const netlifyFormsUrl = `https://api.netlify.com/api/v1/forms/${process.env.APPROVED_COMMENTS_FORM_ID}/submissions/?access_token=${process.env.API_AUTH}`;
module.exports = function(api) {
  api.chainWebpack((config, { isServer }) => {
    if (isServer) {
      config.externals([
        nodeExternals({
          whitelist: [/^vuetify/]
        })
      ]);
    }
  });

  api.loadSource(async store => {
    const site = store.addContentType({
      typeName: "Site"
    });
    const home = store.addContentType({
      typeName: "Home"
    });
    const contact = store.addContentType({
      typeName: "Contact"
    });
    const community = store.addContentType({
      typeName: "Community"
    });
    const ethics = store.addContentType({
      typeName: "Ethics"
    });
    const privacy = store.addContentType({
      typeName: "Privacy"
    });
    const about = store.addContentType({
      typeName: "About"
    });
    const people = store.addContentType({
      typeName: "People",
      route: "person/:slug"
    });
    const posts = store.addContentType({
      typeName: "Posts",
      route: "article/:slug"
    });
    const initiatives = store.addContentType({
      typeName: "Initiatives",
      route: "initiative/:slug"
    });
    const milestones = store.addContentType({
      typeName: "Milestones"
    });
    const wellnessPosts = store.addContentType({
      typeName: "WellnessPosts"
    });
    const mediaPosts = store.addContentType({
      typeName: "MediaPosts"
    });
    const processPosts = store.addContentType({
      typeName: "ProcessPosts"
    });
    const systemsPosts = store.addContentType({
      typeName: "SystemsPosts"
    });
    const biospherePosts = store.addContentType({
      typeName: "BiospherePosts"
    });
    const culturePosts = store.addContentType({
      typeName: "CulturePosts"
    });
    const pillars = store.addContentType({
      typeName: "Pillars",
      route: "category/:slug"
    });
    const comments = store.addContentType({
      typeName: "Comments"
    });

    posts.addReference("peopleList", "People");
    posts.addReference("initiativeList", "Initiatives");
    posts.addReference("pillarList", "Pillars");

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
        query: ` query SingleInstances {
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
            bannerCopy
            featuredPosts {
              title
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
            mailingAddress
            email
            fax
            socialMedia {
              handle
              icon
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
      `
      }
    }).then(result => {
      home.addNode({
        ...result.data.data.home
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
            body
            publishDate
            slug
            id
            allowComments
          }

        query Collections {
          about: allAboutSectionPages {
            id
            slug
            title
            introCopy
            position
            body
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
          }
          
          posts: allPosts {
            ...postFields
            dataFile
            tags
            postFile {
              url
            }
            postType {
              title
              id
            }
            authors {
              name
              id
            }
            categories {
              title
              id
            }
            initiatives {
              id
            }
          }
          wellnessPosts: allPosts(filter: {categories: {anyIn: ["1366606"]}}) {
            ...postFields
            authors {
              name
            }
          }
          mediaPosts: allPosts(filter: {categories: {anyIn: ["1366604"]}}) {
            authors {
              name
            }
            ...postFields
          }
          processPosts: allPosts(filter: {categories: {anyIn: ["1366603"]}}) {
            authors {
              name
            }
            ...postFields
          }
          systemsPosts: allPosts(filter: {categories: {anyIn: ["1366605"]}}) {
            authors {
              name
            }
            ...postFields
          }
          biospherePosts: allPosts(filter: {categories: {anyIn: ["1366598"]}}) {
            authors {
              name
            }
            ...postFields
          }
          culturePosts: allPosts(filter: {categories: {anyIn: ["1366602"]}}) {
            authors {
              name
            }
            ...postFields
          }
          people: allPeople {
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
      for (const item of result.data.data.posts) {
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

        // create reference to people
        let people = item.authors;
        let peopleList = people.map(function(person) {
          return person.id;
        });
        posts.addNode({
          ...item,
          initiativeList: initiativeList,
          peopleList: peopleList,
          pillarList: pillarList
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
