<template>
  <view class="launch">
    <AtCalendar></AtCalendar>
  </view>
</template>

<script>

import { AtCalendar } from 'taro-ui-vue'
import wxLogin from "../../utills/wxLogin";
import "taro-ui-vue/dist/style/components/calendar.scss";

export default {
  data () {
    return {

    }
  },

  components: {
    AtCalendar
  },

  methods: {

  },

  created () {
    // let app = getApp()

  }
}
</script>

<style scoped lang="scss">


</style>
