/*
 * @Author: 阮志雄
 * @Date: 2021-07-08 14:29:08
 * @LastEditTime: 2021-10-30 16:01:00
 * @LastEditors: 阮志雄
 * @Description: In User Settings Edit
 * @FilePath: \Protected-Area-Resources-Monitor-and-Management-System\src\api\carmera.js
 */
import http from './http'

//  下发回收相机任务
export async function FixDown(params) {
  const res = await http.post('/reserve/appCamera/FixDown', params)
  return res
}

//  下发布控相机任务
export async function FixUp(params) {
  const res = await http.post('/reserve/appCamera/FixUp', params)
  return res
}

//  查询保护区相机列表byId
export async function findCarmeraList(params) {
  const res = await http.post('/reserve/appCamera/find', params)
  return res
}

//  新增相机
export async function addCarmera(params) {
  const res = await http.post('/reserve/appCamera/add', params)
  return res
}

export async function findAllCarmeraList(params = { start: 0, limit: 1000 }) {
  const res = await http.post('/reserve/appCamera/findAll', params)
  return res
}

//  上传相机信息(任务下发)
export async function uploadStatus(params) {
  const res = await http.post('/reserve/appCamera/uploadStatus', params)
  return res
}
