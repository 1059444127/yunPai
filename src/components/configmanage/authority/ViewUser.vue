<template>
  <div class="view-user"
        v-show="show"
        @scroll.prevent>

    <div class="view-user-content">
        <div class="view-dialog">
            <div class="dialog-title">
                <span class="line"></span>{{dialogTitle}}
                <span class="close-dialog" @click="closeDialog()"><i class="el-icon-close"></i></span>
            </div>
            <div class="dialog-content" id="dialog-content" @scroll.prevent>
                <div class="dialog-info">
                    <div class="dialog-info-title">{{const_list.FormTitle.BasicInfo}}</div>
                    <div class="dialog-info-content">
                        <div class="dialog-userinfo-photo">
                            <div class="user-photo-out">
                                <img class="user-photo" v-show="showInitialPhoto" src="./../../../assets/image/common_user_photo_none.png"/>
                                <img class="user-photo" v-show="showLoadPhoto" ref="userPhoto" :src="infoModel.photo"/>
                            </div>
                        </div>
                        <div class="dialog-userinfo-content">
                            <div class="info-row">
                                <span class="info-item-title">{{const_list.FormTitle.ID}}</span>
                                <span class="info-item-content w-342">{{infoModel.id}}</span>
                            </div>
                            <div class="info-row">
                                <span class="info-item-title">{{const_list.FormTitle.UserName}}</span>
                                <span class="info-item-content w-140">{{infoModel.userName}}</span>
                                <span class="info-item-title">{{const_list.FormTitle.Sex}}</span>
                                <span class="info-item-content w-120">{{infoModel.sexText}}</span>
                                <span class="info-item-title ml-20">{{const_list.FormTitle.Birthday}}</span>
                                <span class="info-item-content w-120">{{infoModel.birthday}}</span>
                            </div>
                            <div class="info-row">
                                <span class="info-item-title">{{const_list.FormTitle.IdCard}}</span>
                                <span class="info-item-content w-342">{{infoModel.identityCardNum}}</span>
                                <span class="info-item-title ml-20">{{const_list.FormTitle.Tel}}</span>
                                <span class="info-item-content w-130">{{infoModel.telPhone}}</span>
                            </div>
                            <div class="info-row">
                                <span class="info-item-title">{{const_list.FormTitle.Job}}</span>
                                <span class="info-item-content w-140">{{infoModel.job}}</span>
                                <span class="info-item-title">{{const_list.FormTitle.JobTitle}}</span>
                                <span class="info-item-content w-140">{{infoModel.title}}</span>
                                <span class="info-item-title">{{const_list.FormTitle.Education}}</span>
                                <span class="info-item-content w-130">{{infoModel.education}}</span>
                            </div>
                            <div class="info-row">
                                <span class="info-item-title">{{const_list.FormTitle.DeptName}}</span>
                                <span class="info-item-content w-140">{{infoModel.deptName}}</span>
                                <span class="info-item-title">{{const_list.FormTitle.HCOStaffCode}}</span>
                                <span class="info-item-content w-140">{{infoModel.HCOStaffCode}}</span>
                            </div>
                            <div class="info-div">
                                <span class="info-item-title">{{const_list.FormTitle.Description}}</span>
                                <div class="info-item-content ml-80 w-584">{{infoModel.description}}</div>
                            </div>
                            <div class="input-div">
                                <span class="info-item-title">{{const_list.FormTitle.Signature}}</span>
                                <img class="user-signature" v-show="showLoadSignature" :src="infoModel.signature"/>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="dialog-info">
                    <div class="dialog-info-title">{{const_list.FormTitle.UserRight}}</div>
                    <div class="dialog-info-content">
                      <div class="info-row">
                        <span class="info-item-title">{{const_list.FormTitle.LoginName}}</span>
                        <span class="info-item-content w-140">{{infoModel.loginName}}</span>
                        <span class="info-item-title ml-50">{{const_list.FormTitle.Password}}</span>
                        <span class="info-item-content w-140">{{"******"}}</span>
                        <span class="info-item-title ml-50">{{const_list.FormTitle.Phone}}</span>
                        <span class="info-item-content w-140">{{infoModel.phone}}</span>
                      </div>
                      <div class="info-div">
                        <span class="info-item-title">{{const_list.FormTitle.Email}}</span>
                        <span class="info-item-content w-140">{{infoModel.email}}</span>
                        <span class="info-item-title ml-50">{{const_list.FormTitle.StaffCode}}</span>
                        <span class="info-item-content w-412">{{infoModel.rolesText}}</span>
                      </div>
                    </div>
                </div>
            </div>
            <div class="dialog-btn-div">
              <el-button class="btn-cancel my-default-btn" @click="closeDialog()">取消</el-button>
              <el-button class="btn-submit my-submit-btn" @click="modifyUserInfo()">修改</el-button>
            </div>
        </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop, Watch } from "vue-property-decorator";
