import Vue from 'vue'
import axios from 'axios'
import VueAxios from 'vue-axios'
import App from './App.vue'
import store from './store'
import vuetify from './plugins/vuetify';
import router from './router'

Vue.config.productionTip = false
Vue.use(VueAxios, axios)
window.axios = require('axios');
// Vue.prototype.$axios = axios

new Vue({
  store,
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
