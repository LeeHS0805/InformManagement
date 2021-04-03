<template>
  <view class="inform">
    <view class="calendar">
      <AtCalendar :minDate="minDate" :maxDate="maxDate" :marks="['2021/3/31']"
                  :onSelectDate="h" />
    </view>
    <view class="informCard">
      <view class="card" v-for="(item) in array">
        <view class="cardHeader">
          <view class="text ellipsis">计算机四班通知</view>
          <view class="time"> / 截止&nbsp2021年02月01日</view>
          <view class="priority-box">
            <Priority :status="0"></Priority>
          </view>
        </view>
        <view class="cardMain">
          <view class="text wrap ellipsis-3">
            本次运动会院级初试原计划于本周六举办，但由于周六是清明节假期期间，考虑到部分同学要回家，现推迟初试，时间待定
          </view>
        </view>
        <view class="cardFoot">
          <view class="publish ellipsis">
            [创建人]:&nbsp李鑫磊
          </view>
          <view class="status">
            未读
          </view>
          <view class="time">
            2021/04/01
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import { AtCalendar } from 'taro-ui-vue'
import Priority from "../../component/Priority/Priority"
import wxLogin from "../../utills/wxLogin";
import "taro-ui-vue/dist/style/components/calendar.scss";
import "./inform.scss"

let date = new Date();
export default {
  data() {
    return {
      minDate: new Date(date.getFullYear() - 1, date.getMonth(),date.getDay()),
      maxDate: date,
      array:[1,2,3,4,5]
    }
  },

  components: {
    AtCalendar,
    Priority
  },

  methods: {
    h(e){
      console.log(e)
    }

  },
  async mounted(){
    // console.log(new Date(now.getFullYear() - 1, now.getMonth(), now.getDay()).toLocaleDateString())
    // wxLogin()
    console.log(this.minDate)
  }
}
</script>
