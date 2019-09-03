import DefaultLayout from "~/layouts/Default.vue";

import Vuetify from "vuetify";
import VueMoment from "vue-moment";

import "vuetify/dist/vuetify.min.css";
import "@mdi/font/css/materialdesignicons.css";

export default function(Vue, { appOptions, head }) {
  head.link.push({
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/icon?family=Material+Icons"
  });

  const opts = {
    theme: {
      themes: {
        light: {
          primary: "#266093",
          secondary: "#FF7043"
        }
      }
    },
    icons: {
      iconfont: "mdi"
    }
  };
  Vue.use(Vuetify);
  appOptions.vuetify = new Vuetify(opts);

  Vue.use(VueMoment);

  var marked = require("marked");
  Vue.mixin({
    methods: {
      marked: function(input) {
        return marked(input);
      }
    }
  });

  head.meta.push({
    name: "viewport",
    content: "width=device-width, initial-scale=1"
  });
  head.link.push({
    rel: "stylesheet",
    href:
      "https://fonts.googleapis.com/css?family=Ubuntu:100,400,700|Roboto:100,400,700&display=swap"
  });

  Vue.component("Layout", DefaultLayout);
}
