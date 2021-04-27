<template>
  <view class="myChannelContainer">
    <!-- 一个群组的卡片  -->
    <view class="groupCardContainer" v-if="myGroupList.length">
      <view class="groupCard" v-for="(items,index) in myGroupList" :key="index"  @tap="getGroupDetail(index)">
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
    <view class="noGroupContainer" v-else>
      <text class="noGroupText">去创建或者加入一个频道吧</text>
      <image class="noGroupImage" src="https://www.z4a.net/images/2021/04/11/test.jpg"></image>
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
        1
      ],
      myAdminGroupList: [

      ],
    }
  },

  components: {

  },
  methods: {
    getImgUrl(items){
      var url = 'https://clayex.com/'+items.avatarImg;
      return url;
    },
    getGroupDetail(e) {
      Taro.setStorageSync('groupId',this.myGroupList[e].groupId);
      Taro.navigateTo({
        url: '../myGroupDetail/myGroupDetail',
      })
    }
  },
  async onLoad() {
    let myGroupListData = await request('/getMyGroup');
    this.myGroupListData = myGroupListData;
    this.myGroupList = myGroupListData.data;
  }
}
</script>
