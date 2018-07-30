<template>
  <div class="audit-referral"
       v-show="show"
       @scroll.prevent>

    <div class="audit-referral-content">
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
                <span class="info-item-title ml-50">{{const_list.ReferralForm.Age}}</span>
                <span class="info-item-content w-140">{{infoModel.age}}{{infoModel.ageUnit}}</span>
              </div>
              <div class="info-row">
                <span class="info-item-title">{{const_list.ReferralForm.Address}}</span>
                <span class="info-item-content w-412">{{infoModel.patientAddress}}</span>
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
                <span class="info-item-content w-140">{{infoModel.diagnosis}}</span>
              </div>
              <div class="info-div">
                <span>{{const_list.ReferralForm.SummaryAndDiagnosis}}</span>
                <div class="info-item-content w-694 ml-80">{{infoModel.diseaseSummary}}</div>
              </div>
              <div class="info-div">
                <span class="info-item-title">{{const_list.ReferralForm.Attention}}</span>
                <div class="info-item-content w-694 ml-80">{{infoModel.attention}}</div>
              </div>
              <div class="info-row" v-show="false">
                <span class="info-item-title">{{const_list.ReferralForm.Appendix}}</span>
                <input type="file" class="addpendix"/><br>
                <span class="info-item-content">{{const_list.ReferralForm.AppendixMsg}}</span>
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
                <span class="info-item-content w-412">{{infoModel.targetOrgName}} {{infoModel.targetDeptName}}</span>

                <span v-show="false" class="info-row">
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
                <span class="info-item-content w-412">{{infoModel.reqDeptName}}</span>
              </div>
              <div class="info-row">
                <span class="info-item-title">{{const_list.ReferralForm.ReferralDoctor}}</span>
                <span class="info-item-content w-140">{{infoModel.reqDoctorName}}</span>
                <span class="info-item-title ml-50">{{const_list.ReferralForm.ContactTel}}</span>
                <span class="info-item-content w-140">{{infoModel.reqDoctorPhone}}</span>
                <span class="info-item-title ml-50">{{const_list.ReferralForm.RollOutTime}}</span>
                <span class="info-item-content w-140">{{infoModel.dtSubmit}}</span>
              </div>
            </div>
          </div>
          <div class="dialog-info" v-show="false">
            <div class="dialog-info-title">{{const_list.ReferralForm.ProcessedRecord}}</div>
            <div class="dialog-info-content">
              <div class="info-row"
                   v-for="item in infoModel.lstActionLog"
                   v-bind:key="item.index">
                <span class="record-content-icon">●</span>
                <p class="confirm-info record-content">
                  {{item.dtAction}} {{item.actionOrgName}} {{item.actionDeptName}} {{item.actionOperateName}}<br>{{item.actionMemo}}
                </p>
              </div>
            </div>
          </div>
          <div class="dialog-info" v-show="rollOutAuditShow">
            <div class="dialog-info-title">转出审核</div>
            <div class="audit-opinion">
              <span>审核意见：</span>
              <el-select clearable v-model="auditResult" size="mini" class="audit-opinion-select" placeholder="请选择"
                         :change="rollOutOpinionChange()">
                <el-option
                  v-for="item in rollOutOpinionOptList"
                  :key="item.key"
                  :label="item.value"
                  :value="item.key">
                </el-option>
              </el-select>
            </div>
            <br>
            <div class="audit-reject" v-show="showRejectDetail">
              <span>就诊科室：</span>
              <el-select clearable size="mini" v-model="sourceDeptName" class="audit-reject-select" placeholder="请选择">
                <el-option
                  v-for="item in rollOutDepartmentOptList"
                  :key="item.hcocode"
                  :label="item.hcodeptname"
                  :value="item.hcodeptname">
                </el-option>
              </el-select>
              <br><br>
              <span>拒绝原因：</span>
              <el-input class="reject-reason left" v-model="auditRefuseResult" size="mini"></el-input>
            </div>
            <el-button class="my-default-btn rollout-cancel-btn" @click="closeDialog()">取消</el-button>
            <el-button class="my-submit-btn rollout-submit-btn" @click="auditReferralOutByID()">保存</el-button>
          </div>
          <div class="dialog-info" v-show="rollInAuditShow">
            <div class="dialog-info-title">接收审核</div>
            <div class="dialog-info-content">
              <div class="input-row">
                <span class="info-item-title">接诊意见：</span>
                <el-select clearable v-model="acceptAuditResult" class="info-item-input w-150" size="small"
                           placeholder="请选择" :change="rollInOpinionChange()">
                  <el-option
                    v-for="item in rollInOpinionOptList"
                    :key="item.key"
                    :label="item.value"
                    :value="item.key">
                  </el-option>
                </el-select>
              </div>
              <div class="input-row" v-show="!showAcceptDetail">
                <span class="info-item-title">退回原因：</span>
                <el-input v-show="!showAcceptDetail" class="info-item-input w-694" v-model="acceptRefuseReason"
                          size="small"></el-input>
              </div>
            </div>
          </div>
          <div class="dialog-info" v-show="rollInAuditShow && showAcceptDetail">
            <div class="dialog-info-title">安排如下：</div>
            <div class="dialog-info-content">
              <!-- <div class="input-row">
                <span class="info-item-title">接诊方式：</span>
                <el-select clearable size="small" class="info-item-input w-150" v-model="planVisitType"
                           placeholder="请选择" :change="visitTypeChange()">
                  <el-option
                    v-for="item in visitTypeOptList"
                    :key="item.key"
                    :label="item.value"
                    :value="item.key">
                  </el-option>
                </el-select>
                <span class="info-item-title ml-40">就诊日期：</span>
                <el-date-picker
                  v-model="dtPlanVisit"
                  type="datetime"
                  placeholder="选择日期"
                  :clearable="false"
                  class="info-item-input w-150"
                  size="small">
                </el-date-picker>
              </div> -->
              <div class="input-row">
                <span class="info-item-title">就诊科室：</span>
                <el-select clearable v-model="planVisitDeptName"
                                      size="small"
                                      class="info-item-input w-150"
                                      placeholder="科室">
                            <el-option
                              v-for="item in planVisitDeptList"
                              :key="item.HCODeptCode"
                              :label="item.HCODeptName"
                              :value="item.HCODeptName">
                            </el-option>
                          </el-select>
                <!-- <span class="info-item-title  ml-40" v-show="visitWardShow">入住病区：</span>
                <el-input v-model="planVisitWardName" v-show="visitWardShow" class="info-item-input w-150"
                          size="small"></el-input> -->
                <span class="info-item-title  ml-40">接诊医生：</span>
                <el-input v-model="planAcceptDoctorName" maxlength="15" class="info-item-input w-150" size="small"></el-input>
                <span class="info-item-title ml-40">就诊日期：</span>
                <el-date-picker
                  v-model="dtPlanVisit"
                  type="datetime"
                  placeholder="选择日期"
                  :clearable="false"
                  class="info-item-input w-150"
                  size="small">
                </el-date-picker>
              </div>
              <div class="input-row">
                <span class="info-item-title">备　　注：</span>
                <el-input class="info-item-input w-694" maxlength="100" v-model="planMemo" size="small"></el-input>
              </div>
            </div>
          </div>
          <div class="audit-submit-msg" v-show="auditSubmitMsgShow">
            <div class="userinfo-row submit">
              <span class="success-msg">审核意见保存成功。</span>
            </div>
          </div>
        </div>

        <div class="dialog-btn-div">
          <el-button class="btn-cancel my-submit-btn"  v-show="auditSubmitMsgShow" @click="closeDialog()">关闭</el-button>
          <el-button class="my-default-btn rollin-cancel-btn" v-show="!auditSubmitMsgShow"  @click="closeDialog()">取消</el-button>
          <el-button class="my-submit-btn rollin-submit-btn" v-show="!auditSubmitMsgShow" @click="auditReferralInByID()">保存</el-button>
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

