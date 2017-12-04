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
import Vuex from 'vuex'

let Cookie = require('./assets/js/cookie.js')
Vue.use(Vuex)
Vue.prototype.$ajax = Axios
Vue.prototype.$store = store
Axios.defaults.baseURL = baseUrl
Axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

// 超时设置
const service = Axios.create({
  timeout: 5000                  // 请求超时时间
})

// http request 拦截器
// 每次请求都为http头增加Authorization字段，其内容为token
service.interceptors.request.use(
  config => {
    if (store.state.user.token) {
      // config.headers.Authorization = `token ${store.state.user.token}`
      config.headers.Authorization = Cookie.getCookie('token')
    }
    return config
  },
  err => {
    return Promise.reject(err)
  })

// http response 拦截器
// 针对响应代码确认跳转到对应页面
service.interceptors.response.use(
  response => response,
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          router.push('error/401')
          break
        case 403:
          router.push('error/403')
          break
      }
    }
    // console.log(JSON.stringify(error));//console : Error: Request failed with status code 402
    return Promise.reject(error.response.data)
  }
)

Vue.use(VueMoment)

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
  service,
  i18n,
  template: '<App/>',
  components: {App}
})
