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