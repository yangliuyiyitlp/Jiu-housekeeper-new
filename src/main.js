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
// import VueResource from 'vue-resource'
import VueMoment from 'vue-moment'
import 'jquery'
import 'ztree'
import 'ztree/css/zTreeStyle/zTreeStyle.css'

import Axios from 'axios'

Vue.prototype.$ajax = Axios
Axios.defaults.baseURL = 'http://116.231.72.55:10001/a'
Axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

Vue.use(VueMoment)
// global.$ = global.jQuery = $

// Vue.use(VueResource)
// Vue.http.options.root = 'http://116.231.72.55:10001/a'

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
  var nevalue = new Date(value)
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

// 图片上传oss
// import OssUpload from 'aliyun-oss-upload'
//
// let ossUpload = new OssUpload({
//   // 上传目录
//   dir: 'cmsContent',
//   // OSS签名缓存时间
//   expiration: 120000,
//   // 是否使用uuid随机文件名。默认：false
//   randomName: true,
//   // 文件上传成功后的http返回码。默认：204
//   successActionStatus: 200,
//   // 获取oss签名方法
//   signatureGetter () {
//     // 假设你使用的是httpFetch来请求数据
//     // 该方法必须返回Promise对象
//     return new Promise((resolve) => {
//       Vue.prototype.$ajax.get('electric/ossutil/interface/policy?user_dir=cmsContent')
//         .then((res) => {
//           // this.Token = res.data
//           // this.Token.OSSAccessKeyId = res.data.accessid
//           // console.log(this.Token)
//           resolve()
//         })
//         .catch(err => {
//           console.log(err)
//         })
//     })
//   },
//   // accessid: 'LTAIXtzzxKiWP3By',
//   // policy: 'eyJleHBpcmF0aW9uIjoiMjAxNy0xMC0yMVQxMDo0MDowOS4xMzZaIiwiY29uZGl0aW9ucyI6W1siY29udGVudC1sZW5ndGgtcmFuZ2UiLDAsMTA0ODU3NjAwMF0sWyJzdGFydHMtd2l0aCIsIiRrZXkiLCJ6aGFuZyJdXX0=',
//   // signature: 'cYfQ0ZUb8Wl8K6QLJ41XSG/FUwc=',
//   // 文件上传方法
//   uploader (formData) {
//     // formData：文件上传所需的FormData对象
//     // 假设使用httpFetch来上传文件
//     // 该方法必须返回Promise对象
//     return new Promise((resolve) => {
//       Vue.prototype.$ajax.post('http://jjdcjavaweb.oss-cn-shanghai.aliyuncs.com', formData)
//         .then((res) => {
//           // this.Token = res.data
//           // this.Token.OSSAccessKeyId = res.data.accessid
//           // console.log(this.Token)
//           resolve()
//         })
//         .catch(err => {
//           console.log(err)
//         })
//     })
//   }
// })
// Vue.prototype.$OssUpload = ossUpload

// 富文本编辑器
// 富文本编辑器引入
import '../static/ueditor1_4_3_3/ueditor.config.js'
import '../static/ueditor1_4_3_3/ueditor.all.min.js'
import '../static/ueditor1_4_3_3/lang/zh-cn/zh-cn.js'
// import '../static/ueditor1_4_3_3/ueditor.parse.min.js'

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

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  i18n,
  template: '<App/>',
  components: {App}
})

