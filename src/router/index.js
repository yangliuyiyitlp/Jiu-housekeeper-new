import Vue from 'vue'
import Router from 'vue-router'
import Mypanel from '@/components/Mypanel/Mypanel.vue'
import NotFound from '@/components/commons/NotFound.vue'
import Userinfo from '@/pages/User/Userinfo.vue'
import Userpwd from '@/pages/User/Userpwd.vue'
import Userdfinfo from '@/pages/User/UserDfinfo.vue'
import Userdfpwd from '@/pages/User/UserDfpwd.vue'
import User from '@/pages/User/User.vue'
// 十大功能路由
// import Setting from '@/pages/Setting/Setting.vue'
import Facility from '@/pages/Facility/Facility.vue'
// import Content from '@/pages/Content/Content.vue'
// import Status from '@/pages/Status/Status.vue'
// import Report from '@/pages/Report/Report.vue'
// import City from '@/pages/City/City.vue'
// import Service from '@/pages/Service/Service.vue'
// import RedPacket from '@/pages/RedPacket/RedPacket.vue'
// import Activity from '@/pages/Activity/Activity.vue'
// 登录页
import Main from '@/pages/Login/Main.vue'   // 为后台管理页
import Home from '@/pages/Login/Home.vue'   // 为用户登录成功之后的主页
import Login from '@/pages/Login/Login.vue' // 为登录注册页
// setting相关
import SettingUser from '@/pages/Setting/User/User.vue'
import SettingMechanism from '@/pages/Setting/User/Mechanism.vue'
import SettingArea from '@/pages/Setting/User/Area.vue'
import SettingMenu from '@/pages/Setting/System/Menu.vue'
import SettingRole from '@/pages/Setting/System/Role.vue'
import SettingDictionary from '@/pages/Setting/System/Dictionary.vue'
import SettingDaily from '@/pages/Setting/Daily/Daily.vue'
import SettingConnectControl from '@/pages/Setting/Daily/ConnectControl.vue'
import SettingAbout from '@/pages/Setting/About.vue'
// content 相关
import ContentRelease from '@/pages/Content/ContentRelease.vue'
import ContentComment from '@/pages/Content/ContentComment.vue'
import ContentPublicMessage from '@/pages/Content/ContentPublicMessage.vue'
import ContentInformationTotal from '@/pages/Content/ContentInformationTotal.vue'
import ContentColumn from '@/pages/Content/ContentColumn.vue'
import ContentSiteSetting from '@/pages/Content/ContentSiteSetting.vue'
import ContentSiteSwitch from '@/pages/Content/ContentSiteSwitch.vue'
// status相关
import StatusBikeMap from '@/pages/Status/StatusBikeMap.vue'
import StatusHeatchart from '@/pages/Status/StatusHeatchart.vue'
import StatusGovernment from '@/pages/Status/StatusGovernment.vue'
import StatusCity from '@/pages/Status/StatusCity.vue'
import StatusBikeArea from '@/pages/Status/StatusBikeArea.vue'
// vip相关
import VipInfo from '@/pages/Vip/VipInfo.vue'
import VipInviteList from '@/pages/Vip/VipInviteList.vue'
import VipInviteTotal from '@/pages/Vip/VipInviteTotal.vue'
// report相关
import ReportVip from '@/pages/Report/ReportVip.vue'
import ReportManualReturn from '@/pages/Report/ReportManualReturn.vue'
import ReportTransaction from '@/pages/Report/ReportTransaction.vue'
import ReportTransactionNow from '@/pages/Report/ReportTransactionNow.vue'
import ReportReplaceBattery from '@/pages/Report/ReportReplaceBattery.vue'
import ReportRecharge from '@/pages/Report/ReportRecharge.vue'
// city 相关
import CityCompanyInfo from '@/pages/City/CityCompanyInfo.vue'
import CityOperator from '@/pages/City/CityOperator.vue'
import CityRemote from '@/pages/City/CityRemote.vue'
import CityRange from '@/pages/City/CityRange.vue'
import CityPoint from '@/pages/City/CityPoint.vue'
import CityAreaTotal from '@/pages/City/CityAreaTotal.vue'
import CityBlacklist from '@/pages/City/CityBlacklist.vue'
// 客服管理相关
import ServiceChangeCredit from '@/pages/Service/ServiceChangeCredit.vue'
import ServiceChangePhone from '@/pages/Service/ServiceChangePhone.vue'
import ServiceFeedback from '@/pages/Service/ServiceFeedback.vue'
import ServiceViolation from '@/pages/Service/ServiceViolation.vue'
import ServiceOperation from '@/pages/Service/ServiceOperation.vue'
// 红包管理相关
import RedPacketClick from '@/pages/RedPacket/RedPacketClick.vue'
import RedPacketConfig from '@/pages/RedPacket/RedPacketConfig.vue'
import RedPacketCash from '@/pages/RedPacket/RedPacketCash.vue'
// 活动中心
import ActivityMessage from '@/pages/Activity/ActivityMessage.vue'
import ActivityMessagePlan from '@/pages/Activity/ActivityMessagePlan.vue'
import ActivityEnjoy from '@/pages/Activity/ActivityEnjoy.vue'
import ActivityConfig from '@/pages/Activity/ActivityConfig.vue'
import ActivityCoupon from '@/pages/Activity/ActivityCoupon.vue'
import ActivityInviteDetail from '@/pages/Activity/ActivityInviteDetail.vue'
import ActivityCouponReceive from '@/pages/Activity/ActivityCouponReceive.vue'
import ActivityInviteList from '@/pages/Activity/ActivityInviteList.vue'
import ActivityConfigIcon from '@/pages/Activity/ActivityConfigIcon.vue'

