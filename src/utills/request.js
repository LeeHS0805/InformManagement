import config from "../config/config.json"
import Taro from '@tarojs/taro'

export default function (url = '', method = 'GET', param = null) {
  url = config.baseUrl + url
  return new Promise((resolve, reject) => {
    Taro.request({
      url,
      method,
      data: param,
      header: {
        session: Taro.getStorageSync('session')
      },
      async success(info) {
        if(info.data.data&&info.data.data.isRegister===false) resolve(info.data);
        console.log(1111111111111,info.data);
        if(info.data.code!=50000||typeof info.data =="undefined"){
          Taro.hideToast()
          setTimeout(()=>{
            Taro.showToast({
              title: info.data.errMsg?info.data.errMsg:'网络错误',
              icon: 'error',
              duration: 700,
            })
          },200);
          resolve(info.data.code?info.data:null);
          throw new Error('server error: '+info.data.errMsg)
        }
        resolve(info.data);
      },
      fail(err){
        resolve(null)
        Taro.hideLoading()
        Taro.showToast({
          title: '网络故障',
          icon: 'error',
          duration: 2000,
        })
      }
    })
  })
}