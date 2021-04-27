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
      <AtButton circle type='secondary' :onClick="createNewChannel">创建新的频道</AtButton>
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

      (() => {
        Taro.removeStorageSync('tmpFiles');
      })

      // 原写法备注 async
      // await (()=>{
      //   Taro.removeStorageSync('tmpFiles');
      // })
    },
    
    onFail (mes) {
      console.log(mes);
      console.log("图片选择失败！");
    },
    onImageClick (index, file) {
      console.log(index, file);
      console.log("点击了图片");
    },
    
    async createNewChannel() {
      console.log(this);
      if(this.files[0].type != 'btn') {
          const avatarImg = await new Promise((resolve, reject) => {
          Taro.uploadFile({
            url: 'https://clayex.com/uploadImages', 
            filePath: this.files[0].url,
            name: 'file',
            header: {
              session: Taro.getStorageSync('session'),
            },
            success (res){
              console.log(JSON.parse(res.data));
              resolve(JSON.parse(res.data).data[0]);
              Taro.reLaunch({
                url: '../myChannel/myChannel',
              })
            },
            fail (error) {
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
      } else {
        await request(
          '/createGroup',
          'POST',
          {
            "name": this.name,
          },
        );
        Taro.reLaunch({
          url: '../myChannel/myChannel',
        })
      }
    // 考虑后续加 AtToast 组件
    // a! complex logic!
    Taro.showToast({
      title: '一个新的频道！'
    })
  },

    
  },

  created () {
    

  }
}
</script>
