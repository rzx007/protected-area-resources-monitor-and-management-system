import Vue from 'vue'
import VueRouter from 'vue-router'
import { getToken, isAdmin } from '@/utils/auth'
import { Message } from 'element-ui'
import store from '@/store/index'
import Main from '@/components/Layout.vue'
import getRoutes from './getRoutes'
import routeArr from '@/mock/router.js'

// const sonRoute = getRoutes(routeArr)
const routes = [
  {
    path: '/',
    name: 'Main',
    component: Main,
    redirect: '/area-management',
    children: [{
      path: '/area-management',
      name: 'area',
      component: () =>
        import(/* webpackChunkName: "area-management" */ '../views/area-management/index.vue'),
      meta: {
        title: '保护区管理'
      }
    }]
  },
  {
    path: '/login',
    name: 'login',
    component: () =>
      import(/* webpackChunkName: "Login" */ '../views/login/index.vue')
  },
  {
    path: '/bigscreen',
    name: 'bigscreen',
    component: () =>
      import(/* webpackChunkName: "Login" */ '../views/analysis-big-screen/index.vue')
  }
]
Vue.use(VueRouter)
// 获取原型对象上的push函数
const originalPush = VueRouter.prototype.push
// 修改原型对象中的push方法
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const router = new VueRouter({
  routes
})
let asyncRouterFlag = 0
router.beforeEach(async (to, from, next) => {
  // to即将进入的目标路由对象，from当前导航正要离开的路由， next  :  下一步执行的函数钩子
  // 如果即将进入登录路由，则直接放行
  // 进入的不是登录路由
  if (to.path === '/login') {
    next()
  } else {
    if (!sessionStorage.getItem('token')) {
      // Message({
      //   message: '权限已失效，请重新登录！',
      //   type: 'error',
      //   duration: 1500
      // })
      next({
        path: '/login'
      })
    } else {
      // 添加flag防止多次获取动态路由和栈溢出
      if (!asyncRouterFlag && store.getters.routes.length === 0 && !isAdmin()) {
        asyncRouterFlag++
        await store.dispatch('GetUserMenu', {
          reserveId: getToken('reserveId'),
          userId: getToken('userId')
        })
        next({ ...to, replace: true })
      } else {
        next()
      }
      // 下一跳路由需要登录验证，并且还未登录，则路由定向到  登录路由
      if (to.meta.title) document.title = to.meta.title
      next()
    }
  } // 如果不需要登录验证，或者已经登录成功，则直接放行
})

export default router
