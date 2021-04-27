<template>
  <view class="registerIdConfirm">
    <AtToast :isOpened="isLoading" text="加载中" status="loading"></AtToast>
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
  </view>

</template>

<script>
import './login.scss';
import Taro from '@tarojs/taro';
import wxLogin from '../../utills/wxLogin';
import { AtButton, AtToast } from 'taro-ui-vue';


export default {
  name: 'SwiperLogin',
  data() {
    return {
      isLoading: true,
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
    AtToast
  },

  methods: {


  },

  async onLoad() {
    if(await wxLogin()){

      let url = `../inform/inform`
      Taro.switchTab({
        url
      })
    }else {

      this.isLoading = false;
    }
  },
  created () {
  }
}
</script>
