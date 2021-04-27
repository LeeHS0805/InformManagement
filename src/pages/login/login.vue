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
    <!-- openType="openSetting" -->
    </view>
  </view>

</template>

<script>
import './login.scss';
import Taro from '@tarojs/taro';
import wxLogin from '../../utills/wxLogin';
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
    async getUserProfile(e) {
     await Taro.getUserProfile({
        desc: '用于完善个人资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
        success: (res) => {
          Taro.showToast({
            title: '成功授权'
          })
          console.log(res);
          console.log("成功获取用户头像和个人信息");
          console.log(res.userInfo.avatarUrl);
          console.log(res.userInfo.nickName);
          // setTimeout(() => {

          // }, 2000);
        }
      })
      wxLogin().then(r=>{
            console.log(r);
            if(!r) {
              if(!Taro.getStorageSync('isRegister')) {
                let url = `../register/register`
                  Taro.navigateTo({
                    url,
                })
           }
          }
        });
    },

  },

  onLoad() {

  },
  created () {

  }
}
</script>
