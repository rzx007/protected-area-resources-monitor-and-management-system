/*
 * @Author: 阮志雄
 * @Date: 2021-10-08 16:24:43
 * @LastEditTime: 2021-10-22 14:47:31
 * @LastEditors: 阮志雄
 * @Description: In User Settings Edit
 * @FilePath: \Protected-Area-Resources-Monitor-and-Management-System\src\mock\router.js
 */
const routeArr = [
  {
    title: '保护区信息',
    componentName: 'Home',
    componentPath: 'Home/index',
    icon: 'ditu1',
    parentId: 0,
    id: '0515',
    type: 3,
    path: '/home'
  },
  {
    title: '相机管理',
    componentName: 'cameraManagement',
    componentPath: 'camera-management/index',
    icon: 'zhaoxiangji',
    parentId: 0,
    id: '05146',
    type: 3,
    path: '/camera-management'
  },
  {
    title: '数据统计',
    componentName: 'analysis',
    componentPath: 'analysis/index',
    icon: 'tongji',
    parentId: 0,
    id: '05147',
    type: 3,
    path: '/analysis'
  },
  {
    title: '照片分析',
    componentName: 'gallery-management',
    componentPath: 'gallery-management/index',
    icon: 'zhaopian',
    parentId: 0,
    id: '05148',
    type: 3,
    path: '/gallery-management'
  },
  {
    title: '用户管理',
    componentName: 'userManagement',
    componentPath: 'user-management/index',
    icon: 'yonghu',
    parentId: 0,
    id: '05149',
    type: 3,
    path: '/user-management'
  },
  {
    title: '角色管理',
    componentName: 'roleManagement',
    componentPath: 'role-management/index',
    icon: 'quanxian',
    parentId: 0,
    id: '05150',
    type: 3,
    path: '/role-management'
  },
  {
    title: '保护区管理',
    componentName: 'areaManagement',
    componentPath: 'area-management/index',
    icon: 'xitongguanli',
    parentId: 0,
    id: '05151',
    type: 3,
    path: '/area-management'
  },

]
export default routeArr
