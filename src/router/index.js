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
import Setting from '@/pages/Setting/Setting.vue'
import Facility from '@/pages/Facility/Facility.vue'
import Content from '@/pages/Content/Content.vue'
import Status from '@/pages/Status/Status.vue'
import Vip from '@/pages/Vip/Vip.vue'
import Report from '@/pages/Report/Report.vue'
import City from '@/pages/City/City.vue'
import Service from '@/pages/Service/Service.vue'
import RedPacket from '@/pages/RedPacket/RedPacket.vue'
import Activity from '@/pages/Activity/Activity.vue'
// 登录页
import Main from '@/pages/Login/Main.vue'   // 为后台管理页
import Home from '@/pages/Login/Home.vue'   // 为用户登录成功之后的主页
import Login from '@/pages/Login/Login.vue' // 为登录注册页
// vip相关
import VipInfo from '@/pages/Vip/VipInfo.vue'
import VipInviteList from '@/pages/Vip/VipInviteList.vue'
import VipInviteTotal from '@/pages/Vip/VipInviteTotal.vue'

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
    {path: '/setting', name: 'setting', component: Setting},
    {path: '/facility', name: 'facility', component: Facility},
    {path: '/content', name: 'content', component: Content},
    {path: '/status', name: 'status', component: Status},
    {path: '/vip', name: 'vip', component: Vip},
    {path: '/report', name: 'report', component: Report},
    {path: '/city', name: 'city', component: City},
    {path: '/service', name: 'service', component: Service},
    {path: '/redpacket', name: 'redpacket', component: RedPacket},
    {path: '/activity', name: 'activity', component: Activity},
// vip相关
    {path: '/vip/info', name: 'vip.info', component: VipInfo},
    {path: '/vip/invite/list', name: 'vip.invite.list', component: VipInviteList},
    {path: '/vip/invite/total', name: 'vip.invite.total', component: VipInviteTotal},
    {path: '*', component: NotFound}
  ]
})
