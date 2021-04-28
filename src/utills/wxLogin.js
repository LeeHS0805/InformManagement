import request from './request'
import verifyRequest from "./verifyRequest";
import Taro from '@tarojs/taro'

//服务器登录内部请求
//服务器非正常时返回null
async function serverlogin(code){
  let val = await Taro.request({
    url:'https://clayex.com/login',
    method:"GET",
    data:{js_code: code},
  });
  console.log(val)
  if(val==null) return null;

  if(val.data.code==50000){
    Taro.setStorageSync('session', val.data.data.session);
  }
  else{
    let url = `../register/register`
    Taro.navigateTo({
      url,
    })
    return null
  }
  console.log(Taro.getStorageSync('session'));
  return new Promise(resolve => {resolve(val)})
}
function showToast(){
  Taro.showToast({
    title: '网络故障',
    icon: 'error',
    duration: 2000,
  })
}
async function innerRequest() {
  let val1,val2
  //微信login请求
  if(!(val1 = await Taro.login())) showToast()
  //向server传code
  if(!(val2 = await serverlogin(val1.code))) {
    showToast()
    return false
  }

  //判断是否注册
  return true;
}

export default async function () {
  return new Promise(((resolve) => {
    resolve(innerRequest())
  }))
}
