<template>
  <view class="createChannel">
    <!-- 
      标题做成输入框 
      封面单独拿出来一个界面 
      频道标签 有样式 有参考
      频道介绍 好看一点的文本框
      最后加一个btn 
      -->
      <view class="newchannelTitle">
        <AtInput
          name='value1'
          title='频道标题'
          type='text'
          placeholder='请输入创建的频道标题'
          :value="value1" 
          :onChange="handleInput"
        />
      </view>
      <view class="newchannelPhoto" >   
        <AtList>
          <AtListItem
            title='频道封面'
            arrow='right'
            :onClick="tochannelCover"
          />
        </AtList>
      </view>
      <view class="newchannelTags">
        <view class="titleContainer">频道标签</view>
        <view class="tagContainer">
          <view class="tagSmallContainer">
            <AtTag
              name='tag-1'
              type='primary'
              circle
              :onClick="onClick"
            >tag-1
            </AtTag>
            <AtTag
              name='tag-1'
              type='primary'
              circle
              :onClick="onClick"
            >tag-1
            </AtTag>
            <AtTag
              name='tag-1'
              type='primary'
              circle
              :onClick="onClick"
            >tag-1
            </AtTag>
            <AtTag
              name='tag-1'
              type='primary'
              circle
              :onClick="onClick"
            >tag-1
          </AtTag>
          </view>
          <view class="tagSmallContainer">
          <AtTag
            name='tag-1'
            type='primary'
            circle
            :onClick="onClick"
          >tag-1
          </AtTag>
          <AtTag
            name='tag-1'
            type='primary'
            circle
            :onClick="onClick"
          >tag-1
          </AtTag>
          <AtTag
            name='tag-1'
            type='primary'
            circle
            :onClick="onClick"
          >tag-1
          </AtTag>
          <AtTag
            name='tag-1'
            type='primary'
            circle
            :onClick="onClick"
          >tag-1
          </AtTag>
          </view>
        </view>
        
      </view>
      <view class="newchannelIntroduce">
      <view class="titleContainer">频道介绍</view>
        <AtTextarea
          :value="value2"
          :onChange="handleChange"
          :maxLength="200"
          placeholder='你的频道介绍是...'
        />
      </view>
      <view class="createChannelBtn">
      <AtButton circle type='secondary' :onClick="createNewChannel">创建一个新的频道</AtButton>
      </view>
  </view>
</template>

<script>


import './createChannel.scss'
import Taro from '@tarojs/taro';
import { AtImagePicker, AtInput, AtForm, AtList, AtListItem, AtTextarea, AtTag, AtButton } from 'taro-ui-vue'


// 1. 上传频道的封面  频道标题 频道标签 频道介绍
// 2. 卡片形式？
// 3. 频道其他的描述

export default {
  name: 'AtTagDemo',
  components: {
    AtImagePicker,
    AtInput,
    AtForm,
    AtList,
    AtListItem,
    AtTextarea,
    AtTag,
    AtButton
  },




  data () {
    return {
      value1: '',
      value2: '',
    }
  },

  methods: {
    handleInput(val) {
      this.value1 = val
    },
    tochannelCover() {
      Taro.navigateTo({
        url: '../channelCover/channelCover',
      })
    },
    handleChange(value) {
      this.value2 = value
    },
    onClick() {
      console.log('点击了')
    },
    createNewChannel() {
      console.log('创建一个新的频道成功')
    }
  },

  created () {
    

  }
}
</script>
