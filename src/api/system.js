import { getToken } from '@/utils/auth'
import http from './http'

// 用户列表
export async function listUser(params) {
  const res = await http.post('/reserve/appUser/list', {reserveId:getToken('reserveId'),...params})
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
//物种列表
export async function speciesList(params) {
  const res = await http.post('/reserve/appSpecies/list', params)
  return res
}
// 更新物种
export async function speciesUpdate(params) {
  const res = await http.post('/reserve/appSpecies/update', params)
  return res
}
//删除物种
export async function speciesDelete(params) {
  const res = await http.post('/reserve/appSpecies/delete', params)
  return res
}
// 新增物种
export async function speciesAdd(params) {
  const res = await http.post('/reserve/appSpecies/add', params)
  return res
}
