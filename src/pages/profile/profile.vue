<template>
  <view class="userInfoContainer">
    <view class="userInfoBasic">
      <view class="userAvator">
        <open-data type="userAvatarUrl"></open-data>
      </view>
      <view class="userNameContainer">
        <view class="userRealName">{{userInfo.realName}}</view>
      </view>
    </view>
    <view class="userInfoNav">
      <view class="navItem"  @tap="tocreateChannel">
          <AtIcon value='add-circle' size='30' color='#7f8c8d' class="iconFont"></AtIcon>
          <view class="itemName">创建频道</view>
      </view>
      <view class="navItem"  @tap="tojoinChannel">
          <AtIcon value='numbered-list' size='30' color='#7f8c8d' class="iconFont"></AtIcon>
          <view class="itemName">加入频道</view>
      </view>
      <view class="navItem"  @tap="tomyChannel" >
          <AtIcon value='star-2' size='30' color='#7f8c8d' class="iconFont"></AtIcon>
          <view class="itemName">我的频道</view>
      </view>
    </view>
    <view class="userInfoMore">
      <AtList>
       <AtListItem
          title='向我们反馈'
          arrow='right'
          :onClick="toFeedback"
          :iconInfo="{ size: 25, color: '#78A4FA', value: 'check-circle', }"
        />
        <AtListItem
          title='设置'
          arrow='right'
          :iconInfo="{ size: 25, color: '#78A4FA', value: 'settings', }"
          :onClick="toSetting"
        />
      </AtList>

    </view>

  </view>

</template>

<script>
import './profile.scss';
import Taro from '@tarojs/taro';
import request from '../../utills/request';
import { AtIcon, AtButton, AtList, AtListItem } from 'taro-ui-vue';


export default {
  data() {
      return{
        userInfo: {}
      }
  },

  components: {
    AtIcon,
    AtButton,
    AtList,
    AtListItem
  },

  methods: {
    toLogin() {
      Taro.navigateTo({
        url: '../login/login',
      })
    },
    tocreateChannel() {
      Taro.navigateTo({
        url: '../createChannel/createChannel',
      })
    },
    tojoinChannel() {
      Taro.navigateTo({
        url: '../joinChannel/joinChannel',
      })
    },
    toFeedback(){
      Taro.navigateTo({
        url: '../feedback/feedback',
      })
    },
    toSetting() {
      Taro.navigateTo({
        url: '../setting/setting',
      })
    },
    tofilterInfo() {
      Taro.navigateTo({
        url: '../filterInfo/filterInfo',
      })
    },
    tomyChannel() {
      Taro.navigateTo({
        url: '../myChannel/myChannel',
      })
    },
  },
  onShow(){

  },
  async onLoad (options) {

    this.userInfo = (await request(
      '/getMyInfo',
      'Get'
    )).data;
  },

  created () {

} ,
  mounted(){

  }
}
</script>

