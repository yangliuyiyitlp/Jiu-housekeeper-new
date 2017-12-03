import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import Axios from 'axios'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    isLogin: false, // 登录状态
    user: null,  // 登录用户
    grantedAuthorities: [],  // 权限
    accessToken: ''
  },
  mutations: mutations,
  actions: {
    // 获取权限列表
    getPermission (context, token) {
      return new Promise((resolve, reject) => {
        Axios.post('/login/right', {token: token}).then((res) => {
          // 存储权限列表
          // let valueArr = Object.values(res.data.menus)
          // let value = []
          // for (let i = 0; i < valueArr.length; i++) {
          //   for (let j = 0; j < valueArr[i].length; j++) {
          //     value.push(valueArr[i][j])
          //   }
          // }
          context.commit('setAuth', res.data.menus)
          sessionStorage.setItem('menus', JSON.stringify(res.data.menus))
          resolve(res.data.menus)
        }).catch(() => {
          reject()
        })
      })
    },
    setToken (context, token) {
      context.commit('setToken', token)
    },
    setAuthorities (context, token) {
      context.commit('setAuth', token)
    }
  }
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
