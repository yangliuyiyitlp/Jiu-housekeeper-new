import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Login from '@/pages/Login'
import Mypanel from '@/pages/Mypanel/Mypanel.vue'
import NotFound from '@/components/commons/NotFound.vue'
import Userinfo from '@/pages/Userinfo/Userinfo.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {path: '/', name: 'Hello', component: Hello},
    {path: '/login', name: 'Login', component: Login},
    {path: '/mypanel', name: 'Mypanel', component: Mypanel},
    {path: '/userinfo', name: 'Userinfo', component: Userinfo},
    {path: '*', component: NotFound}
  ]
})
