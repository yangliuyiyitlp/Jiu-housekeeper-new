import Vue from 'vue'
import VueRouter from 'vue-router'
import NotFound from '@/components/commons/NotFound.vue'
// import Home from '@/pages/Login/Home.vue'   // 为用户登录成功之后的主页
// import Login from '@/pages/Login/Login.vue' // 为登录注册页
// import whiteList from './directAccess'
import asyncRouter from './asyncRouter'
// import store from '../store/store'
import Cookie from 'js-cookie'

Vue.use(VueRouter)
// 默认路由
const routes = [
  {path: '/', redirect: {name: 'Login'}},
  {
    path: '/login',
    name: 'Login',
    component: r => require.ensure([], () => r(require('@/pages/Login/Login.vue')), 'Login')
  },
  // {path: '/home', name: 'Home', component: Home},
  {path: '/404', component: NotFound}
]
const router = new VueRouter({
  mode: 'history',
  // routes: routes
  routes: asyncRouter
})

// 路由跳转前验证
router.beforeEach((to, from, next) => {
  // 在asybrouyter 中找和url的path一样的 然后加入到路由数组中
  // asyncRouter.find(function (s) {
  //   console.log(s)
  //   if (s.path === this.$route.path) {
  //     routes.push(s)
  //   }
  // })
  console.log('to.path', to.path)
  console.log('from.path', from.path)
  // console.log(router)
  // if (Cookie.get('username') === '' || Cookie.get('username') === undefined) {
  //   router.replace('/login')
  // } else {
  next()
  // }
})