Vue.use(Router)

export default new Router({
  routes: [

    {path: '/', name: 'Login', component: Login},
    {path: '/login', name: 'Login', component: Login},
    {path: '/main', name: 'Main', component: Main},
    {path: '/home', name: 'Home', component: Home},
    {path: '/mypanel', name: 'Mypanel', component: Mypanel},
    {path: '/userinfo', name: 'Userinfo', component: Userinfo},
    {path: '/userpwd', name: 'Userpwd', component: Userpwd},
    {path: '/userdfinfo', name: 'Userdfinfo', component: Userdfinfo},
    {path: '/userdfpwd', name: 'Userdfpwd', component: Userdfpwd},
    {path: '/user', name: 'User', component: User},
    // {path: '/setting', name: 'setting', component: Setting},
    {path: '/facility', name: 'facility', component: Facility},
    // {path: '/content', name: 'content', component: Content},
    // {path: '/status', name: 'status', component: Status},
    // {path: '/report', name: 'report', component: Report},
    // {path: '/city', name: 'city', component: City},
    // {path: '/service', name: 'service', component: Service},
    // {path: '/redpacket', name: 'redpacket', component: RedPacket},
    // {path: '/activity', name: 'activity', component: Activity},
    // setting相关
    {path: '/setting/user', name: 'setting.user', component: SettingUser},
    {path: '/setting/mechanism', name: 'setting.mechanism', component: SettingMechanism},
    {path: '/setting/area', name: 'setting.area', component: SettingArea},
    {path: '/setting/menu', name: 'setting.menu', component: SettingMenu},
    {path: '/setting/role', name: 'setting.role', component: SettingRole},
    {path: '/setting/dictionary', name: 'setting.dictionary', component: SettingDictionary},
    {path: '/setting/daily', name: 'setting.daily', component: SettingDaily},
    {path: '/setting/connect/control', name: 'setting.connect.control', component: SettingConnectControl},
    {path: '/setting/about', name: 'setting.about', component: SettingAbout},
    // content相关
    {path: '/content/release', name: 'content.release', component: ContentRelease},
    {path: '/content/comment', name: 'content.comment', component: ContentComment},
    {path: '/content/public/message', name: 'content.public.message', component: ContentPublicMessage},
    {path: '/content/information/total', name: 'content.information.total', component: ContentInformationTotal},
    {path: '/content/column', name: 'content.column', component: ContentColumn},
    {path: '/content/site/setting', name: 'content.site.setting', component: ContentSiteSetting},
    {path: '/content/site/switch', name: 'content.site.switch', component: ContentSiteSwitch},
     // status相关
     {path: '/status/bike/map', name: 'status.bike.map', component: StatusBikeMap},
     {path: '/status/heatchart', name: 'status.heatchart', component: StatusHeatchart},
     {path: '/status/government', name: 'status.government', component: StatusGovernment},
     {path: '/status/city', name: 'status.city', component: StatusCity},
     {path: '/status/bike/area', name: 'status.bike.area', component: StatusBikeArea},
    // vip相关
    {path: '/vip/info', name: 'vip.info', component: VipInfo},
    {path: '/vip/invite/list', name: 'vip.invite.list', component: VipInviteList},
    {path: '/vip/invite/total', name: 'vip.invite.total', component: VipInviteTotal},
    // report相关
    {path: '/report/vip', name: 'report.vip', component: ReportVip},
    {path: '/report/manual/return', name: 'report.manual.return', component: ReportManualReturn},
    {path: '/report/transaction', name: 'report.transaction', component: ReportTransaction},
    {path: '/report/transaction/now', name: 'report.transaction.now', component: ReportTransactionNow},
    {path: '/report/replace/battery', name: 'report.replace.battery', component: ReportReplaceBattery},
    {path: '/report/recharge', name: 'report.recharge', component: ReportRecharge},
    // city 相关
    {path: '/city/company/info', name: 'city.company.info', component: CityCompanyInfo},
    {path: '/city/operator', name: 'city.operator', component: CityOperator},
    {path: '/city/remote', name: 'city.remote', component: CityRemote},
    {path: '/city/range', name: 'city.range', component: CityRange},
    {path: '/city/point', name: 'city.point', component: CityPoint},
    {path: '/city/area/total', name: 'city.area.total', component: CityAreaTotal},
    {path: '/city/blacklist', name: 'city.blacklist', component: CityBlacklist},
    // 客服管理相关
    {path: '/service/change/credit', name: 'service.change.credit', component: ServiceChangeCredit},
    {path: '/service/change/phone', name: 'service.change.phone', component: ServiceChangePhone},
    {path: '/service/feedback', name: 'service.feedback', component: ServiceFeedback},
    {path: '/service/violation', name: 'service.violation', component: ServiceViolation},
    {path: '/service/operation', name: 'service.operation', component: ServiceOperation},
    // 红包管理相关
    {path: '/redpacket/click', name: 'redpacket.click', component: RedPacketClick},
    {path: '/redpacket/config', name: 'redpacket.config', component: RedPacketConfig},
    {path: '/redpacket/cash', name: 'redpacket.cash', component: RedPacketCash},
    // 活动中心
    {path: '/activity/message', name: 'activity.message', component: ActivityMessage},
    {path: '/activity/message/plan', name: 'activity.message.plan', component: ActivityMessagePlan},
    {path: '/activity/enjoy', name: 'activity.enjoy', component: ActivityEnjoy},
    {path: '/activity/config', name: 'activity.config', component: ActivityConfig},
    {path: '/activity/coupon', name: 'activity.coupon', component: ActivityCoupon},
    {path: '/activity/invite/detail', name: 'activity.invite.detail', component: ActivityInviteDetail},
    {path: '/activity/coupon/receive', name: 'activity.coupon.receive', component: ActivityCouponReceive},
    {path: '/activity/invite/list', name: 'activity.invite.list', component: ActivityInviteList},
    {path: '/activity/config/icon', name: 'activity.config.icon', component: ActivityConfigIcon},
    {path: '*', component: NotFound}
  ]
})
