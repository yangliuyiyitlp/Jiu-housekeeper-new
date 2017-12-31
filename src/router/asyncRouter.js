// 需要权限访问的完整路由表
// 获取权限后和该表匹配的则被加入到正式路由中。该表必须完整的包含工程页面
// path 页面跳转地址
// permission字段内容从后台获取，代表该页内部详细权限，以key:value形式存储

const asyncRouter = [
  {
    path: '/user',
    name: 'user',
    component: r => require.ensure([], () => r(require('../pages/User/User.vue')), 'User'),
    children: []
  }, {
    path: '/user/info',
    name: 'user.info',
    meta: {     // 为每个路由页面增加meta字段。在routerMatch函数中将匹配到的详细权限字段赋值到这里。这样在每个页面的route对象中就会得到这个字段。
      permission: []
    },
    component: r => require.ensure([], () => r(require('../pages/User/Userinfo.vue')), 'UserInfo')
  },
  {
    path: '/user/pwd',
    name: 'user.pwd',
    meta: {     // 为每个路由页面增加meta字段。在routerMatch函数中将匹配到的详细权限字段赋值到这里。这样在每个页面的route对象中就会得到这个字段。
      permission: []
    },
    component: r => require.ensure([], () => r(require('../pages/User/Userpwd.vue')), 'UserPwd')
  },
  {
    path: '/facility',
    name: 'facility',
    component: r => require.ensure([], () => r(require('../pages/Facility/Facility.vue')), 'Facility'),
    children: []
  },
  {
    path: '/facility/tabs',
    name: 'tabs',
    meta: {     // 为每个路由页面增加meta字段。在routerMatch函数中将匹配到的详细权限字段赋值到这里。这样在每个页面的route对象中就会得到这个字段。
      permission: []
    },
    component: r => require.ensure([], () => r(require('../pages/Facility/TabsMod.vue')), 'FacilityTabs')
  },
  {
    path: '/facility/info',
    name: 'info',
    meta: {
      permission: []
    },
    component: r => require.ensure([], () => r(require('../pages/Facility/bikessetting/FacilityInfo.vue')), 'FacilityInfo')
  },
  {
    path: '/facility/count',
    name: 'count',
    meta: {
      permission: []
    },
    component: r => require.ensure([], () => r(require('../pages/Facility/bikessetting/FacilityCount.vue')), 'FacilityCount')
  },
  {
    path: '/facility/detailed',
    name: 'detailed',
    meta: {
      permission: []
    },
    component: r => require.ensure([], () => r(require('../pages/Facility/bikessetting/FacilityDetailed.vue')), 'FacilityDetailed')
  },
  {
    path: '/facility/state',
    name: 'state',
    meta: {
      permission: []
    },
    component: r => require.ensure([], () => r(require('../pages/Facility/bikessetting/FacilityState.vue')), 'FacilityState')
  },
  {
    path: '/facility/register',
    name: 'register',
    meta: {
      permission: []
    },
    component: r => require.ensure([], () => r(require('../pages/Facility/RegisterMod.vue')), 'RegisterMod')
  },
  {
    path: '/facility/unbund',
    name: 'unbund',
    meta: {
      permission: []
    },
    component: r => require.ensure([], () => r(require('../pages/Facility/bikessetting/FacilityUnbund.vue')), 'FacilityUnbund')
  },
  // setting相关
  {
    path: '/setting',
    name: 'setting',
    component: r => require.ensure([], () => r(require('../pages/Setting/Setting.vue')), 'Setting'),
    children: []
  },
  {
    path: '/setting/user',
    name: 'setting.user',
    meta: {
      permission: []
    },
    component: r => require.ensure([], () => r(require('../pages/Setting/User/User.vue')), 'SettingUser')
  },
  {
    path: '/setting/mechanism',
    name: 'setting.mechanism',
    meta: {
      permission: []
    },
    component: r => require.ensure([], () => r(require('../pages/Setting/User/Mechanism.vue')), 'SettingMechanism')
  },
  {
    path: '/setting/area',
    name: 'setting.area',
    meta: {
      permission: []
    },
    component: r => require.ensure([], () => r(require('../pages/Setting/User/Area.vue')), 'SettingArea')
  },
  {
    path: '/setting/menu',
    name: 'setting.menu',
    meta: {
      permission: []
    },
    component: r => require.ensure([], () => r(require('../pages/Setting/System/Menu.vue')), 'SettingMenu')
  },
  {
    path: '/setting/role',
    name: 'setting.role',
    meta: {
      permission: []
    },
    component: r => require.ensure([], () => r(require('../pages/Setting/System/Role.vue')), 'SettingRole')
  },
  {
    path: 'setting/dictionary',
    name: 'setting.dictionary',
    meta: {
      permission: []
    },
    component: r => require.ensure([], () => r(require('../pages/Setting/System/Dictionary.vue')), 'SettingDictionary')
  },
  {
    path: '/setting/daily',
    name: 'setting.daily',
    meta: {
      permission: []
    },
    component: r => require.ensure([], () => r(require('../pages/Setting/Daily/Daily.vue')), 'SettingDaily')
  },
  {
    path: '/setting/connect/control',
    name: 'setting.connect.control',
    meta: {
      permission: []
    },
    component: r => require.ensure([], () => r(require('../pages/Setting/Daily/ConnectControl.vue')), 'SettingConnectControl')
  },
  {
    path: '/setting/about',
    name: 'setting.about',
    meta: {
      permission: []
    },
    component: r => require.ensure([], () => r(require('../pages/Setting/About.vue')), 'SettingAbout')
  },
  {
    path: '/content',
    name: 'content',
    component: r => require.ensure([], () => r(require('../pages/Content/Content.vue')), 'Content'),
    children: []
  },
  // content相关
  {
    path: '/content/release',
    name: 'content.release',
    meta: {
      permission: []
    },
    component: r => require.ensure([], () => r(require('../pages/Content/ContentRelease.vue')), 'ContentRelease')
  },
  {
    path: '/content/comment',
    name: 'content.comment',
    meta: {
      permission: []
    },
    component: r => require.ensure([], () => r(require('../pages/Content/ContentComment.vue')), 'ContentComment')
  },
  {
    path: '/content/public/message',
    name: 'content.public.message',
    meta: {
      permission: []
    },
    component: r => require.ensure([], () => r(require('../pages/Content/ContentPublicMessage.vue')), 'ContentPublicMessage')
  },
  {
    path: '/content/information/total',
    name: 'content.information.total',
    meta: {
      permission: []
    },
    component: r => require.ensure([], () => r(require('../pages/Content/ContentInformationTotal.vue')), 'ContentInformationTotal')
  },
  {
    path: '/content/column',
    name: 'content.column',
    meta: {
      permission: []
    },
    component: r => require.ensure([], () => r(require('../pages/Content/ContentColumn.vue')), 'ContentColumn')
  },
  {
    path: '/content/site/setting',
    name: 'content.site.setting',
    meta: {
      permission: []
    },
    component: r => require.ensure([], () => r(require('../pages/Content/ContentSiteSetting.vue')), 'ContentSiteSetting')
  },
  {
    path: '/content/site/switch',
    name: 'content.site.switch',
    meta: {
      permission: []
    },
    component: r => require.ensure([], () => r(require('../pages/Content/ContentSiteSwitch.vue')), 'ContentSiteSwitch')
  },
  {
    path: '/content/column/update',
    name: 'content.column.update',
    meta: {
      permission: []
    },
    component: r => require.ensure([], () => r(require('../pages/Content/ContentColumnUpdate.vue')), 'ContentColumnUpdate')
  },
  {
    path: '/content/column/new',
    name: 'content.column.new',
    meta: {
      permission: []
    },
    component: r => require.ensure([], () => r(require('../pages/Content/ContentColumnNew.vue')), 'ContentColumnNew')
  },
  {
    path: '/status',
    name: 'status',
    component: r => require.ensure([], () => r(require('../pages/Status/Status.vue')), 'Status'),
    children: []
  },
  // status相关
  {
    path: '/status/bike/map',
    name: 'status.bike.map',
    meta: {
      permission: []
    },
    component: r => require.ensure([], () => r(require('../pages/Status/StatusBikeMap.vue')), 'StatusBikeMap')
  },
  {
    path: '/status/heatchart',
    name: 'status.heatchart',
    meta: {
      permission: []
    },
    component: r => require.ensure([], () => r(require('../pages/Status/StatusHeatchart.vue')), 'StatusHeatchart')
  },
  {
    path: '/status/government',
    name: 'status.government',
    meta: {
      permission: []
    },
    component: r => require.ensure([], () => r(require('../pages/Status/StatusGovernment.vue')), 'StatusGovernment')
  },
  {
    path: '/status/city',
    name: 'status.city',
    meta: {
      permission: []
    },
    component: r => require.ensure([], () => r(require('../pages/Status/StatusCity.vue')), 'StatusCity')
  },
  {
    path: '/status/bike/area',
    name: 'status.bike.area',
    meta: {
      permission: []
    },
    component: r => require.ensure([], () => r(require('../pages/Status/StatusBikeArea.vue')), 'StatusBikeArea')
  },
  {
    path: '/vip',
    name: 'vip',
    component: r => require.ensure([], () => r(require('../pages/Vip/Vip.vue')), 'Vip'),
    children: []
  },
  // vip相关
  {
    path: '/vip/info',
    name: 'vip.info',
    meta: {
      permission: []
    },
    component: r => require.ensure([], () => r(require('../pages/Vip/VipInfo.vue')), 'VipInfo')
  },
  {
    path: '/vip/invite/list',
    name: 'vip.invite.list',
    meta: {
      permission: []
    },
    component: r => require.ensure([], () => r(require('../pages/Vip/VipInviteList.vue')), 'VipInviteList')
  },
  {
    path: '/vip/invite/total',
    name: 'vip.invite.total',
    meta: {
      permission: []
    },
    component: r => require.ensure([], () => r(require('../pages/Vip/VipInviteTotal.vue')), 'VipInviteTotal')
  },
  {
    path: '/report',
    name: 'report',
    component: r => require.ensure([], () => r(require('../pages/Report/Report.vue')), 'Report'),
    children: []
  },
  // report相关
  {
    path: '/report/vip',
    name: 'report.vip',
    meta: {
      permission: []
    },
    component: r => require.ensure([], () => r(require('../pages/Report/ReportVip.vue')), 'ReportVip')
  },
  {
    path: '/report/manual/return',
    name: 'report.manual.return',
    meta: {
      permission: []
    },
    component: r => require.ensure([], () => r(require('../pages/Report/ReportManualReturn.vue')), 'ReportManualReturn')
  },
  {
    path: '/report/transaction',
    name: 'report.transaction',
    meta: {
      permission: []
    },
    component: r => require.ensure([], () => r(require('../pages/Report/ReportTransaction.vue')), 'ReportTransaction')
  },
  {
    path: '/report/transaction/now',
    name: 'report.transaction.now',
    meta: {
      permission: []
    },
    component: r => require.ensure([], () => r(require('../pages/Report/ReportTransactionNow.vue')), 'ReportTransactionNow')
  },
  {
    path: '/report/replace/battery',
    name: 'report.replace.battery',
    meta: {
      permission: []
    },
    component: r => require.ensure([], () => r(require('../pages/Report/ReportReplaceBattery.vue')), 'ReportReplaceBattery')
  },
  {
    path: '/report/recharge',
    name: 'report.recharge',
    meta: {
      permission: []
    },
    component: r => require.ensure([], () => r(require('../pages/Report/ReportRecharge.vue')), 'ReportRecharge')
  },
  {
    path: '/city',
    name: 'city',
    component: r => require.ensure([], () => r(require('../pages/City/City.vue')), 'City'),
    children: []
  },
  // city 相关
  {
    path: '/city/bike/intervene/list',
    name: 'city.bike.intervene.list',
    meta: {
      permission: []
    },
    component: r => require.ensure([], () => r(require('../pages/City/CityBikeInterveneList.vue')), 'CityBikeInterveneList')
  },
  {
    path: '/city/company/info',
    name: 'city.company.info',
    meta: {
      permission: []
    },
    component: r => require.ensure([], () => r(require('../pages/City/CityCompanyInfo.vue')), 'CityCompanyInfo')
  },
  {
    path: '/city/operator',
    name: 'city.operator',
    meta: {
      permission: []
    },
    component: r => require.ensure([], () => r(require('../pages/City/CityOperator.vue')), 'CityOperator')
  },
  {
    path: '/city/remote',
    name: 'city.remote',
    meta: {
      permission: []
    },
    component: r => require.ensure([], () => r(require('../pages/City/CityRemote.vue')), 'CityRemote')
  },
  {
    path: '/city/range',
    name: 'city.range',
    meta: {
      permission: []
    },
    component: r => require.ensure([], () => r(require('../pages/City/CityRange.vue')), 'CityRange')
  },
  {
    path: '/city/point',
    name: 'city.point',
    meta: {
      permission: []
    },
    component: r => require.ensure([], () => r(require('../pages/City/CityPoint.vue')), 'CityPoint')
  },
  {
    path: '/city/area/total',
    name: 'city.area.total',
    meta: {
      permission: []
    },
    component: r => require.ensure([], () => r(require('../pages/City/CityAreaTotal.vue')), 'CityAreaTotal')
  },
  {
    path: '/city/blacklist',
    name: 'city.blacklist',
    meta: {
      permission: []
    },
    component: r => require.ensure([], () => r(require('../pages/City/CityBlacklist.vue')), 'CityBlacklist')
  },
  {
    path: '/city/fencing/info',
    name: 'city.fencing.info',
    meta: {
      permission: []
    },
    component: r => require.ensure([], () => r(require('../pages/City/CityFencing.vue')), 'CityFencingInfo')
  },
  {
    path: '/service',
    name: 'service',
    component: r => require.ensure([], () => r(require('../pages/Service/Service.vue')), 'Service'),
    children: []
  },
  // 客服管理相关
  {
    path: '/service/change/credit',
    name: 'service.change.credit',
    meta: {
      permission: []
    },
    component: r => require.ensure([], () => r(require('../pages/Service/ServiceChangeCredit.vue')), 'ServiceChangeCredit')
  },
  {
    path: '/service/change/phone',
    name: 'service.change.phone',
    meta: {
      permission: []
    },
    component: r => require.ensure([], () => r(require('../pages/Service/ServiceChangePhone.vue')), 'ServiceChangePhone')
  },
  {
    path: '/service/feedback',
    name: 'service.feedback',
    meta: {
      permission: []
    },
    component: r => require.ensure([], () => r(require('../pages/Service/ServiceFeedback.vue')), 'ServiceFeedback')
  },
  {
    path: '/service/violation',
    name: 'service.violation',
    meta: {
      permission: []
    },
    component: r => require.ensure([], () => r(require('../pages/Service/ServiceViolation.vue')), 'ServiceViolation')
  },
  {
    path: '/service/operation',
    name: 'service.operation',
    meta: {
      permission: []
    },
    component: r => require.ensure([], () => r(require('../pages/Service/ServiceOperation.vue')), 'ServiceOperation')
  },
  {
    path: '/redpacket',
    name: 'redpacket',
    component: r => require.ensure([], () => r(require('../pages/RedPacket/RedPacket.vue')), 'RedPacket'),
    children: []
  },
  // 红包管理相关
  {
    path: '/redpacket/click',
    name: 'redpacket.click',
    meta: {
      permission: []
    },
    component: r => require.ensure([], () => r(require('../pages/RedPacket/RedPacketClick.vue')), 'RedPacketClick')
  },
  {
    path: '/redpacket/config',
    name: 'redpacket.config',
    meta: {
      permission: []
    },
    component: r => require.ensure([], () => r(require('../pages/RedPacket/RedPacketConfig.vue')), 'RedPacketConfig')
  },
  {
    path: '/redpacket/cash',
    name: 'redpacket.cash',
    meta: {
      permission: []
    },
    component: r => require.ensure([], () => r(require('../pages/RedPacket/RedPacketCash.vue')), 'RedPacketCash')
  },
  {
    path: '/activity',
    name: 'activity',
    component: r => require.ensure([], () => r(require('../pages/Activity/Activity.vue')), 'Activity'),
    children: []
  },
  // 活动中心
  {
    path: '/activity/message',
    name: 'activity.message',
    meta: {
      permission: []
    },
    component: r => require.ensure([], () => r(require('../pages/Activity/ActivityMessage.vue')), 'ActivityMessage')
  },
  {
    path: '/activity/message/plan',
    name: 'activity.message.plan',
    meta: {
      permission: []
    },
    component: r => require.ensure([], () => r(require('../pages/Activity/ActivityMessagePlan.vue')), 'ActivityMessagePlan')
  },
  {
    path: '/activity/enjoy',
    name: 'activity.enjoy',
    meta: {
      permission: []
    },
    component: r => require.ensure([], () => r(require('../pages/Activity/ActivityEnjoy.vue')), 'ActivityEnjoy')
  },
  {
    path: '/activity/config',
    name: 'activity.config',
    meta: {
      permission: []
    },
    component: r => require.ensure([], () => r(require('../pages/Activity/ActivityConfig.vue')), 'ActivityConfig')
  },
  {
    path: '/activity/coupon',
    name: 'activity.coupon',
    meta: {
      permission: []
    },
    component: r => require.ensure([], () => r(require('../pages/Activity/ActivityCoupon.vue')), 'ActivityCoupon')
  },
  {
    path: '/activity/invite/detail',
    name: 'activity.invite.detail',
    meta: {
      permission: []
    },
    component: r => require.ensure([], () => r(require('../pages/Activity/ActivityInviteDetail.vue')), 'ActivityInviteDetail')
  },
  {
    path: '/activity/coupon/receive',
    name: 'activity.coupon.receive',
    meta: {
      permission: []
    },
    component: r => require.ensure([], () => r(require('../pages/Activity/ActivityCouponReceive.vue')), 'ActivityCouponReceive')
  },
  {
    path: '/activity/invite/list',
    name: 'activity.invite.list',
    meta: {
      permission: []
    },
    component: r => require.ensure([], () => r(require('../pages/Activity/ActivityInviteList.vue')), 'ActivityInviteList')
  },
  {
    path: '/activity/config/icon',
    name: 'activity.config.icon',
    meta: {
      permission: []
    },
    component: r => require.ensure([], () => r(require('../pages/Activity/Zombie/ActivityConfigIcon.vue')), 'ActivityConfigIcon')
  },
  {
    path: '/activity/inmobi',
    name: 'activity.inmobi',
    meta: {
      permission: []
    },
    component: r => require.ensure([], () => r(require('../pages/Activity/ActivityInMobi.vue')), 'ActivityInMobi')
  },
  {
    path: '/activity/coupon/details',
    name: 'activity.coupon.details',
    meta: {
      permission: []
    },
    component: r => require.ensure([], () => r(require('../pages/Activity/ActivityCoupon/CouponDetails.vue')), 'ActivityCouponDetails')
  },
  {
    path: '/activity/health',
    name: 'activity.health',
    meta: {
      permission: []
    },
    component: r => require.ensure([], () => r(require('../pages/Activity/ActivityMonth/ActivityHealth.vue')), 'ActivityHealth')
  },
  {
    path: '/activity/red/rain',
    name: 'activity.red.rain',
    meta: {
      permission: []
    },
    component: r => require.ensure([], () => r(require('../pages/Activity/ActivityMonth/ActivityRedrain.vue')), 'ActivityRedrain')
  },
  {
    path: '/serviceConfig',
    name: 'serviceConfig',
    component: r => require.ensure([], () => r(require('../pages/ServiceConfig/ServiceConfig.vue')), 'ServiceConfig'),
    children: []
  },
  {
    path: '/serviceConfig/msg',
    name: 'serviceConfig.msg',
    meta: {     // 为每个路由页面增加meta字段。在routerMatch函数中将匹配到的详细权限字段赋值到这里。这样在每个页面的route对象中就会得到这个字段。
      permission: []
    },
    component: r => require.ensure([], () => r(require('../pages/ServiceConfig/ServiceConfigMsg.vue')), 'ServiceConfigMsg')
  },
  {
    path: '/serviceConfig/name',
    name: 'serviceConfig.name',
    meta: {     // 为每个路由页面增加meta字段。在routerMatch函数中将匹配到的详细权限字段赋值到这里。这样在每个页面的route对象中就会得到这个字段。
      permission: []
    },
    component: r => require.ensure([], () => r(require('../pages/ServiceConfig/serviceConfigName.vue')), 'ServiceConfigName')
  }
  // , {path: '*', component: r => require.ensure([], () => r(require('../components/commons/NotFound.vue')), 'NotFound')}
]

export default asyncRouter
