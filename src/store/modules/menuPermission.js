/*
 * @Author: rzx007
 * @Date: 2021-05-24 10:25:48
 * @LastEditors: 阮志雄
 * @LastEditTime: 2021-11-03 11:51:34
 * @FilePath: \Protected-Area-Resources-Monitor-and-Management-System\src\store\modules\menuPermission.js
 * @Description: Do not edit
 */
import { getSystemFuncList } from '@/api'
import router from '@/router'
import getRoutes from '@/router/getRoutes'
import { getToken } from '@/utils/auth'

const permission = {
  state: {
    routes: JSON.parse(localStorage.getItem('menu')) || []
  },
  mutations: {
    SET_USERMENU: (state, menu) => {
      state.routes = menu
      // localStorage.setItem('menu', JSON.stringify(menu))
    }
  },
  actions: {
    GetUserMenu({ commit }, userId = getToken('userId')) {
      return new Promise((resolve, reject) => {
        let asyncRoutes = []
        router.options.routes[1].children = []
        getSystemFuncList({ userId })
          .then(res => {
            if (res.data.length < 1) return
            res.data.forEach(item => {
              asyncRoutes.push({
                title: item.menuName,
                componentName: item.linkUrl,
                componentPath: item.linkUrl,
                icon: 'tongji',
                id: item.menuId,
                path: item.linkUrl
              })
            });
            const routes = getRoutes(asyncRoutes)
            console.log(router.options)
            router.options.routes[0].children = routes
            router.options.routes.push(
              {
                component: () => import('@/components/notFound.vue'),
                meta: { title: '404', isCache: false, requiresAuth: true },
                name: '404',
                path: '/404'
              },
              {
                path: '*',
                redirect: '/404'
              }
            )
            router.addRoutes(router.options.routes)
            commit('SET_USERMENU', asyncRoutes)
            resolve(routes)
          })
          .catch(error => {
            reject(error)
          })
      })
    }
  }
}
export default permission
