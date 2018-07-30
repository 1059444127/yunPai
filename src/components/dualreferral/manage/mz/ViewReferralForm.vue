<template>
  <div class="view-referral"
      v-show="show"
      @scroll.prevent>

    <div class="view-referral-content">
        <div class="view-dialog">
            <div class="dialog-title">
                <span class="line"></span>{{dialogTitle}}
                <span class="close-dialog" @click="closeDialog()"><i class="el-icon-close"></i></span>
            </div>
            <div class="dialog-content" id="dialog-content">
                <div v-show="false" class="dialog-content-title">
                    {{dialogContentTitle}}
                </div>
                <div class="dialog-info">
                    <div class="dialog-info-title">{{const_list.ReferralForm.UserInfo}}</div>
                    <div class="dialog-info-content">
                        <div class="info-row">
                            <span class="info-item-title">{{const_list.ReferralForm.IdCard}}</span>
                            <span class="info-item-content w-422">{{infoModel.identityCardNo}}</span>
                            <el-button size="mini" @click="viewMedicalData()" class="my-submit-btn link-btn">病历资料</el-button>
                        </div>
                        <div class="info-row">
                            <span class="info-item-title">{{const_list.ReferralForm.Name}}</span>
                            <span class="info-item-content w-140">{{infoModel.patientName}}</span>
                            <span class="info-item-title ml-50">{{const_list.ReferralForm.Sex}}</span>
                            <span class="info-item-content w-140">{{infoModel.sexText}}</span>
                            <span class="info-item-title ml-60">{{const_list.ReferralForm.Age}}</span>
                            <span class="info-item-content w-140">{{infoModel.age}}{{infoModel.ageUnit}}</span>
                        </div>
                        <div class="info-row">
                            <span class="info-item-title">{{const_list.ReferralForm.Address}}</span>
                            <span class="info-item-content w-422">{{infoModel.patientAddress}}</span>
                            <span class="info-item-title ml-50">{{const_list.ReferralForm.PatientTel}}</span>
                            <span class="info-item-content w-140">{{infoModel.patientPhone}}</span>
                        </div>
                        <div class="info-row">
                            <span class="info-item-title">{{const_list.ReferralForm.ConstType}}</span>
                            <span class="info-item-content w-694">{{infoModel.insuranceTypeName}}</span>
                        </div>
                        <!-- <div class="userinfo-row">
                            <span class="user-contact-title userinfo-item-title">{{const_list.ReferralForm.Contact}}</span>
                            <span class="confirm-info user-contact">{{infoModel.contactName}}</span>
                            <span class="user-relationship-title userinfo-item-title">{{const_list.ReferralForm.Relationship}}</span>
                            <span class="confirm-info user-relationship">{{infoModel.contactRelationshipText}}</span>
                            <span class="user-contact-tel-title userinfo-item-title">{{const_list.ReferralForm.ContactTel}}</span>
                            <span class="confirm-info user-contact-tel">{{infoModel.contactPhone}}</span>
                        </div> -->
                        <div class="info-row">
                            <span class="info-item-title">{{const_list.ReferralForm.VisitTime}}</span>
                            <span class="info-item-content w-140">{{infoModel.dtVisit}}</span>
                            <span class="info-item-title ml-50">{{const_list.ReferralForm.InitialDiagnosis}}</span>
                            <span class="info-item-content w-422">{{infoModel.diagnosis}}</span>
                        </div>
                        <div class="info-div">
                            <span class="info-item-title">{{const_list.ReferralForm.SummaryAndDiagnosis}}</span>
                            <div class="info-item-content w-694 ml-80">{{infoModel.diseaseSummary}}</div>
                        </div>
                        <div class="info-div">
                            <span class="info-item-title">{{const_list.ReferralForm.Attention}}</span>
                            <div class="info-item-content w-694 ml-80">{{infoModel.attention}}</div>
                        </div>
                        <div class="info-div" v-show="false">
                            <span class="info-item-title">{{const_list.ReferralForm.Appendix}}</span>
                            <input type="file" class="addpendix"/><br>
                            <span class="userinfo-item-title appendix-msg">{{const_list.ReferralForm.AppendixMsg}}</span>
                        </div>
                    </div>
                </div>
                <div class="dialog-info">
                    <div class="dialog-info-title">{{const_list.ReferralForm.ReferralInfo}}</div>
                    <div class="dialog-info-content">
                      <div class="info-row">
                        <span class="info-item-title">{{const_list.ReferralForm.ReferralDirection}}</span>
                        <span class="info-item-content w-140">{{infoModel.referralDirectionText}}</span>
                        <span class="info-item-title ml-50">{{const_list.ReferralForm.RollInHospital}}</span>
                        <span class="info-item-content w-422">{{infoModel.targetOrgName}} {{infoModel.targetDeptName}}</span>

                        <span v-show="false" class="roll-in-hospital-detail">
                          <span class="info-item-title">{{const_list.ReferralForm.RollInHospital}}</span>
                          <span class="confirm-info roll-in-hospital">{{infoModel.targetOrgName}} {{infoModel.targetDeptName}}</span>
                          <span class="confirm-info roll-in-hospital-order">{{infoModel.appointmentRegisterSummary}}</span>
                        </span>
                      </div>
                      <div class="info-row">
                        <span class="info-item-title">{{const_list.ReferralForm.ReferralReason}}</span>
                        <span class="info-item-content w-694">{{infoModel.referralReasonName}}</span>

                      </div>
                      <div class="info-row">
                        <span class="info-item-title">{{const_list.ReferralForm.RollOutHospital}}</span>
                        <span class="info-item-content w-140">{{infoModel.reqOrgName}}</span>
                        <span class="info-item-title ml-50">{{const_list.ReferralForm.RollOutDepartment}}</span>
                        <span class="info-item-content w-422">{{infoModel.reqDeptName}}</span>
                      </div>
                      <div class="info-row">
                        <span class="info-item-title">{{const_list.ReferralForm.ReferralDoctor}}</span>
                        <span class="info-item-content w-140">{{infoModel.reqDoctorName}}</span>
                        <span class="info-item-title ml-50">{{const_list.ReferralForm.ContactTel}}</span>
                        <span class="info-item-content w-140">{{infoModel.reqDoctorPhone}}</span>
                        <span class="info-item-title ml-60">{{const_list.ReferralForm.RollOutTime}}</span>
                        <span class="info-item-content w-140">{{infoModel.dtSubmit}}</span>
                      </div>
                    </div>
                </div>
                <div class="dialog-info">
                  <div class="dialog-info-title">{{const_list.ReferralForm.ProcessedRecord}}</div>
                  <div class="dialog-info-content">
                    <div class="info-div"
                         v-for="item in infoModel.lstActionLog"
                         v-bind:key="item.index">
                      <span class="record-content-icon">●</span>
                      <p class="info-item-content w-694 ml-20">{{item.dtAction}} {{item.actionOrgName}} {{item.actionDeptName}} {{item.actionOperateName}}<br>{{item.actionMemo}}</p>
                    </div>
                  </div>
                </div>
            </div>
          <div class="dialog-btn-div">{{infoModel.status}}
            <el-button class="my-submit-btn" v-show="false" @click="cancelReferral()">取消转诊</el-button>
            <el-button class="my-default-btn"  v-show="false" @click="showMsg()">留言</el-button>
            <el-button class="my-default-btn" @click="closeDialog()">关闭</el-button>
          </div>
        </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop, Watch } from "vue-property-decorator";
