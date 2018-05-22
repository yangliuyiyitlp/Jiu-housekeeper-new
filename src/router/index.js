import Vue from 'vue'
import Router from 'vue-router'
import routes from './routes.js'
Vue.use(Router)

const router = new Router({    
    routes: routes
})
router.afterEach((to, from, next) => {
    document.title = to.name || to.meta.name;
})

router.beforeEach((to, from, next) => {
    if (to.meta.istoken) { // 判断该路由是否需要登录权限       
        next()
    } else {
        next({
            path: '/home'
        });
    }
})

export default router
