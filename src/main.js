// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueI18n from 'vue-i18n'
import store from './store/store'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(VueI18n)

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
  components: { App }
})
