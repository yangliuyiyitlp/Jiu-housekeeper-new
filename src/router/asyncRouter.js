// 需要权限访问的完整路由表
// 获取权限后和该表匹配的则被加入到正式路由中。该表必须完整的包含工程页面
// path 页面跳转地址
// permission字段内容从后台获取，代表该页内部详细权限，以key:value形式存储

const asyncRouter = [
  {
    path: '/login',
    name: 'Login',
    component: r => require.ensure([], () => r(require('@/pages/Login/Login.vue')), 'Login')
  },
  {
    path: '/facility/tabs',
    name: 'tabs',
    meta: {
      permission: []
    },
    component: r => require.ensure([], () => r(require('../pages/Facility/TabsMod.vue')), 'FacilityTabs')
  },
  {
    path: '/facility/register',
    name: 'register',
    meta: {
      permission: []
    },
    component: r => require.ensure([], () => r(require('../pages/Facility/RegisterMod.vue')), 'RegisterMod')
  },
  // setting相关
  {
    path: '/setting/lockNodes',
    name: 'setting.lockNodes',
    meta: {
      permission: []
    },
    component: r => require.ensure([], () => r(require('../pages/Setting/Locknodes.vue')), 'SettingLockNodes')
  },
  // 服务配置
  {
    path: '/serviceConfig/msg',
    name: 'serviceConfig.msg',
    meta: {
      permission: []
    },
    component: r => require.ensure([], () => r(require('../pages/ServiceConfig/ServiceConfigMsg.vue')), 'ServiceConfigMsg')
  },
  {
    path: '/serviceConfig/name',
    name: 'serviceConfig.name',
    meta: {
      permission: []
    },
    component: r => require.ensure([], () => r(require('../pages/ServiceConfig/serviceConfigName.vue')), 'ServiceConfigName')
  },
  // 广告管理
  {
    path: '/advertContent',
    name: 'advertContent',
    meta: {
      permission: []
    },
    component: r => require.ensure([], () => r(require('../pages/AdvertMenage/AdvertContent.vue')), 'AdvertContent')
  },
  {
    path: '/advertData',
    name: 'advertData',
    meta: {
      permission: []
    },
    component: r => require.ensure([], () => r(require('../pages/AdvertMenage/AdvertData.vue')), 'AdvertData')
  },
  // 活动相关
  {
    path: '/activity/message/inform',
    name: 'activity.message.inform',
    meta: {
      permission: []
    },
    component: r => require.ensure([], () => r(require('../pages/Activity/MessageInform.vue')), 'MessageInform')
  }, // 消息通知
  {
    path: '/activity/message/plan',
    name: 'activity.message.plan',
    meta: {
      permission: []
    },
    component: r => require.ensure([], () => r(require('../pages/Activity/ActivityMessagePlan.vue')), 'ActivityMessagePlan')
  }, // 推送计划
  {
    path: '/activity/dynamic/menu',
    name: 'activity.dynamic.menu',
    meta: {
      permission: []
    },
    component: r => require.ensure([], () => r(require('../pages/Activity/DynamicMenu.vue')), 'DynamicMenu')
  }, // 动态菜单
  // 404
  {
    path: '/404',
    name: '404',
    component: r => require.ensure([], () => r(require('@/components/commons/NotFound.vue')), 'NotFound')
  }
]

export default asyncRouter
