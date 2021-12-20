import { getSystemFuncList } from '@/api'
import router from '@/router'
import getRoutes from '@/router/getRoutes'
import { isAdmin } from '@/utils/auth'
import Main from '@/components/Layout.vue'
const setAdminRoute = () => {
  return isAdmin() ? [{
    title: '保护区管理',
    componentName: 'areaManagement',
    componentPath: '/area-management',
    icon: 'xitongguanli',
    parentId: 0,
    id: '05151',
    type: 3,
    path: '/area-management'
  }, {
    title: '权限管理',
    componentName: 'permission',
    componentPath: '/permission',
    icon: 'quanxian',
    parentId: 0,
    id: '05150',
    type: 3,
    path: '/permission'
  }] : []
}
const permission = {
  state: {
    routes: setAdminRoute()
  },
  mutations: {
    SET_USERMENU: (state, menu) => {
      state.routes = menu
      // localStorage.setItem('menu', JSON.stringify(menu))
    }
  },
  actions: {
    GetUserMenu({ commit }, params) {
      return new Promise((resolve, reject) => {
        let asyncRoutes = []
        // router.options.routes[1].children = []
        getSystemFuncList({ userId: params.userId, reserveId: params.reserveId })
          .then(res => {
            if (res.data.length < 1) {
              resolve([])
              return
            }
            res.data.forEach(item => {
              asyncRoutes.push({
                title: item.menuName,
                componentName: item.linkUrl,
                componentPath: item.linkUrl,
                icon: item.menuIcon,
                id: item.menuId,
                path: item.linkUrl
              })
            });
            const routes = getRoutes(asyncRoutes)
            // router.options.routes[0].redirect = routes[0].path
            router.options.routes.splice(0, 1, {
              path: '/index',
              name: 'Main',
              component: Main,
              redirect: routes[0].path,
              children: routes
            })
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
