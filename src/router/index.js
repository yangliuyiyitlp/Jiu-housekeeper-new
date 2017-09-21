import Vue from 'vue'
import Router from 'vue-router'
import Mypanel from '@/components/Mypanel/Mypanel.vue'
import NotFound from '@/components/commons/NotFound.vue'
import Userinfo from '@/pages/User/Userinfo.vue'
import Userpwd from '@/pages/User/Userpwd.vue'
import Userdfinfo from '@/pages/User/UserDfinfo.vue'
import Userdfpwd from '@/pages/User/UserDfpwd.vue'
import User from '@/pages/User/User.vue'
import SystemUserManagement from '@/pages/System_setting/SystemUserManagement.vue'
import VipInfo from '@/pages/VipManagement/VipInfo.vue'
// 登录页
import Main from '@/pages/Login/Main.vue'   // 为后台管理页
import Home from '@/pages/Login/Home.vue'   // 为用户登录成功之后的主页
import Login from '@/pages/Login/Login.vue' // 为登录注册页

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
    {path: '/system/user/management', name: 'system.user.management', component: SystemUserManagement},
    {path: '/vip/management/info', name: 'vip.management.info', component: VipInfo},
    {path: '*', component: NotFound}
  ]
})
