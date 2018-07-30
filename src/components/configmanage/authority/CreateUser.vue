<template>
  <div class="create-user"
        v-show="show"
        @scroll.prevent>

    <div class="create-user-content">
        <div class="view-dialog">
            <div class="dialog-title">
                <span class="line"></span>{{dialogTitle}}
                <span class="close-dialog" @click="closeDialog()"><i class="el-icon-close"></i></span>
            </div>
            <div class="dialog-content" id="dialog-content" @scroll.prevent>
              <el-form clearValidate :model="infoModel" :rules="rules" ref="infoModel">
                <div class="dialog-info">
                    <div class="dialog-info-title">{{const_list.FormTitle.BasicInfo}}</div>
                    <div class="dialog-info-content">
                        <div class="dialog-userinfo-photo">
                            <div class="user-photo-out">
                                <img class="user-photo" v-show="showInitialPhoto" src="./../../../assets/image/common_user_photo_none.png"/>
                                <img class="user-photo" v-show="showLoadPhoto" ref="userPhoto" :src="infoModel.photo"/>
                            </div>
                            <input type="file" v-show="false" ref="photoUpload" v-on:change="uploadPhoto"/>
                            <el-button class="btn-submit my-submit-btn upload-photo-btn" @click="uploadPhotoBtnClick()">添加照片</el-button>
                        </div>
                        <div class="dialog-userinfo-content">
                            <div class="input-row">
                                <span class="info-item-title">{{const_list.FormTitle.UserName}}</span>
                                <el-form-item prop="userName" class="info-item-input w-130">
                                   <el-input v-focus="foc" @blur="foc=false" prop v-model="infoModel.userName" size="small"></el-input>
                                </el-form-item>
                                <span class="required-item"></span>
                                <span class="info-item-title">{{const_list.FormTitle.Sex}}</span>
                                <el-form-item prop="sex" class="info-item-input w-130" >
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
                                <span class="info-item-title ml-20">{{const_list.FormTitle.Birthday}}</span>
                                  <el-date-picker
                                  v-model="infoModel.birthday"
                                  type="date"
                                  placeholder="选择日期"
                                  :clearable="false"
                                  class="info-item-input w-130"
                                  size="small">
                                </el-date-picker>
                            </div>
                            <div class="input-row">
                                <span class="info-item-title">{{const_list.FormTitle.IdCard}}</span>
                                <el-form-item prop="identityCardNum"  class="info-item-input w-352" >
                                  <el-input v-model="infoModel.identityCardNum" size="small"></el-input>
                                </el-form-item>
                                <span class="required-item"></span>
                                <span class="info-item-title ml-20">{{const_list.FormTitle.Tel}}</span>
                                <el-input class="info-item-input w-130" v-model="infoModel.telPhone" size="small"></el-input>
                            </div>
                            <div class="input-row">
                                <span class="info-item-title">{{const_list.FormTitle.Job}}</span>
                                <el-input class="info-item-input w-130" v-model="infoModel.job" size="small"></el-input>
                                <span class="info-item-title ml-10">{{const_list.FormTitle.JobTitle}}</span>
                                <el-input class="info-item-input w-130" v-model="infoModel.title" size="small"></el-input>
                                <span class="info-item-title ml-30">{{const_list.FormTitle.Education}}</span>
                                <el-input class="info-item-input w-130" v-model="infoModel.education" size="small"></el-input>
                            </div>
                            <div class="input-row">
                                <span class="info-item-title">{{const_list.FormTitle.DeptName}}</span>
                                <el-select clearable v-model="infoModel.deptCode" size="small" class="info-item-input w-130" placeholder="请选择">
                                  <el-option
                                      v-for="item in departmentInfoList"
                                      :key="item.HCODeptCode"
                                      :label="item.HCODeptName"
                                      :value="item.HCODeptCode">
                                  </el-option>
                                </el-select>
                                <span class="info-item-title ml-10">{{const_list.FormTitle.HCOStaffCode}}</span>
                                <el-input class="info-item-input w-130" v-model="infoModel.HCOStaffCode" size="small"></el-input>
                            </div>
                            <div class="input-div">
                                <span class="info-item-title">{{const_list.FormTitle.Description}}</span>
                                <el-input type="textarea"
                                        class="info-item-textarea w-594"
                                        v-model="infoModel.description"
                                        size="small"
                                        resize="none"
                                        rows="4">
                                </el-input>
                            </div>
                            <div class="input-div">
                                <span class="info-item-title">{{const_list.FormTitle.Signature}}</span>
                                <input type="file" v-show="false" ref="signatureUpload" v-on:change="uploadSignature"/>
                                <!-- <img class="upload-signature-btn" v-show="!showLoadSignature" src="./../../../assets/image/common_upload_icon.png" @click="uploadSignatureBtnClick()"/> -->
                                <el-button v-show="showLoadSignatureBtn" size="mini" class="btn-submit my-default-btn upload-signature-btn" @click="uploadSignatureBtnClick()">点击上传</el-button>
                                <img class="user-signature" v-show="showLoadSignature" ref="userSignature" title="点击重新上传" @click="uploadSignatureBtnClick()" :src="infoModel.signature"/>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="dialog-info">
                    <div class="dialog-info-title">{{const_list.FormTitle.UserRight}}</div>
                    <div class="dialog-info-content">
                      <div class="input-row">
                        <span class="info-item-title">{{const_list.FormTitle.LoginName}}</span>
                        <el-form-item :prop="createMode?'loginName':''" class="info-item-input w-150">
                            <el-input  v-show="createMode" v-model="infoModel.loginName" size="small"></el-input>
                        </el-form-item>
                        <span class="required-item" v-show="createMode"></span>
                        <span class="info-item-content w-150" v-show="!createMode">{{infoModel.loginName}}</span>
                        <span class="info-item-title" :class="createMode?'ml-50':'ml-60'">{{const_list.FormTitle.Password}}</span>
                        <el-form-item :prop="createMode?'password':''" class="info-item-input w-150" v-show="createMode">
                            <el-input  type="password" v-model="infoModel.password" size="small"></el-input>
                        </el-form-item>
                        <span class="required-item" v-show="createMode"></span>
                        <el-input  type="password" v-model="infoModel.password" size="small" class="info-item-input w-150" v-show="!createMode"></el-input>
                        <span class="info-item-title" :class="createMode?'ml-60':'ml-70'">{{const_list.FormTitle.Phone}}</span>
                        <el-form-item prop="phone" class="info-item-input w-150">
                           <el-input v-model="infoModel.phone" size="small" placeholder="此号码用于接收短信" ></el-input>
                        </el-form-item>
                      </div>
                      <div class="input-div">
                        <span class="info-item-title">{{const_list.FormTitle.Email}}</span>
                        <el-form-item prop="email" class="info-item-input w-150">
                            <el-input  v-model="infoModel.email" size="small"></el-input>
                        </el-form-item>
                        <span class="info-item-title ml-60">{{const_list.FormTitle.StaffCode}}</span>

                          <el-select clearable v-model="infoModel.roles"
                                                 class="info-item-textarea w-420"
                                                 size="small"
                                                 multiple
                                                 placeholder="请选择">
                          <el-option
                            v-for="item in roleDataList"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                          </el-option>
                        </el-select>
                      </div>
                    </div>
                </div>
              </el-form>
            </div>
            <div class="dialog-btn-div">
              <el-button class="btn-cancel my-default-btn" @click="closeDialog()">取消</el-button>
              <el-button :disabled="subBtnDisabled" v-show="createMode" class="btn-submit my-submit-btn" @click="createMTPSUser()">提交</el-button>
              <el-button :disabled="subBtnDisabled" v-show="!createMode" class="btn-submit my-submit-btn" @click="modifyMTPSUser()">保存</el-button>
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
import ValidateRules from "./../../../utils/ValidateRules";

