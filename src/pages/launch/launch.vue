<template>
  <view class="launch">
    <view class="fun-box">
      <view class="fuc" @tap="go('addInform')">
        <view class="icon">
          <image src="https://tva1.sinaimg.cn/large/008eGmZEly1gpennzgtujj303k03kjra.jpg"></image>
        </view>
        <view class="text">发布</view>
      </view>
      <view class="fuc" @tap="go('selectInform')">
        <view class="icon">
          <image src="https://tva1.sinaimg.cn/large/008eGmZEly1gpenmwum2hj303k03kgli.jpg"></image>
        </view>
        <view class="text">筛选</view>
      </view>
      <view class="fuc" @tap="go('informChannel')">
        <view class="icon">
          <image src="https://tva1.sinaimg.cn/large/008eGmZEly1gpenpilwyjj303k03kmx3.jpg"></image>
        </view>
        <view class="text">频道</view>
      </view>
    </view>
    <AtSearchBar
      :value="searchValue"
      :onChange="onChange.bind(this,'searchValue')"
      :onActionClick="onActionClick"
    />
    <view class="title">频道推荐</view>
  </view>
</template>

<script>
import Taro from '@tarojs/taro'
import {AtSearchBar} from 'taro-ui-vue'
import './launch.scss'
import "taro-ui-vue/dist/style/components/search-bar.scss";
import "taro-ui-vue/dist/style/components/button.scss";
import "taro-ui-vue/dist/style/components/icon.scss";

export default {
  data() {
    return {
      searchValue: '',
    }
  },

  components: {
    AtSearchBar
  },

  methods: {
    go(str){
      console.log(str)
      Taro.navigateTo({
        url:`../../pages/${str}/${str}`
      })
    },
    onChange(key, value, a) {
      this[key] = value
      console.log(this.searchValue, a)
    },
    onActionClick() {

    }
  },

  created() {
    // let app = getApp()

  }
}
</script>

<style scoped lang="scss">


</style>
