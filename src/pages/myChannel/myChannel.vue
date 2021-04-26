<template>
  <view class="myChannelContainer">
    <!-- 一个群组的卡片  -->
    <view class="groupCard" v-for="items in myGroupList" :key="items.groupId"  @tap="getGroupDetail(items.groupId)">
      <view class="groupName ellipsis-2">{{items.name}}</view>
       <view class="groupIdContainer">
         <text>GroupID:</text>
         {{items.groupId}}
       </view>
      <view class="groupMembersNum">
        <text>群组成员数:</text>
        {{items.members.length}}
      </view>
      <view class="groupCover">
        <image class="coverContainer" :src="getImgUrl(items)"></image>
      </view> 
    </view>
    
  
    
  </view>
</template>
<script>


import './myChannel.scss';
import Taro from '@tarojs/taro';
import request from '../../utills/request';

export default {
  data() {
    return {
      myGroupList: [
        
      ],
      myAdminGroupList: [
        // {
        //   groupId: '',
        //   name: '',
        // }
      ],
    }
  },
 
  components: {
   
  },
  methods: {
    getImgUrl(items){
      var url = 'http://49.232.223.89:50030/'+items.avatarImg;
      return url;
    },
    getGroupDetail(e) {
      Taro.setStorageSync('groupId',this.myGroupList[e-1].groupId);
      // console.log('this.myGroupList',this.myGroupList[e-1].groupId);
      // console.log('this.myAdminGroupList',this.myAdminGroupList[e-1].groupId);
      // console.log('myGroupId',this.myGroupList[e-1].groupId);
      // console.log('myAdminGroupId',this.myAdminGroupList[e-1].groupId);
      
      Taro.navigateTo({
        url: '../myGroupDetail/myGroupDetail',
      })
      // let isAdmin = (this.myGroupList[e-1].groupId === this.myAdminGroupList[e-1].groupId) ? true : false;
      // console.log('isAdmin',isAdmin);
     
      // Taro.setStorageSync('isAdmin',isAdmin);
    }    
  },
  // 与原生相比 onLoad: async function (options) 有无区别
  async onLoad() {
    console.log("onLoad");
    let myGroupListData = await request('/getMyGroup');
    // let myAdminGroupListData = await request('/getMyAdminGroup');
    this.myGroupListData = myGroupListData;
    this.myGroupList = myGroupListData.data;
    // this.myAdminGroupListData = myAdminGroupListData;
    // this.myAdminGroupList = myAdminGroupListData.data;
    console.log(this.myGroupList);
    // console.log(this.myAdminGroupList);
  },
  onShow() {
     
  },
  created() {

  },
  mounted() {
  
  }
}
</script>
