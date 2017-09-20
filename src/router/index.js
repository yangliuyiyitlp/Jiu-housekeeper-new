import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/pages/Login'
import Mypanel from '@/components/Mypanel/Mypanel.vue'
import NotFound from '@/components/commons/NotFound.vue'

import Userinfo from '@/pages/User/Userinfo.vue'
import Userpwd from '@/pages/User/Userpwd.vue'
import Userdfinfo from '@/pages/User/UserDfinfo.vue'
import Userdfpwd from '@/pages/User/UserDfpwd.vue'

import SystemUserManagement from '@/pages/System_setting/SystemUserManagement.vue'
import VipInfo from '@/pages/VipManagement/VipInfo.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {path: '/', name: 'Login', component: Login},
    {path: '/login', name: 'Login', component: Login},
    {path: '/mypanel', name: 'Mypanel', component: Mypanel},
    {path: '/userinfo', name: 'Userinfo', component: Userinfo},
    {path: '/userpwd', name: 'Userpwd', component: Userpwd},
    {path: '/userdfinfo', name: 'Userdfinfo', component: Userdfinfo},
    {path: '/userdfpwd', name: 'Userdfpwd', component: Userdfpwd},
    {path: '/system/user/management', name: 'system.user.management', component: SystemUserManagement},
    {path: '/vip/management/info', name: 'vip.management.info', component: VipInfo},
    {path: '*', component: NotFound}
  ]
})
