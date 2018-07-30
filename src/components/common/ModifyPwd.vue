<template>
  <div class="dialog-page"
       v-show="show"
       @scroll.prevent>

    <div class="main-content">
      <div class="view-dialog">
        <div class="dialog-title">
          <span class="line"></span>修改密码
          <span class="close-dialog" @click="closeDialog()"><i class="el-icon-close"></i></span>
        </div>
        <div class="dialog-content" id="dialog-content">
          <el-form :model="infoModel"  :rules="rules" ref="infoModel" >
          <div class="dialog-info">

              <div class="input-row">
                <span class="info-item-title">登录密码：</span>
                <el-form-item prop="password" class="info-item-input w-375" >
                <el-input v-focus="foc" @blur="foc=false" prop
                          maxlength="20"
                          size="small"
                          type="password"
                          v-model="infoModel.password"
                          placeholder="输入登录密码"></el-input>
                </el-form-item>
                <span class="required-item"></span>
              </div>
              <div class="input-row">
                <span class="info-item-title">新密码：</span>
                <el-form-item prop="userNewPwd" class="info-item-input w-375">
                <el-input size="small"
                          maxlength="20"
                          type="password"
                          v-model="infoModel.userNewPwd"
                          placeholder="输入新密码"></el-input>
                </el-form-item>
                <span class="required-item"></span>
              </div>
              <div class="input-row">
                <span class="info-item-title">确认密码：</span>
                <el-form-item  prop="userConfirmPwd" class="info-item-input w-375">
                <el-input size="small"
                          maxlength="20"
                          type="password"
                          v-model="infoModel.userConfirmPwd"
                          placeholder="输入确认密码"></el-input>
                </el-form-item>
                <span class="required-item"></span>
              </div>
            </div>
          </el-form>
        </div>
        <div class="dialog-btn-div">
          <el-button class="my-default-btn cancel-btn" @click="closeDialog()">取消</el-button>
          <el-button class="my-submit-btn submit-btn"   @click="save()">保存</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop, Watch } from "vue-property-decorator";
import ConstList from "./../../utils/ConstList";
import store from "./../../vuex/store";
import * as types from "./../../vuex/types";
import * as apiConfig from "./../../api/config";
import ValidateInfo from "./../../utils/ValidateInfo";

@Component
export default class ModifyPwd extends Vue {
  infoModel: any = {};
  @Prop() userid: string = "";
  @Prop() show: boolean;
  foc: boolean = true;

  // 初次创建初始化
  Init() {
    var form = this.$refs["infoModel"] as any;
    if (form != null) {
      form.clearValidate();
    }
    this.infoModel = {};
  }

  validatePass (rule:any, value:any, callback:any) {
    if (value !== this.infoModel.userNewPwd) {
      callback(new Error('两次输入密码不一致!'));
    } else {
      callback();
    }
  };

  rules = {
    password: [{ required: true, message: "请输入密码", trigger: "blur" },

    ],
    userNewPwd: [{ required: true, message: "请输入新密码", trigger: "blur" }
    ],
    userConfirmPwd: [{ required: true, message: "请输入确认密码", trigger: "blur" },
      { validator: this.validatePass, trigger: 'blur' }
    ]
  };

  // 提交
  save() {
    var flag = false;
    (this.$refs["infoModel"] as any).validate((valid: boolean) => {
      flag = valid;
    });
    if (!flag) {
      return;
    }
    const _this = this;
    var requestModel: any = {
      id: _this.userid,
      oldPwd: _this.infoModel.password,
      newPwd: _this.infoModel.userNewPwd
    };
    Vue.prototype.$http
      .post(apiConfig.API.passwordModify, requestModel)
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
    this.foc = val;
    if (val) {
      this.Init();
    }
    this.$emit("show-modifypwd-change", val);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "./../../assets/style/dialog.scss";
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
    height: 330px;
    position: absolute;
    top: 50%;
    margin-top: -180px;
    left: 50%;
    margin-left: -275px;
  }
}
</style>
