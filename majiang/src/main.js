// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from '@/router/index.js'
// 公共样式
import '../static/css/base.css'
//css3动画库
import '../static/css/ec-css-animate.css'
import '../static/css/ec-css-hover.css'

import 'font-awesome/css/font-awesome.min.css'
import '../static/fonts/iconfont.css'

// vuex
import store from '@/store/store'
import moment from 'moment'
moment.locale('zh-cn')
Vue.prototype.$moment = moment;
import mbti from './assets/mbti'
Vue.prototype.$mbti = mbti;

import Layer from './assets/plugin/bu-layer/index'
Vue.use(Layer)

// import VueMeta from 'vue-meta'
// Vue.use(VueMeta)

// 字体样式
// import 'font-awesome/css/font-awesome.css'
// element样式
import 'element-ui/lib/theme-chalk/index.css'
import 'element-ui/lib/theme-chalk/display.css'
import ElementUI from 'element-ui'
Vue.use(ElementUI)

import axiosManager from '../src/assets/axios.manager'
Vue.prototype.$axios = axiosManager;

Vue.prototype.maxAge = 5000;  //本地数据存储期限值

import colorFormat from './assets/colorFormat'
Vue.prototype.colorFormat = colorFormat;

Vue.config.productionTip = false;

import utill from './assets/utill'
Vue.prototype.$utill =  utill

import Avatar from '@/components/common/avatar'
Vue.component('Avatar', Avatar)

Vue.prototype.$delayPush =  function(path,time){
  setTimeout(()=>{
    this.$router.push({path:path})
  },time?time:300)
}


Vue.prototype.vueExample = new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>',
  mounted() {

  }
})
