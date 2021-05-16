<template>
  <view class="setUp">
    <view class="listTitle">
      <AtList>
      <AtListItem title='隐私条款' arrow='right' />
      <!-- :onClick @tap -->
      <AtListItem title='版本号' extraText='1.0.1' />
    </AtList>
    </view>
    <view>
      <AtButton :onClick="toLogin" class="btnBottom">退出登录</AtButton>
    </view>
    <view class="copyrightBottom">
      ©2021-布吉岛
    </view>
  </view>
</template>
<script>


import './setting.scss'
import Taro from '@tarojs/taro';
import { AtButton, AtList, AtListItem, AtToast } from 'taro-ui-vue';
export default {
  data () {
    return {

    }
  },

  components: {
    AtButton,
    AtList,
    AtListItem,
    AtToast
  },

  methods: {
     toLogin() {
      Taro.clearStorage(),
      Taro.reLaunch({
        url: '../login/login',
      })
    },
  },

  created () {


  }
}
</script>
