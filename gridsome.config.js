const path = require("path");


function addStyleResource(rule) {
  rule
    .use("style-resource")
    .loader("style-resources-loader")
    .options({
      patterns: [path.resolve(__dirname, "./src/assets/css/_global.css")]
    });
}

module.exports = {
  siteName: "Knology",
  devServer: {
    proxy: {
      "/.netlify": {
        target: "http://localhost:9000",
        pathRewrite: { "^/.netlify/functions": "" }
      }
    }
  },

  icon: './src/assets/favicon.png',

  plugins: [
    {
      use: "gridsome-source-google-sheets-v2",
      options: {
        apiKey: process.env.GOOGLE_API_KEY,
        spreadsheets: [
          {
            spreadsheetId: process.env.GOOGLE_SHEET_ID,
            sheets: [
              {
                sheetName: '2022',
                collectionName: 'dataSheet2022'
              },
              {
                sheetName: '2021',
                collectionName: 'dataSheet2021'
              },
              {
                sheetName: '2020',
                collectionName: 'dataSheet2020'
              },
              {
                sheetName: '2019',
                collectionName: 'dataSheet2019'
              },
              {
                sheetName: '2018',
                collectionName: 'dataSheet2018'
              }
            ]
          }
        ]
      }
    },
    {
      use: 'gridsome-plugin-gtm',
      options: {
        id: 'GTM-WZQW5JM',
        enabled: true,
        debug: true
      }
    }
  ],
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          require("postcss-custom-properties")({ preserve: false }),
          require("postcss-nested"),
          require("postcss-custom-media"),
          require("postcss-mixins")
        ]
      }
    }
  },
  chainWebpack: config => {
    config.mode("development");
    const types = ["vue-modules", "vue", "normal-modules", "normal"];
    types.forEach(type => {
      addStyleResource(config.module.rule("css").oneOf(type));
    });
    config.module
      .rule("postcss")
      .oneOf("normal")
      .use("postcss-loader")
      .tap(options => {
        options.plugins.unshift(
          ...[
            require("postcss-custom-properties")({ preserve: false }),
            require("postcss-nested"),
            require("postcss-custom-media"),
            require("postcss-mixins")
          ]
        );
        return options;
      });
  }
};
