import request from './request'
import verifyRequest from "./verifyRequest";
import Taro from '@tarojs/taro'
async function innerRequest(){
  //微信login请求
  let val1 = await Taro.login()

  //向server传code
  let val2 = await request('/login', "POST", {js_code: val1.code});
  if (!verifyRequest(val2.code, "code请求失败")) return null
  Taro.setStorageSync('session', val2.data.session);

  //获取session
  let val3 = await request('/test', 'GET');
  if (!verifyRequest(val3.code, "session请求失败")) return null
  return val3;
}
export default async function () {
  return new Promise(((resolve) => {
    resolve(innerRequest())
  }))
}
