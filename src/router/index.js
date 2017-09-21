import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Login from '@/pages/Login'
import Mypanel from '@/pages/Mypanel/Mypanel.vue'
import NotFound from '@/components/commons/NotFound.vue'

import Userinfo from '@/pages/User/Userinfo.vue'
import Userpwd from '@/pages/User/Userpwd.vue'
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

Vue.use(Router)

export default new Router({
  routes: [
    {path: '/', name: 'Hello', component: Hello},
    {path: '/login', name: 'Login', component: Login},
    {path: '/mypanel', name: 'Mypanel', component: Mypanel},
    {path: '/userinfo', name: 'Userinfo', component: Userinfo},
    {path: '/userpwd', name: 'Userpwd', component: Userpwd},
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
    {path: '*', component: NotFound}
  ]
})
