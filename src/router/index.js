import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Login from '@/pages/Login'
import Mypanel from '@/pages/Mypanel/Mypanel.vue'
import NotFound from '@/components/commons/NotFound.vue'

import Userinfo from '@/pages/User/Userinfo.vue'
import Userpwd from '@/pages/User/Userpwd.vue'
import User from '@/pages/User/User.vue'

import SystemUserManagement from '@/pages/System_setting/SystemUserManagement.vue'
import VipInfo from '@/pages/VipManagement/VipInfo.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {path: '/', name: 'Hello', component: Hello},
    {path: '/login', name: 'Login', component: Login},
    {path: '/mypanel', name: 'Mypanel', component: Mypanel},
    {path: '/userinfo', name: 'Userinfo', component: Userinfo},
    {path: '/userpwd', name: 'Userpwd', component: Userpwd},
    {path: '/user', name: 'User', component: User},
    {path: '/system/user/management', name: 'system.user.management', component: SystemUserManagement},
    {path: '/vip/management/info', name: 'vip.management.info', component: VipInfo},
    {path: '*', component: NotFound}
  ]
})
