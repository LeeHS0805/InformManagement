// 为支持多列选择器的版本
<template>
  <view class="filterInfoContainer">
        <view class="searchContainer">
            <!-- 1. 关键字搜索 -->
            <!-- 2. 分类方面，目前暂时只支持两列搜索 即重要程度和类别 -->
            <!-- 后续也许支持按时间搜索 -->
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
            <view class='panelTitle'>按类别筛选</view>
            <view class='pickerContainer'>
              <!-- 整个一个大的picker -->
                <picker
                mode='multiSelector'
                :range="multiSelector"
                :value="multiSelectorValues"
                @change="handleMultiChange"
                @columnchange="handleColumnChange"
                >
                <view class='textContainer'>
                    <!-- 左边的标题 -->
                    <view class='hintHeadline'>请选择类别</view>
                    <!-- 右边加载选中内容的文字 -->
                    <view class='selectedHeadline'>{{
                         `${
                           multiSelector[0][multiSelectorValues[0]]
                        } & ${multiSelector[1][multiSelectorValues[1]]}`
                    }}
                    </view>
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
      multiSelector: [
        ['重要', '紧急', '普通'],
        ['官方', '生活']
      ],
      multiSelectorValues: [ 0, 1 ],
      test: 1
      // 每次columen需要更新multiSelectorValues[0]的值
      // 以及需要更新multiSelectorValues[1]的值
      // column=0 更新multiSelectorValues[0]的值为value
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

    handleColumnChange(e) {
      console.log('handleColumnChange', e);
      console.log('column', e.detail.column);
      console.log('value', e.detail.value);
      // this.multiSelectorValues[e.detail.column] = e.detail.value;
      // console.log(multiSelectorValues[0]);
      //  column 0 --> 在调整重要程度
      //  column 1 --> 在调整类别
      //  value  0-1-2 选...该列的第几个
    },
    
    handleMultiChange(e) {
      console.log('handleMulitChange', e.detail.value);
      this.$set(this.multiSelectorValues,0,e.detail.value[0])
      this.$set(this.multiSelectorValues,1,e.detail.value[1])
      // this.multiSelectorValues[1] = e.detail.value[1];
      this.test = 2;
      // value 直接返回一个数组 
      // 直接表示第几个 简单坐个渲染完事
      // 渲染的时候看清楚坐标
    },
    

    // handleCancel(e) {
    //   console.log('handleCancel', e);
    // },
  },

  created () {
    

  }
}
</script>