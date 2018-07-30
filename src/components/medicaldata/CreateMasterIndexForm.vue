<template>
  <div class="create-medical"
       v-show="show"
       @scroll.prevent>

    <div class="create-medical-content" >
      <div class="view-dialog">
        <div class="dialog-title">
          <span class="line"></span>编辑病历概述
          <span class="close-dialog" @click="closeDialog()"><i class="el-icon-close"></i></span>
        </div>
        <div class="dialog-content" id="dialog-content" @scroll.prevent>

          <div class="dialog-info">
            <!-- 病例概述-->
            <div class="dialog-info-content">
              <el-form clearValidate >
                <div class="input-row">
                  <span class="info-item-title">就诊日期：</span>
                  <el-date-picker
                    v-model="infoModel.visitStartDT"
                    type="date"
                    placeholder="选择日期"
                    :clearable="false"
                    class="info-item-input w-150"
                    size="small"
                    disabled="true">
                  </el-date-picker>
                  <span class="required-item"></span>
                </div>
                <div class="input-row">
                  <span class="info-item-title">身高(cm)：</span>
                  <el-input  v-model="infoModel.hight" class="info-item-input w-150" maxlength="10" size="small" placeholder="输入身高"></el-input>

                  <span class="info-item-title ml-50">体重(kg)：</span>
                  <el-input  v-model="infoModel.weight" class="info-item-input w-150" maxlength="10" size="small" placeholder="输入体重"></el-input>
                </div>
                <div class="input-row">
                  <span class="info-item-title">心率(bpm)：</span>
                  <el-input  v-model="infoModel.p" class="info-item-input w-150" maxlength="10" size="small" placeholder="输入心率"></el-input>

                  <span class="info-item-title ml-50">体温(℃)：</span>
                  <el-input  v-model="infoModel.t"  class="info-item-input w-150" maxlength="10" size="small" placeholder="输入体温"></el-input>
                </div>
                <div class="input-row">
                  <span class="info-item-title">收缩压(mmHg)：</span>
                  <el-input  v-model="infoModel.systolicPressure" class="info-item-input w-150" maxlength="10" size="small" placeholder="输入收缩压"></el-input>

                  <span class="info-item-title ml-50">舒张压(mmHg)：</span>
                  <el-input  v-model="infoModel.diastolicPressure" class="info-item-input w-150" maxlength="10" size="small" placeholder="输入舒张压"></el-input>
                </div>
                <div class="input-div">
                  <span class="info-item-title">主诉：</span>
                  <el-input class="info-item-textarea w-600"
                            v-model="infoModel.chiefComplaint"
                            placeholder="请输入主诉"
                            type="textarea"
                            size="small"
                            resize="none"
                            maxlength="250"
                            rows="6">
                  </el-input>
                </div>
                <div class="input-div">
                  <span class="info-item-title">临床诊断：</span>
                  <el-input class="info-item-textarea w-600"
                            v-model="infoModel.diagnosis"
                            placeholder="请输入临床诊断"
                            type="textarea"
                            size="small"
                            resize="none"
                            maxlength="250"
                            rows="6">
                  </el-input>
                </div>
              </el-form>
            </div>

          </div>
        </div>
        <div class="dialog-btn-div">
          <el-button  class="my-default-btn cancel-btn" @click="closeDialog()">取消</el-button>
          <el-button  class="btn-submit my-submit-btn" @click="saveVisitMaster()">保存</el-button>
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
import ValidateInfo from "../../utils/ValidateInfo";

@Component
export default class CreateReferral extends Vue {
  infoModel: any = {};

  @Prop() show: boolean = false;
  @Prop() currentRecordId: string;
  @Prop() patientID: string;

  mounted() {}

  Init() {
    this.infoModel = {};
    this.getVisitMaster();
  }

  //保存病例概述
  saveVisitMaster() {
    const _this = this;
    var requestModel = {
      filter: {
        id: _this.currentRecordId,
        patientID: _this.patientID
      },
      record: _this.infoModel
    };
    Vue.prototype.$http
      .post(apiConfig.API.modifyVisitMasterIndex, requestModel)
      .then(function(response: any) {
        if (response.data.code === 0) {
          _this.$emit("refresh");
          _this.closeDialog();
          //_this.alert(ValidateInfo.CreateSuccess, "success");
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
      })
      .catch(function(error: any) {
        console.log(error);
      });
  }

  getVisitMaster() {
    const _this = this;
    _this.infoModel.patientID = _this.patientID;
    _this.infoModel.id = _this.currentRecordId;
    Vue.prototype.$http
      .post(apiConfig.API.searchVisitMasterIndex, {
        id: _this.currentRecordId,
        patientID: _this.patientID
      })
      .then(function(response: any) {
        if (response.data.code === 0) {
          _this.infoModel = response.data.data[0];
          //_this.alert(ValidateInfo.CreateSuccess, "success");
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
    width: 890px;
    margin: 160px auto;
    height: calc(100% - 320px);

    .info-item-title {
      width: 112px;
    }
    .el-input__inner {
      padding: 0 !important;
    }
    .input-div {
      .el-form-item {
        margin-left: 82px !important;
      }
    }
  }

  @media screen and (max-width: 1366px) {
    .create-medical-content {
      width: 890px;
      margin: 50px auto;
      height: calc(100% - 100px);
    }
  }
}
</style>
