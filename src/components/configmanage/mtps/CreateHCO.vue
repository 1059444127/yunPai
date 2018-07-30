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
                    <div class="dialog-info-content">
                        <div class="dialog-userinfo-photo">
                            <div class="user-photo-out">
                                <img class="user-photo" v-show="showInitialPhoto" src="./../../../assets/image/common_hco_logo_none.png"/>
                                <img class="user-photo" v-show="showLoadPhoto" ref="logo" :src="infoModel.logo"/>
                            </div>
                            <input type="file" v-show="false" ref="photoUpload" v-on:change="uploadPhoto"/>
                            <el-button class="btn-submit my-submit-btn upload-photo-btn" @click="uploadPhotoBtnClick()">上传LOGO</el-button>
                        </div>
                        <div class="dialog-userinfo-content">
                            <div class="input-row">
                                <span class="info-item-title">{{const_list.FormTitle.HCOTitle}}</span>
                                <el-form-item prop="HCOName"  class="info-item-input w-492">
                                   <el-input v-focus="foc" @blur="foc=false" prop maxlength="35" v-model="infoModel.HCOName" size="small"></el-input>
                                 </el-form-item>
                                 <span class="required-item"></span>
                            </div>
                            <div class="input-row">
                                <span class="info-item-title">{{const_list.FormTitle.HCOCode}}</span>
                                <el-form-item prop="HCOCode"  class="info-item-input w-492">
                                   <el-input  v-model="infoModel.HCOCode" :disabled="!createMode" maxlength="30" size="small"></el-input>
                                </el-form-item>
                                <span class="required-item"></span>
                            </div>
                            <div class="input-row">
                                <span class="info-item-title">{{const_list.FormTitle.AddressLevel}}</span>
                                <el-form-item prop="hospitalClass4"  class="info-item-input w-180">
                                  <el-select clearable v-model="infoModel.hospitalClass4" size="small"  placeholder="请选择">
                                    <el-option
                                        v-for="item in AddressLevelList"
                                        :key="item.key"
                                        :label="item.value"
                                        :value="item.key">
                                    </el-option>
                                  </el-select>
                                </el-form-item>
                                <span class="required-item"></span>
                                <span class="info-item-title ml-40">{{const_list.FormTitle.HCONature}}</span>
                                <el-select clearable v-model="infoModel.hospitalClass3" size="small" class="info-item-input w-180" placeholder="请选择">
                                  <el-option
                                      v-for="item in HCONatureList"
                                      :key="item.key"
                                      :label="item.value"
                                      :value="item.key">
                                  </el-option>
                                </el-select>
                            </div>
                            <div class="input-row">
                                <span class="info-item-title">{{const_list.FormTitle.HCOType}}</span>
                                <el-select clearable size="small" class="info-item-input w-180" placeholder="请选择">
                                  <!-- <el-option
                                      v-for="item in HCOTypeList"
                                      :key="item.key"
                                      :label="item.value"
                                      :value="item.key">
                                  </el-option> -->
                                </el-select>
                                <span class="info-item-title ml-50">{{const_list.FormTitle.HCOLevel}}</span>
                                <el-select clearable v-model="infoModel.hospitalClass" size="small" class="info-item-input w-180" placeholder="请选择">
                                  <el-option
                                      v-for="item in HCOLevelList"
                                      :key="item.key"
                                      :label="item.value"
                                      :value="item.key">
                                  </el-option>
                                </el-select>
                            </div>
                            <div class="input-row">
                              <span class="info-item-title">{{const_list.FormTitle.ParentHCO}}</span>
                              <el-select clearable v-model="infoModel.parentHCOCode" size="small" class="info-item-input w-180" placeholder="请选择">
                                <el-option
                                  v-for="item in parentHCODict"
                                  :key="item.HCOCode"
                                  :label="item.HCOName"
                                  :value="item.HCOCode">
                                </el-option>
                              </el-select>
                              <span class="info-item-title ml-50">{{const_list.FormTitle.Director}}</span>
                              <el-input class="info-item-input w-180" maxlength="15" v-model="infoModel.responsiblePersonName" size="small"></el-input>
                            </div>
                            <div class="input-row">
                                <span class="info-item-title">{{const_list.FormTitle.Contacts}}</span>
                                <el-input class="info-item-input w-180" maxlength="15" v-model="infoModel.contactName" size="small"></el-input>
                                <span class="info-item-title ml-50">{{const_list.FormTitle.ContactsTel}}</span>
                                <el-input class="info-item-input w-180" maxlength="20" v-model="infoModel.contactPhone" size="small"></el-input>
                            </div>
                            <div class="input-row">
                                <span class="info-item-title">{{const_list.FormTitle.Location}}</span>
                                <el-input class="info-item-input w-492" maxlength="100" v-model="infoModel.address" size="small"></el-input>
                            </div>
                            <div class="input-div">
                                <span class="info-item-title">{{const_list.FormTitle.HCODescribe}}</span>
                                <el-input type="textarea"
                                          maxlength="250"
                                          class="info-item-textarea w-492"
                                          v-model="infoModel.remarks"
                                          size="small"
                                          resize="none"
                                          rows="4">
                                </el-input>
                            </div>
                        </div>
                    </div>
                </div>
              </el-form>
            </div>
          <div class="dialog-btn-div">
            <el-button class="btn-cancel my-default-btn" @click="closeDialog()">取消</el-button>
            <el-button :disabled="subBtnDisabled" v-show="createMode" class="btn-submit my-submit-btn" @click="createHealthCareOrganization()">提交</el-button>
            <el-button :disabled="subBtnDisabled" v-show="!createMode" class="btn-submit my-submit-btn" @click="modifyHealthCareOrganization()">保存</el-button>
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
export default class CreateHCO extends Vue {
  dialogTitle: string = "";
  rollInHospitalShow: boolean = false;
  const_list = ConstList.ConfigManage;
  subBtnDisabled: boolean = false;
  createMode: boolean = true;
  showInitialPhoto: boolean = false;
  showLoadPhoto: boolean = false;
  foc: boolean = true;

