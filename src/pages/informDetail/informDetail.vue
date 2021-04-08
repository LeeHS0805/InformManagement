<template>
  <view class="inform-detail">
    <view class="inform-container">
      <view class="priority-box">
        <Priority :status="0"></Priority>
      </view>
      <view class="title ellipsis">
        计算机四班通知
      </view>
      <view class="details">
        <view class="key">
          <view class="group-value">群组:</view>
          <view class="publisher-value">发布人:</view>
          <view class="time-value">时间:</view>
        </view>
        <view class="value">
          <view class="group-value">计算机学院</view>
          <view class="publisher-value">李鑫磊</view>
          <view class="time-value">2020-4-2</view>
        </view>
      </view>
      <AtTimeline
        class="timeline"
        :items="[
          { title: '本次运动会院级初试原计划于本周六举办，但由于周六是清明节假期期间，考虑到部分同学要回家，现推迟初试，时间待定\n' },
          { title: '截止日期: 2021.4.1', color: 'green' },
          { title: '事件归属: 运动会', color: 'red' },
          { title: '是否完成: 是', color: 'yellow' }
        ]"
      >
      </AtTimeline>
    </view>
    <view class="finish-btn">
      <AtButton type='primary'>我已完成</AtButton>
    </view>
    <AtMessage />
  </view>
</template>

<script>
import './informDetail.scss'
import Priority from "../../component/Priority/Priority"
import {AtTimeline,AtButton,AtMessage} from 'taro-ui-vue'
import "taro-ui-vue/dist/style/components/timeline.scss";
import "taro-ui-vue/dist/style/components/icon.scss";
import "taro-ui-vue/dist/style/components/button.scss";
import "taro-ui-vue/dist/style/components/loading.scss";
import "taro-ui-vue/dist/style/components/message.scss";

import request from "../../utills/request";

export default {
  name: "informDetail.vue",
  methods: {
    informData:''
  },
  async mounted(data) {
    let data1 = await request('/getInformDetail','get',{informId:1})
    console.log(data1)
  },
  components: {
    Priority,
    AtTimeline,
    AtButton
  }
}
</script>

