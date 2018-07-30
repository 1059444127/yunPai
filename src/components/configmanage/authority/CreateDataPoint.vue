<template>
  <div class="dialog-page"
      v-show="show"
      @scroll.prevent>

    <div class="main-content">
        <div class="view-dialog">
            <div class="dialog-title">
                <span class="line"></span>{{dialogTitle+curtypename}}数据权限点
                <span class="close-dialog" @click="closeDialog()"><i class="el-icon-close"></i></span>
            </div>
            <div class="dialog-content" id="dialog-content">
              <el-form clearValidate :model="infoModel" :rules="rules" ref="infoModel">
              <div class="dialog-info">
                <div class="input-row">
                  <span class="info-item-title">{{const_list.FormTitle.Code}}</span>
                  <el-form-item prop="code" class="info-item-input w-375">
                      <el-input v-focus="foc" @blur="foc=false" maxlength="50" prop v-model="infoModel.code" size="small"></el-input>
                  </el-form-item>
                  <span class="required-item"></span>
                </div>
                <div class="input-row">
                  <span class="info-item-title">{{const_list.FormTitle.Name}}</span>
                  <el-form-item prop="name" class="info-item-input w-375">
                      <el-input v-model="infoModel.name" maxlength="50" size="small"></el-input>
                  </el-form-item>
                  <span class="required-item"></span>
                </div>
                <div class="input-div">
                  <span class="info-item-title">{{const_list.FormTitle.Describe}}</span>
                  <el-input type="textarea"
                            maxlength="100"
                            class="info-item-textarea w-375"
                            size="small"
                            resize="none"
                            rows="5"
                            v-model="infoModel.description">
                  </el-input>
                </div>
              </div>
              </el-form>
            </div>
            <div class="dialog-btn-div">
              <el-button class="my-default-btn cancel-btn" @click="closeDialog()">取消</el-button>
              <el-button class="my-submit-btn submit-btn" v-show="!isModifyData" :disabled="subBtnDisabled" @click="createDataRight()">提交</el-button>
              <el-button class="my-submit-btn submit-btn" v-show="isModifyData" :disabled="subBtnDisabled" @click="dataRightModify()">保存</el-button>
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
export default class CreateDataPoint extends Vue {
  dialogTitle: string = "";
  subBtnDisabled: boolean = false;
  const_list = ConstList.ConfigManage;
  isModifyData: boolean = false;
  foc: boolean = true;

  @Prop() currecordid: string = "";
  @Prop() curtypeid: string = "";
  @Prop() curtypename: string = "";
  @Prop() show: boolean;
  showStatus: boolean = this.show;

  // 信息结构体
  infoModel = {
    code: "",
    name: "",
    description: "",
    funClassID: ""
  };

  // 初次创建初始化
  Init() {
    var form = this.$refs["infoModel"] as any;
    if (form != null) {
      form.clearValidate();
    }
    this.dialogTitle = "新增";
    this.infoModel = {
      code: "",
      name: "",
      description: "",
      funClassID: this.curtypeid
    };

    this.isModifyData = false;
    this.subBtnDisabled = false;

    if (this.currecordid !== "") {
      this.dialogTitle = "修改";
      this.isModifyData = true;
      this.dataRightSearch();
    }
  }

  // 获取数据权限点数据
  dataRightSearch() {
    const _this = this;

    var requestModel: {} = {
      id: this.currecordid
    };

    Vue.prototype.$http
      .post(apiConfig.API.dataRightSearch, requestModel)
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
          _this.alert(ValidateInfo.GetListError, "error");
          console.log(response.data.message);
        }
      })
      .catch(function(error: any) {
        console.log(error);
      });
  }

  rules = {
    code: { required: true, message: "请输入代码", trigger: "blur" },
    name: { required: true, message: "请输入名称", trigger: "blur" }
  };

  // 新建数据权限点
  createDataRight() {
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
      .post(apiConfig.API.dataRightCreate, _this.infoModel)
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

  // 修改数据权限点数据
  dataRightModify() {
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
        funClassID: _this.infoModel.funClassID,
        name: _this.infoModel.name,
        code: _this.infoModel.code,
        description: _this.infoModel.description
      }
    };

    Vue.prototype.$http
      .post(apiConfig.API.dataRightModify, requestModel)
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
    height: 320px;
    position: absolute;
    top: 50%;
    margin-top: -180px;
    left: 50%;
    margin-left: -275px;
  }
}
</style>
