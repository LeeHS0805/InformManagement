<template>
  <view class="inform">
    <view class="calendar">
      <AtCalendar :minDate="minDate" :maxDate="maxDate" :marks="['2021/3/31']"
                  :onSelectDate="changeDate"/>
    </view>
    <filterInform></filterInform>
    <informCard :informArray="this.informArray" :noInform="noInform"></informCard>
  </view>
</template>

<script>
import './inform.scss'
import {AtCalendar, AtFloatLayout} from 'taro-ui-vue'
import filterInform from "../filterInform/filterInform";
import informCard from "../../components/informCard/informCard";
import wxLogin from "../../utills/wxLogin";
import request from "../../utills/request";
import {today} from "../../utills/today"
import Taro from '@tarojs/taro'


let date = new Date();
export default {
  data() {
    return {
      page: 1,                //分页
      pageTotal: 0,            //总页数
      minDate: new Date(date.getFullYear() - 1, date.getMonth(), date.getDay()),
      maxDate: date,
      noInform: true,        //判断今日是否存在通知
      informArray: [],        //存储通知信息
      focusDate: today(),      //日历目前触发的日期
    }
  },
  methods: {
    // 请求并处理通知数组 1.展示loading 2.发送请求 3.关闭loading
    async getInform(date) {
      if (this.pageTotal == 0 || this.pageTotal > this.page) {
        await Taro.showToast({title: '加载中', icon: 'loading', duration: 2000})
        let {data: {docs, pageTotal}} = await request('/getMyInformByDate', 'get', {date, page: this.page})
        this.pageTotal = pageTotal
        this.showInformImg(docs)
        setTimeout(() => {
          Taro.stopPullDownRefresh()
          Taro.hideToast()
        }, 200)
      } else {
        await Taro.showToast({title: '到底了', icon: 'none', duration: 500})
      }
    },
    // 切换日期触发
    changeDate({value: {start: time}}) {
      this.clearPage()
      this.getInform(time)
      this.focusDate = time
    },
    //判断inform数组是否为空来决定是否展示"暂无通知"提示
    showInformImg(array = []) {
      if (array.length == 0) {
        this.noInform = true
        this.informArray = []
      } else {
        array.forEach((item) => {
          item.relatedGroup = item.relatedGroup[0].name
        })
        this.noInform = false
        if (this.page > 1) this.informArray = [...this.informArray, ...array]
        else this.informArray = array
      }
    },

    clearPage() {
      this.page = 1
      this.pageTotal = 0
    }
  },
  //onLoad触发一次登录请求
  async onLoad() {
    // await Taro.setEnableDebug({
    //   enableDebug:true
    // })
    await wxLogin()
  },
  async onShow(){
    this.clearPage()
    await this.getInform(this.focusDate)
  },
  async mounted() {
    await this.getInform(today())
  },
  onPullDownRefresh() {
    this.clearPage()
    this.getInform(this.focusDate)
  },
  onReachBottom() {
    this.page++
    this.getInform(this.focusDate)
  },
  components: {
    AtCalendar,
    AtFloatLayout,
    informCard,
    filterInform
  }
}
</script>
