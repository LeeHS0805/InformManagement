<template>
  <view>
    <view v-show="!isShowImg">
      <view class="inform-detail">
        <view class="inform-container" >
          <view class="priority-box">
            <Priority :status="status"></Priority>
          </view>
          <view class="title ellipsis-3 wrap">
            {{ inform.title | format }}
          </view>
          <view class="details">
            <view class="key">
              <view class="group-value">群组:</view>
              <view class="publisher-value">发布人:</view>
              <view class="time-value">时间:</view>
            </view>
            <view class="value">
              <view class="group-value">{{ inform.relatedGroup | format }}</view>
              <view class="publisher-value">{{ inform.creatorName | format }}</view>
              <view class="time-value">{{ inform.createTime | format }}</view>
            </view>
            <image class="expired" src="https://tva1.sinaimg.cn/large/008i3skNly1gpxk56k73nj305k05kt9h.jpg" v-show="showExpiredImage"></image>
          </view>
          <AtTimeline
            class="timeline"
            style="white-space:pre-wrap"
            :items="[
          { title: `通知内容: ${inform.content}` },
          { title: `截止日期: ${inform.deadline?inform.deadline:'暂无截止日期'}` },
          { title: `通知标签: ${inform.tag?inform.tag:'暂无标签'}`, color: 'red' },
          { title: `是否完成: ${inform.isRead?'是':'否'}`, color: 'yellow' }
        ]"
          >
          </AtTimeline>
        </view>
        <view class="informImage">
          <view class="image" v-for="item in inform.resources">
            <image class='imageSmall':src="`http://49.232.223.89:50030/${item}`"
                   @tap="showImg(`http://49.232.223.89:50030/${item}`)"></image>
          </view>
        </view>
        <view class="finish-btn">
          <AtButton type='primary' :disabled="inform.isRead||inform.isExpired" :onClick="hasRead">{{
              readBtnValue
            }}
          </AtButton>
        </view>
        <AtMessage/>
      </view>
      <view class="bottom"></view>
    </view>
    <view class="showImage" v-if="isShowImg" @tap.prevent="()=>{isShowImg=false;isSaveImage=false}">
      <image class='imageLarge' :src="imgSrc" @longPress.prevent="saveImage"></image>
    </view>
    <AtActionSheet
      :isOpened="isSaveImage"
      :on-close="closeImage"
    >
      <AtActionSheetItem
        :on-click="saveImage"
      >
        保存图片
      </AtActionSheetItem>
      <AtActionSheetItem
        :on-click="closeImage"

      >
        取消
      </AtActionSheetItem>
    </AtActionSheet>
  </view>
</template>

<script>
import './informDetail.scss'
import Priority from "../../components/Priority/Priority"
import {AtTimeline, AtButton,AtActionSheet, AtActionSheetItem} from 'taro-ui-vue'
import request from "../../utills/request";
import Taro from '@tarojs/taro'

export default {
  name: "informDetail.vue",
  data() {
    return {
      status: 0,                //优先级组件prop值, 请给初始值
      inform: '',               //通知详情
      showExpiredImage: false,    //是否展示过期页面
      readBtnValue: '',
      isShowImg: false,            //是否显示大图
      imgSrc: '',
      isSaveImage:false,
    }
  },
  methods: {
    formatTag(value) {
      this.inform.tag = value.toString().split(',').join(' ');
    },
    showExpired(value) {
      value ? this.showExpiredImage = true : ''
    },
    async hasRead() {
      await request('/read', 'GET', {informId: this.inform['informId']})
      this.inform.isRead = true
    },
    showImg(imgSrc) {
      this.imgSrc = imgSrc
      // this.isShowImg = true

      Taro.previewImage({
        current: imgSrc, // 当前显示图片的http链接
        showmenu:true,
        urls: this.inform.resources.map(item=>{
            return `http://49.232.223.89:50030/${this.inform.resources}`
        }) ,// 需要预览的图片http链接列表
        fail(res){

        }
      })
    },
    closeImage(){
      this.isSaveImage=false
    },
    saveImage(){
      if(this.isSaveImage){

        Taro.saveImageToPhotosAlbum({
          filePath:this.imgSrc,
          success(){
            Taro.showToast({title:'保存成功',icon:'success',duration:'500'})
          }
        })
      }
      this.isSaveImage = true;
    }
  },
  onLoad({params}) {
    params = JSON.parse(params)
    this.showExpired(params.isExpired)
    this.inform = params
    this.readBtnValue = this.inform['isExpired'] ? '通知已过期' : this.inform['isRead'] === false ? '确认阅读' : '已阅读'
    this.status = this.inform.priority
    this.formatTag(this.inform.tag)
  },
  filters: {
    format: function (val) {
      return !val || typeof val == undefined || val == [] ? '暂无内容' : val;
    }
  },
  components: {
    Priority,
    AtTimeline,
    AtButton,
    AtActionSheet,
    AtActionSheetItem
  }
}
</script>

