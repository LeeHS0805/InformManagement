<template>
  <view class="register">
      <view class="userRegisterBasic">
        <AtForm>
        <AtInput
            name='stuId'
            title='学号'
            type='number'
            placeholder='请输入学号'
            :value="inform.stuId"
            :onChange="handleInputstuId"
            v-model="inform.stuId"
        />
        <AtInput
            name='realName'
            title='姓名'
            type='text'
            placeholder='请输入姓名'
            :value="inform.realName"
            :onChange="handleInputrealName"
            v-model="inform.realName"
        />
        </AtForm>
        </view>
        <view class="alreadyFilled">
            <button type='primary' circle form-type="submit" @tap="onSubmit()">我填好了</button>
        </view>
      <AtMessage />
  </view>
</template>
<script>


import './register.scss';
import Taro from '@tarojs/taro';
import request from '../../utills/request';
import wxLogin from '../../utills/wxLogin';
import { AtInput, AtForm, AtMessage } from 'taro-ui-vue';

export default {
  data() {
    return {
     inform: {
        realName: '',
        stuId: '',
        jsCode: ''
      }
    }
  },

  components: {
    AtInput,
    AtForm,
    AtMessage
  },
  methods: {
    checkValue(inform) {
      let nameVerify = /^[\u4E00-\u9FA5A-Za-z\s]+(·[\u4E00-\u9FA5A-Za-z]+)*$/;
      let idVerify = /^(20)(\d{6})?$/;
      if (!idVerify.test(inform.stuId)) {
        Taro.atMessage({
            message: '再仔细看看学号哦',
            type: 'warning',
        })
        return;
      } else if (!nameVerify.test(inform.realName)) {
        Taro.atMessage({
            message: '再仔细看看姓名哦',
            type: 'warning',
        })
        return;
      }
      return true;
    },
    handleInputstuId(res_stuId) {
      this.inform.stuId = res_stuId;
    },
    handleInputrealName(res_realName) {
      this.inform.realName = res_realName;
    },
    async onSubmit () {
      if(this.checkValue(this.inform)) {
        const res = await Taro.login();

        this.inform.jsCode = res.code;
        await request(
          '/bindUser',
          'POST',
          this.inform,
        );
        const registerSuccess = await wxLogin();
        if(registerSuccess) {
          Taro.switchTab({
            url: '../inform/inform'
          });
        }
      }
    },

  },
  onShow() {

  },
  mounted() {

  }
}
</script>
