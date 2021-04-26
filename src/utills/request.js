import config from "../config/config.json"
import Taro from '@tarojs/taro'

export default function (url = '', method = 'GET', param = null) {
  url = config.baseUrl + url
  return new Promise((resolve, reject) => {
    try{
      Taro.request({
        url,
        method,
        data: param,
        header: {
          session: Taro.getStorageSync('session')
        },
        success(info) {
          if(info.data.code!=50000){
            Taro.hideLoading()
            Taro.showToast({
              title: info.data.errMsg,
              icon: 'error',
              duration: 700,
            })
            throw new Error('server error: '+info.data.errMsg)
          }
          resolve(info.data)
        },
        fail(){
          Taro.hideLoading()
          Taro.showToast({
            title: '网络故障',
            icon: 'error',
            duration: 2000,
          })
        }
      })
    }catch (e){
      Taro.hideLoading()
      Taro.showToast({
        title: '网络故障',
        icon: 'error',
        duration: 2000,
      })
    }
  })
}