// let extendsRoutes = {
//   'user': [
//     {
//       'label': '个人信息',
//       'name': 'user.info',
//       'path': '/user/info'
//     },
//     {
//       'label': '修改密码',
//       'name': 'user.pwd',
//       'path': '/user/pwd'
//     }
//   ],
//   'setting': [
//     {
//       'label': '机构用户',
//       'children': [
//         {
//           'label': '用户管理',
//           'name': 'setting.user',
//           'path': '/setting/user',
//           'permission': [
//             'outport',
//             'view'
//           ]
//         },
//         {
//           'label': '机构管理',
//           'name': 'setting.mechanism',
//           'path': '/setting/mechanism',
//           'permission': [
//             'outport',
//             'view'
//           ]
//         },
//         {
//           'label': '区域管理',
//           'name': 'setting.area',
//           'path': '/setting/area'
//         }
//       ]
//     },
//     {
//       'label': '系统设置',
//       'children': [
//         {
//           'label': '菜单管理',
//           'name': 'setting.menu',
//           'path': '/setting/menu'
//         },
//         {
//           'label': '角色管理',
//           'name': 'setting.role',
//           'path': '/setting/role'
//         },
//         {
//           'label': '字典管理',
//           'name': 'setting.dictionary',
//           'path': 'setting/dictionary'
//         }
//       ]
//     },
//     {
//       'label': '关于帮助',
//       'name': 'setting.about',
//       'path': 'setting/about'
//     }
//   ],
//   'facility': [ // 设备管理
//     {
//       'label': '锁厂人员注册',
//       'name': 'tabs',
//       'path': '/facility/tabs'
//     },
//     {
//       'label': '共享单车设备',
//       'children': [
//         {
//           'label': '自行车信息表',
//           'name': 'info',
//           'path': '/facility/info'
//         },
//         {
//           'label': '车辆注册统计',
//           'name': 'count',
//           'path': '/facility/count'
//         },
//         {
//           'label': '车辆注册明细',
//           'name': 'detailed',
//           'path': '/facility/detailed'
//         },
//         {
//           'label': '锁状态明细表',
//           'name': 'state',
//           'path': '/facility/state'
//         },
//         {
//           'label': '批量操作车辆',
//           'name': 'unbund',
//           'path': '/facility/unbund',
//           'permission': [
//             'view',
//             'outport'
//           ]
//         }
//       ]
//     },
//     {
//       'label': '锁厂登记表',
//       'name': 'register',
//       'path': '/facility/register',
//       'permission': [
//         'view',
//         'create'
//       ]
//     }
//   ],
//   'content': [
//     {
//       'label': '内容管理',
//       'children': [
//         {
//           'label': '内容发布',
//           'name': 'content.release',
//           'path': '/content/release'
//         },
//         {
//           'label': '评论管理',
//           'name': 'content.comment',
//           'path': '/content/comment'
//         },
//         {
//           'label': '公共留言',
//           'name': 'content.public.message',
//           'path': '/content/public/message'
//         }
//       ]
//     },
//     {
//       'label': '统计分析',
//       'children': [
//         {
//           'label': '信息量统计',
//           'name': 'content.information.total',
//           'path': '/content/information/total'
//         }
//       ]
//     },
//     {
//       'label': '栏目设置',
//       'children': [
//         {
//           'label': '栏目管理',
//           'name': 'content.column',
//           'path': '/content/column'
//         },
//         {
//           'label': '站点设置',
//           'name': 'content.site.setting',
//           'path': '/content/site/setting'
//         },
//         {
//           'label': '切换站点',
//           'name': 'content.site.switch',
//           'path': '/content/site/switch'
//         }
//       ]
//     }
//   ],
//   'status': [ // 状态管理
//     {
//       'label': '自行车地图监控',
//       'name': 'status.bike.map',
//       'path': '/status/bike/map'
//     },
//     {
//       'label': '热力图',
//       'name': 'status.heatchart',
//       'path': '/status/heatchart'
//     },
//     {
//       'label': '行政区状态监控',
//       'name': 'status.government',
//       'path': '/status/government'
//     },
//     {
//       'label': '城市状态监控',
//       'name': 'status.city',
//       'path': '/status/city'
//     },
//     {
//       'label': '车辆区域热力图',
//       'name': 'status.bike.area',
//       'path': '/status/bike/area'
//     }
//   ],
//   'vip': [ // 会员管理
//     {
//       'label': '会员信息',
//       'name': 'vip.info',
//       'path': '/vip/info'
//     },
//     {
//       'label': '会员邀请明细',
//       'name': 'vip.invite.list',
//       'path': '/vip/invite/list'
//     },
//     {
//       'label': '会员邀请统计',
//       'name': 'vip.invite.total',
//       'path': '/vip/invite/total'
//     }
//   ],
//   'report': [
//     {
//       'label': '操作明细',
//       'children': [
//         {
//           'label': '会员审核明细',
//           'name': 'report.vip',
//           'path': '/report/vip'
//         },
//         {
//           'label': '手工还车明细',
//           'name': 'report.manual.return',
//           'path': '/report/manual/return'
//         }
//       ]
//     },
//     {
//       'label': '借还车明细',
//       'children': [
//         {
//           'label': '交易记录',
//           'name': 'report.transaction',
//           'path': '/report/transaction'
//         },
//         {
//           'label': '当日交易记录',
//           'name': 'report.transaction.now',
//           'path': '/report/transaction/now'
//         },
//         {
//           'label': '换电池明细',
//           'name': 'report.replace.battery',
//           'path': '/report/replace/battery'
//         },
//         {
//           'label': '充值提现明细',
//           'name': 'report.recharge',
//           'path': '/report/recharge'
//         }
//       ]
//     }
//   ],
//   'city': [ // 城市运营
//     {
//       'label': '运维车辆干涉明细',
//       'name': 'city.bike.intervene.list',
//       'path': '/city/bike/intervene/list'
//     },
//     {
//       'label': '公司信息管理',
//       'name': 'city.company.info',
//       'path': '/city/company/info'
//     },
//     {
//       'label': '运营人员管理',
//       'name': 'city.operator',
//       'path': '/city/operator'
//     },
//     {
//       'label': '远程升级',
//       'name': 'city.remote',
//       'path': '/city/remote'
//     },
//     {
//       'label': '小区域管理',
//       'name': 'city.range',
//       'path': '/city/range'
//     },
//     {
//       'label': '点位管理',
//       'name': 'city.point',
//       'path': '/city/point'
//     },
//     {
//       'label': '区域统计报表',
//       'name': 'city.area.total',
//       'path': '/city/area/total'
//     },
//     {
//       'label': '城市黑名单',
//       'name': 'city.blacklist',
//       'path': '/city/blacklist'
//     },
//     {
//       'label': '电子围栏基础信息',
//       'name': 'city.fencing.info',
//       'path': '/city/fencing/info',
//       'permission': 'city:fencing:info:update'
//     }
//   ],
//   'service': [
//     {
//       'label': '信用积分变更明细',
//       'name': 'service.change.credit',
//       'path': '/service/change/credit'
//     },
//     {
//       'label': '会员手机变更工单',
//       'name': 'service.change.phone',
//       'path': '/service/change/phone'
//     },
//     {
//       'label': '用户反馈管理',
//       'name': 'service.feedback',
//       'path': '/service/feedback'
//     },
//     {
//       'label': '用户违规工单',
//       'name': 'service.violation',
//       'path': '/service/violation'
//     },
//     {
//       'label': '运维反馈工单',
//       'name': 'service.operation',
//       'path': '/service/operation'
//     }
//   ],
//   'redpacket': [ // 红包管理
//     {
//       'label': '红包点击记录明细',
//       'name': 'redpacket.click',
//       'path': '/redpacket/click'
//     },
//     {
//       'label': '红包参数配置',
//       'name': 'redpacket.config',
//       'path': '/redpacket/config'
//     },
//     {
//       'label': '红包提现明细',
//       'name': 'redpacket.cash',
//       'path': '/redpacket/cash'
//     }
//   ],
//   'activity': [ // 活动中心
//     {
//       'label': '消息推送组',
//       'name': 'activity.message',
//       'path': '/activity/message'
//     },
//     {
//       'label': '短信推送',
//       'name': 'activity.message.push',
//       'path': '/activity/message/push'
//     },
//     {
//       'label': '消息推送计划',
//       'name': 'activity.message.plan',
//       'path': '/activity/message/plan'
//     },
//     {
//       'label': '每月活动',
//       'children': [
//         {
//           'label': '名流健康',
//           'name': 'activity.health',
//           'path': '/activity/health'
//         },
//         {
//           'label': '红包雨',
//           'name': 'activity.red.rain',
//           'path': '/activity/red/rain'
//         }
//       ]
//     },
//     {
//       'label': '赳赳乐享',
//       'name': 'activity.enjoy',
//       'path': '/activity/enjoy'
//     },
//     {
//       'label': 'APP展示页配置',
//       'name': 'activity.config',
//       'path': '/activity/config'
//     },
//     {
//       'label': '家乐福活动',
//       'children': [
//         {
//           'label': '优惠券明细',
//           'name': 'activity.coupon',
//           'path': '/activity/coupon'
//         },
//         {
//           'label': '活动邀请明细',
//           'name': 'activity.invite.detail',
//           'path': '/activity/invite/detail'
//         },
//         {
//           'label': '优惠券领取明细',
//           'name': 'activity.coupon.receive',
//           'path': '/activity/coupon/receive'
//         },
//         {
//           'label': '活动邀请统计',
//           'name': 'activity.invite.list',
//           'path': '/activity/invite/list'
//         }
//       ]
//     },
//     {
//       'label': '僵尸车活动',
//       'children': [
//         {
//           'label': '车辆图标配置',
//           'name': 'activity.config.icon',
//           'path': '/activity/config/icon'
//         }
//       ]
//     },
//     {
//       'label': '广告中心',
//       'children': [
//         {
//           'label': 'inmobi广告配置',
//           'name': 'activity.inmobi',
//           'path': '/activity/inmobi'
//         }
//       ]
//     },
//     {
//       'label': '优惠券配置',
//       'children': [
//         {
//           'label': '优惠券获取明细',
//           'name': 'activity.coupon.details',
//           'path': '/activity/coupon/details'
//         }
//       ]
//     }
//   ],
//   'serviceConfig': [{
//     'label': '短信配置',
//     'name': 'serviceConfig.msg',
//     'path': '/serviceConfig/msg',
//     'permission': 'serviceConfig:msg:submit'
//   }]
// }
// Cookie.set('sessionId', 'c619de1a-b312-4403-aaaf-bf34eb2bc640')
//
// Cookie.set('username', 'admin')
// sessionStorage.setItem('menus', JSON.stringify(extendsRoutes))

