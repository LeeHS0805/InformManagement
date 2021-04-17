<template>
  <view class="userInfoContainer">
    <!-- 三个区域 -->
    <!-- 区域一显示头像和名称 以及背景图片 -->
    <view class="userInfoBasic">
      <view class="userAvator">
          <open-data type="userAvatarUrl"></open-data>
      </view>
      <view class="userNameContainer">
        <open-data type="userNickName"></open-data>
      </view>
    </view>
    <!-- 区域二显示列表 筛选 创建页面 加入频道-->
    <view class="userInfoNav">
      <view class="navItem">
          <AtIcon value='equalizer' size='30' color='#7f8c8d' class="iconFont"></AtIcon>
          <view class="itemName">筛选</view>
      </view>
      <view class="navItem"  @tap="tocreateChannel">
          <AtIcon value='add-circle' size='30' color='#7f8c8d' class="iconFont"></AtIcon>
          <view class="itemName">创建频道</view>
      </view>
      <view class="navItem"  @tap="tojoinChannel">
          <AtIcon value='numbered-list' size='30' color='#7f8c8d' class="iconFont"></AtIcon>
          <view class="itemName">加入频道</view>
      </view>
    </view>
     <!-- 区域三显示列表 常见问题 向我们反馈 设置 -->
    <view class="userInfoMore">
      <AtList>
        <AtListItem
          title='常见问题'
          arrow='right'
          class="normalQuestion"
          :iconInfo="{ size: 25, color: '#78A4FA', value: 'search', }"
          :onClick="tofreAskedQuestions"
        />
       <AtListItem
          title='向我们反馈'
          arrow='right'
          class="submitToUs"
          :iconInfo="{ size: 25, color: '#78A4FA', value: 'check-circle', }"
        />
        <AtListItem
          title='设置'
          arrow='right'
          class="setUp"
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
import { AtAvatar, AtIcon, AtButton, AtList, AtListItem } from 'taro-ui-vue';


export default {
  data() {
      return{

      }
  },

  components: {
    AtAvatar,
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
    toSetting() {
      Taro.navigateTo({
        url: '../setting/setting',
      })
    },
    tofreAskedQuestions() {
      Taro.navigateTo({
        url: '../faq/faq',
      })
    }
  },
  onShow(){
    // let that = this;
    // let userDetail = Taro.getStorageSync(
    //   'userBasic'
    // )

    // console.log(userDetail);
    // let userAvatar = userDetail.avatarUrl;
    // let userName = userDetail.nickName;
    // console.log(userAvatar);
    // console.log(userName);
   
  },
  onload : function (options) {
    
  },
 
  created () {
   
  },
  mounted(){
    
  }
}
</script>

