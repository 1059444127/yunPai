<template>
  <div class="create-referral"
        v-show="show"
        @scroll.prevent>

    <div class="create-referral-content" ref:referralContent>
        <div class="view-dialog">
            <div class="dialog-title">
                <span class="line"></span>{{dialogTitle}}
                <span class="close-dialog" @click="closeDialog()"><i class="el-icon-close"></i></span>
            </div>
            <div class="dialog-content" id="dialog-content" @scroll.prevent>
                <div v-show="false" class="dialog-content-title">
                    {{dialogContentTitle}}
                </div>
                <el-form clearValidate :model="infoModel" :rules="rules" ref="infoModel">
                  <div class="dialog-info">
                      <div class="dialog-info-title">{{const_list.ReferralForm.UserInfo}}</div>
                      <div class="dialog-info-content">
                          <div class="input-row">
                              <span class="info-item-title">{{const_list.ReferralForm.IdCard}}</span>
                              <el-form-item prop="identityCardNo" class="info-item-input w-422">
                                <el-input class="info-item-input w-422" v-focus="foc" @blur="foc=false" prop v-model="infoModel.identityCardNo" size="small"></el-input>
                              </el-form-item>
                              <span class="down-userinfo pointer"></span>
                              <el-button size="mini" @click="viewMedicalData()" class="my-submit-btn link-btn">病历资料</el-button>
                          </div>
                          <div class="input-row">
                              <span class="info-item-title">{{const_list.ReferralForm.Name}}</span>
                              <el-form-item prop="patientName" class="info-item-input w-150">
                                <el-input class="info-item-input w-150" maxlength="15" v-model="infoModel.patientName" size="small"></el-input>
                              </el-form-item>
                              <span class="required-item"></span>
                              <span class="info-item-title ml-30">{{const_list.ReferralForm.Sex}}</span>
                              <el-form-item prop="sex" class="info-item-input w-150">
                              <el-select clearable v-model="infoModel.sex" size="small" class="info-item-input w-150" placeholder="请选择">
                                <el-option
                                  v-for="item in sexOptList"
                                  :key="item.key"
                                  :label="item.value"
                                  :value="item.key">
                                </el-option>
                              </el-select>
                              </el-form-item>
                              <span class="required-item"></span>
                              <span class="info-item-title ml-30">{{const_list.ReferralForm.Age}}</span>
                              <el-form-item prop="age" class="info-item-input w-60">
                                <el-input class="info-item-input w-60" maxlength="3" v-model="infoModel.age" size="small"></el-input>
                              </el-form-item>
                              <span class="required-item"></span>
                              <el-select clearable v-model="infoModel.ageUnit" size="small" class="info-item-input w-80" placeholder="请选择">
                                <el-option
                                  v-for="item in ageUnitOptList"
                                  :key="item.key"
                                  :label="item.value"
                                  :value="item.value">
                                </el-option>
                              </el-select>
                          </div>
                          <div class="input-row">
                              <span class="info-item-title">{{const_list.ReferralForm.Address}}</span>
                              <el-form-item prop="patientAddress" class="info-item-input w-422">
                                <el-input v-model="infoModel.patientAddress" maxlength="100" size="small"></el-input>
                              </el-form-item>
                              <span class="info-item-title ml-40">{{const_list.ReferralForm.PatientTel}}</span>
                              <el-input class="info-item-input w-150" maxlength="20" v-model="infoModel.patientPhone" size="small"></el-input>
                          </div>
                          <div class="input-row">
                              <span class="info-item-title">{{const_list.ReferralForm.ConstType}}</span>
                              <el-select clearable v-model="infoModel.insuranceTypeCode" size="small" class="info-item-input w-422" placeholder="请选择">
                                <el-option
                                  v-for="item in costTypeOptList"
                                  :key="item.key"
                                  :label="item.value"
                                  :value="item.key">
                                </el-option>
                              </el-select>
                          </div>
                          <!-- <div class="userinfo-row">
                              <span class="user-contact-title userinfo-item-title">{{const_list.ReferralForm.Contact}}</span>
                              <el-input v-model="infoModel.contactName" class="user-contact left" size="mini"></el-input>
                              <span class="user-relationship-title userinfo-item-title">{{const_list.ReferralForm.Relationship}}</span>
                              <el-select clearable v-model="infoModel.contactRelationshipType" size="mini" class="user-relationship left" placeholder="请选择">
                                <el-option
                                  v-for="item in relationshipOptList"
                                  :key="item.key"
                                  :label="item.value"
                                  :value="item.key">
                                </el-option>
                              </el-select>
                              <span class="user-contact-tel-title userinfo-item-title">{{const_list.ReferralForm.ContactTel}}</span>
                              <el-input class="user-contact-tel left" v-model="infoModel.contactPhone" size="mini"></el-input>
                          </div> -->
                          <div class="input-row">
                              <span class="info-item-title">{{const_list.ReferralForm.VisitTime}}</span>
                              <el-date-picker
                                v-model="infoModel.dtVisit"
                                type="datetime"
                                placeholder="选择日期"
                                :clearable="false"
                                class="info-item-input w-150"
                                size="small">
                              </el-date-picker>
                              <span class="info-item-title ml-40">{{const_list.ReferralForm.InitialDiagnosis}}</span>
                              <el-form-item prop="diagnosis" class="info-item-input w-422">
                                <el-input v-model="infoModel.diagnosis" maxlength="250" size="small"></el-input>
                              </el-form-item>
                          </div>
                          <div class="input-div">
                              <span class="info-item-title">{{const_list.ReferralForm.SummaryAndDiagnosis}}</span>
                              <el-form-item prop="diseaseSummary">
                                <el-input type="textarea"
                                          maxlength="2500"
                                          class="info-item-textarea w-694"
                                          style="float:left !important"
                                          v-model="infoModel.diseaseSummary"
                                          size="small"
                                          resize="none"
                                          rows="4">
                                </el-input>
                              </el-form-item>
                          </div>
                          <div class="input-div">
                              <span class="info-item-title">{{const_list.ReferralForm.Attention}}</span>
                              <el-form-item prop="attention"  >
                                <el-input type="textarea"
                                          maxlength="2500"
                                          class="info-item-textarea w-694"
                                          style="float:left !important"
                                          v-model="infoModel.attention"
                                          size="small"
                                          resize="none"
                                          rows="3">
                                </el-input>
                              </el-form-item>
                          </div>
                          <div class="input-row" v-show="false">
                              <span class="info-item-title">{{const_list.ReferralForm.Appendix}}</span>
                              <el-upload
                                class="addpendix"
                                action=""
                                multiple
                                :limit="3">
                                <el-button size="small">点击上传</el-button>
                              </el-upload>
                              <span class="info-item-title">{{const_list.ReferralForm.AppendixMsg}}</span>
                          </div>
                      </div>
                  </div>
                  <div class="dialog-info">
                      <div class="dialog-info-title">{{const_list.ReferralForm.ReferralInfo}}</div>
                      <div class="dialog-info-content">
                        <div class="input-row">
                          <span class="info-item-title">{{const_list.ReferralForm.ReferralDirection}}</span>
                          <el-form-item prop="referralDirection" class="info-item-input w-150">
                            <el-select  v-model="infoModel.referralDirection"
                                      size="small"
                                      placeholder="请选择"
                                      @change="referralDirectionChange">
                              <el-option
                                v-for="item in referralDirectionOptList"
                                :key="item.key"
                                :label="item.value"
                                :value="item.key">
                              </el-option>
                            </el-select>
                          </el-form-item>
                          <span class="info-item-title ml-40">{{const_list.ReferralForm.RollInHospital}}</span>
                          <el-form-item prop="targetOrgCode" class="info-item-input w-150">
                            <el-select clearable v-model="infoModel.targetOrgCode"
                                      size="small"
                                      @change="getDepartmentDict"
                                      placeholder="请选择">
                              <el-option
                                v-for="item in hospitalInfoList"
                                :key="item.hCOCode"
                                :label="item.hCOName"
                                :value="item.hCOCode">
                              </el-option>
                            </el-select>
                          </el-form-item>
                          <span class="required-item"></span>
                          <span class="info-item-title ml-40">{{const_list.ReferralForm.RollInDept}}</span>
                            <el-select clearable v-model="infoModel.targetDeptCode"
                                        size="mini"
                                        class="info-item-input w-150"
                                        placeholder="请选择">
                              <el-option
                                v-for="item in rollOutDepartmentOptList"
                                :key="item.HCODeptCode"
                                :label="item.HCODeptName"
                                :value="item.HCODeptCode">
                              </el-option>
                            </el-select>
                          <span class="roll-in-hospital-detail" v-show="false">
                            <span class="info-item-title ml-40">{{const_list.ReferralForm.RollInHospital}}</span>
                            <el-button class="roll-in-hospital my-btn my-btn-radius on" size="small" @click="toHospitalList()">选择</el-button>
                          </span>
                          <span class="roll-in-hospital-detail"
                              @mousemove="rollInHospitalShow=true"
                              @mouseout="[rollInHospitalShow=false]"
                              v-show="false">
                              <span class="info-item-title">{{const_list.ReferralForm.RollInHospital}}</span>
                              <span class="confirm-info roll-in-hospital">
                                {{infoModel.targetOrgName}} {{infoModel.targetDeptName}}
                                <el-button class="info-item-input w-150"
                                          size="small"
                                          v-show="rollInHospitalShow"
                                          @click="toHospitalList">重新选择</el-button>
                              </span>
                              <span class="confirm-info roll-in-hospital-order">{{infoModel.appointmentRegisterSummary}}</span>
                          </span>
                        </div>
                        <div class="input-row">
                          <span class="info-item-title">{{const_list.ReferralForm.ReferralReason}}</span>
                          <el-input class="info-item-input w-422" v-model="infoModel.referralReasonName" size="small"></el-input>
                          <!-- <el-form-item prop="referralReasonCode" class="info-item-input w-422">
                            <el-select clearable v-model="infoModel.referralReasonCode" size="small" class="info-item-input w-422" placeholder="请选择">
                              <el-option
                                v-for="item in referralReasonOptList"
                                :key="item.referralreasoncode"
                                :label="item.referralreasonname"
                                :value="item.referralreasoncode">
                              </el-option>
                            </el-select>
                          </el-form-item> -->
                        </div>
                        <div class="input-row">
                          <span class="info-item-title">{{const_list.ReferralForm.RollOutHospital}}</span>
                          <el-input class="info-item-input w-150" disabled v-model="infoModel.reqOrgName" size="small"></el-input>
                          <!-- <el-select clearable
                            v-model="infoModel.reqOrgCode"
                            size="mini"
                            class="roll-out-hospital left"
                            filterable
                            remote
                            placeholder=""
                            :remote-method="getHCODict"
                            :loading="hcodLoading"
                            @change="getDepartmentDictByHCOCode">
                            <el-option
                              v-for="item in rollOutHospitalOptList"
                              :key="item.hcocode"
                              :label="item.hconame"
                              :value="item.hcocode">
                            </el-option>
                          </el-select>  -->
                          <span class="info-item-title ml-40">{{const_list.ReferralForm.RollOutDepartment}}</span>
                          <el-input class="info-item-input w-150" disabled v-model="infoModel.reqDeptName" size="small"></el-input>
                          <!-- <el-select clearable v-model="infoModel.reqDeptCode" size="mini" class="roll-out-department left" placeholder="请选择">
                            <el-option
                              v-for="item in rollOutDepartmentOptList"
                              :key="item.hcodeptcode"
                              :label="item.hcodeptname"
                              :value="item.hcodeptcode">
                            </el-option>
                          </el-select> -->
                        </div>
                        <div class="input-row">
                          <span class="info-item-title">{{const_list.ReferralForm.ReferralDoctor}}</span>
                          <el-form-item prop="reqDoctorName" class="info-item-input w-150">
                            <el-input v-model="infoModel.reqDoctorName" maxlength="15" size="small"></el-input>
                          </el-form-item>
                          <span class="required-item"></span>

                          <span class="info-item-title ml-30">{{const_list.ReferralForm.ContactTel}}</span>
                          <el-form-item prop="reqDoctorPhone" class="info-item-input w-150">
                             <el-input  maxlength="20" v-model="infoModel.reqDoctorPhone" size="small"></el-input>
                          </el-form-item>
                          <span class="required-item"></span>
                        </div>
                      </div>
                  </div>
                </el-form>
            </div>
          <div class="dialog-btn-div">
            <el-button class="btn-cancel my-default-btn" @click="closeDialog()">取消</el-button>
            <el-button :disabled="subBtnDisabled" class="btn-submit my-submit-btn" @click="submitReferralInfo()">提交</el-button>
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
export default class CreateReferral extends Vue {
  dialogTitle: string = "新建门诊转诊";
  dialogContentTitle: string = "转诊单";
  rollInHospitalShow: boolean = false;
  const_list = ConstList.Referral;
  subBtnDisabled: boolean = false;
  foc: boolean = true;

