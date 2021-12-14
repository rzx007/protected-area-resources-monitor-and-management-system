import { getToken } from '@/utils/auth'
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
  const res = await http.post('/reserve/appCamera/find', { reserveId: getToken('reserveId'), ...params })
  return res
}
//  查询保护区相机列表byId
export async function findCarmeraInfo(params) {
  const res = await http.post('/reserve/appCamera/findInfo', params)
  return res
}
export async function deleteCarmera(params) {
  const res = await http.post('/reserve/appCamera/delete', params)
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

//  上传相机图片
export async function uploadImage(params) {
  const res = await http.post('/reserve/appPhoto/uploadImage', params)
  return res
}
