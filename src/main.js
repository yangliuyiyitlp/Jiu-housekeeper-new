// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueI18n from 'vue-i18n'
import store from './store/store'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import '@/assets/icon_font/iconfont.css'
import VueMoment from 'vue-moment'
import Axios from 'axios'
import baseUrl from '../static/utils/baseUrl'

Vue.prototype.$ajax = Axios

Axios.defaults.baseURL = baseUrl
Axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

Vue.use(VueMoment)
// global.$ = global.jQuery = $

Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.use(VueI18n)

// Moment开始
import Moment from 'moment'
// 声明全局过滤器
Vue.filter('convertDate', function (value) {
  return Moment(value).format('HH:mm:ss')
})
Vue.filter('AddDate', function (value) {
  let nevalue = new Date(value)
  return Moment(nevalue).format('YYYY-MM-DD HH:mm:ss')
})
// Moment：结束

// 注册全局组件 start
import Paginations from './components/commons/Paginations'
import DatePickers from './components/commons/DatePicker'
import FormSearch from './components/commons/FormSearch'

Vue.component('Paginations', Paginations)
Vue.component('DatePickers', DatePickers)
Vue.component('FormSearch', FormSearch)
// 注册全局组件 end

// 注册百度地图 start
import BaiduMap from 'vue-baidu-map'

Vue.use(BaiduMap, {
  // ak 是在百度地图开发者平台申请的密钥 详见 http://lbsyun.baidu.com/apiconsole/key */
  ak: 'IK5AlGXoZ23tDAGjldRalicbhdpsrKwE'
})
// 注册百度地图 end

// 富文本编辑器
// 富文本编辑器引入

import '../static/ueditor/ueditor.config.js'
import '../static/ueditor/ueditor.all.min.js'
import '../static/ueditor/lang/zh-cn/zh-cn.js'
import '../static/ueditor/ueditor.parse.min.js'

const i18n = new VueI18n({
  locale: getLanguage()
})

function getLanguage () {
  if (typeof Storage !== 'undefined') {
    let language = localStorage.language
    if (typeof language !== 'undefined') {
      return language
    } else {
      localStorage.language = 'cn'
    }
  }

  return 'cn'
}

router.beforeEach((to, from, next) => {
  console.log(process.env.NODE_ENV)
  // console.log(Axios.defaults.baseURL)
  // 权限校验
  // let pass = valid(to);
  // if(!pass){
  //   return console.log('无权访问');
  // }
  next()
})

// // http请求拦截器
// let loadinginstace
// Axios.interceptors.request.use(config => {
//   console.log('http请求拦截器comming')
//   // element ui Loading方法
//   loadinginstace = this.$Loading.service({fullscreen: true})
//   return config
// }, error => {
//   console.log(1)
//   loadinginstace.close()
//   this.$message.error('加载超时')
//   // Message.error({
//   //   message: '加载超时'
//   // })
//   return Promise.reject(error)
// })
// // http响应拦截器
// Axios.interceptors.response.use(data => { // 响应成功关闭loading
//   console.log('http响应拦截器comming')
//   loadinginstace.close()
//   return data
// }, error => {
//   console.log(2)
//   loadinginstace.close()
//   this.$message.error('加载失败')
//   // Message.error({
//   //   message: '加载失败'
//   // })
//   return Promise.reject(error)
// })

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  i18n,
  template: '<App/>',
  components: {App}
})