@Component
export default class CreateUser extends Vue {
  dialogTitle: string = "新增用户";
  rollInHospitalShow: boolean = false;
  const_list = ConstList.ConfigManage;
  subBtnDisabled: boolean = false;
  createMode: boolean = true;
  showInitialPhoto: boolean = false;
  showLoadPhoto: boolean = false;
  showLoadSignature: boolean = false;
  showLoadSignatureBtn: boolean = false;
  foc: boolean = true;

  @Prop() currecordid: string;
  @Prop() curhcoinfo: any;

  // 科室信息列表
  departmentInfoList = [
    {
      HCODeptCode: "",
      HCODeptName: ""
    }
  ];

  // 角色数据
  roleDataList = [
    {
      id: "",
      name: ""
    }
  ];

  //性别字典
  sexOptList: {}[] = [];

  // 转诊信息结构体
  infoModel = {
    loginName: "",
    password: "",
    phone: "",
    email: "",
    userName: "",
    HCOCode: "",
    HCOName: "",
    description: "",
    sex: "",
    birthday: "",
    identityCardNum: "",
    job: "",
    title: "",
    education: "",
    photo: "",
    telPhone: "",
    deptCode: "",
    deptName: "",
    HCOStaffCode: "",
    signature: "",
    roles: []
  };

