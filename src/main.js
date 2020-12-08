import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import http from './utils/api'
import './utils/antd'

let VueCookie = require('vue-cookie');
Vue.use(VueCookie);
Vue.prototype.$http = http;
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
