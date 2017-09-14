import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    isLogin: false, // 登录状态
    user: null,  // 登录用户
    grantedAuthorities: [],  // 权限
    accessToken: ''
  },
  mutations: mutations
})

// 模块热加载配置
if (module.hot) {
  // 使 actions 和 mutations 成为可热重载模块
  module.hot.accept(['./mutations'], () => {
    // 获取更新后的模块
    // 因为 babel 6 的模块编译格式问题，这里需要加上 .default
    const newMutations = require('./mutations').default
    // const newModuleA = require('./modules/a').default
    // 加载新模块
    store.hotUpdate({
      mutations: newMutations,
      modules: {
        // a: newModuleA
      }
    })
  })
}

export default store
