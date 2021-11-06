/*
 * @Author: 阮志雄
 * @Date: 2021-10-08 16:24:43
 * @LastEditTime: 2021-11-04 00:24:20
 * @LastEditors: 阮志雄
 * @Description: In User Settings Edit
 * @FilePath: \Protected-Area-Resources-Monitor-and-Management-System\src\mock\router.js
 */
const routeArr = [
  {
    title: '保护区信息',
    componentName: 'Home',
    componentPath: '/Home',
    icon: 'ditu1',
    parentId: 0,
    id: '0515',
    type: 3,
    path: '/home'
  },
  {
    title: '相机管理',
    componentName: 'cameraManagement',
    componentPath: '/camera-management',
    icon: 'zhaoxiangji',
    parentId: 0,
    id: '05146',
    type: 3,
    path: '/camera-management'
  },
  {
    title: '数据统计',
    componentName: 'analysis',
    componentPath: '/analysis',
    icon: 'tongji',
    parentId: 0,
    id: '05147',
    type: 3,
    path: '/analysis'
  },
  {
    title: '照片分析',
    componentName: 'gallery-management',
    componentPath: '/gallery-management',
    icon: 'zhaopian',
    parentId: 0,
    id: '05148',
    type: 3,
    path: '/gallery-management'
  },
  {
    title: '用户管理',
    componentName: 'userManagement',
    componentPath: '/user-management',
    icon: 'yonghu',
    parentId: 0,
    id: '05149',
    type: 3,
    path: '/user-management'
  },
  {
    title: '权限管理',
    componentName: 'permission',
    componentPath: '/permission',
    icon: 'quanxian',
    parentId: 0,
    id: '05150',
    type: 3,
    path: '/permission'
  },
  {
    title: '保护区管理',
    componentName: 'areaManagement',
    componentPath: '/area-management',
    icon: 'xitongguanli',
    parentId: 0,
    id: '05151',
    type: 3,
    path: '/area-management'
  },

]
export default routeArr