  // 初次创建初始化
  Init() {
    var form = this.$refs["infoModel"] as any;
    if (form != null) {
      form.clearValidate();
    }
    // 获取当前医院的科室
    this.getDepartmentDict();

    //初始化信息
    this.infoModel = {
      loginName: "",
      password: "",
      phone: "",
      email: "",
      userName: "",
      HCOCode: this.curhcoinfo.hcocode,
      HCOName: this.curhcoinfo.hconame,
      description: "",
      sex: "",
      birthday: "",
      identityCardNum: "",
      job: "",
      title: "",
      education: "",
      photo: "",
      telPhone: "",
      deptCode: "",
      deptName: "",
      HCOStaffCode: "",
      signature: "",
      roles: []
    };

    this.subBtnDisabled = false;
    this.showInitialPhoto = false;
    this.showLoadPhoto = false;
    this.showLoadSignature = false;
    this.showLoadSignatureBtn = false;
    (this.$refs.photoUpload as any).value = "";
    (this.$refs.signatureUpload as any).value = "";

    if (this.currecordid !== "") {
      this.createMode = false;
      this.getMTPSUserInfo();
    } else {
      this.createMode = true;
      this.showInitialPhoto = true;
      this.showLoadSignatureBtn = true;
    }
  }

  mounted() {
    this.getDict();
    this.roleSearch();
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
      _this.infoModel.photo = this.result;
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
      _this.infoModel.signature = this.result;
      _this.showLoadSignature = true;
      _this.showLoadSignatureBtn = false;
    };
  }

  rules = {
    userName: { required: true, message: "请输入姓名", trigger: "blur" },
    sex: { required: true, message: "请选择性别", trigger: "change" },
    identityCardNum: { validator: ValidateRules.IDCardNo, trigger: "blur" },
    loginName: { required: true, message: "请输入登录名", trigger: "blur" },
    password: { required: true, message: "请输入密码", trigger: "blur" },
    email: { validator: ValidateRules.email, trigger: "blur" }
  };

  //提交用户信息
  createMTPSUser() {
    var flag = false;
    (this.$refs["infoModel"] as any).validate((valid: boolean) => {
      flag = valid;
    });
    if (!flag) {
      return;
    }
    this.subBtnDisabled = true;
    const _this = this;
    // 根据选中的科室code获取内容
    let objDeptName: any = this.departmentInfoList.find(item => {
      return item.HCODeptCode === _this.infoModel.deptCode;
    });
    if (objDeptName !== undefined) {
      _this.infoModel.deptName = objDeptName.HCODeptName;
    } else {
      _this.infoModel.deptName = "";
    }

    Vue.prototype.$http
      .post(apiConfig.API.createMTPSUser, _this.infoModel)
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

  //修改用户信息
  modifyMTPSUser() {
    var flag = false;
    (this.$refs["infoModel"] as any).validate((valid: boolean) => {
      flag = valid;
    });

    if (!flag) {
      return;
    }
    this.subBtnDisabled = true;
    const _this = this;
    // 根据选中的科室code获取内容
    let objDeptName: any = this.departmentInfoList.find(item => {
      return item.HCODeptCode === _this.infoModel.deptCode;
    });
    if (objDeptName !== undefined) {
      _this.infoModel.deptName = objDeptName.HCODeptName;
    } else {
      _this.infoModel.deptName = "";
    }

    var requestModel: {} = {
      filter: {
        id: _this.currecordid
      },
      record: {
        password: _this.infoModel.password,
        phone: _this.infoModel.phone,
        email: _this.infoModel.email,
        userName: _this.infoModel.userName,
        description: _this.infoModel.description,
        sex: _this.infoModel.sex,
        birthday: _this.infoModel.birthday,
        identityCardNum: _this.infoModel.identityCardNum,
        job: _this.infoModel.job,
        title: _this.infoModel.title,
        education: _this.infoModel.education,
        photo: _this.infoModel.photo,
        telPhone: _this.infoModel.telPhone,
        deptCode: _this.infoModel.deptCode,
        deptName: _this.infoModel.deptName,
        HCOStaffCode: _this.infoModel.HCOStaffCode,
        signature: _this.infoModel.signature,
        roles: _this.infoModel.roles
      }
    };

    Vue.prototype.$http
      .post(apiConfig.API.modifyMTPSUser, requestModel)
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

  //查询用户信息
  getMTPSUserInfo() {
    const _this = this;

    var requestModel: {} = {
      id: _this.currecordid
    };

    Vue.prototype.$http
      .post(apiConfig.API.getMTPSUserInfo, requestModel)
      .then(function(response: any) {
        if (response.data.code === 0) {
          _this.loadUserInfo(response.data.data);
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

          // store.commit(types.REFERRALDICT, {
          //   sex: data.sex
          // });
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

  // 获取科室信息
  getDepartmentDict() {
    const _this = this;

    var requestModel: {} = {
      hcocode: _this.curhcoinfo.hcocode
    };

    Vue.prototype.$http
      .post(apiConfig.API.getDepartmentDict, requestModel)
      .then(function(response: any) {
        if (response.data.code === 0) {
          _this.departmentInfoList = response.data.data;
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

  // 获取角色数据
  roleSearch() {
    const _this = this;

    Vue.prototype.$http
      .post(apiConfig.API.roleSearch, {})
      .then(function(response: any) {
        if (response.data.code === 0) {
          _this.roleDataList = response.data.data;
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
          console.log(response.data.message);
        }
      })
      .catch(function(error: any) {
        console.log(error);
      });
  }

  //更新用户数据
  loadUserInfo(obj: any) {
    //this.infoModel = obj;

    this.infoModel = {
      loginName: obj.loginName,
      password: "",
      phone: obj.phone,
      email: obj.email,
      userName: obj.userName,
      HCOCode: this.curhcoinfo.hcocode,
      HCOName: this.curhcoinfo.hconame,
      description: obj.description,
      sex: obj.sex,
      birthday: obj.birthday,
      identityCardNum: obj.identityCardNum,
      job: obj.job,
      title: obj.title,
      education: obj.education,
      photo: obj.photo,
      telPhone: obj.telPhone,
      deptCode: obj.deptCode,
      deptName: obj.deptName,
      HCOStaffCode: obj.HCOStaffCode,
      signature: obj.signature,
      roles: []
    };

    for (var item of obj.roles) {
      (this.infoModel.roles as any).push((item as any).id);
    }

    if (obj.photo === null) {
      this.showInitialPhoto = true;
    } else {
      this.showLoadPhoto = true;
    }

    if (obj.signature === null) {
      this.showLoadSignatureBtn = true;
    } else {
      this.showLoadSignature = true;
    }
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
.create-user {
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

  .create-user-content {
    width: 940px;
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
}

.w-352 {
  width: 352px;
}

.w-342 {
  width: 342px;
}

.w-420 {
  width: 452px;
}

.w-594 {
  width: 594px;
}
</style>