  @Prop() paraminfo: any;

  // 转诊信息结构体
  infoModel = {
    identityCardNo: "",
    patientName: "",
    sex: "",
    age: "",
    ageUnit: "",
    insuranceTypeCode: "",
    patientAddress: "",
    patientPhone: "",
    contactName: "",
    contactRelationshipType: null,
    contactPhone: "",
    dtVisit: Date.now(),
    diagnosis: "",
    diseaseSummary: "",
    attention: "",
    targetVisitType: 0,
    targetOrgCode: "",
    targetOrgName: "",
    targetDeptCode: "",
    targetDeptName: "",
    appointmentRegisterID: "",
    appointmentRegisterSummary: "",
    referralDirection: 0,
    referralReasonCode: "",
    referralReasonName: "",
    reqOrgCode: "",
    reqOrgName: "",
    reqDeptCode: "",
    reqDeptName: "",
    reqDoctorID: "",
    reqDoctorName: "",
    reqDoctorPhone: "",
    parentReferralID: ""
  };

  rules = {
    sex: { required: true, message: "请选择性别", trigger: "change" },
    patientName: { required: true, message: "请输入姓名", trigger: "blur" },
    age: { validator: ValidateRules.age, trigger: "blur" },
    targetOrgCode: {
      required: true,
      message: "请选择转往医院",
      trigger: "change"
    },
    reqDoctorName: {
      required: true,
      message: "请输入转诊医生",
      trigger: "blur"
    },
    reqDoctorPhone: {
      required: true,
      message: "请输入联系电话",
      trigger: "blur"
    }
  };

