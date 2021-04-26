<template>
  <view class="addInform">
    <view class="title">发布通知</view>
    <view class="main">
      <textarea name="" cols="30" rows="1" class="main-title" placeholder="请输入通知标题"
                placeholder-class="placeholder"></textarea>
      <textarea name="" cols="30" rows="8" class="main-content" placeholder="请输入详细的通知内容" placeholder-class="placeholder"
                maxlength="416"></textarea>
    </view>
    <view class="image">
      <view class="image-title">请选择通知图片</view>
      <AtImagePicker
        :length.num=4
        :count=3
        :files="files"
        :onChange="onChange"
      />
    </view>
<!--    <view class="detail">-->
<!--      <picker-->
<!--        mode='selector'-->
<!--        :range="selector"-->
<!--        :value="selectorValue"-->
<!--        @change="handleChange"-->
<!--        @cancel="handleCancel">-->
<!--        <view class='demo-list-item'>-->
<!--          <view class='demo-list-item__label'>国家地区</view>-->
<!--          <view class='demo-list-item__value'>-->
<!--            {{ // selector[selectorValue] }}-->
<!--          </view>-->
<!--        </view>-->
<!--      </picker>-->
<!--    </view>-->
  </view>
</template>

<script>
import {AtImagePicker} from 'taro-ui-vue'
import './addInform.scss'
import "taro-ui-vue/dist/style/components/image-picker.scss";
import "taro-ui-vue/dist/style/components/icon.scss";
import "taro-ui-vue/dist/style/components/list.scss";
import "taro-ui-vue/dist/style/components/icon.scss";

export default {
  name: "addInform",
  components: {},
  data(){
    return{
      files: [
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
    },
    handleClick(){

    }
  },
}
</script>

