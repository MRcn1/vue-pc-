// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import {post,fetch,patch,put} from './config/http'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './style/reset.css'
import store from "./store/store"
import "./config/util"
Vue.use(ElementUI);
import echarts from 'echarts'

//定义全局变量
Vue.prototype.$post=post;
Vue.prototype.$fetch=fetch;
Vue.prototype.$patch=patch;
Vue.prototype.$put=put;
Vue.prototype.$echarts = echarts 


Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
