import http from './http'
// 发送验证码
export async function getCaptcha(params) {
  const res = await http.post('/reserve/appUser/sendCode', params)
  return res
}
// 校验验证码
export async function checkCaptcha(params) {
  const res = await http.post('/reserve/appUser/checkCode', params)
  return res
}
// 根据手机号和验证码注册/登录
export async function loginByMobile(params) {
  const res = await http.post('/reserve/appUser/loginByMobile', params)
  return res
}
// 根据手机号和密码登录
export async function loginByPwd(params) {
  const res = await http.post('/reserve/appUser/loginByPwd', params)
  return res
}
// 根据手机号和验证码修改密码
export async function updataPassword(params) {
  const res = await http.post('reserve/appUser/updPwd', params)
  return res
}
// 获取用户菜单
export async function getSystemFuncList(params) {
  const res = await http.post('/reserve/appRoleMenu/list', params)
  return res
}