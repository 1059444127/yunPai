<template>
  <div class="user-info"
       v-show="show">

    <div class="user-info-content">
      <div class="user-info-dialog">
        <div class="dialog-title">
          <span class="line"></span>用户中心
          <a href="javscript:void(0);" class="close-btn" @click="closeDialog()"><i class="el-icon-close"></i></a>
        </div>
        <div class="dialog-content" id="dialog-content">
          <el-form clearValidate :model="editModel" :rules="rules" ref="editModel">
           <div class="dialog-userinfo">
            <div class="dialog-userinfo-detail">
              <div class="dialog-userinfo-photo">
                <div v-show="!editShow"  class="user-photo-out">
                  <img class="user-photo"  v-show="showInitialPhoto" src="./../../assets/image/common_user_photo_none.png"/>
                  <img class="user-photo" v-show="showLoadPhoto" :src="infoModel.photo"/>
                </div>
                <div v-show="editShow" class="user-photo-out">
                  <img class="user-photo" v-show="showInitialPhoto" src="./../../assets/image/common_user_photo_none.png"/>
                  <img class="user-photo" v-show="showLoadPhoto" ref="userPhoto" :src="editModel.photo"/>
                </div>
                <input type="file" v-show="false" ref="photoUpload" v-on:change="uploadPhoto"/>
                <el-button v-show="editShow" class="btn-submit my-submit-btn upload-photo-btn" @click="uploadPhotoBtnClick()">修改头像</el-button>
              </div>
              <div class="dialog-userinfo-content">
                <div class="userinfo-row">
                  <div class="dialog-userinfo-title">{{infoModel.userName}}</div>
                </div>
                <div class="userinfo-row">
                  <span class="userinfo-item-title">{{const_user.Sex}}</span>
                  <span v-show="!editShow" class="confirm-info fixed-width">{{infoModel.sexText}}</span>
                  <el-select   v-show="editShow" clearable   class="fixed-width left"  v-model="aSex" size="small"  placeholder="请选择">
                    <el-option
                      v-for="item in sexOptList"
                      :key="item.key"
                      :label="item.value"
                      :value="item.key">
                    </el-option>
                  </el-select>
                  <span class="no-require-item"  v-show="editShow"></span>
                  <span class="fixed-margin-left userinfo-item-title">{{const_user.Birthday}}</span>
                  <span v-show="!editShow" class="confirm-info fixed-width">{{infoModel.birthday}}</span>

                    <el-date-picker v-show="editShow"
                      v-model="aBirthday"
                      type="date"
                      placeholder="选择日期"
                      :clearable="false" value-format="yyyy-MM-dd"
                      class="fixed-width left"
                      size="small">
                    </el-date-picker>
                  <span class="row-underline"></span>
                </div>
                <div class="userinfo-row">
                  <span class="userinfo-item-title">{{const_user.Job}}</span>
                  <span v-show="!editShow" class="confirm-info fixed-width">{{infoModel.job}}</span>
                  <el-form-item prop="job"  v-show="editShow" class="fixed-width left" >
                       <el-input maxlength="15" v-model="editModel.job" size="small"></el-input>
                  </el-form-item>
                  <span v-show="editShow" class="required-item"></span>
                  <span class="fixed-margin-left userinfo-item-title">{{const_user.JobTitle}}</span>
                  <span v-show="!editShow" class="confirm-info fixed-width">{{infoModel.title}}</span>
                  <el-input v-show="editShow" maxlength="15" class="fixed-width left" v-model="editModel.title" size="small"></el-input>
                  <span class="row-underline"></span>
                </div>
                <div class="userinfo-row">
                  <span class="userinfo-item-title">{{const_user.Phone}}</span>
                  <span v-show="!editShow" class="confirm-info fixed-width">{{infoModel.phone}}</span>
                  <el-form-item  v-show="editShow" prop="phone" class="fixed-width left">
                     <el-input maxlength="20" v-model="editModel.phone" size="small"></el-input>
                  </el-form-item>
                  <span v-show="editShow" class="required-item"></span>
                  <span class="fixed-margin-left userinfo-item-title">{{const_user.Education}}</span>
                  <span v-show="!editShow" class="confirm-info fixed-width">{{infoModel.education}}</span>
                  <el-input v-show="editShow" maxlength="15" class="fixed-width left" v-model="editModel.education" size="small"></el-input>
                  <span class="row-underline"></span>
                </div>
                <div class="userinfo-row">
                  <span class="userinfo-item-title">{{const_user.Email}}</span>
                  <span v-show="!editShow" class="confirm-info fixed-width">{{infoModel.email}}</span>
                  <el-input v-show="editShow" maxlength="30" class="fixed-width left" v-model="editModel.email" size="small"></el-input>
                  <span v-show="editShow" class="no-require-item"></span>
                  <span class="fixed-margin-left userinfo-item-title">{{const_user.Tel}}</span>
                  <span v-show="!editShow" class="confirm-info fixed-width">{{infoModel.telPhone}}</span>
                  <el-input v-show="editShow" maxlength="20" class="fixed-width left" v-model="editModel.telPhone" size="small"></el-input>
                  <span class="row-underline"></span>
                </div>
                <div class="userinfo-row">
                  <span class="userinfo-item-title">{{const_user.Address}}</span>
                  <span v-show="!editShow" class="confirm-info fixed-width-large">{{infoModel.addr}}</span>
                  <el-input v-show="editShow" maxlength="100" class="fixed-width-large left" v-model="editModel.addr" size="small"></el-input>
                  <span class="row-underline"></span>
                </div>
              </div>
            </div>
            <div class="dialog-userinfo-dec">
                  <div class="dec-title"><span class="icon-dec"></span>{{const_user.PersonDesc}} </div>
                  <div class="row-underline"></div>
                  <div v-show="!editShow" class="dec-info">{{infoModel.description}}</div>
                  <el-input v-show="editShow"
                            maxlength="250"
                            type="textarea"
                            class="attention left"
                            v-model="editModel.description"
                            size="mini"
                            resize="none"
                            rows="4">
                  </el-input>
                  <div class="dec-title" style="margin-top: 20px;"><span class="icon-goodat"></span>{{const_user.Specialty}}</div>
                  <div class="row-underline"></div>
                  <div v-show="!editShow" class="dec-info">{{infoModel.goodAt}}</div>
                  <el-input v-show="editShow"
                            maxlength="250"
                            type="textarea"
                            class="attention left"
                            v-model="editModel.goodAt"
                            size="mini"
                            resize="none"
                            rows="4">
                  </el-input>
            </div>
            <div class="signature-row">
                <span class="userinfo-item-title">{{const_user.Signature}}</span>
                <input type="file" v-show="false" ref="signatureUpload" v-on:change="uploadSignature"/>
                <!-- <img class="upload-signature-btn" v-show="!showLoadSignature" src="./../../../assets/image/common_upload_icon.png" @click="uploadSignatureBtnClick()"/> -->
                <el-button v-show="showLoadSignatureBtn" size="mini" class="btn-submit my-default-btn upload-signature-btn" @click="uploadSignatureBtnClick()">点击上传</el-button>
                <img class="user-signature"
                     v-show="showLoadSignature && editShow"
                     ref="userSignature"
                     title="点击重新上传"
                     @click="uploadSignatureBtnClick()"
                     :src="editModel.signature"/>
                <img class="user-signature"
                     v-show="showLoadSignature && !editShow"
                     :src="infoModel.signature"/>
            </div>
          </div>
          </el-form>
        </div>
        <div class="dialog-submit" v-show="!editShow">
          <el-button class="btn-submit my-submit-btn" v-show="modifyUserInfoRight" @click="goModify()">编辑</el-button>
          <el-button class="btn-submit my-submit-btn" v-show="modifyUserPasswordRight" @click="goModifyPwd()">修改密码</el-button>
        </div>
        <div class="dialog-submit" v-show="editShow">
          <el-button :disabled="subBtnDisabled" class="btn-submit my-submit-btn" @click="save()">保存</el-button>
          <el-button class="btn-cancel my-default-btn" @click="cancelSave()">取消</el-button>
        </div>
      </div>
    </div>
    <modifyPwdView :show="showModifyPwd"  :userid="userid" @show-modifypwd-change = "changeShowStatus"></modifyPwdView>
  </div>


