// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Promise from 'es6-promise'
import Vue from 'vue'
import FastClick from 'fastclick'
import router from './router/router'
import App from './App'
import Axios from './request/config'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import store from '@/store/store'

// 全局css
import './assets/css/comment.css'
import './assets/font/iconfont.css'


Promise.polyfill();
// 全局组件
import vuxComponents from '@/components/vuxComponents'

Vue.use(Axios)
Vue.use(ElementUI)

FastClick.attach(document.body)
Vue.config.productionTip = false

new Vue({
  el: '#app-box',
  router,
  store,
  components: { App },
  template: '<App/>'
})

