<template>
  <view class="filterInfoContainer">
        <view class="searchContainer">
            <!-- 改成支持按重要程度和时间搜索 -->
            <AtSearchBar
                actionName='搜一下'
                :value="searchValue"
                :onChange="onChange.bind(this,'searchValue')"
                :onActionClick="onActionClick"
            />
        </view>
        <view class='categoryContainer'>
          <!-- 上面的标题 -->
          <!-- 按重要程度筛选 -->
            <view class='panelTitle'>按重要程度筛选</view>
            <view class='pickerContainer'>
            <picker
              mode='selector'
              :range="selector"
              :value="selectorValue"
              @change="handleChange"
              @cancel="handleCancel"
            >
              <view class='textContainer'>
                <view class='hintHeadline'>重要等级</view>
                <view class='selectedHeadline'>
                  {{ selector[selectorValue] }}
                </view>
              </view>
            </picker>
          </view>
          <!-- 按日期筛选 -->
          <view class='panelTitle'>按日期筛选</view>
            <view class='pickerContainer'>
            <picker
              mode='date'
              :value="dateSel"
              @change="handleDateChange"
            >
              <view class='textContainer'>
                <view class='hintHeadline'>请选择日期</view>
                <view class='selectedHeadline'>{{ dateSel }}</view>
              </view>
            </picker>
          </view>
        </view>
  </view>
  
</template>

<script>


import './filterInfo.scss';
import Taro from '@tarojs/taro';
import { AtSearchBar, AtButton } from 'taro-ui-vue';

export default {
  data () {
    return {
      searchValue: '',
      selector:  ['重要', '紧急', '普通'],
      selectorValue: 0,
      dateSel: '2021-04-24',
    }
  },

  components: {
    AtSearchBar,
    AtButton
  },

  methods: {
    onChange(stateName, value, a) {
      this[stateName] = value;
      console.log(this.searchValue, a);
    },
    onActionClick() {
      console.log('点击了搜索按钮');
      Taro.showToast({
          title: '开始筛选'
      })
    //   还可以考虑用自定义图片的AtToast
    },

    handleChange (e) {
      this.selectorValue = e.detail.value;
      console.log('selectorValue',this.selectorValue);
    },

    handleDateChange (e) {
      this.dateSel = e.detail.value;
      console.log('this.dateSel',this.dateSel);
      console.log('e',e);
    },

    handleCancel(e) {
      console.log('handleCancel(e)', e);
    },

  },

  created () {
    

  }
}
</script>