import Vue from 'vue'
import './app.scss'
// import 'taro-ui/dist/style/index.scss'
import "taro-ui/dist/style/components/button.scss";
import "taro-ui/dist/style/components/loading.scss";
import "taro-ui/dist/style/components/timeline.scss";
import "taro-ui/dist/style/components/icon.scss";
import "taro-ui/dist/style/components/toast.scss";
import "taro-ui/dist/style/components/icon.scss";
import "taro-ui/dist/style/components/input.scss";
import "taro-ui/dist/style/components/icon.scss";
import "taro-ui/dist/style/components/calendar.scss";
import "taro-ui/dist/style/components/image-picker.scss";
import "taro-ui/dist/style/components/icon.scss";
import "taro-ui/dist/style/components/flex.scss";
import "taro-ui/dist/style/components/list.scss";
import "taro-ui/dist/style/components/icon.scss";
import "taro-ui/dist/style/components/card.scss";
import "taro-ui-vue/dist/style/components/fab.scss";
import "taro-ui-vue/dist/style/components/float-layout.scss";
import "taro-ui-vue/dist/style/components/message.scss";
wx.setEnableDebug({
  enableDebug:true
})


const App = {
  onLoad (options) {

  },
  render(h) {
    // this.$slots.default 是将要会渲染的页面
    return h('block', this.$slots.default)
  }
}


export default App
