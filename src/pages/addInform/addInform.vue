<template>
  <view class="addInform">
    <view class="title">发布通知</view>
    <view class="main">
      <textarea name="" cols="30" rows="1" class="main-title" placeholder="请输入通知标题"
                placeholder-class="placeholder" v-model="inform.title"></textarea>
      <textarea name="" cols="30" rows="8" class="main-content" placeholder="请输入详细的通知内容" placeholder-class="placeholder"
                maxlength="416" v-model="inform.content"></textarea>
    </view>
    <view class="image">
      <view class="image-title">请选择通知图片</view>
      <AtImagePicker
        :length.num=4
        :count=3
        :files="files"
        :onChange="onImageChange"
      />
    </view>
    <view class="options">
      <view class="select-tag">
        <view class='demo-list-item'>
          <view class='demo-list-item__label'>自定义标签</view>
          <view class='demo-list-item__value'>
            <input type="text" maxlength="12" v-model="inform.tag">
          </view>
        </view>
      </view>
      <view class='select-priority'>
        <picker
          mode='selector'
          :range="selector[0]"
          :value="inform.priority"
          @change="handleOptionsChange(0,$event)"
        >
          <view class='demo-list-item'>
            <view class='demo-list-item__label'>优先级</view>
            <view class='demo-list-item__value'>
              {{ selectorValue[0] }}
            </view>
          </view>
        </picker>
      </view>
      <view class='select-'>
        <picker
          mode='selector'
          :range="selector[1]"
          :value="selectorValue[1]"
          @change="handleOptionsChange(1,$event)"
        >
          <view class='demo-list-item'>
            <view class='demo-list-item__label'>发送频道</view>
            <view class='demo-list-item__value' v-model="selectorValue[1]">
              {{ selectorValue[1] }}
            </view>
          </view>
        </picker>
      </view>
      <view class='select-time'>
        <picker
          mode='date'
          :value="inform.deadline"
          :start="2021-4-30"
          @change="handleTimeChange(2,$event)"
        >
          <view class='demo-list-item'>
            <view class='demo-list-item__label'>请选择截止日期</view>
            <view class='demo-list-item__value'>{{ selectorValue[2] }}</view>
          </view>
        </picker>
      </view>
    </view>
    <AtButton type='primary' :disabled="submitLoading" :loading="submitLoading"
              class="submit-btn" :on-click="(e) => handleSubmit('loading')">发布通知
    </AtButton>
  </view>
</template>

<script>
import './addInform.scss'
import {AtImagePicker, AtRadio, AtButton} from 'taro-ui-vue'
import {today} from '../../utills/today'
import Taro from '@tarojs/taro'
import request from "../../utills/request";

export default {
  name: "addInform",
  components: {
    AtImagePicker,
    AtRadio,
    AtButton
  },
  data() {
    return {
      submitLoading: false,     //提交表单展示Loading
      adminGroup: [],           //当前用户有权限的群组的ID/NAME信息
      pickerPos: 0,             //当前选择的照片数量
      files: [                  //当前选择照片的地址信息,数组首元素是添加图片的Button
        {
          type: 'btn'
        }
      ],
      selector: [               //picker的选项信息 [0]优先级 [1]adminGroup [2]deadline
        ['普通', '重要', '紧急'],
        [],
        null
      ],
      selectorValue: [],        //picker选中的信息 [0]优先级 [1]adminGroup [2]deadline
      inform: {                 //表单提交对象
        title: '',
        content: '',
        relatedGroup: [],
        tag: [],
        priority: 0,
        deadline: '',
        resources: []
      }
    }
  },
  methods: {
    //添加或删除图片
    onImageChange(files, type) {
      this.files = files
      if (type == 'add') {
        this.pickerPos++
        if (this.pickerPos == 3) this.files.splice(0, 1)
      } else if (type == 'remove') {
        this.pickerPos--
        if (this.pickerPos == 2) this.files.unshift({type: 'btn'})
      }
    },
    //截止日期更改触发
    handleTimeChange(index, e) {
      this.$set(this.selectorValue, index, e.detail.value)
      this.inform.deadline = e.detail.value
    },
    //优先级 & adminGroup 更改触发
    handleOptionsChange(index, e) {
      this.$set(this.selectorValue, index, this.selector[index][e.detail.value])
      if (index == 1) {
        this.adminGroup.forEach((item) => {
          if (this.selector[index][e.detail.value] == item.name) {
            this.inform.relatedGroup = [item.groupId]
          }
        })
      } else if (index == 0) {
        this.inform.priority = Number(e.detail.value)
      }
    },
    //点击提交按钮触发
    handleSubmit() {
      this.submitLoading = true
      this.inform.tag = [this.inform.tag]
      console.log(this.inform)
      this.upload()
      this.submitLoading = false
    },
    //上传图片 & 表单
    async upload() {
      // 单次上传一张图片,遍历数组上传
      Taro.showLoading({
        title: '加载中',
      })
      if (this.pickerPos > 0) {
        await this.uploadImage()
      }
      if (this.checkParams()) {
        await request('/addInform', 'POST', this.inform)
        Taro.hideLoading()
        this.showToast('提交成功','success')
        setTimeout(()=>{
          Taro.reLaunch({
            url:'../../pages/inform/inform'
          },1200)
        })
      }
      else {
        this.showToast('数据格式错误', 'error')
      }
    },
    //上传图片
    async uploadImage() {
      let that = this
      let currentIndex = 0
      let imageArr = []
      this.files.forEach((item, index) => {
        if (item.type !== 'btn') {
          imageArr[currentIndex++] = new Promise(resolve => {
            Taro.uploadFile({
              url: 'http://49.232.223.89:50030/uploadImages',
              filePath: that.files[index].url.toString(),
              name: 'file',
              header: {
                session: Taro.getStorageSync('session')
              },
              success(res) {
                that.inform.resources.unshift(JSON.parse(res.data).data[0])
                resolve(res)
              },
              fail() {
                that.showToast('图片上传失败', 'error')
              }
            })
          })
        }
      })
      return Promise.all(imageArr)
    },
    checkParams() {
      for (let key in this.inform) {
        let item = this.inform[key]
        if(key=='resources') continue;
        if (item === '' || item == null || item.length == 0) return false;
      }
      return true;
    },
    showToast(msg, type) {
      Taro.showToast({title: msg, icon: type, duration: 900})
    },
    today(){
      today()
    }
  },
  async onShow() {
    this.adminGroup = (await request('/getMyAdminGroup', 'GET', null)).data

    this.selector[1] = []
    this.adminGroup.forEach((item) => {
      //将adminGroup中的Name属性抽离,用于picker的option属性渲染
      this.selector[1].push(item.name.toString())
    })
    //手动更新picker视图
    this.$set(this.selector, 1, this.selector[1])
  }
}
</script>

