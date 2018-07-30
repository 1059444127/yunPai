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
                                <img class="user-photo" v-show="showInitialPhoto" src="./../../../assets/image/common_hco_logo_none.png"/>
                                <img class="user-photo" v-show="showLoadPhoto" ref="userPhoto" :src="infoModel.logo"/>
                            </div>
                        </div>
                        <div class="dialog-userinfo-content">
                            <div class="info-row">
                                <span class="info-item-title">{{const_list.FormTitle.HCOTitle}}</span>
                                <span class="info-item-content w-492">{{infoModel.HCOName}}</span>
                            </div>
                            <div class="info-row">
                                <span class="info-item-title">{{const_list.FormTitle.HCOCode}}</span>
                                <span class="info-item-content w-492">{{infoModel.HCOCode}}</span>
                            </div>
                            <div class="info-row">
                                <span class="info-item-title">{{const_list.FormTitle.AddressLevel}}</span>
                                <span class="info-item-content w-180">{{infoModel.hospitalClass4Text}}</span>
                                <span class="info-item-title ml-50">{{const_list.FormTitle.HCONature}}</span>
                                <span class="info-item-content w-180">{{infoModel.hospitalClass3Text}}</span>
                            </div>
                            <div class="info-row">
                                <span class="info-item-title">{{const_list.FormTitle.HCOType}}</span>
                                <span class="info-item-content w-180">{{infoModel.HCOType}}</span>
                                <span class="info-item-title ml-50">{{const_list.FormTitle.HCOLevel}}</span>
                                <span class="info-item-content w-180">{{infoModel.hospitalClassText}}</span>

                            </div>
                            <div class="info-row">
                              <span class="info-item-title">{{const_list.FormTitle.ParentHCO}}</span>
                              <span class="info-item-content w-180">{{infoModel.parentHCOName}}</span>
                              <span class="info-item-title ml-50">{{const_list.FormTitle.Director}}</span>
                              <span class="info-item-content w-180">{{infoModel.responsiblePersonName}}</span>
                            </div>
                            <div class="info-row">

                                <span class="info-item-title">{{const_list.FormTitle.Contacts}}</span>
                                <span class="info-item-content w-180">{{infoModel.contactName}}</span>
                                <span class="info-item-title ml-50">{{const_list.FormTitle.ContactsTel}}</span>
                                <span class="info-item-content w-180">{{infoModel.contactPhone}}</span>
                            </div>
                            <div class="info-row">
                                <span class="info-item-title">{{const_list.FormTitle.Location}}</span>
                                <span class="info-item-content w-492">{{infoModel.address}}</span>
                            </div>
                            <div class="info-div">
                                <span class="info-item-title">{{const_list.FormTitle.HCODescribe}}</span>
                                <div class="info-item-content w-492 ml-80">{{infoModel.remarks}}</div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
          <div class="dialog-btn-div">
            <el-button class="my-default-btn cancel-btn" @click="closeDialog()">取消</el-button>
            <el-button class="my-submit-btn submit-btn" v-show="modifyHCORight?true:modifyOwnHCORight(infoModel.HCOCode)" @click="modifyHCO()">修改</el-button>
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
import MTPSManageRights from "./../../../utils/MTPSManageRights";
import ValidateInfo from "./../../../utils/ValidateInfo";

@Component
export default class ViewHCO extends Vue {
  dialogTitle: string = "查看机构信息";
  showInitialPhoto: boolean = false;
  showLoadPhoto: boolean = false;
  const_list = ConstList.ConfigManage;

  // 功能权限点标记
  modifyHCORight: boolean = MTPSManageRights.ModifyHCO();
  modifyOwnHCORight(code: string): boolean {
    return MTPSManageRights.ModifyOwnHCO(code);
  }

  @Prop() currecordid: string;

  // 转诊信息结构体
  infoModel = {};

  // 初次创建初始化
  Init() {
    this.showInitialPhoto = false;
    this.showLoadPhoto = false;
    this.infoModel = {};
    this.searchHealthCareOrganization();
  }

  mounted() {}

  //查询机构信息
  searchHealthCareOrganization() {
    const _this = this;

    if (_this.currecordid === "") return;

    var requestModel: {} = {
      id: _this.currecordid
    };

    Vue.prototype.$http
      .post(apiConfig.API.searchHealthCareOrganization, requestModel)
      .then(function(response: any) {
        if (response.data.code === 0) {
          _this.infoModel = response.data.data[0];
          if (
            response.data.data[0].logo === null ||
            response.data.data[0].logo === ""
          ) {
            _this.showInitialPhoto = true;
          } else {
            _this.showLoadPhoto = true;
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
  modifyHCO() {
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

      .upload-photo-btn {
        margin-top: 15px;
      }
    }

    .dialog-userinfo-content {
      float: left;
      width: calc(100% - 150px);

      .down-userinfo {
        display: inline-block;
        height: 26px;
        width: 20px;
        background: url("./../../../assets/image/common_icon_downinfo.png")
          no-repeat center 2px;
        background-size: 20px 20px;
        margin-left: 6px;
      }
    }
  }
  .w-342 {
    width: 342px;
  }
  .w-492 {
    width: 492px;
  }
}
</style>
