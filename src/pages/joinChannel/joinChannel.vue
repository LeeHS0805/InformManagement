<template>
  <view class="joinChannel">
      <view class="iptCode">
        <AtInput
            name='value'
            title='邀请码'
            type='text'
            placeholder='请输入频道邀请码'
            :value="value"
            :onChange="handleInput"
            />
        <AtButton type='primary' circle formType='submit' :onClick="onSubmit">提交</AtButton>
      </view>
    
  </view>
</template>
<script>


import './joinChannel.scss';
import Taro from '@tarojs/taro';
import { AtInput, AtForm, AtButton } from 'taro-ui-vue'

export default {
  name: 'AtInputInvitation',
  data() {
    return {
      value: '',
    }
  },

  components: {
    AtInput, 
    AtForm,
    AtButton
  },

  methods: {
    handleInput(val) {
      this.value = val
    },
    onSubmit (event) {
      console.log(this.value)
    },
  },
}
</script>
