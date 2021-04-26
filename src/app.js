import Vue from 'vue'
import './app.scss'
import 'taro-ui/dist/style/index.scss'

import Taro from '@tarojs/taro'
Taro.setEnableDebug({
  enableDebug:true
})

const App = {
  onShow (options) {
  },
  render(h) {
    // this.$slots.default 是将要会渲染的页面
    return h('block', this.$slots.default)
  }
}


export default App