  // 初次创建初始化
  Init() {
    var form = this.$refs["infoModel"] as any;
    if (form != null) {
      form.clearValidate();
    }

    this.rollOutDepartmentOptList = [];
    this.infoModel = {
      identityCardNo: "",
      patientName: "",
      sex: "",
      age: "",
      ageUnit: "",
      insuranceTypeCode: "",
      patientAddress: "",
      patientPhone: "",
      contactName: "",
      contactRelationshipType: null,
      contactPhone: "",
      //dtVisit: this.getCurDateTime(),
      dtVisit: Date.now(),
      diagnosis: "",
      diseaseSummary: "",
      attention: "",
      targetVisitType: 0,
      targetOrgCode: "",
      targetOrgName: "",
      targetDeptCode: "",
      targetDeptName: "",
      appointmentRegisterID: "",
      appointmentRegisterSummary: "",
      referralDirection: 0,
      referralReasonCode: "",
      referralReasonName: "",
      reqOrgCode: "",
      reqOrgName: "",
      reqDeptCode: "",
      reqDeptName: "",
      reqDoctorID: "",
      reqDoctorName: "",
      reqDoctorPhone: "",
      parentReferralID: ""
    };

    this.referralReasonOptList = [];
    this.getHCOForReferral();

    this.subBtnDisabled = false;
    this.infoModel.reqOrgCode = store.state.user.hCOCode;
    this.infoModel.reqOrgName = store.state.user.hCOName;
    this.infoModel.reqDeptCode = store.state.user.hCODeptCode;
    this.infoModel.reqDeptName = store.state.user.hCODeptName;
    this.infoModel.reqDoctorName = store.state.user.userName;
    this.infoModel.reqDoctorID = store.state.user.id;
    this.infoModel.reqDoctorPhone = store.state.user.phone;

    // 设置默认选中值
    this.infoModel.ageUnit = "岁";
  }

