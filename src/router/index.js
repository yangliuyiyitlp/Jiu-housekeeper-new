import Vue from 'vue'
import VueRouter from 'vue-router'
import NotFound from '@/components/commons/NotFound.vue'
import Home from '@/pages/Login/Home.vue'   // 为用户登录成功之后的主页
// import Login from '@/pages/Login/Login.vue' // 为登录注册页
import whiteList from './directAccess'
import asyncRouter from './asyncRouter'
// import NProgress from 'nprogress'
// import 'nprogress/nprogress.css'
import store from '../store/store'
// import { session } from '../assets/util'
// import { delCookie } from '../assets/js/cookie.js'
var Cookie = require('../assets/js/cookie.js')
Vue.use(VueRouter)
// 默认路由
const routes = [
  {path: '/', redirect: {name: 'Login'}},
  {
    path: '/login',
    name: 'Login',
    component: r => require.ensure([], () => r(require('@/pages/Login/Login.vue')), 'Login')
  },
  {path: '/home', name: 'Home', component: Home},
  {path: '/404', component: NotFound}
]
const router = new VueRouter({
  // mode: 'history',
  routes: routes
  // routes: asyncRouter
})

// 路由跳转前验证
router.beforeEach((to, from, next) => {
  // 开启进度条
  // NProgress.start()
  // 判断用户是否登录
  // Cookie.delCookie('token')
  console.log('token:', Cookie.getCookie('token'))
  if (Cookie.getCookie('token') !== '' && Cookie.getCookie('token') !== undefined) {
    // 这种情况出现在手动修改地址栏地址时
    // 如果当前处于登录状态，并且跳转地址为login，则自动跳回系统首页
    console.log('to.path', to.path)
    console.log('from.path', from.path)
    if (to.path === '/login') {
      router.replace('/home')
    } else {
      // 页面跳转前先判断是否存在权限列表，如果存在则直接跳转，如果没有则请求一次
      let authList = store.state.grantedAuthorities
      console.log('authList', authList)
      if (authList === null || authList.length === 0) {
        console.log('没有权限list')
        // 获取权限列表，如果失败则跳回登录页重新登录
        store.dispatch('getPermission', Cookie.getCookie('token')).then(result => {
          // 匹配并生成需要添加的路由对象
          // console.log('获取到menus', result)
          generateAuthList(result, asyncRouter).then(res => {
            // console.log('匹配出路由', res)
            // sessionStorage.setItem('authList', JSON.stringify(res))
            // store.dispatch('authList', JSON.stringify(res))
            // console.log('res是', res)
            router.addRoutes(res)
            next(to.path)
          })
        }).catch((err) => {
          console.log('登录错误', err)
          // store.dispatch('user/logout').then(() => {
          //   router.replace('/login')
          // })
        })
      } else {
        // 如果跳转页面存在于路由中则进入，否则跳转到404
        // 因为可以通过改变url值进行访问，所以必须有该判断
        // alert(to.matched.length)
        if (to.matched.length) {     // 一级菜单的长度
          if (whiteList.indexOf(to.path) < 0) {
            // store.dispatch('user/actionlog', to)
          }
          next()
        } else {
          router.replace('/404')
        }
      }
    }
  } else {
    // 如果是免登陆的页面则直接进入，否则跳转到登录页面
    if (whiteList.indexOf(to.path) >= 0) {
      console.log('该页面无需登录即可访问')
      next()
    } else {
      console.log('请重新登录')
      router.replace('/login')
      // NProgress.done()
    }
  }
})

router.afterEach(() => {
  // NProgress.done() // 结束Progress
})

/**
 * 根据权限匹配路由
 * @param {array} permission 权限列表（菜单列表）
 * @param {array} asyncRouter 异步路由对象
 */
function routerMatch (parent, permission, asyncRouter) {
  return new Promise((resolve) => {
    let routers = parent

    // 创建路由
    function createRouter (permission) {
      // permission.forEach((item) => {
      //   console.log('item', JSON.stringify(item))
      //   if (item.children && item.children.length > 0) {
      //     // 递归
      //     createRouter(item.children)
      //   }
      //   let path = item.path
      //   // 循环异步路由，将符合权限列表的路由加入到routers中
      //   asyncRouter.find(function (s) {
      //     if (s.path === path) {
      //       console.log('s', s)
      //       s.meta.permission = item.permission  // 按钮权限
      //       routers.children.push(s)
      //     }
      //   })
      //   console.log('find结束', JSON.stringify(routers))
      // })
      for (let i = 0; i < permission.length; i++) {
        let item = permission[i]
        if (item.children !== undefined && item.children.length > 0) {
          // 递归
          createRouter(item.children)
        }
        let path = item.path
        for (let j = 0; j < asyncRouter.length; j++) {
          let s = asyncRouter[j]
          if (s.path === path) {
            s.meta.permission = item.permission  // 按钮权限
            routers.children.push(s)
            break
          }
        }
      }
    }

    createRouter(permission)
    resolve(routers)
  })
}

function generateAuthList (permission, asyncRouter) {
  return new Promise((resolve) => {
    let authList = []
    if (permission !== undefined) {
      for (let key in permission) {
        let router = {}
        asyncRouter.find(function (s) {
          if (s.name === key) {
            router = s
          }
        })
        let permDetail = permission[key]
        routerMatch(router, permDetail, asyncRouter).then(res => {
          authList.push(res)
        })
      }
    }
    resolve(authList)
  })
}

console.log('router', router)
export default router
