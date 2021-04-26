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
            <!-- 方案一 不使用taro ui AtButton 用的tag-->
            <button type='primary' circle form-type="submit" @tap="onSubmit()">我填好了</button>
           
            <!-- 方案三 把onClick换成tap 能保证样式 目测-报错 但是没有加form-type 不保证交互一定有效-->
            <!-- <AtButton type='primary' circle :tap="onSubmit()">我填好了</AtButton> -->
            <!-- 原方案 已证明报错 -->
            <!-- <AtButton type='primary' circle formType='submit' :onClick="onSubmit">我填好了</AtButton> -->

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
        stuId: '',
        realName: '',
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
    checkValue(data) {
      let nameVerify = /^[\u4E00-\u9FA5]{2,4}$/;
      let idVerify = /^(20)(\d{6})?$/;
      for (let key in data) {
        if (data[key] === undefined || data[key] === " ") {
            Taro.atMessage({
            message: '注册信息没填全哦',
            type: 'warning',
          }) 
          return;
        }
      }
      if (!idVerify.test(data.stdId)) {
        Taro.atMessage({
            message: '学号格式有误哦',
            type: 'warning',
        }) 
        return;
      } else if (!nameVerify.test(data.realName)) {
        Taro.atMessage({
            message: '姓名格式有误哦',
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
      // 验证 正则
      if(this.checkValue(this.inform)) {
        const res = await Taro.login();
        console.log(res.code);
        this.inform.jsCode = res.code;
        await request(
          '/bindUser',
          'POST',
          this.inform,
        );
        // 注册后自动登录
        wxLogin();
        console.log(this.inform);
        Taro.showToast({
          title: '已收到'
        });
        Taro.switchTab({
          url: '../inform/inform'
        });
      } 
    },
             
  },
  onShow() {
      
  },
  mounted() {
  
  }
}
</script>
