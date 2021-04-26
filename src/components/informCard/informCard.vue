<template>
  <view class="informCard">
    <view class="emptyCard" v-if="noInform">
      <image
        src="http://49.232.223.89:50030/WIX5xghzaoBAMcCQKlwRVc6O9OrrL17KIX9lgO9Yz8vaipjXqCxHxJfcxcVdN2No.png"></image>
    </view>
    <view class="card" v-for="(item) in informArray" @tap="goDetail(item)">
      <view class="cardHeader">
        <view class="text ellipsis">{{ item.title }}</view>
        <view class="time"> / 截止&nbsp&nbsp&nbsp{{ item.deadline|format }}</view>
        <view class="priority-box">
          <Priority :status="item.priority"></Priority>
        </view>
      </view>
      <view class="cardMain">
        <view class="text wrap ellipsis-3">
          {{ item.content }}
        </view>
      </view>
      <view class="cardFoot">
        <view class="publish ellipsis">
          [创建人]:&nbsp{{ item.creatorName }}
        </view>
        <view :class="{'status':true,'isRead':item.isRead}">
          {{ item.isRead ? '已读' : '未读' }}
        </view>
        <view class="time">
          {{ item.createTime }}
        </view>
      </view>
    </view>
    <view class="bottom"></view>
  </view>
</template>

<script>
import Taro from "@tarojs/taro";
import './informCard.scss'
import Priority from "../Priority/Priority"

export default {
  name: "informCard",
  props:{
    informArray:'',
    noInform:true
  },
  data(){
    return{
    }
  },
  methods:{
    //点击通知触发函数,跳转详情
    goDetail(item) {
      let url = `../../pages/informDetail/informDetail?params=${JSON.stringify(item)}`
      Taro.navigateTo({url})
    },
  },
  filters: {
    format: function (value) {
      if (!value) return '暂无日期  '
      else return value
    }
  },
  mounted() {
    console.log(this.informArray)
  },
  components:{
    Priority
  }
}
</script>
