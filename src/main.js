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
// import VeeValidate from 'vee-validate'
// import ZHCN from 'vee-validate/dist/locale/zh_CN'
import VueResource from 'vue-resource'
import VueMoment from 'vue-moment'
import $ from 'jquery'
import './assets/plugins/bootstrap/css/bootstrap.min.css'
import './assets/plugins/bootstrap/js/bootstrap.min'
import Axios from 'axios'
Vue.prototype.$axios = Axios
Vue.use(VueMoment)
// global.$ = global.jQuery = $

Vue.use(VueResource)
// 设置中文
// VeeValidate.Validator.addLocale(ZHCN)
Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.use(VueI18n)

import Querystring from 'querystring'
Vue.prototype.$qs = Querystring

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

// import TableInfo from './components/commons/Table'
import Paginations from './components/commons/Paginations'
import DatePickers from './components/commons/DatePicker'
import FormSearch from './components/commons/FormSearch'

// Vue.component('TableInfo', TableInfo)
Vue.component('Paginations', Paginations)
Vue.component('DatePickers', DatePickers)
Vue.component('FormSearch', FormSearch)

// 注册全局组件 end

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

// config 必须配置
// const config = {
//   errorBagName: 'errors', // change if property conflicts.
//   fieldsBagName: 'fields',
//   delay: 0,
//   locale: 'zh_CN',
//   strict: true,
//   enableAutoClasses: false,
//   classNames: {
//     touched: 'touched', // the control has been blurred
//     untouched: 'untouched', // the control hasn't been blurred
//     valid: 'valid', // model is valid
//     invalid: 'invalid', // model is invalid
//     pristine: 'pristine', // control has not been interacted with
//     dirty: 'dirty' // control has been interacted with
//   },
//   events: 'blur',
//   inject: true
// }
// Vue.use(VeeValidate, config)

