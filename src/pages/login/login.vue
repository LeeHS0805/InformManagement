<template>
  <view class="registerIdConfirm">
    <view class="registerBackground">   
    <swiper
      current="current"
      :duration="duration"
      :interval="interval"
      :circular="isCircular"
      :autoplay="isAutoplay">
      <swiper-item v-for="(item, idx) in imgUrls" :key="idx">
        <image :src="item" class="slide-image" />
      </swiper-item>
    </swiper>
    </view>
    <view class="getUserInfoBtn">
      <AtButton circle type='secondary' class="registerUser" :onClick="getUserProfile">点击进入</AtButton>
    </view>
  </view>
    
</template>

<script>
import './login.scss';
import Taro from '@tarojs/taro';
import { AtButton } from 'taro-ui-vue';


export default {
  name: 'SwiperLogin',
  data() {
    return {
      current: 1,
      duration: 500,
      interval: 3000,
      isCircular: true,
      isAutoplay: true,
      imgUrls: [
        'https://www.z4a.net/images/2021/04/11/test.jpg',
        'https://www.z4a.net/images/2021/04/11/roman-nguyen-o1ONmiD-c88-unsplash.jpg',
        'https://www.z4a.net/images/2021/04/11/omid-armin-g17w8RVeKuQ-unsplash.jpg',
      ],
    }
  },

  components: {
    AtButton,
  },

  methods: {
    getUserProfile(e) {
      // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认
      // 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
     Taro.getUserProfile({
        desc: '用于完善个人资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
        success: (res) => {
          Taro.showToast({
            title: '登录成功'
          })
          
          Taro.setStorageSync(
            'userBasic',res.userInfo
          )
          console.log(res);
          console.log("成功获取用户头像和个人信息");
          console.log(res.userInfo.avatarUrl);
          console.log(res.userInfo.nickName);
          let url = `../inform/inform`
          Taro.reLaunch({
            url,
          })
        }
      })  
    },
   
  },
  
  onLoad() {
      // if (Taro.getUserProfile) {
      //   this.setData({
      //     canIUseGetUserProfile: true
      //   })
      // }
    },
  created () {
   
  }
}
</script>
