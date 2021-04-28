<template>
  <view class="createChannel">
    <!--
      标题做成输入框
      封面直接在当前页面选择上传
      频道介绍 好看一点的文本框
    -->
      <view class="newchannelTitle">
        <AtInput
          name='name'
          title='频道标题'
          type='text'
          placeholder='请输入创建的频道标题'
          :value="name"
          :onChange="handleInput"
        />
      </view>
      <view class="newchannelPhoto" >
        <AtList>
          <AtListItem
            title='添加频道封面'
          />
        </AtList>
      </view>
      <view class="channelCover">
      <AtImagePicker
        :files="files"
        :onChange="onChange"
        :onFail="onFail"
        :onImageClick="onImageClick"
       />
      </view>

      <view class="createChannelBtn">
      <AtButton circle type='secondary' :disabled="disabled" :onClick="createNewChannel">创建新的频道</AtButton>
      </view>
  </view>
</template>

<script>


import './createChannel.scss'
import Taro, { getStorageSync } from '@tarojs/taro';
import request from '../../utills/request';
import { AtToast, AtImagePicker, AtInput, AtForm, AtList, AtListItem, AtTextarea, AtTag, AtButton } from 'taro-ui-vue'


export default {
  components: {
    AtImagePicker,
    AtInput,
    AtForm,
    AtList,
    AtListItem,
    AtTextarea,
    AtTag,
    AtButton,
    AtToast
  },


  data () {
    return {
      name: '',
      files: [
        {
          type: 'btn'
        }
      ],
      operationType: '',
      avatarImg: '',
      index: 1,
      disabled:false,
    }
  },

  methods: {
    handleInput(val) {
      this.name = val
    },

    tochannelCover() {
      Taro.navigateTo({
        url: '../channelCover/channelCover',
      })
    },

    // 检测属性 计数器 ++ --  splice push
    onChange ( files, operationType, index ) {
      this.files = files;
      this.operationType = operationType;
      this.index = index;

      if( operationType == 'add' ) {
        Taro.setStorageSync('tmpFiles',this.files[0]);
        files.splice(0,1);
      } else if ( operationType == 'remove' ) {
        files.unshift(Taro.getStorageSync('tmpFiles'));
      }
    },

    onFail (mes) {

    },
    onImageClick (index, file) {


    },

    async createNewChannel() {
      if(this.files[0].type != 'btn') {
          const avatarImg = await new Promise((resolve, reject) => {
          this.disabled=true;
          Taro.uploadFile({
            url: 'https://clayex.com/uploadImages',
            filePath: this.files[0].url,
            name: 'file',
            header: {
              session: Taro.getStorageSync('session'),
            },
            success (res){
              this.disabled=false
              resolve(JSON.parse(res.data).data[0]);
            },
            fail (error) {
              this.disabled=false
              reject(error);
            }
          })
        })
         await request(
          '/createGroup',
          'POST',
          {
            "name": this.name,
            "avatarImg": avatarImg,
          },
        );
        Taro.showToast({
          title: '一个新的频道！'
        })
      } else {
        await request(
          '/createGroup',
          'POST',
          {
            "name": this.name,
          },
        );
        Taro.showToast({
          title: '看看默认封面吧！'
        })
      }
      Taro.navigateTo({
        url: '../myChannel/myChannel',
      })
    },
  },
}
</script>