  @Prop() curmtpsid: string;
  @Prop() currecordid: string;
  @Prop() curhcoinfo: any;

  // 上级机构字典
  parentHCODict = [];

  // 机构性质
  HCONatureList = [
    {
      key: "0",
      value: "综合医院"
    },
    {
      key: "1",
      value: "专科医院"
    },
    {
      key: "3",
      value: "诊所"
    }
  ];

  // 所属地区级别字典
  AddressLevelList = [
    {
      key: "0",
      value: "省级"
    },
    {
      key: "1",
      value: "市级"
    },
    {
      key: "2",
      value: "区县"
    },
    {
      key: "3",
      value: "乡"
    },
    {
      key: "4",
      value: "村室"
    }
  ];

  // 机构等级字典
  HCOLevelList = [
    {
      key: "0",
      value: "未知级别"
    },
    {
      key: "1",
      value: "一级丙等"
    },
    {
      key: "2",
      value: "一级乙等"
    },
    {
      key: "3",
      value: "一级甲等"
    },
    {
      key: "4",
      value: "二级丙等"
    },
    {
      key: "5",
      value: "二级乙等"
    },
    {
      key: "6",
      value: "二级甲等"
    },
    {
      key: "7",
      value: "三级丙等"
    },
    {
      key: "8",
      value: "三级乙等"
    },
    {
      key: "9",
      value: "三级甲等"
    }
  ];

  // 转诊信息结构体
  infoModel = {
    HCOName: "",
    divisionCode: "000000",
    hospitalClass: "",
    hospitalClass2: "",
    hospitalClass3: "",
    hospitalClass4: "",
    HCOCode: "",
    contactName: "",
    contactPhone: "",
    address: "",
    responsiblePersonName: "",
    remarks: "",
    logo: "",
    parentHCOCode: "",
    parentHCOName: "",
    MTPSID: this.curmtpsid
  };

  // 初次创建初始化
  Init() {
    var form = this.$refs["infoModel"] as any;
    if (form != null) {
      form.clearValidate();
    }
    //初始化信息
    this.infoModel = {
      HCOName: "",
      divisionCode: "000000",
      hospitalClass: "",
      hospitalClass2: "",
      hospitalClass3: "",
      hospitalClass4: "",
      HCOCode: "",
      contactName: "",
      contactPhone: "",
      address: "",
      responsiblePersonName: "",
      remarks: "",
      logo: "",
      parentHCOCode: "",
      parentHCOName: "",
      MTPSID: this.curmtpsid
    };

    this.subBtnDisabled = false;
    this.showInitialPhoto = false;
    this.showLoadPhoto = false;
    (this.$refs.photoUpload as any).value = "";
    this.getParentHCOInfo();

    if (this.currecordid !== "") {
      this.dialogTitle = "修改机构信息";
      this.createMode = false;
      this.searchHealthCareOrganization();
    } else {
      this.dialogTitle = "新增机构";
      this.createMode = true;
      this.showInitialPhoto = true;
    }
  }

