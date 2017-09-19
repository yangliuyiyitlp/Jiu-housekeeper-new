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

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(VueI18n)

// Moment开始
import Moment from 'moment'
// 声明全局过滤器
Vue.filter('convertDate', function (value) {
  return Moment(value).format('HH:mm:ss')
})
// Moment：结束

// 注册全局组件 start
import ZtrStructure from './components/commons/ZtreeStructure'
import TableInfo from './components/commons/Table'
import Paginations from './components/commons/Paginations'
import DatePickers from './components/commons/DatePicker'
import FormSearch from './components/commons/FormSearch'

Vue.component('ZtrStructure', ZtrStructure)
Vue.component('TableInfo', TableInfo)
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
