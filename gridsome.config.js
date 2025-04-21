const path = require("path");
const years = [2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018];

function addStyleResource(rule) {
  rule
    .use("style-resource")
    .loader("style-resources-loader")
    .options({
      patterns: [path.resolve(__dirname, "./src/assets/css/_global.css")]
    });
}

// Clean and simple transform function that maps by index only
function transformRowByIndex(row) {
  const cols = Object.values(row);
  while (cols.length < 15) cols.push('');

  return {
    Row_Should_Be_Visible_on_Website_: cols[0] || '',
    Publication_Title: cols[7] || '',
    Funder_Name: cols[8] || '',
    Grant_Number: cols[9] || '',
    Project_Name: cols[10] || '',
    Publication_Date: cols[12] || '',
    Citation: cols[13] || '',
    Instruments___Data_URL__When_Available_: cols[14] || ''
  };
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
            sheets: years.map(year => ({
              sheetName: String(year),
              collectionName: `dataSheet${year}`,
              transform: transformRowByIndex
            }))
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