  mounted() {}

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
      (_this.$refs.logo as any).src = this.result;
      _this.infoModel.logo = this.result;
      _this.showLoadPhoto = true;
      _this.showInitialPhoto = false;
    };
  }

  rules = {
    HCOName: { required: true, message: "请输入机构名称", trigger: "blur" },
    HCOCode: { required: true, message: "请输入机构代码", trigger: "blur" },
    hospitalClass4: {
      required: true,
      message: "请选择所属级别",
      trigger: "blur"
    }
  };

  //提交机构信息
  createHealthCareOrganization() {
    var flag = false;
    (this.$refs["infoModel"] as any).validate((valid: boolean) => {
      flag = valid;
    });
    if (!flag) {
      return;
    }
    this.subBtnDisabled = true;
    const _this = this;

    // 根据选中的上级code获取内容
    let objParentHCOName: any = this.parentHCODict.find(item => {
      return (item as any).HCOCode === _this.infoModel.parentHCOCode;
    });
    if (objParentHCOName !== undefined) {
      _this.infoModel.parentHCOName = objParentHCOName.HCOName;
    } else {
      _this.infoModel.parentHCOName = "";
    }

    Vue.prototype.$http
      .post(apiConfig.API.createHealthCareOrganization, _this.infoModel)
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

  //修改机构信息
  modifyHealthCareOrganization() {
    var flag = false;
    (this.$refs["infoModel"] as any).validate((valid: boolean) => {
      flag = valid;
    });
    if (!flag) {
      return;
    }
    this.subBtnDisabled = true;
    const _this = this;

    // 根据选中的上级code获取内容
    let objParentHCOName: any = this.parentHCODict.find(item => {
      return (item as any).HCOCode === _this.infoModel.parentHCOCode;
    });
    if (objParentHCOName !== undefined) {
      _this.infoModel.parentHCOName = objParentHCOName.HCOName;
    } else {
      _this.infoModel.parentHCOName = "";
    }

    var requestModel: {} = {
      filter: {
        id: _this.currecordid
      },
      record: {
        HCOName: _this.infoModel.HCOName,
        hospitalClass: _this.infoModel.hospitalClass,
        hospitalClass2: _this.infoModel.hospitalClass2,
        hospitalClass3: _this.infoModel.hospitalClass3,
        hospitalClass4: _this.infoModel.hospitalClass4,
        HCOCode: _this.infoModel.HCOCode,
        contactName: _this.infoModel.contactName,
        contactPhone: _this.infoModel.contactPhone,
        address: _this.infoModel.address,
        responsiblePersonName: _this.infoModel.responsiblePersonName,
        remarks: _this.infoModel.remarks,
        logo: _this.infoModel.logo,
        parentHCOCode: _this.infoModel.parentHCOCode,
        parentHCOName: _this.infoModel.parentHCOName,
        MTPSID: _this.infoModel.MTPSID
      }
    };

    Vue.prototype.$http
      .post(apiConfig.API.modifyHealthCareOrganization, requestModel)
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

  //查询机构信息
  searchHealthCareOrganization() {
    const _this = this;
    var requestModel: {} = {
      id: _this.currecordid
    };

    Vue.prototype.$http
      .post(apiConfig.API.searchHealthCareOrganization, requestModel)
      .then(function(response: any) {
        if (response.data.code === 0) {
          _this.loadHCOInfo(response.data.data[0]);
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

  //查询上级机构字典
  getParentHCOInfo() {
    const _this = this;

    _this.parentHCODict = [];

    var requestModel: {} = {
      id: _this.currecordid,
      MTPSID: _this.curmtpsid
    };

    Vue.prototype.$http
      .post(apiConfig.API.getParentHCOInfo, requestModel)
      .then(function(response: any) {
        if (response.data.code === 0) {
          _this.parentHCODict = response.data.data;
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
        }
      })
      .catch(function(error: any) {
        console.log(error);
      });
  }

  //加载机构信息
  loadHCOInfo(obj: any) {
    this.infoModel = {
      HCOName: obj.HCOName,
      divisionCode: obj.divisionCode,
      hospitalClass: obj.hospitalClass,
      hospitalClass2: obj.hospitalClass2,
      hospitalClass3: obj.hospitalClass3,
      hospitalClass4: obj.hospitalClass4,
      HCOCode: obj.HCOCode,
      contactName: obj.contactName,
      contactPhone: obj.contactPhone,
      address: obj.address,
      responsiblePersonName: obj.responsiblePersonName,
      remarks: obj.remarks,
      logo: obj.logo,
      parentHCOCode: obj.parentHCOCode,
      parentHCOName: obj.parentHCOName,
      MTPSID: obj.MTPSID
    };

    if (obj.logo === null || obj.logo === "") {
      this.showInitialPhoto = true;
    } else {
      this.showLoadPhoto = true;
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
    width: 850px;
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
          width: 130px;
          height: 130px;
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
