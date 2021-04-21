<template>
  <view class="channelCover">
      <AtImagePicker
        :files="files"
        :onChange="onChange"
        />
  </view>
</template>

<script>


import './channelCover.scss'
import Taro from '@tarojs/taro';
import { AtImagePicker } from 'taro-ui-vue'

// 1. 上传频道的封面 频道标题 频道标签 频道介绍
// 2. 卡片形式？
// 3. 频道其他的描述
export default {
  name: 'AtImagePickerDemo',
  

  components: {
    AtImagePicker
  },




  data () {
    return {
      files: [
        {
          url: 'https://www.z4a.net/images/2021/04/20/user.png',
        },
        {
          url: 'https://www.z4a.net/images/2021/04/20/avatar_black.jpg',
        },
        {
          url: 'https://www.z4a.net/images/2021/04/20/avatar_white.jpg',
        },
        {
          type: 'btn'
        }
      ]
    }
  },

  methods: {
    onChange (files) {
      this.files = files
    },
    onFail (mes) {
      console.log(mes)
    },
    onImageClick (index, file) {
      console.log(index, file)
    }
  },

  created () {
    

  }
}
</script>