// 路由跳转前验证
// router.beforeEach((to, from, next) => {
//   if (Cookie.get('sessionId') !== '' && Cookie.get('sessionId') !== undefined) {
//     console.log('to.path', to.path)
//     console.log('from.path', from.path)
//     if (to.path === '/login') {
//       router.replace('/home')
//     } else {
//       // 页面跳转前先判断是否存在权限列表，如果存在则直接跳转，如果没有则请求一次
//       let authList = store.state.grantedAuthorities
//       console.log(authList)
//       if (authList === null || authList.length === 0) {
//         console.log('没有权限list')
//         // 获取权限列表，如果失败则跳回登录页重新登录
//         store.dispatch('getPermission', Cookie.get('sessionId')).then(result => {
//           // 匹配并生成需要添加的路由对象
//           generateAuthList(result, asyncRouter).then(res => {
//             console.log('res是', res)
//             router.addRoutes(res)
//             next(to.path)
//           })
//         }).catch((err) => {
//           console.log('登录错误', err)
//           // store.dispatch('user/logout').then(() => {
//           //   router.replace('/login')
//           // })
//         })
//       } else {
//         // 如果跳转页面存在于路由中则进入，否则跳转到404
//         // 因为可以通过改变url值进行访问，所以必须有该判断
//         // alert(to.matched.length)
//         if (to.matched.length) {     // 一级菜单的长度
//           next()
//         } else {
//           router.replace('/404')
//         }
//       }
//     }
//   } else {
//     console.log('请重新登录')
//     next()
//   }
// })
//
// router.afterEach(() => {
//   // NProgress.done() // 结束Progress
// })
//
// /**
//  * 根据权限匹配路由
//  * @param {array} permission 权限列表（菜单列表）
//  * @param {array} asyncRouter 异步路由对象
//  */
// function routerMatch (parent, permission, asyncRouter) {
//   return new Promise((resolve) => {
//     let routers = parent
//
//     // 创建路由
//     function createRouter (permission) {
//       for (let i = 0; i < permission.length; i++) {
//         let item = permission[i]
//         if (item.children !== undefined && item.children.length > 0) {
//           // 递归
//           createRouter(item.children)
//         }
//         let path = item.path
//         for (let j = 0; j < asyncRouter.length; j++) {
//           let s = asyncRouter[j]
//           if (s.path === path) {
//             s.meta.permission = item.permission  // 按钮权限
//             routers.children.push(s)
//             break
//           }
//         }
//       }
//     }
//
//     createRouter(permission)
//     resolve(routers)
//   })
// }
//
// function generateAuthList (permission, asyncRouter) {
//   return new Promise((resolve) => {
//     let authList = []
//     if (permission !== undefined) {
//       for (let key in permission) {
//         let router = {}
//         asyncRouter.find(function (s) {
//           if (s.name === key) {
//             router = s
//           }
//         })
//         let permDetail = permission[key]
//         routerMatch(router, permDetail, asyncRouter).then(res => {
//           authList.push(res)
//         })
//       }
//     }
//     resolve(authList)
//   })
// }

console.log('router', router)
export default router
