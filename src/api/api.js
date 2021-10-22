/*
 * @Author: 阮志雄
 * @Date: 2021-07-08 14:29:08
 * @LastEditTime: 2021-10-22 18:52:11
 * @LastEditors: 阮志雄
 * @Description: In User Settings Edit
 * @FilePath: \Protected-Area-Resources-Monitor-and-Management-System\src\api\api.js
 */
import http from './http'

//  用采 oms 关联
export async function relationAsset (params) {
  const res = await http.post('/systemService/archive/relationAsset', params)
  return res
}
// 新增用户
export async function addUser (params) {
  const res = await http.post('/reserve/appUser/add', params)
  return res
}
// 删除用户
export async function deleteUser (params) {
  const res = await http.post('/reserve/appUser/delete', params)
  return res
}
// 更新用户
export async function updateUser (params) {
  const res = await http.post('/reserve/appUser/update', params)
  return res
}
// 启用禁用用户
export async function updateUserStatus (params) {
  const res = await http.post('/reserve/appUser/handleUser', params)
  return res
}
// 新增角色
export async function addRole (params) {
  const res = await http.post('/reserve/appRole/add', params)
  return res
}
// 删除角色
export async function deleteRole (params) {
  const res = await http.post('/reserve/appRole/delete', params)
  return res
}
// 更新角色
export async function updateRole (params) {
  const res = await http.post('/reserve/appRole/update', params)
  return res
}

// 不定参数请求
// get
export async function apiGet (url, params) {
  const res = await http.get(url, {
    params
  })
  return res
}
// post
export async function apiPost (url, params) {
  const res = await http.post(url, params)
  return res
}
