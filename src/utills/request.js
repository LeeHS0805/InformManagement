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
      success(info) {
        resolve(info.data)
      },
      fail(error) {
        reject(error)
      }
    })
  })
}
