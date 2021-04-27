<template>
  <view class="joinChannel">
    <view class="iptCode">
      <text class="friendCodeTitle">邀请码</text>
      <text class="friendCodeDescribe">请输入六位邀请码</text>
      <view class="friendCodeContainer">
      </view>
      <view class="inputShow">
        <input
          type="text"
          name='friendCode'
          class="inputCode"
          maxlength="6"
          @input="handleInput"
        />
      </view>
      <button form-type="submit" @tap="onSubmit()" class="friendCodeBtn">加入频道</button>
    </view>

  </view>
</template>
<script>


import './joinChannel.scss';
import Taro from '@tarojs/taro';
import request from '../../utills/request';
import { AtInput, AtForm, AtButton } from 'taro-ui-vue'

export default {
  data() {
    return {
      friendCode: '',
    }
  },

  components: {
    AtInput,
    AtForm,
    AtButton
  },

  methods: {
    handleInput(val) {
      this.friendCode = val.detail.value;

    },
    onSubmit () {

      request(
        '/enterGroupByCode',
        'GET',
        {
          friendCode: this.friendCode
        },
      );
      Taro.navigateTo({
        url: "../myChannel/myChannel"
      })
    },

  },
}
</script>
