import { http } from './http'; 
function info(params) { // 微信登录
  http('/wx/info', 'get', params)  // 接口请求的路由地址以及请求方法在此处传递
}
function history(params){
  http('/room/history', 'get', params)
}
export default { // 暴露接口
  info,
  history
}