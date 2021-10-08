const routeArr = [
  {
    title: '首页',
    componentName: 'Home',
    componentPath: 'Home/index',
    icon: 'el-icon-house',
    parentId: 0,
    id: '0515',
    type: 3,
    path: '/home'
  },
  {
    title: '地图',
    componentName: 'maps',
    componentPath: 'map/index',
    icon: 'el-icon-coffee-cup',
    parentId: 0,
    id: '05144',
    type: 3,
    path: '/map'
  },
  {
    title: '系统管理',
    icon: 'el-icon-coffee-cup',
    parentId: 0,
    id: '0520',
    type: 1,
    children: [{
      title: '用户管理',
      componentName: 'userManagement',
      componentPath: 'system-management/user-management/index',
      icon: 'el-icon-coffee-cup',
      parentId: '0520',
      id: '05201',
      type: 3,
      path: '/user-management'
    }, {
      title: '保护区管理',
      componentName: 'areaManagement',
      componentPath: 'system-management/area-management/index',
      icon: 'el-icon-coffee-cup',
      parentId: '0520',
      id: '05202',
      type: 3,
      path: '/area-management'
    }]
  },
  {
    title: '例子',
    icon: 'el-icon-coffee-cup',
    parentId: 0,
    id: '0514',
    type: 1,
    children: [{
      title: 'CURD布局',
      componentName: 'curd',
      componentPath: 'curd/index',
      icon: 'el-icon-coffee-cup',
      parentId: 0,
      id: '05141',
      type: 3,
      path: '/curd'
    }]
  },
  {
    title: '组件错误',
    componentName: 'sdd',
    componentPath: 'curd/pages/sdd',
    icon: 'el-icon-coffee-cup',
    parentId: 0,
    id: '05143',
    type: 3,
    path: '/sdd'
  }
]
export default routeArr
