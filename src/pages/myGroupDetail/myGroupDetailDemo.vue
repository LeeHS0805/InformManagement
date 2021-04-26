<template>
  <view class="myGroupDetailContainer">
     <!-- 群组封面 在最上面 -->
     <view class="groupDetailBanner" v-for="items in myGroupDetail" :key="items.groupId">
       <!--   -->
       <image class="bannerContainer" :src="getImgUrl(items)"></image>
       <!--   -->
     </view>
     <!-- 群组名 + 创建人 + 创建人学号 + 创建日期 圆角框  -->
     <view class="basicInfomations">
       <!-- 群组名 -->
       <view class="groupDetailName ellipsis-2">
         {{myGroupDetail[0].name}}
         
       </view>
       <!-- 其他基本群组信息 一个长方形框 略带圆角 -->
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
            <view v-for="admin in myGroupDetail[0].admins" :key="admin">{{admin}}</view>
            
          </view>
        </view>
        <!-- 群组成员 -->
        <view class="groupMembers ellipsis-3">
          <text class="tagNameBtm">群组成员</text>
          <view class="groupMembersContainer">
            <view v-for="member in myGroupDetail[0].admins" :key="member"> {{member}}</view>
          </view>
        </view>
        <!-- 管理员权限 条件渲染 来一个浮动弹层-->
          <view class="fabContainer">
            <AtFab :onClick="onButtonClick">
              <!--  -->
              <text>管理员</text>
            </AtFab>
          </view>
            <AtFloatLayout 
              title="我管理的群组" 
              :isOpened="setIsOpened"
              :onClose="handleClose"
            >
              
              <!-- 渲染我管理的群 -->
            <view class="myAdminGroupId">
                <view class="myAdminGroupItems" v-for="items in myAdminGroupList" :key="items.groupId" @tap="addAdminWithGroupId(items.groupId)">
                  <view class="adminGroupIdItems">
                    {{items.groupId}}
                  </view>
                  <view class="adminGroupNames">
                    {{items.name}}
                  </view>
                  <view class="addAdmin">
                     <AtIcon value='add-circle' size='30' color='#7f8c8d' class="iconFontAdminList" :onClick="addAdmins"></AtIcon>
                  </view>
              </view>
               
              
            </view>
            <view class="addAdmins">
               <AtModal :isOpened="addAdminIsOpened" :onClose="handleClose">
                    <AtModalHeader>为群组添加管理员</AtModalHeader>
                    <AtModalContent>
                      <AtInput
                          name='userId'
                          title='学号'
                          type='number'
                          placeholder='请输入新增管理员的学号'
                          :value="userId"
                          :onChange="handleInputuserId"
                      />
                    </AtModalContent>
                    <AtModalAction> 
                      <AtButton :onClick="handleCancel">取消</AtButton> 
                      <AtButton :onClick="handleConfirm">确定</AtButton> 
                    </AtModalAction>
                  </AtModal>
            </view>
            </AtFloatLayout>
          
         
      </view>
    
  </view>
</template>
<script>


import './myGroupDetail.scss';
import Taro from '@tarojs/taro';
import request from '../../utills/request';
import { AtFloatLayout, AtIcon, AtFab, AtModal, AtModalHeader, AtModalContent, AtModalAction, AtButton, AtInput, AtForm } from 'taro-ui-vue';


export default {
  data() {
    return {
      groupId: 0,
      userId: '',
      myAdminGroupList: [],
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
      addAdminIsOpened: false,
    }
  },
 
  components: {
    AtFloatLayout,
    AtIcon,
    AtFab,
    AtModal, 
    AtModalHeader, 
    AtModalContent, 
    AtModalAction,
    AtButton,
    AtInput, 
    AtForm
  },
  methods: {
    getImgUrl(items){
      var url = 'http://49.232.223.89:50030/'+items.avatarImg;
      return url;
    },  
    handleClose() {
      this.setIsOpened = false;
      this.addAdminIsOpened = false;
      console.log('handleClose_setIsOpened',this.setIsOpened);
      console.log('handleClose_addAdminIsOpened',this.addAdminIsOpened);
    }, 
    handleCancel() {
      this.addAdminIsOpened = false;
      console.log('handleClose_addAdminIsOpened',this.addAdminIsOpened);
    },
    
    handleInputuserId(res_userId) {
      this.userId = res_userId;
    },
    addAdminWithGroupId(e) {
      console.log('addAdminWithGroupId-e',e);
      return e;
    },
    handleConfirm() {
      console.log("假添加管理员");
     
      this.addAdminIsOpened = false;
      let newAdminGroupId = addAdminWithGroupId(e);
      
      console.log(newAdminGroupId);
    },
    async onButtonClick(e) {
      this.setIsOpened = true;
      console.log('onButtonClick',this.setIsOpened);
      let myAdminGroupList = await request('/getMyAdminGroup').then(r=>{
        return r.data;
      });
      this.myAdminGroupList = myAdminGroupList;
      console.log('myAdminGroupList',myAdminGroupList);
    },
    // async
    addAdmins(e) {
        this.addAdminIsOpened = true;
        console.log('addAdmins',this.addAdminIsOpened);
        console.log("试一试");

        console.log(this.myAdminGroupList);
        // console.log(this.myAdminGroupList[0].groupId);
        
      // let test = await request(
      //   '/addAdmin',

      //   ).then(res=>{
      //   return res;
      // })
      // console.log(res);
    }
  },
  async onLoad() {
    let groupId = Taro.getStorageSync('groupId');
    console.log('onLoad',groupId);
    Taro.removeStorageSync('groupId');
    let myGroupDetailData = await request(
        '/getGroupDetail',
        'GET',
        { groupId: groupId },
    );
    this.myGroupDetailData = myGroupDetailData;
    this.myGroupDetail = myGroupDetailData.data;
  },
  onShow() {
    
  },

 

  created() {
   

  },
  mounted() {
  
  }
}
</script>
