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

// Vue.http.interceptors.push((request, next) => {
//   // 这里对请求体进行处理
//   request.headers = request.headers || {}
//   if (isLogin()) {
//     request.headers.set('Authorization', 'Bearer ' + get('token').replace(/(^\")|(\"$)/g, ''))
//   }
//   var loadingInstance = Loading.service({target: document.querySelector('.my_table')})
//   request.url = store.state.homeUrl + request.url
//   next((response) => {
//     loadingInstance.close()
//     // 这里可以对响应的结果进行处理
//     if (response.status === 401) {
//       signOut()
//       window.location.hash = '/login'
//     }
//     if (!response.ok) {
//       console.log('error', response.data)
//     } else {
//       sessionStorage.setItem('login', 1)
//     }
//   })
// })

// http请求拦截器
class GLoading {
  instance = null
  refs = 0

  attach (ins) {
    this.instance = ins
    this.refs++
  }

  detach () {
    if (this.refs > 0) {
      this.refs--
    }
    if (this.refs === 0) {
      this.instance.close()
    }
  }
}

let loading = new GLoading()
Axios.interceptors.request.use(config => {
  // element ui Loading方法
  let ins = ElementUI.Loading.service({
    fullscreen: true,
    'element-loading-background': 'rgba(0, 0, 0, 0.8)'
  })

  loading.attach(ins)
  return config
}, error => {
  loading.detach()
  ElementUI.message.error('加载超时')
  return Promise.reject(error)
})
// http响应拦截器
Axios.interceptors.response.use(data => { // 响应成功关闭loading
  loading.detach()
  return data
}, error => {
  loading.detach()
  ElementUI.message.error('加载失败')
  return Promise.reject(error)
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  i18n,
  template: '<App/>',
  components: {App}
})