</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop, Watch } from "vue-property-decorator";
import ConstList from "./../../utils/ConstList";
import store from "./../../vuex/store";
import * as types from "./../../vuex/types";
import * as apiConfig from "./../../api/config";
import ModifyPwd from "@/components/common/ModifyPwd.vue";
import UserManageRights from "./../../utils/UserManageRights";
import ValidateInfo from "./../../utils/ValidateInfo";

@Component({
  components: {
    modifyPwdView: ModifyPwd
  }
})
export default class ViewUserInfo extends Vue {
  showInitialPhoto: boolean = false;
  showLoadPhoto: boolean = false;
  const_user = ConstList.UserInfo;
  editShow: boolean = false;
  subBtnDisabled: boolean = false;
  showModifyPwd: boolean = false;
  showLoadSignature: boolean = false;
  showLoadSignatureBtn: boolean = false;
  //@Prop() userid: string;
  aBirthday: string = "";
  aSex: string = "";
  userid: string = "";
  //性别字典
  sexOptList: {}[] = [];
  // 信息结构体
  infoModel: any = {};
  //信息结构体
  editModel: any = {};

  // 功能权限点标记
  modifyUserInfoRight: boolean = UserManageRights.ModifyUserInfo();
  modifyUserPasswordRight: boolean = UserManageRights.ModifyUserPassword();

