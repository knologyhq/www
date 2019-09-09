import Vuetify from "vuetify";
import "vuetify/dist/vuetify.min.css";
import VueMoment from "vue-moment";
import DefaultLayout from "~/layouts/Default.vue";

export default function(Vue, { appOptions, head }) {
  head.link.push({
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/icon?family=Material+Icons"
  });
  head.link.push({
    rel: "stylesheet",
    href:
      "https://cdn.jsdelivr.net/npm/@mdi/font@3.x/css/materialdesignicons.min.css"
  });
  head.meta.push({
    name: "viewport",
    content: "width=device-width, initial-scale=1"
  });
  head.link.push({
    rel: "stylesheet",
    href:
      "https://fonts.googleapis.com/css?family=Ubuntu:100,400,700&display=swap"
  });

  Vue.use(Vuetify);
  Vue.use(VueMoment);

  appOptions.vuetify = new Vuetify({
    theme: {
      dark: false,
      themes: {
        light: {
          primary: "#266093",
          secondary: "#FF7043",
          background: "#ffffff"
        }
      },
      icons: {
        iconfont: "mdi"
      }
    }
  });

  var marked = require("marked");
  Vue.mixin({
    methods: {
      marked: function(input) {
        return marked(input);
      }
    }
  });

  Vue.component("Layout", DefaultLayout);
}
