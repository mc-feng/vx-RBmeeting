import { http } from './http'; 
function info(params) { // 微信登录
  http('/wx/info', 'get', params)  // 接口请求的路由地址以及请求方法在此处传递
}
function history(params){//历史记录
  http('/room/history', 'get',params)
}
function order(params){//取消预约
  http("/room/order", "DELETE",params)
}
function banding(params){
  http("/room/banding", "PUT", params)
}
export default { // 暴露接口
  info,
  history,
  order,
  banding
}