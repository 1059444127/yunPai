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
              <el-form clearValidate :model="infoModel" :rules="rules" ref="infoModel">
                <div class="dialog-info">
                  <div class="input-row">
                    <span class="info-item-title">{{const_list.FormTitle.DeptTitle}}</span>
                    <el-form-item prop="HCODeptName" class="info-item-input w-375">
                        <el-input v-focus="foc" @blur="foc=false" prop maxlength="35" v-model="infoModel.HCODeptName" size="small"></el-input>
                    </el-form-item>
                    <span class="required-item"></span>
                  </div>
                  <div class="input-row">
                    <span class="info-item-title">{{const_list.FormTitle.DeptAlias}}</span>
                    <el-input v-model="infoModel.HCODeptAllas" maxlength="35" class="info-item-input w-375" size="small"></el-input>
                  </div>
                  <div class="input-row">
                    <span class="info-item-title">{{const_list.FormTitle.ParentDept}}</span>
                        <el-select clearable v-model="infoModel.parentDeptCode"  class="info-item-input w-375" size="small" placeholder="请选择">
                            <el-option
                                v-for="item in parentDeptDict"
                                :key="item.HCODeptCode"
                                :label="item.HCODeptName"
                                :value="item.HCODeptCode">
                            </el-option>
                        </el-select>
                  </div>
                  <div class="input-row">
                    <span class="info-item-title">{{const_list.FormTitle.DeptType}}</span>
                      <el-select clearable v-model="infoModel.deptClass" size="small" class="info-item-input w-375" placeholder="请选择">
                          <el-option
                              v-for="item in deptTypeList"
                              :key="item.key"
                              :label="item.value"
                              :value="item.key">
                          </el-option>
                      </el-select>
                  </div>
                  <div class="input-row">
                    <span class="info-item-title">{{const_list.FormTitle.DeptLocation}}</span>
                    <el-input class="info-item-input w-375" maxlength="100" v-model="infoModel.deptLocation"  size="small"></el-input>

                  </div>
                  <div class="input-div">
                    <span class="info-item-title">{{const_list.FormTitle.DeptDescribe}}</span>
                    <el-input type="textarea"
                              maxlength="400"
                              class="info-item-textarea w-375"
                              v-model="infoModel.deptDescription"
                              size="small"
                              resize="none"
                              rows="6">
                    </el-input>
                  </div>
                </div>
              </el-form>
            </div>
            <div class="dialog-btn-div">
              <el-button class="my-default-btn cancel-btn" @click="closeDialog()">取消</el-button>
              <el-button class="my-submit-btn submit-btn" v-show="!isModifyData" :disabled="subBtnDisabled" @click="createDepartment()">提交</el-button>
              <el-button class="my-submit-btn submit-btn" v-show="isModifyData" :disabled="subBtnDisabled" @click="modifyDepartment()">保存</el-button>
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
export default class CreateDept extends Vue {
  dialogTitle: string = "";
  subBtnDisabled: boolean = false;
  const_list = ConstList.ConfigManage;
  isModifyData: boolean = false;
  foc: boolean = true;

  @Prop() curhcoinfo: any = null;
  @Prop() currecordid: string = "";
  @Prop() show: boolean;
  showStatus: boolean = this.show;

  // 信息结构体
  infoModel = {
    HCODeptName: "",
    HCODeptAllas: "",
    HCOCode: "",
    HCOName: "",
    parentDeptCode: "",
    deptLocation: "",
    deptDescription: "",
    deptClass: ""
  };

  // 初次创建初始化
  Init() {
    var form = this.$refs["infoModel"] as any;
    if (form != null) {
      form.clearValidate();
    }

    this.dialogTitle = "新增科室";
    this.infoModel = {
      HCODeptName: "",
      HCODeptAllas: "",
      HCOCode: this.curhcoinfo.id,
      HCOName: this.curhcoinfo.name,
      parentDeptCode: "",
      deptLocation: "",
      deptDescription: "",
      deptClass: ""
    };

    this.isModifyData = false;
    this.subBtnDisabled = false;
    this.getParentDeptInfo();

    if (this.currecordid !== "") {
      this.dialogTitle = "修改科室";
      this.isModifyData = true;
      this.searchDepartment();
    }
  }

  // 上级科室字典
  parentDeptDict = [];

  // 科室类型字典
  deptTypeList = [
    {
      key: 0,
      value: "未知"
    },
    {
      key: 1,
      value: "临床科室"
    },
    {
      key: 2,
      value: "辅诊科室"
    },
    {
      key: 3,
      value: "行政科室"
    },
    {
      key: 9,
      value: "其他"
    }
  ];

  // 获取科室数据
  searchDepartment() {
    const _this = this;

    var requestModel: {} = {
      id: this.currecordid
    };

    Vue.prototype.$http
      .post(apiConfig.API.searchDepartment, requestModel)
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
          console.log(response.data.message);
        }
      })
      .catch(function(error: any) {
        console.log(error);
      });
  }

  rules = {
    HCODeptName: { required: true, message: "请输入名称", trigger: "blur" }
  };
  // 新建科室
  createDepartment() {
    var flag = false;
    (this.$refs["infoModel"] as any).validate((valid: boolean) => {
      flag = valid;
    });
    if (!flag) {
      return;
    }
    this.subBtnDisabled = true;
    const _this = this;

    Vue.prototype.$http
      .post(apiConfig.API.createDepartment, _this.infoModel)
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

  // 修改科室信息
  modifyDepartment() {
    var flag = false;
    (this.$refs["infoModel"] as any).validate((valid: boolean) => {
      flag = valid;
    });
    if (!flag) {
      return;
    }
    this.subBtnDisabled = true;
    const _this = this;

    var requestModel: {} = {
      filter: {
        id: _this.currecordid
      },
      record: {
        HCODeptName: _this.infoModel.HCODeptName,
        HCODeptAllas: _this.infoModel.HCODeptAllas,
        parentDeptCode: _this.infoModel.parentDeptCode,
        deptLocation: _this.infoModel.deptLocation,
        deptDescription: _this.infoModel.deptDescription,
        deptClass: _this.infoModel.deptClass
      }
    };

    Vue.prototype.$http
      .post(apiConfig.API.modifyDepartment, requestModel)
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

  //查询上级字典
  getParentDeptInfo() {
    const _this = this;

    _this.parentDeptDict = [];

    var requestModel: {} = {
      id: _this.currecordid,
      HCOCode: _this.curhcoinfo.id
    };

    Vue.prototype.$http
      .post(apiConfig.API.getParentDeptInfo, requestModel)
      .then(function(response: any) {
        if (response.data.code === 0) {
          _this.parentDeptDict = response.data.data;
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
    height: 450px;
    position: absolute;
    top: 50%;
    margin-top: -220px;
    left: 50%;
    margin-left: -275px;
  }
}
</style>
