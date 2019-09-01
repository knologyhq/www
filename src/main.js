import DefaultLayout from "~/layouts/Default.vue";

import Vuetify from "vuetify";
import VueMoment from "vue-moment";

import "vuetify/dist/vuetify.min.css";

export default function(Vue, { head, appOptions }) {
  // const opts = {
  //   icons: {
  //     iconfont: "fa"
  //   }
  // }; //opts includes, vuetify themes, icons, etc.
  Vue.use(Vuetify);
  Vue.use(VueMoment);

  appOptions.vuetify = new Vuetify();

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
    href: "https://fonts.googleapis.com/css?family=Ubuntu|Roboto&display=swap"
  });
  head.link.push({
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/icon?family=Material+Icons"
  });

  Vue.component("Layout", DefaultLayout);
}
