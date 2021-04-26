import request from './request'
import verifyRequest from "./verifyRequest";
import Taro from '@tarojs/taro'

async function serverlogin(code){
  let val = await request('/login', "GET", {js_code: code});
  if (!verifyRequest(val.code, "code请求失败")) return null
  Taro.setStorageSync('session', val.data.session);
  Taro.setStorageSync('stuId', val.data.stuId);
  return new Promise(resolve => {resolve(val)})
}

async function innerRequest() {
  if (!Taro.getStorageSync('session') && Taro.getStorageSync('date')) {

  }
  try {
    //微信login请求
    let val1 = await Taro.login()

    //向server传code
    let val2 = await serverlogin(val1.code)

    //判断是否注册
    if (!val2.data.isRegister) {
      val1 = await Taro.login()
      //执行注册
      await request("/bindUser", "post", {
        realName: 'lxl',
        stuId: 20195351,
        jsCode:val1.code
      })
      val1 = await Taro.login()
      await serverlogin(val1.code);
    }
  } catch (e) {
    Taro.showToast({
      title: '网络故障',
      icon: 'error',
      duration: 2500,
    })
  }
}

export default async function () {
  return new Promise(((resolve) => {
    resolve(innerRequest())
  }))
}
