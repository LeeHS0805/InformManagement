import request from './request'
import verifyRequest from "./verifyRequest";
import Taro from '@tarojs/taro'

async function serverlogin(code){
  let val = await request('/login', "GET", {js_code: code});
  if(val==null) return null;
  if (!verifyRequest(val.code, "code请求失败")) return null
  Taro.setStorageSync('session', val.data.session);
  Taro.setStorageSync('stuId', val.data.stuId);
  return new Promise(resolve => {resolve(val)})
}

async function innerRequest() {
  //微信login请求
  let val1 = await Taro.login()

  //向server传code
  let val2 = await serverlogin(val1.code)



  if(val2==null) return false;



  //判断是否注册
  if (!val2.data.isRegister) {
    let url = `../register/register`
    Taro.navigateTo({
        url,
    })
  }else return true;
}

export default async function () {
  return new Promise(((resolve) => {
    resolve(innerRequest())
  }))
}
