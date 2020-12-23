import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify';
import VueParticles from 'vue-particles'

Vue.config.productionTip = false

export const bus = new Vue();

import 'material-design-icons-iconfont/dist/material-design-icons.css'

import 'iobio-phenotype-extractor-vue/dist/iobio.css'

// Vue.use(VueParticles)

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
