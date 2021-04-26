<template>
  <view class="joinChannel">
      <view class="iptCode">
        <AtInput
            name='friendCode'
            title='邀请码'
            type='text'
            placeholder='请输入频道邀请码'
            :value="friendCode"
            :onChange="handleInput"
            />
        <button type='primary' circle form-type="submit" @tap="onSubmit()">加入频道</button>

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
      this.friendCode = val;
    },
    onSubmit () {
      console.log(this.friendCode);
      request(
        '/enterGroupByCode',
        'GET',
        {
          "friendCode":this.friendCode
        },
      );
      Taro.showToast({
        title: '成功加入频道'
      });
        // success: (open) => {
        //   console.log(open.data);
        //   Taro.request({
        //     url: '',
        //     // 授权登录接口
        //     data: {
        //       openid: open.data.openid,
        //       avatar: open.userInfo.avatarUrl,
        //       userName: open.userInfo.nickName
        //     },
        //     success: (data) => {
        //       console.log(data.data);
        //     },
        //     error: ()=>{
        //       console.log("出大错了！");
        //     }
        //   })
        // }
      
    },
             
  },
}
</script>
