<template>
  <view class="myGroupDetailContainer">
    <view class="groupDetailBanner" v-for="(items,index) in myGroupDetail" :key="index">
      <image class="bannerContainer" mode="aspectFill" :src="getImgUrl(items)"></image>
    </view>
    <view class="basicInfomations">
      <!-- 群组名 -->
      <view class="groupDetailName ellipsis-2">
        {{myGroupDetail[0].name}}
      </view>
      <view class="groupDetailOthers">
        <view class="leftContainer">
          <view class="leftTopContainer">
            <AtIcon value='star' size='35' color='#7f8c8d' class="iconFontLeftTop"></AtIcon>
            <view class="leftTopRightContainer">
              <text class="tagNameTop">创建人姓名</text>
              <view class="groupCreatorName">
                {{myGroupDetail[0].creatorName}}
              </view>
            </view>

          </view>
          <view class="leftBtmContainer">
            <AtIcon value='numbered-list' size='35' color='#7f8c8d' class="iconFontLeftBtm"></AtIcon>
            <view class="leftTopRightContainer">
              <text class="tagNameBtm">创建人学号</text>
              <view class="groupCreatorId">
                {{myGroupDetail[0].creator}}
              </view>
            </view>
          </view>

        </view>
        <view class="rightContainer">
          <AtIcon value='clock' size='35' color='#7f8c8d' class="iconFontRight"></AtIcon>
          <text class="tagNameRight">创建日期</text>
          <view class="groupCreateTime">
            {{myGroupDetail[0].createTime}}
          </view>
        </view>
      </view>
      <view class="groupAdmins">
        <text class="tagNameBtm">群组管理员</text>
        <view class="groupAdminsContainer">
          <view class="groupAdminsLists" v-for="(item,index) in myGroupDetail[0].admins" :key="index">
            {{item.realName}}
          </view>
        </view>
      </view>
      <view class="groupMembers ellipsis-3">
        <text class="tagNameBtm">群组成员</text>
        <view class="groupMembersContainer">
          <view class="groupMembersLists" v-for="(item,index) in myGroupDetail[0].members" :key="index">
            {{item.realName}}
          </view>
        </view>
      </view>
      <view class="fabContainer" v-if="isAdminVerify">
        <AtFab :onClick="onButtonClick">
          <text>管理员</text>
        </AtFab>
      </view>
      <AtFloatLayout
        title="管理群组"
        :isOpened="setIsOpened"
        :onClose="handleClose"
      >
        <view class="addAdmins">
          <view class="getFriendCode">
            <text class="viewCode">我的邀请码</text>
            <text class="friendCode" selectable="true">{{myFriendCode.data}}</text>
          </view>
          <view class="addAdminId">
            <text class="adminId">添加新的管理员</text>
            <view class="userIdIpt">
              <AtInput
                name='userId'
                title='学号'
                type='number'
                placeholder='输入新增管理员学号'
                :value="userId"
                :onChange="handleInputuserId"
              />
            </view>
          </view>
          <button type='primary' circle form-type="submit" @tap="addAdmin()" class="submitBtn">提交</button>
          <AtMessage />
        </view>
      </AtFloatLayout>
    </view>
  </view>
</template>
<script>


import './myGroupDetail.scss';
import Taro from '@tarojs/taro';
import request from '../../utills/request';
import verifyRequest from "../../utills/verifyRequest";
import { AtFloatLayout, AtIcon, AtFab, AtButton, AtInput, AtForm, AtMessage } from 'taro-ui-vue';
export default {
  data() {
    return {
      groupId: '',
      userId: '',
      myFriendCode: '',
      myGroupDetail: [
        {
          creatorName: '',
          creator: '',
          avatarImg: '',
          name: '',
          createTime: '',
          admins: [],
          members: [],
        }
      ],
      setIsOpened: false,
      isAdminVerify: false,
    }
  },

  components: {
    AtFloatLayout,
    AtIcon,
    AtFab,
    AtButton,
    AtInput,
    AtForm,
    AtMessage
  },
  methods: {
    getImgUrl(items){
      var url = 'https://clayex.com/'+items.avatarImg;
      return url;
    },
    handleClose() {
      this.setIsOpened = false;

    },
    handleInputuserId(res_userId) {
      this.userId = res_userId;

    },
    onButtonClick() {
      this.setIsOpened = true;
    },
    async addAdmin() {
      let verifyCode = await request(
        '/addAdmin',
        'GET',
        {
          userId: this.userId,
          groupId: this.groupId,
        },
      ).then(res=>{
        return res.code;
      })

      if (verifyRequest(verifyCode)) {
        Taro.atMessage({
          message: '添加管理员成功',
          type: 'success',
        })
        Taro.reLaunch({
          url: '../myChannel/myChannel',
        })
      } else if (verifyCode===50002){
        Taro.atMessage({
          message: '用户不在本群组或已成为管理员',
          type: 'warning',
        })
      }
    },
  },
  async onLoad() {
    let groupId = Taro.getStorageSync('groupId');
    // Taro.removeStorageSync('groupId');
    let myGroupDetailData = await request(
      '/getGroupDetail',
      'GET',
      { groupId: groupId },
    );
    this.myGroupDetailData = myGroupDetailData;
    this.myGroupDetail = myGroupDetailData.data;
    let isAdminVerify = await request(
      '/getMyRole',
      'GET',
      { groupId: groupId },
    ).then(res=>{
      return res.data;
    })
    this.isAdminVerify = isAdminVerify;

    if( isAdminVerify === true ) {
      let myFriendCode = await request(
        '/getFriendCode',
        'GET',
        { groupId: groupId },
      )
      this.myFriendCode = myFriendCode;
      this.groupId = groupId;
    }
  },
}
</script>
