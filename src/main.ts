// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './vuex/store'
import * as types from "./vuex/types";
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import "./assets/iconfont/iconfont.css"
import install from "./utils/Install"

Vue.use(ElementUI)
Vue.use(install)
Vue.config.productionTip = false

import axios from './api/http'
Vue.prototype.$http = axios

// 页面刷新时，重新赋值token和接口地址
if (window.localStorage.getItem('token') && window.localStorage.getItem('serviceBaseUrl')) {
  store.commit(types.LOGIN, {
    token: window.localStorage.getItem('token'),
    baseUrl: window.localStorage.getItem('serviceBaseUrl'),
    rights: JSON.parse((localStorage.getItem('rights') as string))
  });
}



/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
});
