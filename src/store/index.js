import Vue from 'vue';
import Vuex from 'vuex'
import createLogger from 'vuex/dist/logger';
import actions from './actions'
import mutations from './mutations'
import getters from './getters'
import tagsView from './modules/tagsView.js'
//import menuData from '../jsondata/menuData.json'

const debug = process.env.NODE_ENV !== 'production';
Vue.use(Vuex);

var state={
	//选中表格数据的某几条数据
  selectArr: [],
  powerBtnArr:[], //按钮权限
//menuId: null
}

var store= new Vuex.Store({
  actions,
  mutations,
  getters,
  state,
  modules: {
  	tagsView
  },
  strict: debug,
  plugins: debug ? [createLogger()] : []
});

if (module.hot) {
  module.hot.accept([
    './getters',
    './actions',
    './mutations'
  ], () => {
    store.hotUpdate({
      getters: require('./getters'),
      actions: require('./actions'),
      mutations: require('./mutations')
    })
  })
}

export default store;