  //再次转诊初始化
  reReferralInit(obj: any) {
    this.infoModel.identityCardNo = obj.identityCardNo;
    this.infoModel.patientName = obj.patientName;
    this.infoModel.sex = obj.sex;
    this.infoModel.age = obj.age;
    this.infoModel.ageUnit = obj.ageUnit;
    this.infoModel.insuranceTypeCode = obj.insuranceTypeCode;
    this.infoModel.patientAddress = obj.patientAddress;
    this.infoModel.patientPhone = obj.patientPhone;
    this.infoModel.contactName = obj.contactName;
    this.infoModel.contactRelationshipType = obj.contactRelationshipType;
    this.infoModel.contactPhone = obj.contactPhone;
    this.infoModel.parentReferralID = this.paraminfo.id;

    // 退回状态下以下字段内容保留
    if (this.paraminfo.status === 10 || this.paraminfo.status === 11) {
      this.infoModel.dtVisit = obj.dtVisit;
      this.infoModel.diagnosis = obj.diagnosis;
      this.infoModel.diseaseSummary = obj.diseaseSummary;
      this.infoModel.attention = obj.attention;
    }
  }

  getCurDateTime(): any {
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();

    var currentdate =
      date.getFullYear() +
      seperator1 +
      month +
      seperator1 +
      strDate +
      " " +
      date.getHours() +
      seperator2 +
      date.getMinutes() +
      seperator2 +
      date.getSeconds();
    return currentdate;
  }

