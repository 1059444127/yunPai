<template>
  <div class="confirm-referral"
        v-show="show"
        @scroll.prevent>

    <div class="confirm-referral-content">
        <div class="view-dialog">
            <div class="dialog-title">
                <span class="line"></span>{{dialogTitle}}
                <span class="close-dialog" @click="closeDialog()"><i class="el-icon-close"></i></span>
            </div>
            <div class="dialog-content" id="dialog-content">
                <div v-show="false"  class="dialog-content-title">
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
                            <span class="info-item-content w-140">{{dictValList.sex}}</span>
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
                            <span class="info-item-content w-694">{{dictValList.insuranceTypeCode}}</span>
                        </div>
                        <!-- <div class="userinfo-row">
                            <span class="user-contact-title userinfo-item-title">{{const_list.ReferralForm.Contact}}</span>
                            <span class="confirm-info user-contact">{{infoModel.contactName}}</span>
                            <span class="user-relationship-title userinfo-item-title">{{const_list.ReferralForm.Relationship}}</span>
                            <span class="confirm-info user-relationship">{{dictValList.contactRelationshipType}}</span>
                            <span class="user-contact-tel-title userinfo-item-title">{{const_list.ReferralForm.ContactTel}}</span>
                            <span class="confirm-info user-contact-tel">{{infoModel.contactPhone}}</span>
                        </div> -->
                        <div class="info-row">
                            <span class="info-item-title">{{const_list.ReferralForm.VisitTime}}</span>
                            <span class="info-item-content w-140">{{dtVisitStr}}</span>
                            <span class="info-item-title ml-50">{{const_list.ReferralForm.InitialDiagnosis}}</span>
                            <span class="info-item-content w-422">{{infoModel.diagnosis}}</span>
                        </div>
                        <div class="info-div">
                            <span class="info-item-title">{{const_list.ReferralForm.SummaryAndDiagnosis}}</span>
                            <div class="info-item-content ml-80 w-694">{{infoModel.diseaseSummary}}</div>
                        </div>
                        <div class="info-div">
                            <span class="info-item-title">{{const_list.ReferralForm.Attention}}</span>
                            <div class="info-item-content  ml-80 w-694">{{infoModel.attention}}</div>
                        </div>
                        <div class="info-div" v-show="false">
                            <span class="info-item-title">{{const_list.ReferralForm.Appendix}}</span>
                            <input type="file" class="addpendix"/><br>
                            <span class="info-item-content ml-80 w-694">{{const_list.ReferralForm.AppendixMsg}}</span>
                        </div>
                    </div>
                </div>
                <div class="dialog-info">
                    <div class="dialog-info-title">{{const_list.ReferralForm.ReferralInfo}}</div>
                    <div class="dialog-info-content">
                      <div class="info-row">
                        <span class="info-item-title">{{const_list.ReferralForm.ReferralDirection}}</span>
                        <span class="info-item-content w-140">{{dictValList.referralDirection}}</span>
                        <span class="info-item-title ml-50">{{const_list.ReferralForm.RollInHospital}}</span>
                        <span class="info-item-content w-422">{{infoModel.targetOrgName}} {{infoModel.targetDeptName}}</span>

                        <span class="roll-in-hospital-detail" v-show="false" @mousemove="rollInHospitalShow=true" @mouseout="[rollInHospitalShow=false]">
                          <span class="info-item-title">{{const_list.ReferralForm.RollInHospital}}</span>
                          <span class="info-item-content">{{infoModel.targetOrgName}} {{infoModel.targetDeptName}}</span>
                          <span class="info-item-content">{{infoModel.appointmentRegisterSummary}}</span>
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
                        <span class="info-item-title ml-50">{{const_list.ReferralForm.RollOutTime}}</span>
                        <span class="info-item-content w-140">{{submitState.dtAction}}</span>
                      </div>
                    </div>
                </div>
                <div class="dialog-info">
                  <div class="dialog-info-title">{{const_list.ReferralForm.ProcessedRecord}}</div>
                  <div class="dialog-info-content">
                    <div class="info-div">
                      <span class="record-content-icon">●</span>
                      <p class="info-item-content w-694">{{submitState.dtAction}} {{submitState.actionOrgName}} {{submitState.actionDeptName}} {{submitState.actionOperateName}}<br>{{submitState.actionMemo}}</p>
                    </div>
                    <div class="submit">
                      <div class="success-msg">转诊单提交成功。</div>
                    </div>
                  </div>
                </div>
            </div>
            <div class="dialog-btn-div">
              <el-button class="btn-cancel my-submit-btn" @click="closeDialog()">关闭</el-button>
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

