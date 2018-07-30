<template>
  <div class="create-medical"
       v-show="show"
       @scroll.prevent>

    <div class="create-medical-content" >
      <div class="view-dialog">
        <div class="dialog-title">
          <span class="line"></span>基本信息
          <span class="close-dialog" @click="closeDialog()"><i class="el-icon-close"></i></span>
        </div>
        <div class="dialog-content" id="dialog-content" @scroll.prevent>

          <div class="dialog-info">

            <div class="dialog-info-content">
              <el-form clearValidate :model="infoModel" :rules="rules" ref="infoModel">
                <div class="left-panl">
                    <div class="input-row">
                      <span class="info-item-title">身份证号码：</span>
                      <el-form-item prop="identityCardNo" class="info-item-input w-422">
                        <el-input  v-focus="foc" @blur="foc=false" v-model="infoModel.identityCardNo" size="small" placeholder="请输入身份证号码"></el-input>
                      </el-form-item>
                      <span class="required-item"></span>
                    </div>
                    <div class="input-row">
                      <span class="info-item-title">姓名：</span>
                      <el-form-item prop="name" class="info-item-input w-150">
                        <el-input  v-model="infoModel.name" maxlength="15" size="small" placeholder="请输入姓名"></el-input>
                      </el-form-item>
                      <span class="required-item"></span>
                      <span class="info-item-title ml-10">性别：</span>
                      <el-form-item prop="sex" class="info-item-input w-150">
                        <el-select clearable v-model="infoModel.sex" size="small" placeholder="请选择">
                          <el-option
                            v-for="item in sexOptList"
                            :key="item.key"
                            :label="item.value"
                            :value="item.key">
                          </el-option>
                        </el-select>
                      </el-form-item>
                      <span class="required-item"></span>
                    </div>
                    <div class="input-row">
                      <span class="info-item-title">社保号：</span>
                      <el-input v-model="infoModel.insuranceCardID" maxlength="45" class="info-item-input w-422" size="small" placeholder="请输入社保号"></el-input>
                    </div>
                    <div class="input-row">
                      <span class="info-item-title">出生日期：</span>
                      <el-form-item prop="dateOfBirth" class="info-item-input w-150">
                        <el-date-picker
                          v-model="infoModel.dateOfBirth"
                          type="date"
                          placeholder="选择日期"
                          :clearable="false"
                          class="info-item-input w-150"
                          size="small">
                        </el-date-picker>
                      </el-form-item>
                      <span class="required-item"></span>
                      <span class="info-item-title ml-10">联系电话：</span>
                      <el-input v-model="infoModel.patientPhone" maxlength="20" class="info-item-input w-150" size="small" placeholder="请输入联系电话"></el-input>
                    </div>
                    <div class="input-row">
                      <span class="info-item-title">联系地址：</span>
                      <el-input v-model="infoModel.patientAddress" maxlength="100" class="info-item-input w-422" size="small" placeholder="请输入联系地址"></el-input>
                    </div>
                </div>
                <div class="right-panl">
                  <div class="user-photo-out">
                    <img class="user-photo" v-show="showInitialPhoto" src="./../../assets/image/common_user_photo_none.png"/>
                    <img class="user-photo" v-show="showLoadPhoto" ref="userPhoto" :src="infoModel.photo"/>
                  </div>
                  <input type="file" v-show="false" ref="photoUpload" v-on:change="uploadPhoto"/>
                  <el-button class="btn-submit my-submit-btn upload-photo-btn" size="mini" @click="uploadPhotoBtnClick()">添加照片</el-button>
                </div>
                <div class="input-div">
                  <span class="info-item-title">过敏史：</span>
                  <el-input class="info-item-textarea w-694"
                            v-model="infoModel.allergyHistory"
                            placeholder="请输入过敏史"
                            type="textarea"
                            size="small"
                            resize="none"
                            maxlength="250"
                            rows="4">
                  </el-input>
                </div>
                <div class="input-div">
                  <span class="info-item-title">既往史：</span>
                  <el-input class="info-item-textarea w-694"
                            v-model="infoModel.pastHistory"
                            placeholder="请输入既往史"
                            type="textarea"
                            size="small"
                            resize="none"
                            maxlength="250"
                            rows="4">
                  </el-input>
                </div>
                <div class="input-div">
                  <span class="info-item-title">家族史：</span>
                  <el-input class="info-item-textarea w-694"
                            v-model="infoModel.familyHistory"
                            placeholder="请输入家族史"
                            type="textarea"
                            size="small"
                            resize="none"
                            maxlength="250"
                            rows="4">
                  </el-input>
                <div class="input-div">
                  <span class="info-item-title">个人史：</span>
                  <el-input class="info-item-textarea w-694"
                            v-model="infoModel.personalHistory"
                            placeholder="请输入个人史"
                            type="textarea"
                            size="small"
                            resize="none"
                            maxlength="250"
                            rows="4">
                  </el-input>
                </div>
                </div>
              </el-form>
            </div>

          </div>
        </div>
        <div class="dialog-btn-div">
          <el-button class="my-default-btn cancel-btn" @click="closeDialog()">取消</el-button>
          <el-button :disabled="subBtnDisabled" class="btn-submit my-submit-btn" @click="save()">保存</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop, Watch } from "vue-property-decorator";
import ConstList from "../../utils/ConstList";
import store from "../../vuex/store";
import * as types from "../../vuex/types";
import * as apiConfig from "../../api/config";
import ValidateInfo from "./../../utils/ValidateInfo";
import ValidateRules from "./../../utils/ValidateRules";

@Component
export default class CreatePersonMasterForm extends Vue {
  infoModel: any = {};
  showInitialPhoto: boolean = false;
  showLoadPhoto: boolean = false;
  subBtnDisabled: boolean = false;
  //性别字典
  sexOptList: {}[] = [];