  mounted() {
    this.getRefferralDict();
    this.Init();
  }

  //年龄单位字典
  ageUnitOptList: {}[] = [
    {
      key: "0",
      value: "岁"
    },
    {
      key: "1",
      value: "月"
    },
    {
      key: "2",
      value: "周"
    },
    {
      key: "3",
      value: "天"
    },
    {
      key: "4",
      value: "小时"
    }
  ];
  //转诊方向字典
  referralDirectionOptList = [
    {
      key: 0,
      value: "上转"
    },
    {
      key: 1,
      value: "下转"
    }
  ];
  //性别字典
  sexOptList: {}[] = [];
  //费用类型字典
  costTypeOptList: {}[] = [];
  //关系字典
  relationshipOptList: {}[] = [];
  //就诊类型字典
  visitTypeOptList: {}[] = [];
  //转诊原因字典
  referralReasonOptList = [];
  //转往医院字典
  hospitalInfoList: {}[] = [];
  //转往科室字典
  rollOutDepartmentOptList = [];
  //获取转诊字典
  getRefferralDict() {
    const _this = this;
    var reqList: string[] = [
      "Sex",
      "PlanVisit",
      "InsuranceType",
      "ContactRelationship"
    ];

    Vue.prototype.$http
      .post(apiConfig.API.getRefferralDict, reqList)
      .then(function(response: any) {
        if (response.data.code === 0) {
          const data = response.data.data;
          _this.sexOptList = data.sex;
          _this.costTypeOptList = data.insuranceType;
          _this.relationshipOptList = data.contactRelationship;
          _this.visitTypeOptList = data.planVisit;

          store.commit(types.REFERRALDICT, {
            sex: data.sex,
            planVisit: data.planVisit,
            insuranceType: data.insuranceType,
            contactRelationship: data.contactRelationship,
            referralDirectionOptList: _this.referralDirectionOptList
          });
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

  // 转诊方向改变事件
  referralDirectionChange(value: any) {
    this.getReferralReasonByTypeDict(value);
  }

  //获取转诊原因字典
  getReferralReasonByTypeDict(value: any) {
    const _this = this;

    var reasonType: number = 0;
    if (value === 0) {
      reasonType = 1;
    } else if (value === 1) {
      reasonType = 2;
    }

    Vue.prototype.$http
      .post(apiConfig.API.getReferralReasonByType, reasonType)
      .then(function(response: any) {
        if (response.data.code === 0) {
          _this.referralReasonOptList = response.data.data;
          _this.infoModel.referralReasonCode = "";
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

  //预约成功后更新状态
  updateAppointInfo() {
    this.infoModel.targetOrgCode = store.state.referral.selectHospital.hcocode;
    this.infoModel.targetOrgName = store.state.referral.selectHospital.hconame;
    this.infoModel.targetDeptCode =
      store.state.referral.selectDepartment.deptcode;
    this.infoModel.targetDeptName =
      store.state.referral.selectDepartment.deptname;
    this.infoModel.appointmentRegisterSummary =
      store.state.referral.appointmentInfo;
  }

  //根据转诊单ID获取信息
  getReferralInfoByID() {
    const _this = this;
    Vue.prototype.$http
      .post(apiConfig.API.getReferralInfoByID, _this.paraminfo.id)
      .then(function(response: any) {
        if (response.data.code === 0) {
          _this.reReferralInit(response.data.data);
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

  // 获取当前用户可转诊的医院列表
  getHCOForReferral() {
    this.hospitalInfoList = [];
    const _this = this;

    var requestValue = "0"; // 0:不包含当前机构,1:包含

    Vue.prototype.$http
      .post(apiConfig.API.getHealthCareOrganizationDict, requestValue)
      .then(function(response: any) {
        if (response.data.code === 0) {
          _this.hospitalInfoList = response.data.data;
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
          console.log(response.data.code + ":" + response.data.message);
        }
      })
      .catch(function(error: any) {
        console.log(error);
      });
  }

  //获取发往科室字典
  getDepartmentDict(value: any) {
    const _this = this;

    var requestModel: {} = {
      hcocode: value
    };

    Vue.prototype.$http
      .post(apiConfig.API.getDepartmentDict, requestModel)
      .then(function(response: any) {
        if (response.data.code === 0) {
          _this.rollOutDepartmentOptList = response.data.data;
          _this.infoModel.targetDeptCode = "";
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

  //提交转诊单
  submitReferralInfo() {
    var flag = false;
    (this.$refs["infoModel"] as any).validate((valid: boolean) => {
      flag = valid;
    });
    if (!flag) {
      return;
    }

    this.subBtnDisabled = true;
    const _this = this;

    // 根据选中的转往医院code获取内容
    let objTargetHCO: any = this.hospitalInfoList.find(item => {
      return (item as any).hCOCode === _this.infoModel.targetOrgCode;
    });
    if (objTargetHCO !== undefined) {
      _this.infoModel.targetOrgName = objTargetHCO.hCOName;
    } else {
      _this.infoModel.targetOrgName = "";
    }

    // 根据选中的转往科室code获取内容
    let objTargetDept: any = this.rollOutDepartmentOptList.find(item => {
      return (item as any).HCODeptCode === _this.infoModel.targetDeptCode;
    });
    if (objTargetDept !== undefined) {
      _this.infoModel.targetDeptName = objTargetDept.HCODeptName;
    } else {
      _this.infoModel.targetDeptName = "";
    }

    // 根据选中的转诊原因code获取内容
    // let objReason: any = this.referralReasonOptList.find(item => {
    //   return (
    //     (item as any).referralreasoncode === _this.infoModel.referralReasonCode
    //   );
    // });
    // if (objReason !== undefined) {
    //   _this.infoModel.referralReasonName = objReason.referralreasonname;
    // } else {
    //   _this.infoModel.referralReasonName = "";
    // }

    // 判断医生名字是否被更改
    if (this.infoModel.reqDoctorName !== store.state.user.userName) {
      this.infoModel.reqDoctorID = "";
    } else {
      this.infoModel.reqDoctorID = store.state.user.id;
    }

    Vue.prototype.$http
      .post(apiConfig.API.submitReferralInfo, _this.infoModel)
      .then(function(response: any) {
        if (response.data.code === 0) {
          _this.alert(ValidateInfo.CreateSuccess, "success");
          store.commit(types.REFERRALSUBMIT, {
            userInfo: _this.infoModel,
            result: response.data.data
          });
          _this.toConfirmReferral();
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

  //查看病历资料
  viewMedicalData() {
    // 确保是在网站的根目录下打开
    var rootPath = window.location.href.split("#")[0];
    window.open(`${rootPath}#/medicaldata`);
  }

  @Prop() show: boolean;
  showStatus: boolean = this.show;
  @Prop() appointment: boolean;
  appointmentStatus: boolean = this.appointment;

  // 滚动条回到顶部
  scrollToTop() {
    var scrollContainer = this.$el.querySelector("#dialog-content");
    if (scrollContainer !== null) {
      scrollContainer.scrollTop = 0;
    }
  }

  closeDialog(done: any) {
    this.show = false;
    this.scrollToTop();
  }

  toConfirmReferral() {
    this.show = false;
    this.$emit("to-confirm", "");
    this.scrollToTop();
  }

  // 就诊类型改变
  targetVisitTypeChange() {
    this.appointmentStatus = false;
    this.InitialStore();
  }

  // 跳转到转出医院列表
  toHospitalList() {
    store.commit(types.REFERRALPAGEPARAME, {
      visitType: this.infoModel.targetVisitType
    });

    this.$emit("to-hospitallist", "");
  }

  @Watch("show", { immediate: true })
  showChange(val: boolean) {
    this.showStatus = val;
    this.foc = val;
    if (val) {
      this.Init();

      if (this.paraminfo !== null) {
        this.getReferralInfoByID();
      }
    }
  }

  @Watch("showStatus", { immediate: true })
  showStatusChange(val: boolean) {
    this.$emit("show-statue-change", val);
  }

  @Watch("appointment", { immediate: true })
  appointmentChange(val: boolean) {
    this.appointmentStatus = val;

    if (val) {
      this.updateAppointInfo();
    }
  }

  @Watch("appointmentStatus", { immediate: true })
  appointmentStatusChange(val: boolean) {
    this.$emit("appointment-statue-change", val);
  }

  InitialStore() {
    this.infoModel.targetOrgCode = "";
    this.infoModel.targetOrgName = "";
    this.infoModel.targetDeptCode = "";
    this.infoModel.targetDeptName = "";
    this.infoModel.appointmentRegisterSummary = "";
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "./../../../../assets/style/dialog.scss";
.create-referral {
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

  .create-referral-content {
    width: 890px;
    margin: 100px auto;
    height: calc(100% - 200px);
    .el-input__inner {
      padding: 0 !important;
    }
    .input-div {
      .el-form-item {
        margin-left: 82px !important;
      }
    }

    .down-userinfo {
      float: left;
      display: inline-block;
      height: 40px;
      width: 20px;
      background: url("./../../../../assets/image/common_icon_downinfo.png")
        no-repeat center;
      background-size: 20px 20px;
      margin-left: 6px;
    }

    .btn-cancel {
      margin-left: 10px;
    }
  }
}
</style>