@Component
export default class ConfirmReferral extends Vue {
  dialogTitle: string = "新建门诊转诊";
  dialogContentTitle: string = "转诊单";

  const_list = ConstList.Referral;
  dtVisitStr = "";

  //转诊单信息
  infoModel: any = {};
  //转诊单提交状态
  submitState: {} = {};
  //字典属性
  dictValList = {
    sex: "",
    insuranceTypeCode: "",
    contactRelationshipType: "",
    targetVisitType: "",
    referralDirection: ""
  };

  //转诊方向字典
  referralDirectionOptList = [
    {
      key: "",
      value: ""
    }
  ];
  //性别字典
  sexOptList = [
    {
      key: "",
      value: ""
    }
  ];
  //费用类型字典
  costTypeOptList = [
    {
      key: "",
      value: ""
    }
  ];
  //关系字典
  relationshipOptList = [
    {
      key: "",
      value: ""
    }
  ];
  //就诊类型字典
  visitTypeOptList = [
    {
      key: "",
      value: ""
    }
  ];

  InitUserInfo() {
    var objSubmitState: any = store.state.referral.submitState;
    this.infoModel = objSubmitState.userInfo;
    this.submitState = objSubmitState.result;

    var objDict: any = store.state.referral.dict;
    this.sexOptList = objDict.sex;
    this.costTypeOptList = objDict.insuranceType;
    this.visitTypeOptList = objDict.planVisit;
    this.relationshipOptList = objDict.contactRelationship;
    this.referralDirectionOptList = objDict.referralDirectionOptList;

    //获取性别字典属性值
    let objSex: any = this.sexOptList.find(item => {
      return item.key === this.infoModel.sex;
    });
    if (objSex !== undefined) {
      this.dictValList.sex = objSex.value;
    } else {
      this.dictValList.sex = "";
    }

    //获取费用类型字典属性值
    let objCostType: any = this.costTypeOptList.find(item => {
      return item.key === this.infoModel.insuranceTypeCode;
    });
    if (objCostType !== undefined) {
      this.dictValList.insuranceTypeCode = objCostType.value;
    } else {
      this.dictValList.insuranceTypeCode = "";
    }

    //获取关系字典属性值
    // let objRelationship: any = this.relationshipOptList.find(item => {
    //   return item.key === this.infoModel.contactRelationshipType;
    // });
    // this.dictValList.contactRelationshipType = objRelationship.value;

    //获取就诊类型字典属性值
    let objVisitType: any = this.visitTypeOptList.find(item => {
      return item.key === this.infoModel.targetVisitType;
    });
    if (objVisitType !== undefined) {
      this.dictValList.targetVisitType = objVisitType.value;
    } else {
      this.dictValList.targetVisitType = "";
    }

    //获取转诊方向字典属性值
    let objDirection: any = this.referralDirectionOptList.find(item => {
      return item.key === this.infoModel.referralDirection;
    });
    if (objDirection !== undefined) {
      this.dictValList.referralDirection = objDirection.value;
    } else {
      this.dictValList.referralDirection = "";
    }

    // 初始化日期格式
    this.dtVisitStr = this.getDateFormat(
      new Date(this.infoModel.dtVisit)
    );
  }

  getDateFormat(dt: Date): string {
    var str = "";
    str =
      dt.getFullYear() +
      "-" +
      ("00" + (dt.getMonth() + 1)).slice(-2) +
      "-" +
      ("00" + dt.getDate()).slice(-2) +
      " " +
      ("00" + dt.getHours()).slice(-2) +
      ":" +
      ("00" + dt.getMinutes()).slice(-2);
    return str;
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
    this.$emit("refresh-page", "");
    this.show = false;
    this.scrollToTop();
  }

  toConfirmReferral() {
    this.show = false;
    this.$emit("to-confirm", "");
    this.scrollToTop();
  }

  @Watch("show", { immediate: true })
  showChange(val: boolean) {
    this.showStatus = val;
    if (val) {
      this.InitUserInfo();
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
.confirm-referral {
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

  .confirm-referral-content {
    width: 890px;
    margin: 100px auto;
    height: calc(100% - 200px);

    .submit {
      text-align: center;
    }
    .record-content-icon {
      width: 18px;
      color: #1bd0a1;
    }
    .success-msg {
      display: inline-block;
      height: 110px;
      float: none;
      color: #19c498;
      font-size: 22px;
      line-height: 110px;
      padding-left: 110px;
      background: url("./../../../../assets/image/common_submit_success.png")
        no-repeat left;
    }
  }
}
</style>