import ConstList from "./../../../../utils/ConstList";
import store from "./../../../../vuex/store";
import * as types from "./../../../../vuex/types";
import * as apiConfig from "./../../../../api/config";
import ValidateInfo from "./../../../../utils/ValidateInfo";
import ValidateRules from "./../../../../utils/ValidateRules";

@Component
export default class ViewReferralForm extends Vue {
  dialogTitle: string = "查看";
  dialogContentTitle: string = "转诊单";

  const_list = ConstList.Referral;

  @Prop() show: boolean;
  showStatus: boolean = this.show;

  //转诊单ID
  @Prop() referralId: string;

  //转诊单信息
  infoModel: any = {};

  init() {
    this.infoModel = {};
    this.getReferralInfoByID();
  }

  getReferralInfoByID() {
    const _this = this;
    Vue.prototype.$http
      .post(apiConfig.API.getReferralInfoByID, _this.referralId)
      .then(function(response: any) {
        if (response.data.code === 0) {
          _this.infoModel = response.data.data;
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
          console.log(response.data.code + ":" + response.data.message);
        }
      })
      .catch(function(error: any) {
        alert("获取信息出错！");
        _this.closeDialog();
        console.log(error);
      });
  }

  //取消转诊单
  cancelReferral() {
    const _this = this;
    Vue.prototype.$http
      .post(apiConfig.API.cancelReferralByID, _this.referralId)
      .then(function(response: any) {
        if (response.data.code === 0) {
          alert("取消成功！");
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
          console.log(response.data.code + ":" + response.data.message);
        }
      })
      .catch(function(error: any) {
        console.log(error);
      });
  }

  //打开地址
  viewMedicalData() {
    // 判断当前用户是否存在病历信息
    if (this.infoModel.identityCardNo === "") {
      this.alert("暂无病历资料！");
      return;
    }

    // 确保是在网站的根目录下打开
    var rootPath = window.location.href.split("#")[0];
    window.open(`${rootPath}#/medicaldata?identityCardNo=${this.infoModel.identityCardNo}`);
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

  showMsg() {
    alert("功能开发中..");
  }

  @Watch("show", { immediate: true })
  showChange(val: boolean) {
    this.showStatus = val;

    if (val) {
      this.init();
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
@import "./../../../../assets/style/dialog.scss";

.view-referral {
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

  .view-referral-content {
    width: 890px;
    margin: 100px auto;
    height: calc(100% - 200px);

    .view-health-record-btn {
      margin-left: 5px;
      text-decoration: underline;
      color: #1bd0a1;
    }
  }
}

.record-content-icon {
  width: 18px;
  color: #1bd0a1;
}

.btn-cancel {
  margin-left: 30px;
}
</style>
