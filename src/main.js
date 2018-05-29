// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

// import VeeValidate from 'vee-validate'
import moment from 'moment'
import './assets/css/reset.css'
import './assets/css/style.css'
//import 'kindEditor/kindeditor-all.js'  
//import 'kindEditor/lang/zh_CN.js'  
//import 'kindEditor/themes/default/default.css'

import 'vue-tree-halower/dist/halower-tree.min.css' // 你可以自定义树的样式
import VTree from 'vue-tree-halower'

Vue.use(VTree)


import store from './store'
import * as filters from '@/filters/filters.js'  

import Cube from 'cube-ui'
Vue.use(Cube)

Vue.config.productionTip = false

import VueKindEditor from 'vue-kindeditor'
import 'kindeditor/kindeditor-all-min.js'
import 'kindeditor/themes/default/default.css'

Vue.use(VueKindEditor)

//import VueKindEditor from './plugins/vue-kindeditor'
//import '../static/kindeditor/kindeditor-all.js'
//import '../static/kindeditor/themes/default/default.css'

//Vue.use(VueKindEditor)

Object.keys(filters).forEach(key => {  
    Vue.filter(key, filters[key])  
})  

/*by WQ*/
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
Vue.use(ElementUI)
/*by WQ*/
  

   Vue.prototype.$loading = ElementUI.Loading.service
   Vue.prototype.$msgbox = ElementUI.MessageBox
   Vue.prototype.$alert = ElementUI.MessageBox.alert
   Vue.prototype.$confirm = ElementUI.MessageBox.confirm
   Vue.prototype.$prompt = ElementUI.MessageBox.prompt
   Vue.prototype.$notify = ElementUI.Notification
   Vue.prototype.$message = ElementUI.Message

/* eslint-disable no-new */
window.vm = new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: { App }
})