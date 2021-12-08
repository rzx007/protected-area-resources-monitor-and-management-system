import http from './http'

//  用采 oms 关联
export async function relationAsset(params) {
  const res = await http.post('/systemService/archive/relationAsset', params)
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
//  查天气
export async function findWeather(params) {
  const res = await http.post('/reserve/appPhoto/findWeather', params)
  return res
}
//  查询物种发现次数
export async function findSpeciesNum(params) {
  const res = await http.post('/reserve/appPhoto/findSpeciesNum', params)
  return res
}
//  查询相机拍摄次数
export async function findCameraNum(params) {
  const res = await http.post('/reserve/appPhoto/findCameraNum', params)
  return res
}
//  按日期查询拍摄次数
export async function findByDay(params) {
  const res = await http.post('/reserve/appPhoto/findByDay', params)
  return res
}
export async function setDown(params) {
  const res = await http.post('/reserve/appCamera/setDown', params)
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
