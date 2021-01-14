import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import VueParticles from "vue-particles";
import Clipboard from "v-clipboard";

Vue.use(Clipboard);

import { Typeahead } from "uiv";

import * as uiv from "uiv";
Vue.use(uiv);

Vue.config.productionTip = false;

export const bus = new Vue();

import "material-design-icons-iconfont/dist/material-design-icons.css";

import "iobio-phenotype-extractor-vue/dist/iobio.css";

// Vue.use(VueParticles)

// define gobal filters
Vue.filter("to-firstCharacterUppercase", function(value) {
  if (!value) return "";
  value = value.toString();
  return value.charAt(0).toUpperCase() + value.slice(1);
});

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");