@Component
export default class AduitReferralForm extends Vue {
  dialogTitle: string = "";
  dialogContentTitle: string = "转诊单";

  const_list = ConstList.Referral;

  @Prop() show: boolean;
  showStatus: boolean = this.show;

  //转诊单ID
  @Prop() referralId: string;
  //判断审核类型
  @Prop() isRollOut: boolean;

  //转诊单信息
  infoModel: any = {};

  planVisitDeptList: any = [];

  //就诊科室字典
  rollOutDepartmentOptList = [
    {
      hcocode: "",
      hcodeptallas: "",
      hcodeptcode: "",
      hcodeptname: "",
      hconame: "",
      inputcode: ""
    }
  ];

  //接诊方式字典
  visitTypeOptList: any = [];

  //转出审核参数
  auditResult: string = "";
  sourceDeptName: string = "";
  showRejectDetail: boolean = false;
  auditRefuseResult: string = "";

  //接收审核参数
  acceptAuditResult: string = "";
  acceptRefuseReason: string = "";
  planVisitType: any = null;
  showAcceptDetail: boolean = true;
  planAcceptDoctorName: string = "";
  planVisitWardName: string = "";
  planVisitDeptName: string = "";
  dtPlanVisit: string = "";
  planMemo: string = "";

  // 显示/隐藏状态
  rollOutAuditShow: boolean = true;
  auditSubmitMsgShow: boolean = false;
  rollInAuditShow: boolean = false;
  visitWardShow: boolean = false;

