/*
 * @Author: 阮志雄
 * @Date: 2021-10-30 19:41:34
 * @LastEditTime: 2021-10-30 20:23:22
 * @LastEditors: 阮志雄
 * @Description: In User Settings Edit
 * @FilePath: \Protected-Area-Resources-Monitor-and-Management-System\src\api\area.js
 */
import http from './http'

//  保护区列表
export async function areaList(params) {
  const res = await http.post('/reserve/appReserve/list', params)
  return res
}
//  新增保护区列表
export async function addArea(params) {
  const res = await http.post('/reserve/appReserve/add', params)
  return res
}
//  更新保护区列表
export async function updateArea(params) {
  const res = await http.post('/reserve/appReserve/update', params)
  return res
}
//  删除保护区列表
export async function deleteArea(params) {
  const res = await http.post('/reserve/appReserve/delete', params)
  return res
}