  Init() {
    this.userid = store.state.user.id;
    this.editShow = false;
    this.showInitialPhoto = false;
    this.showLoadPhoto = false;
    this.showModifyPwd = false;
    this.showLoadSignature = false;
    this.showLoadSignatureBtn = false;
    this.infoModel = {};
    this.editModel = {};
    this.getUserInfo();
  }

  mounted() {
    this.getDict();
  }

  //查询用户信息
  getUserInfo() {
    const _this = this;

    if (_this.userid === "") return;

    var requestModel: {} = {
      id: _this.userid
    };
    Vue.prototype.$http
      .post(apiConfig.API.staffUserInfoSearch, requestModel)
      .then(function(response: any) {
        if (response.data.code === 0) {
          _this.infoModel = response.data.data;
          if (_this.infoModel.photo === null) {
            _this.showInitialPhoto = true;
          } else {
            _this.showLoadPhoto = true;
          }

          if (_this.infoModel.signature === null) {
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

  @Prop() show: boolean;

  // 滚动条回到顶部
  scrollToTop() {
    var scrollContainer = this.$el.querySelector("#dialog-content");
    if (scrollContainer !== null) {
      scrollContainer.scrollTop = 0;
    }
  }

  @Watch("show", { immediate: true })
  showStatusChange(val: boolean) {
    this.$emit("show-status-change", val);
    if (this.show) {
      this.Init();
    }
  }

  @Watch("$route.name", { immediate: true })
  routerChange(val: string, old: string) {
    if (typeof old != "undefined" && old != val) {
      this.show = false;
    }
  }

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
      _this.editModel.photo = this.result;
      _this.showLoadPhoto = true;
      _this.showInitialPhoto = false;
    };
  }

  // 点击上传电子签名
  uploadSignatureBtnClick() {
    (this.$refs.signatureUpload as any).click();
  }

  // 添加电子签名
  uploadSignature() {
    var _this = this;
    var file = (this.$refs.signatureUpload as any).files[0];
    var reader = new FileReader();
    reader.readAsDataURL(file); //调用自带方法进行转换
    reader.onload = function(e) {
      (_this.$refs.userSignature as any).src = this.result;
      _this.editModel.signature = this.result;
      _this.showLoadSignature = true;
      _this.showLoadSignatureBtn = false;
    };
  }

  //修改
  goModify() {
    var form = this.$refs["editModel"] as any;
    if (form != null) {
      form.clearValidate();
    }
    (this.$refs.photoUpload as any).value = "";
    (this.$refs.signatureUpload as any).value = "";
    this.subBtnDisabled = false;
    for (var prop in this.infoModel) {
      if (prop == "birthday") {
        this.aBirthday = this.infoModel.birthday;
      } else if (prop == "sex") {
        this.aSex = this.infoModel.sex;
      } else {
        this.editModel[prop] = this.infoModel[prop];
      }
    }
    this.editShow = true;
    debugger;
    if (this.infoModel.signature === null) {
      this.showLoadSignatureBtn = true;
      this.showLoadSignature = false;
    } else {
      this.showLoadSignatureBtn = false;
      this.showLoadSignature = true;
    }
  }

  //弹出密码修改
  goModifyPwd() {
    this.showModifyPwd = true;
    this.subBtnDisabled = false;
  }

  changeShowStatus(val: boolean) {
    this.showModifyPwd = val;
  }
  rules = {
    job: [{ required: true, message: "请输入职务", trigger: "blur" }],
    phone: [{ required: true, message: "请输入手机号", trigger: "blur" }]
  };
  //保存编辑信息
  save() {
    var flag = false;
    (this.$refs["editModel"] as any).validate((valid: boolean) => {
      flag = valid;
    });
    if (!flag) {
      return;
    }
    this.subBtnDisabled = true;
    const _this = this;
    var requestModel: any = {
      filter: {
        id: _this.userid
      },
      record: {
        sex: _this.aSex,
        birthday: _this.aBirthday,
        job: _this.editModel.job,
        title: _this.editModel.title,
        phone: _this.editModel.phone,
        education: _this.editModel.education,
        email: _this.editModel.email,
        telPhone: _this.editModel.telPhone,
        addr: _this.editModel.addr,
        description: _this.editModel.description,
        goodAt: _this.editModel.goodAt,
        photo: _this.editModel.photo,
        signature: _this.editModel.signature
      }
    };

    Vue.prototype.$http
      .post(apiConfig.API.staffUserInfoModify, requestModel)
      .then(function(response: any) {
        if (response.data.code === 0) {
          _this.alert(ValidateInfo.ModifySuccess, "success");
          _this.editShow = false;
          _this.setValueToInfoModel();
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

  setValueToInfoModel() {
    for (var prop in this.editModel) {
      this.infoModel[prop] = this.editModel[prop];
    }
    this.infoModel.birthday = this.aBirthday;
    this.infoModel.sex = this.aSex;
    let sexList: any = this.sexOptList;
    for (let i = 0; i < sexList.length; i++) {
      let item = sexList[i];
      if (item.key == this.aSex) {
        this.infoModel.sexText = item.value;
      }
    }
  }
  //取消保存
  cancelSave() {
    this.editShow = false;
    if (this.infoModel.signature === null) {
      this.showLoadSignature = false;
      this.showLoadSignatureBtn = false;
    } else {
      this.showLoadSignature = true;
      this.showLoadSignatureBtn = false;
    }
  }

  //关闭弹窗
  closeDialog() {
    this.show = false;
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
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.user-info {
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

  .user-info-content {
    width: 920px;
    margin: 120px auto;
    height: calc(100% - 240px);

    .user-info-dialog {
      height: 100%;
      width: 100%;
      background: #fff;
      padding: 2px;
      padding-right: 0;
      border-radius: 2px;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
      position: relative;

      .dialog-title {
        width: 100%;
        height: 50px;
        line-height: 50px;
        padding-left: 20px;
        font-size: 16px;
        color: #1bd0a1;

        .line {
          font-weight: bold;
          margin-right: 8px;
          display: inline-block;
          width: 2px;
          height: 11px;
          background: #30e0b2;
        }
        .close-btn {
          float: right;
          padding-right: 10px;
          font-size: 18px;
          color: #67c23a;
        }
      }

      .dialog-content {
        width: 100%;
        height: calc(100% - 110px);
        overflow-y: auto;

        .dialog-userinfo {
          width: 100%;
          padding: 0 20px 0 20px;

          .dialog-userinfo-detail {
            overflow: hidden;

            .dialog-userinfo-photo {
              float: left;
              width: 200px;
              margin-left: 40px;
              text-align: center;
              margin-top: 15px;

              .user-photo-out {
                display: table-cell;
                width: 134px;
                height: 134px;
                margin: 0 auto;
                text-align: center;
                vertical-align: middle;
                .user-photo {
                  max-width: 130px;
                  max-height: 130px;
                  width: 130px;
                  height: 130px;
                  border-radius: 50%;
                }
              }

              .upload-photo-btn {
                display: table-cell;
                margin-left: 15px;
                margin-top: 25px;
              }
            }

            .dialog-userinfo-content {
              float: left;
              width: calc(100% - 240px);

              .userinfo-row {
                min-height: 23px;
                line-height: 50px;
                font-size: 14px;
                overflow: hidden;
                vertical-align: middle;

                .dialog-userinfo-title {
                  font-size: 20px;
                  color: #333;
                }
                .required-item:after {
                  content: "*";
                  display: inline-block;
                  width: 10px;
                  color: #f56c6c;
                  text-align: center;
                }

                .no-require-item {
                  display: inline-block;
                  width: 10px;
                  line-height: 1px;
                  height: 1px;
                }
                .el-form-item.is-error {
                  margin-bottom: 22px !important;
                }
                input,
                select,
                textarea {
                  height: 24px;
                  line-height: 24px;
                  border: 1px solid #a6c3dd;
                  padding: 0 6px;
                }

                input,
                span,
                select,
                .left {
                  float: left;
                }

                .down-userinfo {
                  display: inline-block;
                  height: 26px;
                  width: 20px;
                  background: url("./../../assets/image/common_icon_downinfo.png")
                    no-repeat center 2px;
                  background-size: 20px 20px;
                  margin-left: 6px;
                }
                .confirm-info {
                  color: #333;
                }

                .el-input__inner {
                  padding: 0 !important;
                }
                .fixed-width {
                  width: 150px;
                  min-height: 1px;
                }

                .fixed-width-large {
                  width: 400px;
                  min-height: 1px;
                }

                .fixed-margin-left {
                  margin-left: 25px;
                  min-height: 1px;
                }

                .user-contact-title {
                  display: inline-block;
                  width: 70px;
                }

                .attention {
                  resize: none;
                  width: 610px;
                  white-space: pre;
                  word-wrap: break-word;
                  white-space: pre-wrap;
                }

                .appendix-msg {
                  margin-left: 70px;
                  color: #a7a7a7;
                  font-style: italic;
                }

                .userinfo-item-title {
                  margin-left: 15px;
                  width: 70px;
                  text-align: right;
                  color: #a9a9a9;
                }
                .confirm-info {
                }
              }
            }
          }
          .dialog-userinfo-dec {
            width: 100%;
            margin-bottom: 30px;

            .dec-title {
              font-size: 14px;
              color: #a9a9a9;
              margin-bottom: 5px;
              .icon-goodat {
                height: 20px;
                width: 22px;
                display: inline-block;
                background-size: 18px 18px;
                margin-left: 6px;
                margin-bottom: -3px;
                margin-right: 4px;
                background: url("../../assets/image/userInfo-icon-goodat.png")
                  no-repeat center 2px;
              }
              .icon-dec {
                height: 20px;
                width: 22px;
                display: inline-block;
                background-size: 18px 18px;
                margin-left: 6px;
                margin-bottom: -3px;
                margin-right: 4px;
                background: url("../../assets/image/userInfo-icon-dec.png")
                  no-repeat center 2px;
              }
            }
            .dec-info {
              margin-top: 10px;
              margin-left: 30px;
              color: #333;
              white-space: pre;
              word-wrap: break-word;
              white-space: pre-wrap;
            }
          }
        }

        .row-underline {
          width: 100%;
          height: 1px;
          background: #effaf6;
          margin-top: -1px;
        }

        .signature-row {
          height: 40px;
          min-width: 150px;
          float: right;
          overflow: hidden;
          line-height: 40px;

          .userinfo-item-title {
            float: left;
          }

          .upload-signature-btn {
            float: left;
            height: 28px !important;
            line-height: 28px !important;
            padding: 0 !important;
            width: 80px !important;
            margin: 6px 0 !important;
          }

          .user-signature {
            float: left;
            height: 30px;
            width: 100px;
            margin: 5px 0;
          }
        }
      }
      .dialog-submit {
        width: 100%;
        height: 60px;
        padding: 10px 30px 10px 40px;
        text-align: right;
      }
    }
  }
}
</style>
