<template>
  <view class="filter-inform">
    <view class='flex-row select'>
      <view class='flex-column select-item'>
        <picker
          mode='selector'
          :range="selector"
          :value="this.inform.priority"
          @change="handleChange($event,'priority')"
        >
          <view>{{inform.priority!=0?selector[inform.priority]:`优先级`}}</view>
        </picker>
      </view>
      <view class='flex-column select-item'>
        <picker
          mode='selector'
          :range="selectorTime"
          :value="inform.startDate"
          @change="handleChange($event,'startDate')"
        >
          <view>{{inform.startDate!=0?selectorTime[inform.startDate]:`创建时间` }}</view>
        </picker>
      </view>
      <view class='flex-column select-item'>
        <picker
          mode='selector'
          :range="selectorTime"
          :value="inform.endDate"
          @change="handleChange($event,'endDate')"
        >
          <view>{{inform.endDate!=0?selectorTime[inform.endDate]:"截止时间"}}</view>
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
      selector: ['','普通', '重要', '紧急'],
      selectorTime:['','升序','降序'],
      selectorValue: '',
      inform: {
        startDate: '',
        endDate: '',
        priority: '',
      },
    }
  },
  methods: {
    handleChange(e,str) {
      this.inform[str] = e.detail.value
      let type ;
      if(str=='priority') type=0;
      else if(str=='startDate') type=1;
      else if (str=='endDate')type=2;

      this.$emit('priority', {value: e.detail.value,type})
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
