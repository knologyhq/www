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
  plugins: [
    {
      use: "gridsome-source-google-sheets",
      options: {
        sheetId: process.env.GOOGLE_SHEET_ID,
        apiKey: process.env.GOOGLE_API_KEY,
        type: "dataSheet"
      }
    }
  ],

  chainWebpack: config => {
    config.mode("development");
    const types = ["vue-modules", "vue", "normal-modules", "normal"];
    types.forEach(type => {
      addStyleResource(config.module.rule("postcss").oneOf(type));
    });
    config.module
      .rule("postcss")
      .oneOf("normal")
      .use("postcss-loader")
      .tap(options => {
        options.plugins.unshift(
          ...[
            require("postcss-nested"),
            require("postcss-custom-media"),
            require("postcss-mixins")
          ]
        );
        return options;
      });
  }
};
