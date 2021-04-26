import Vue from 'vue'
import './app.scss'
import 'taro-ui/dist/style/index.scss'
// 应该是引入哪一个
import 'taro-ui-vue/dist/style/index.scss'


const App = {
  onShow (options) {
  },
  render(h) {
    // this.$slots.default 是将要会渲染的页面
    return h('block', this.$slots.default)
  }
}


export default App
