<template>
  <view class="channelCover">
      <AtImagePicker
        :files="files"
        :onChange="onChange"
        />
    <view class="channelCoverConfirm">
      <AtButton circle type='secondary' :onClick="createNewChannel">选好了频道的封面</AtButton>
    </view>
  </view>
  
</template>

<script>


import './channelCover.scss'
import Taro from '@tarojs/taro';
import { AtImagePicker, AtButton } from 'taro-ui-vue'

// 1. 上传频道的封面 频道标题 频道标签 频道介绍
// 2. 卡片形式？
// 3. 频道其他的描述
export default {
  name: 'AtImagePickerDemo',
  

  components: {
    AtImagePicker,
    AtButton
  },


  data () {
    return {
      files: [
        {
          type: 'btn'
        }
      ],

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
    },
    createNewChannel () {
      console.log("尝试着提交了一下频道头像")
    }
  },

  created () {
    

  }
}
</script>