  @Prop() show: boolean = false;
  @Prop() isCreate: boolean = false;
  @Prop() curIdentityCardNo: string = "";

  mounted() {
    this.getDict();
  }

  Init() {
    var form = this.$refs["infoModel"] as any;
    if (form != null) {
      form.clearValidate();
    }

    this.infoModel = {};
    this.showInitialPhoto = false;
    this.showLoadPhoto = false;
    this.subBtnDisabled = false;
    (this.$refs.photoUpload as any).value = "";
    if (!this.isCreate) {
      this.getDetailInfo();
    } else {
      this.showInitialPhoto = true;
    }
  }

  rules = {
    name: { required: true, message: "请输入姓名", trigger: "blur" },
    sex: { required: true, message: "请选择性别", trigger: "change" },
    identityCardNo: { validator: ValidateRules.IDCardNo, trigger: "blur" },
    dateOfBirth: {
      required: true,
      message: "请输入出生日期",
      trigger: "change"
    }
  };

  // 点击添加照片按钮
  uploadPhotoBtnClick() {
    (this.$refs.photoUpload as any).click();
  }

  // 添加照片
  uploadPhoto() {
    var _this = this;
    var file = (this.$refs.photoUpload as any).files[0];
    var reader = new FileReader();
    reader.readAsDataURL(file); //调用自带方法进行转换
    reader.onload = function(e) {
      (_this.$refs.userPhoto as any).src = this.result;
      _this.infoModel.photo = this.result;
      _this.showLoadPhoto = true;
      _this.showInitialPhoto = false;
    };
  }

  getDetailInfo() {
    if (this.curIdentityCardNo === "") {
      this.showInitialPhoto = true;
      return;
    }

    const _this = this;

    var requestModel = {
      identityCardNo: _this.curIdentityCardNo
    };

    Vue.prototype.$http
      .post(apiConfig.API.searchPersonMasterIndexDetail, requestModel)
      .then(function(response: any) {
        if (response.data.code === 0 && response.data.data != null) {
          _this.infoModel = response.data.data;
          if (
            (_this.infoModel as any).photo === null ||
            !(_this.infoModel as any).photo
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
          console.log(response.data.code + ":" + response.data.message);
        }
      })
      .catch(function(error: any) {
        console.log(error);
      });
  }

  //保存
  save() {
    var flag = false;
    (this.$refs["infoModel"] as any).validate((valid: boolean) => {
      flag = valid;
    });
    if (!flag) {
      return;
    }

    const _this = this;
    this.subBtnDisabled = true;
    var requestModel = _this.infoModel;
    var url = apiConfig.API.createPersonMasterIndex;
    if (!_this.isCreate) {
      requestModel = {
        filter: {
          id: _this.infoModel.id
        },
        record: _this.infoModel
      };
      url = apiConfig.API.modifyPersonMasterIndex;
    }

    Vue.prototype.$http
      .post(url, requestModel)
      .then(function(response: any) {
        if (response.data.code === 0) {
          if (_this.isCreate) {
            _this.alert(ValidateInfo.CreateSuccess, "success");
          } else {
            _this.alert(ValidateInfo.ModifySuccess, "success");
          }

          // 确保是在网站的根目录下打开
          var rootPath = window.location.href.split("#")[0];
          _this.$router.push({
            path: `/medicaldata?identityCardNo=${
              _this.infoModel.identityCardNo
            }`
          });
          setTimeout(function() {
            _this.$router.go(0);
          }, 500);
          //_this.$emit("refresh", _this.infoModel.identityCardNo);
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
          if (_this.isCreate) {
            _this.alert(ValidateInfo.CreateError, "error");
          } else {
            _this.alert(ValidateInfo.ModifyError, "success");
          }
        }
        _this.subBtnDisabled = false;
      })
      .catch(function(error: any) {
        _this.subBtnDisabled = false;
        console.log(error);
      });
  }

  //获取字典
  getDict() {
    const _this = this;
    var reqList: string[] = ["Sex"];

    Vue.prototype.$http
      .post(apiConfig.API.getRefferralDict, reqList)
      .then(function(response: any) {
        if (response.data.code === 0) {
          const data = response.data.data;
          _this.sexOptList = data.sex;
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
          _this.alert(ValidateInfo.GetDictError, "error");
          console.log(response.data.code + ":" + response.data.message);
        }
      })
      .catch(function(error: any) {
        console.log(error);
      });
  }

  @Watch("show", { immediate: true })
  showStatusChange(val: boolean) {
    this.$emit("update:show", val);
    if (this.show) {
      this.Init();
    }
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
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../../assets/style/dialog.scss";
.create-medical {
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

  .create-medical-content {
    width: 910px;
    margin: 160px auto;
    height: calc(100% - 320px);

    .left-panl {
      float: left;
      width: calc(100% - 280px);
    }

    .right-panl {
      float: right;
      height: 200px;
      width: 280px;
      .user-photo-out {
        margin-left: 53px;
        width: 130px;
        height: 130px;
        .user-photo {
          width: 130px;
          height: 130px;
          border-radius: 50%;
        }
      }
      .upload-photo-btn {
        margin-top: 20px;
        margin-left: 70px;
      }
    }
    .input-div {
      float: left;
    }
    .el-input__inner {
      padding: 0 !important;
    }
    .info-item-title {
      width: 90px;
    }
    .input-div {
      .el-form-item {
        margin-left: 82px !important;
      }
    }
  }

  @media screen and (max-height: 768px) {
    .create-medical-content {
      width: 910px;
      margin: 50px auto;
      height: calc(100% - 100px);
    }
  }
}
</style>
