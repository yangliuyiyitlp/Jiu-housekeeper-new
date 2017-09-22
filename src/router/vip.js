import Vue from 'vue'
import Router from 'vue-router'

// 十大功能路由

// import Vip from '@/pages/Vip/Vip.vue'
import VipInfo from '@/pages/Vip/VipInfo.vue'
import VipInviteList from '@/pages/Vip/VipInviteList.vue'
import VipInviteTotal from '@/pages/Vip/VipInviteTotal.vue'

Vue.use(Router)

export default new Router({
  routes: [
    // {path: '/vip', name: 'vip', component: Vip},
    {path: '/vip/info', name: 'vip.info', component: VipInfo},
    {path: '/vip/invite/list', name: 'vip.invite.list', component: VipInviteList},
    {path: '/vip/invite/total', name: 'vip.invite.total', component: VipInviteTotal}
  ]
})