  init() {
    this.getReferralInfoByID();
    this.getDepartmentDict();
    this.getRefferralDict();
    //this.visitTypeOptList = store.state.referral.dict.planVisit;

    // 初始化转出审核信息
    this.auditResult = "0";
    this.sourceDeptName = "";
    this.auditRefuseResult = "";

    // 初始化接收审核信息
    this.acceptAuditResult = "0";
    this.planVisitType = null;
    this.auditRefuseResult = "";
    this.dtPlanVisit = "";
    this.planVisitDeptName = "";
    this.planVisitWardName = "";
    this.planAcceptDoctorName = "";
    this.auditRefuseResult = "";
    this.planMemo = "";

    this.auditSubmitMsgShow = false;
  }

  //获取转诊字典
  getRefferralDict() {
    const _this = this;
    var reqList: string[] = ["PlanVisit"];

    Vue.prototype.$http
      .post(apiConfig.API.getRefferralDict, reqList)
      .then(function(response: any) {
        if (response.data.code === 0) {
          const data = response.data.data;
          _this.visitTypeOptList = data.planVisit;
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

  //获取转诊单信息
  getReferralInfoByID() {
    const _this = this;
    Vue.prototype.$http
      .post(apiConfig.API.getReferralInfoByID, _this.referralId)
      .then(function(response: any) {
        if (response.data.code === 0) {
          _this.infoModel = response.data.data;
          _this.planVisitType = _this.infoModel.targetVisitType;
          _this.dtPlanVisit = _this.infoModel.dtVisit;
          _this.planVisitDeptName = _this.infoModel.targetDeptName;
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

  //转出审核操作
  auditReferralOutByID() {
    const _this = this;

    if (_this.auditResult === "0") {
      _this.sourceDeptName = "";
      _this.auditRefuseResult = "";
    }

    var auditOutModel: {} = {
      referralId: _this.referralId,
      auditResult: _this.auditResult,
      sourceDeptName: _this.sourceDeptName,
      auditRefuseResult: _this.auditRefuseResult
    };

    Vue.prototype.$http
      .post(apiConfig.API.auditReferralOutByID, auditOutModel)
      .then(function(response: any) {
        if (response.data.code === 0) {
          _this.alert(ValidateInfo.AuditSuccess, "success");
          _this.infoModel.lstActionLog.push(response.data.data);
          _this.rollOutAuditShow = false;
          _this.auditSubmitMsgShow = true;
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
          _this.alert(ValidateInfo.AuditError, "error");
          console.log(response.data.code + ":" + response.data.message);
        }
      })
      .catch(function(error: any) {
        console.log(error);
      });
  }

  //接收审核操作
  auditReferralInByID() {
    const _this = this;

    if (_this.acceptAuditResult === "0") {
      _this.acceptRefuseReason = "";

      if (this.planVisitType === 0) {
        _this.planVisitWardName;
      }
    } else {
      _this.planVisitType = null;
      _this.dtPlanVisit = "";
      _this.planVisitDeptName = "";
      _this.planVisitWardName = "";
      _this.planAcceptDoctorName = "";
    }

    var auditInModel: {} = {
      referralId: _this.referralId,
      acceptAuditResult: _this.acceptAuditResult,
      planVisitType: _this.planVisitType,
      dtPlanVisit: _this.dtPlanVisit,
      planVisitDeptName: _this.planVisitDeptName,
      planVisitWardName: _this.planVisitWardName,
      planAcceptDoctorName: _this.planAcceptDoctorName,
      planMemo: _this.planMemo,
      acceptRefuseReason: _this.acceptRefuseReason
    };

    Vue.prototype.$http
      .post(apiConfig.API.auditReferralInByID, auditInModel)
      .then(function(response: any) {
        if (response.data.code === 0) {
          _this.alert(ValidateInfo.AuditSuccess, "success");
          _this.infoModel.lstActionLog.push(response.data.data);
          _this.rollInAuditShow = false;
          _this.showAcceptDetail = false;
          _this.auditSubmitMsgShow = true;
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
          _this.alert(ValidateInfo.AuditError, "error");
          console.log(response.data.code + ":" + response.data.message);
        }
      })
      .catch(function(error: any) {
        console.log(error);
      });
  }

  //获取发往科室字典
  getDepartmentDict() {
    const _this = this;

    var requestModel: {} = {
      hcocode: window.localStorage.getItem("hCOCode")
    };

    Vue.prototype.$http
      .post(apiConfig.API.getDepartmentDict, requestModel)
      .then(function(response: any) {
        if (response.data.code === 0) {
          _this.planVisitDeptList = response.data.data;
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

  @Watch("show", { immediate: true })
  showChange(val: boolean) {
    this.showStatus = val;
    if (val) {
      this.init();

      if (this.isRollOut) {
        this.rollOutAuditShow = true;
        this.rollInAuditShow = false;
        this.dialogTitle = "转出审核";
      } else {
        this.rollOutAuditShow = false;
        this.rollInAuditShow = true;
        //this.dialogTitle = "接收审核";
        this.dialogTitle = "门诊审核";
      }
    }
  }

  @Watch("showStatus", { immediate: true })
  showStatusChange(val: boolean) {
    this.$emit("show-statue-change", val);
  }

  //转出审核意见
  rollOutOpinionOptList: {}[] = [
    {
      key: "0",
      value: "同意转往其他医疗机构"
    },
    {
      key: "1",
      value: "本院治疗"
    }
  ];

  //接诊意见
  rollInOpinionOptList: {}[] = [
    {
      key: "0",
      value: "同意"
    },
    {
      key: "1",
      value: "退回"
    }
  ];

  rollOutOpinionChange() {
    if (this.auditResult === "1") {
      this.showRejectDetail = true;
    } else {
      this.showRejectDetail = false;
    }
  }

  rollInOpinionChange() {
    if (this.acceptAuditResult === "0") {
      this.showAcceptDetail = true;
    } else {
      this.showAcceptDetail = false;
    }
  }

  visitTypeChange() {
    if (this.planVisitType === 1) {
      this.visitWardShow = true;
    } else {
      this.visitWardShow = false;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "./../../../../assets/style/dialog.scss";
.audit-referral {
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

  .audit-referral-content {
    width: 890px;
    margin: 100px auto;
    height: calc(100% - 200px);

    .view-health-record-btn {
      margin-left: 5px;
      text-decoration: underline;
      color: #1bd0a1;
    }
    .audit-submit-msg {
      width: 100%;
      padding: 0px 50px 0 70px;

      .submit {
        text-align: center;

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

    .dialog-close {
      text-align: right;
    }
    .record-content-icon {
      width: 18px;
      color: #1bd0a1;
    }
  }
}
</style>
