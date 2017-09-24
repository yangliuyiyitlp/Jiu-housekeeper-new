import Vue from 'vue'
import Router from 'vue-router'
import Mypanel from '@/components/Mypanel/Mypanel.vue'
import NotFound from '@/components/commons/NotFound.vue'
import Userinfo from '@/pages/User/Userinfo.vue'
import Userpwd from '@/pages/User/Userpwd.vue'
import Userdfinfo from '@/pages/User/UserDfinfo.vue'
import Userdfpwd from '@/pages/User/UserDfpwd.vue'
import User from '@/pages/User/User.vue'

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
// 设备管理
import Tabs from '@/pages/Facility/Tabs.vue'
import FacilityInfo from '@/pages/Facility/bikessetting/FacilityInfo.vue'
import FacilityCount from '@/pages/Facility/bikessetting/FacilityCount.vue'
import FacilityDetailed from '@/pages/Facility/bikessetting/FacilityDetailed.vue'
import FacilityState from '@/pages/Facility/bikessetting/FacilityState.vue'
import FacilityRegister from '@/pages/Facility/bikessetting/FacilityRegister.vue'
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
    {
      path: '/facility',
      name: 'facility',
      component: Facility,
      children: [
        {name: 'tabs', path: '/tabs', component: Tabs},
        {name: 'info', path: '/info', component: FacilityInfo},
        {name: 'count', path: '/count', component: FacilityCount},
        {name: 'detailed', path: '/detailed', component: FacilityDetailed},
        {name: 'state', path: '/state', component: FacilityState},
        {name: 'register', path: '/register', component: FacilityRegister}
      ]
    },
    {path: '/content', name: 'content', component: Content},
    {path: '/status', name: 'status', component: Status},
    {path: '/vip', name: 'vip', component: Vip},
    {path: '/report', name: 'report', component: Report},
    {path: '/city', name: 'city', component: City},
    {path: '/service', name: 'service', component: Service},
    {path: '/redpacket', name: 'redpacket', component: RedPacket},
    {path: '/activity', name: 'activity', component: Activity},
    {path: '*', component: NotFound}
  ]
})
