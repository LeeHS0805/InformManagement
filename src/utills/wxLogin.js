import request from './request'
import verifyRequest from "./verifyRequest";
import Taro from '@tarojs/taro'
async function innerRequest(){
  //微信login请求
  let val1 = await Taro.login()

  //向server传code
  let val2 = await request('/login', "GET", {js_code: val1.code});
  console.log(val2)
  if (!verifyRequest(val2.code, "code请求失败")) return null
  Taro.setStorageSync('session', val2.data.session);
  Taro.setStorageSync('isRegister',val2.data.isRegister);
  if(val2.data.isRegister){
    let url = `../inform/inform`
    Taro.reLaunch({
      url,
    })
    return true;
  }else return false;
}
export default async function () {
  return new Promise(((resolve) => {
    resolve(innerRequest())
  }))
}
