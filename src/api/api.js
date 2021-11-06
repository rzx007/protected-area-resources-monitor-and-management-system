import { getToken } from '@/utils/auth'
import http from './http'

//  用采 oms 关联
export async function relationAsset(params) {
  const res = await http.post('/systemService/archive/relationAsset', params)
  return res
}
// 新增用户
export async function addUser(params) {
  const res = await http.post('/reserve/appUser/add', {reserveId:getToken('reserveId'),...params})
  return res
}
// 删除用户
export async function deleteUser(params) {
  const res = await http.post('/reserve/appUser/delete', params)
  return res
}
// 更新用户
export async function updateUser(params) {
  const res = await http.post('/reserve/appUser/update', {reserveId:getToken('reserveId'),...params})
  return res
}
// 启用禁用用户
export async function updateUserStatus(params) {
  const res = await http.post('/reserve/appUser/handleUser', params)
  return res
}
// 角色列表
export async function listRole(params) {
  const res = await http.post('/reserve/appRole/list', params)
  return res
}
// 新增角色
export async function addRole(params) {
  const res = await http.post('/reserve/appRole/add', params)
  return res
}
// 删除角色
export async function deleteRole(params) {
  const res = await http.post('/reserve/appRole/delete', params)
  return res
}
// 更新角色
export async function updateRole(params) {
  const res = await http.post('/reserve/appRole/update', params)
  return res
}
// 删除菜单
export async function delSystemFunction(params) {
  const res = await http.post('/reserve/appMenu/delete', params)
  return res
}
//获取菜单列表
export async function getMenuTree(params) {
  const res = await http.post('/reserve/appMenu/list', params)
  return res
}
//获取角色菜单列表
export async function getRoleOwnMenu(params) {
  const res = await http.post('/reserve/appMenu/list', params)
  return res
}
//设置角色的菜单
export async function roleGrantMenu(params) {
  const res = await http.post('/reserve/appRoleMenu/add', params)
  return res
}
//照片列表
export async function galleryList(params) {
  const res = await http.post('/reserve/appPhoto/list', params)
  return res
}
//修改照片
export async function galleryUpdate(params) {
  const res = await http.post('/reserve/appPhoto/update', params)
  return res
}
//修改照片
export async function galleryDelete(params) {
  const res = await http.post('/reserve/appPhoto/delete', params)
  return res
}
// 不定参数请求
// get
export async function apiGet(url, params) {
  const res = await http.get(url, {
    params
  })
  return res
}
// post
export async function apiPost(url, params) {
  const res = await http.post(url, params)
  return res
}
