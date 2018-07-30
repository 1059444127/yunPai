<template>
  <div class="dialog-page"
      v-show="show"
      @scroll.prevent>

    <div class="main-content">
       <div class="view-dialog">
          <div class="dialog-title">
            <span class="line"></span>{{dialogTitle}}
            <span class="close-dialog" @click="closeDialog()"><i class="el-icon-close"></i></span>
          </div>
            <div class="dialog-content" id="dialog-content">
              <el-form clearValidate  :model="infoModel" :rules="rules" ref="infoModel" >
                <div class="dialog-info">
                  <div class="input-row">
                    <span class="info-item-title">{{const_list.FormTitle.MediaName}}</span>
                    <el-form-item  prop="mediaName" class="info-item-input w-375">
                      <el-input   v-model="infoModel.mediaName" v-focus="foc" @blur="foc=false" prop size="small" maxlength="50"></el-input>
                    </el-form-item>
                    <span class="required-item"></span>
                  </div>
                  <div class="input-row">
                    <span class="info-item-title">{{const_list.FormTitle.MediaType}}</span>
                    <el-form-item prop="mediaType" class="info-item-input w-375">
                      <el-select  v-model="infoModel.mediaType"
                                  class="info-item-input w-375"
                        size="small"
                        placeholder="请选择">
                        <el-option
                          v-for="item in options"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value">
                        </el-option>
                      </el-select>
                    </el-form-item>
                    <span class="required-item"></span>
                  </div>
                  <div class="input-row">
                    <span class="info-item-title">{{const_list.FormTitle.MediaHostAddress}}</span>
                    <el-form-item  prop="hostAddress" class="info-item-input w-375">
                      <el-input   v-model="infoModel.hostAddress" size="small" maxlength="50"></el-input>
                    </el-form-item>
                    <span class="required-item"></span>
                  </div>
                  <div class="input-row">
                    <span class="info-item-title">{{const_list.FormTitle.MediaPort}}</span>
                    <el-input  class="info-item-input w-375"  v-model="infoModel.port" size="small" maxlength="50"></el-input>
                  </div>
                  <div class="input-row">
                    <span class="info-item-title">{{const_list.FormTitle.MediaUsername}}</span>
                    <el-input  class="info-item-input w-375" v-model="infoModel.userName" size="small" maxlength="50"></el-input>
                  </div>
                    <div class="input-row">
                      <span class="info-item-title">{{const_list.FormTitle.MediaPassword}}</span>
                      <el-input  class="info-item-input w-375"  v-model="infoModel.userPWD" size="small" maxlength="50"></el-input>
                    </div>
              </div>
              </el-form>
            </div>
                <div class="dialog-btn-div">
                <el-button class="my-default-btn cancel-btn" @click="closeDialog()">取消</el-button>
                <el-button class="my-submit-btn submit-btn" v-show="!isModifyData" :disabled="subBtnDisabled" @click="createMedia()">提交</el-button>
                <el-button class="my-submit-btn submit-btn" v-show="isModifyData" :disabled="subBtnDisabled" @click="modifyMedia()">保存</el-button>
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
export default class CreateMedia extends Vue {
  dialogTitle: string = "";
  subBtnDisabled: boolean = false;
  const_list = ConstList.ConfigManage;
  isModifyData: boolean = false;
  foc: boolean = true;

  @Prop() currecordid: string = "";
  @Prop() show: boolean;
  @Prop() options: {}[];
  showStatus: boolean = this.show;

  rules = {
    mediaName: { required: true, message: "请输入名称", trigger: "blur" },
    mediaType: { required: true, message: "请选择媒质类型", trigger: "change" },
    hostAddress: { required: true, message: "请输入主机地址", trigger: "blur" }
  };

  // 信息结构体
  infoModel = {
    mediaName: "",
    mediaType: "",
    hostAddress: "",
    port: "",
    userName: "",
    userPWD: ""
  };

  // 初次创建初始化
  Init() {
    var form = this.$refs["infoModel"] as any;
    if (form != null) {
      form.clearValidate();
    }
    this.dialogTitle = "新增存储媒质";
    this.infoModel = {
      mediaName: "",
      mediaType: "",
      hostAddress: "",
      port: "",
      userName: "",
      userPWD: ""
    };

    this.isModifyData = false;
    this.subBtnDisabled = false;

    if (this.currecordid !== "") {
      this.dialogTitle = "修改存储媒质";
      this.isModifyData = true;
      this.searchMedia();
    }
  }

  // 新建医联体
  createMedia() {
    var flag = false;
    (this.$refs["infoModel"] as any).validate((valid: boolean) => {
      flag = valid;
    });
    if (!flag) {
      return;
    }
    const _this = this;
    _this.subBtnDisabled = true;
    Vue.prototype.$http
      .post(apiConfig.API.createMedia, _this.infoModel)
      .then(function(response: any) {
        if (response.data.code === 0) {
          _this.alert(ValidateInfo.CreateSuccess, "success");
          _this.closeDialog();
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
          _this.alert(ValidateInfo.CreateError, "error");
        }
        _this.subBtnDisabled = false;
      })
      .catch(function(error: any) {
        _this.subBtnDisabled = false;
        console.log(error);
      });
  }

  // 修改医联体信息
  modifyMedia() {
    var flag = false;
    (this.$refs["infoModel"] as any).validate((valid: boolean) => {
      flag = valid;
    });
    if (!flag) {
      return;
    }
    const _this = this;

    var requestModel: {} = {
      filter: {
        ID: _this.currecordid
      },
      record: {
        mediaName: _this.infoModel.mediaName,
        mediaType: _this.infoModel.mediaType,
        hostAddress: _this.infoModel.hostAddress,
        port: _this.infoModel.port,
        userName: _this.infoModel.userName,
        userPWD: _this.infoModel.userPWD
      }
    };
    _this.subBtnDisabled = true;
    Vue.prototype.$http
      .post(apiConfig.API.modifyMedia, requestModel)
      .then(function(response: any) {
        if (response.data.code === 0) {
          _this.alert(ValidateInfo.ModifySuccess, "success");
          _this.closeDialog();
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
          _this.alert(ValidateInfo.ModifyError, "error");
        }
        _this.subBtnDisabled = false;
      })
      .catch(function(error: any) {
        _this.subBtnDisabled = false;
        console.log(error);
      });
  }

  // 获取医联体信息
  searchMedia() {
    const _this = this;

    var requestModel: {} = {
      id: _this.currecordid
    };

    Vue.prototype.$http
      .post(apiConfig.API.searchMedia, requestModel)
      .then(function(response: any) {
        if (response.data.code === 0) {
          _this.infoModel = response.data.data[0];
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
        _this.subBtnDisabled = false;
      })
      .catch(function(error: any) {
        _this.subBtnDisabled = false;
        console.log(error);
      });
  }

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
    this.foc = val;
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
.dialog-page {
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

  .main-content {
    width: 550px;
    height: 380px;
    position: absolute;
    top: 50%;
    margin-top: -160px;
    left: 50%;
    margin-left: -275px;
  }
}
</style>
