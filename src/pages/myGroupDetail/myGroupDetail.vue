<template>
  <view class="myGroupDetailContainer">
     <!-- 群组封面 在最上面 -->
     <view class="groupDetailBanner" v-for="items in myGroupDetail" :key="items.groupId">
       <image class="bannerContainer" :src="getImgUrl(items)"></image>
     </view>
     <!-- 群组名 + 创建人 + 创建人学号 + 创建日期 圆角框  -->
     <view class="basicInfomations">
       <!-- 群组名 -->
       <view class="groupDetailName ellipsis-2">
         {{myGroupDetail[0].name}}
         
       </view>
       <!-- 其他基本群组信息 -->
       <view class="groupDetailOthers">
         <view class="leftContainer">
           <!-- 创建人姓名 -->
            <AtIcon value='star' size='30' color='#7f8c8d' class="iconFontLeftTop"></AtIcon>
            <text class="tagName">创建人姓名</text>
            <view class="groupCreatorName">
              {{myGroupDetail[0].creatorName}}
            </view>
            <!-- 创建人学号 -->
             <AtIcon value='numbered-list' size='30' color='#7f8c8d' class="iconFontLeftBtm"></AtIcon>
            <text class="tagName">创建人学号</text>
            <view class="groupCreatorId">
              {{myGroupDetail[0].creator}}
              </view>
         </view>
         <view class="rightContainer">
           <!-- 创建日期 -->
            <AtIcon value='clock' size='30' color='#7f8c8d' class="iconFontRight"></AtIcon>
           <text class="tagName tagNameRight">创建日期</text>
           <view class="groupCreateTime">
             {{myGroupDetail[0].createTime}}
             </view>
         </view>
       </view>
      <!-- 群组管理员 -->
        <view class="groupAdmins">
          <text class="tagNameBtm">群组管理员</text>
          <view class="groupAdminsContainer">
            <view v-for="item in myGroupDetail[0].admins" :key="item">
              {{item.realName}}
            </view>
            
          </view>
        </view>
        <!-- 群组成员 -->
        <view class="groupMembers ellipsis-3">
          <text class="tagNameBtm">群组成员</text>
          <view class="groupMembersContainer">
            <view v-for="item in myGroupDetail[0].members" :key="item"> {{item.realName}}</view>
          </view>
        </view>
        <!-- 管理员权限 条件渲染 -->
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
        <!-- 渲染 查看邀请码 和 添加管理员 增加复制功能 -->
          <view class="addAdmins">
              <view class="getFriendCode">
                <text class="viewCode">我的邀请码</text>
                <text class="friendCode" selectable>{{myFriendCode.data}}</text>
              </view>
              <view class="addAdminId">
                <text class="adminId">添加新的管理员</text>
                <view class="userIdIpt">
                  <AtInput
                    name='userId'
                    title='学号'
                    type='number'
                    placeholder='请输入新增管理员的学号'
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
      console.log('handleClose_setIsOpened',this.setIsOpened);
    }, 
    
    handleInputuserId(res_userId) {
      this.userId = res_userId;
      console.log(this.userId);
    },
    
    onButtonClick() {
      this.setIsOpened = true;
      console.log('onButtonClick',this.setIsOpened);
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
      console.log(verifyCode);
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
          message: '用户已在权限列表',
          type: 'warning',
        }) 
      }
    },
  },
  async onLoad() {
    let groupId = Taro.getStorageSync('groupId');
    console.log('onLoad_groupId',groupId);
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
    console.log(isAdminVerify);
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
