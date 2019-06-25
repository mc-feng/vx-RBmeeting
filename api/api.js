import { http } from './http';
function index(params) { // 主页
  http('/index', 'get', params)  // 接口请求的路由地址以及请求方法在此处传递
}
function rooms(params){
  http('/room/rooms', 'get', params);
}
function orderList(params){
  http('/room/orderList', 'get', params);
}
function timesList(params) {
  http('/room/timesList', 'get', params);
}
function toOrder(params) {
  http('/room/order', 'post', params);
}
function banding(params) {
  http('/room/banding', 'put', params);
}
function login(params) {
  http('/room/login', 'get', params);
}
function info(params) { // 微信登录
  http('/wx/info', 'get', params)  // 接口请求的路由地址以及请求方法在此处传递
}
function history(params){//历史记录
  http('/room/history', 'get',params)
}
function order(params){//取消预约
  http("/room/order", "DELETE",params)
}
export default { // 暴露接口
  index,
  rooms,
  orderList,
  timesList,
  banding,
  login,
  order,
  toOrder,
  history,
  info
}