import ConstList from "./../../../utils/ConstList";
import store from "./../../../vuex/store";
import * as types from "./../../../vuex/types";
import * as apiConfig from "./../../../api/config";
import ValidateInfo from "./../../../utils/ValidateInfo";

@Component
export default class ViewUser extends Vue {
  dialogTitle: string = "查看用户信息";
  rollInHospitalShow: boolean = false;
  showInitialPhoto: boolean = false;
  showLoadPhoto: boolean = false;
  showLoadSignature: boolean = false;
  const_list = ConstList.ConfigManage;

  @Prop() currecordid: string;

  // 转诊信息结构体
  infoModel = {};

  // 初次创建初始化
  Init() {
    this.showInitialPhoto = false;
    this.showLoadPhoto = false;
    this.showLoadSignature = false;
    this.infoModel = {};
    this.getMTPSUserInfo();
  }

  mounted() {}

  //查询用户信息
  getMTPSUserInfo() {
    const _this = this;

    if (_this.currecordid === "") return;

    var requestModel: {} = {
      id: _this.currecordid
    };

    Vue.prototype.$http
      .post(apiConfig.API.getMTPSUserInfo, requestModel)
      .then(function(response: any) {
        if (response.data.code === 0) {
          _this.infoModel = response.data.data;
          if (response.data.data.photo === null) {
            _this.showInitialPhoto = true;
          } else {
            _this.showLoadPhoto = true;
          }

          if (response.data.data.signature === null) {
            _this.showLoadSignature = false;
          } else {
            _this.showLoadSignature = true;
          }
        } else if (response.data.code === apiConfig.MESSAGECODE.ERROR) {
          _this.alert(response.data.message, "error");
        } else if (response.data.code === apiConfig.MESSAGECODE.TIMEOUT) {
          store.commit(types.LOGOUT);
          _this.$router.push({ path: "/" });
        } else if (
          response.data.code === apiConfig.MESSAGECODE.LACKOFAUTHORITY
        ) {
          _this.alert(ValidateInfo.LackOfAuthority, "error");
        } else {
          _this.alert(ValidateInfo.GetInfoError, "error");
        }
      })
      .catch(function(error: any) {
        console.log(error);
      });
  }

  //跳转到修改窗口
  modifyUserInfo() {
    this.$emit("to-modify", "");
  }

  @Prop() show: boolean;
  showStatus: boolean = this.show;

  // 滚动条回到顶部
  scrollToTop() {
    var scrollContainer = this.$el.querySelector("#dialog-content");
    if (scrollContainer !== null) {
      scrollContainer.scrollTop = 0;
    }
  }

  closeDialog() {
    this.show = false;
    this.scrollToTop();
  }

  @Watch("show", { immediate: true })
  showChange(val: boolean) {
    this.showStatus = val;
    if (val) {
      this.Init();
    }
  }

  @Watch("showStatus", { immediate: true })
  showStatusChange(val: boolean) {
    this.$emit("show-statue-change", val);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "./../../../assets/style/dialog.scss";
.view-user {
  position: fixed;
  z-index: 9;
  background: rgba(0, 0, 0, 0.5);
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  color: #999;
  line-height: 24px;
  font-size: 14px;

  .confirm-info {
    color: #333;
  }

  .el-input__inner {
    padding: 0 !important;
  }

  .view-user-content {
    width: 920px;
    margin: 120px auto;
    height: calc(100% - 240px);

    .dialog-userinfo-photo {
      float: left;
      width: 130px;
      margin-right: 20px;
      text-align: center;

      .user-photo-out {
        display: table-cell;
        width: 130px;
        height: 130px;
        margin: 0 auto;
        text-align: center;
        vertical-align: middle;

        .user-photo {
          max-width: 130px;
          max-height: 130px;
          width:130px;
          height:130px;
          border-radius: 50%;
        }
      }
    }

    .dialog-userinfo-content {
      float: left;
      width: calc(100% - 150px);

      .user-signature {
        float: left;
        height: 30px;
        width: 100px;
        margin: 5px 0;
      }
    }
  }
}
.w-342 {
  width: 342px;
}
.w-584 {
  width: 584px;
}
</style>
