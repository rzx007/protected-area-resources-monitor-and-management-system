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
