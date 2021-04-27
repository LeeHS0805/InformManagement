<template>
  <view class="feedbacks">
    <view class="contentBox">
      <view class="slogan">
        <view>为您提供专业、便捷、高效的通知管理功能,欢迎您提供宝贵的意见与建议!</view>
      </view>
      <view class="tag" v-if="infoList.length">
        <view class="item" v-for="(item,index) in infoList" :key="item">
          <svg t="1617522782465" class="icon" viewBox="0 0 1024 1024" version="1.1"
               xmlns="http://www.w3.org/2000/svg" p-id="4621" width="23" height="23">
            <path
              d="M512 85.333333C277.333333 85.333333 85.333333 277.333333 85.333333 512s192 426.666667 426.666667 426.666667c234.666667 0 426.666667-192 426.666667-426.666667S746.666667 85.333333 512 85.333333zM554.666667 725.333333l-85.333333 0 0-85.333333 85.333333 0L554.666667 725.333333zM554.666667 554.666667l-85.333333 0L469.333333 298.666667l85.333333 0L554.666667 554.666667z"
              p-id="4622" fill="#f94626"></path>
          </svg>
          <view class="text ellipsis">{{ info[item].type }}</view>
          <view class="content ellipsis">
            {{ info[item].detail ? info[item].detail : '暂无描述' }}
          </view>
          <view class="delete" @tap="shiftList(item,index,$event)">
            删除
          </view>
        </view>
      </view>
      <view class="type">
        <view class="title">反馈类型</view>
        <view class="item">
          <view :class="{'subItems':true,'ellipsis':true,'foucsBlue':focusAll[index]}" v-for="(item,index) in info" :key="item.type"
                 @tap="focusItem($event,index)">{{ item.type }}
          </view>
        </view>
        <view class="content">
					<textarea maxlength="180" :placeholder="showText" :disabled="disable"
                    v-model="info[focusIndex].detail"></textarea>
        </view>
      </view>
      <view class="submit">
        <AtButton class="sub-btn" type="primary" :on-click="(e) => submit()">提交</AtButton>
      </view>
    </view>
  </view>
</template>

<script>
import Taro from '@tarojs/taro'
import {AtButton} from 'taro-ui-vue'

import './feedback.scss'
export default {
  name: "feedback",
  data() {
    return {
      info: [
        {
          type: '网络故障',
          detail: ''
        },
        {
          type: '页面卡顿',
          detail: ''
        },
        {
          type: '信息有误',
          detail: ''
        },
        {
          type: '推送延迟',
          detail: ''
        },
        {
          type: '页面交互',
          detail: ''
        },
        {
          type: '其他',
          detail: ''
        },
      ],
      focusIndex: 0,
      focusAll: [0, 0, 0, 0, 0, 0],
      infoList: [],
    }
  },
  methods: {
    focusItem(event, index) {
      this.focusIndex = index;

      if (!this.focusAll[index]) {
        // event.target.style.border = '1px solid #1188ee'
        this.focusAll[index] = 1;
        this.infoList.push(index);
      }
    },
    shiftList(item, index, event) {
      this.infoList.splice(index, 1);
      this.infoList.forEach((item,index)=>{
        console.log(this.infoList[index])
        this.$set(this.infoList,index,this.infoList[index])
      })
      this.info[item].detail = '';
      this.focusIndex = 0;
      this.focusAll[item] = 0;
      console.log(this.focusAll[item])
      this.$set(this.focusAll,item,this.focusAll[item])
    },
    isAllZero(array){
      let flag = true;
      array.forEach(item=>{
        if(item!=0){
          flag = false;
          return
        }
      })
      return flag;
    },
    submit(){
      Taro.showToast({title:'感谢反馈',icon:'success',duration:800})
    }

  },
  computed: {
    disable: function () {
      if (this.focusIndex == 0 || this.focusAll[0] == 0) {
        return false;
      } else return false;
    },
    showText: function () {
      console.log(this.focusIndex+' 111')
      return this.focusIndex == 0 || this.isAllZero(this.focusAll)?'请选择类型后,在此处添加内容描述':'此处可以描述' + this.info[this.focusIndex].type + '问题细节';
    },
  },
  mounted() {

  },
  components:{
    AtButton
  }
}
</script>

<style scoped>

</style>
