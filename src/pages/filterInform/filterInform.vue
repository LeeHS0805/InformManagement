<template>
  <view class="filter-inform">
    <view class='flex-row select'>
      <view class='flex-column select-item'>
        <picker
          mode='selector'
          :range="selector"
          :value="this.inform.priority"
          @change="handleChange($event)"
        >
          <view>优先级</view>
        </picker>
      </view>
      <view class='flex-column select-item'>
        <picker
          mode='date'
          :value="inform.startDate"
          @change="handleChangeTime"
        >
          <view>创建时间</view>
        </picker>
      </view>
      <view class='flex-column select-item'>
        <picker
          mode='date'
          :value="inform.endDate"
          @change="handleChange"
        >
          <view>截止时间</view>
        </picker>
      </view>
    </view>
  </view>
</template>

<script>
import './filterInform.scss'

export default {
  name: "filterInform",
  data() {
    return {
      value1: '',
      selector: ['0 普通', '1 重要', '2 紧急'],
      selectorValue: '',
      inform: {
        startDate: '',
        endDate: '',
        priority: '',
      },
    }
  },
  methods: {
    handleChange(e) {
      this.inform.priority = e.detail.value
      console.log(this.inform.priority)
    },
    handleChangeTime() {

    }
  },
  mounted() {

  },

}
</script>

<style scoped>

</style>
