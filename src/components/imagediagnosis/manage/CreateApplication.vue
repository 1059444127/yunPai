<template>
  <div class="create-application"
       v-show="show"
       @scroll.prevent>

    <div class="create-application-content">
        <div class="view-dialog">
            <div class="dialog-title">
                <span class="line"></span>{{dialogTitle}}
                <span class="close-dialog" @click="closeDialog()"><i class="el-icon-close"></i></span>
            </div>
            <div class="dialog-content" id="dialog-content" @scroll.prevent>
              <el-form clearValidate :model="infoModel" :rules="rules" ref="infoModel">
                <div class="dialog-info">
                    <div class="dialog-info-title">{{const_list.RemoteForm.UserInfo}}</div>
                    <div class="dialog-info-content">
                        <div class="input-row">
                            <span class="info-item-title">{{const_list.RemoteForm.StudyNumber}}</span>
                            <el-form-item prop="hisExamID" class="info-item-input w-150">
                              <el-input  v-focus="foc" @blur="foc=false" v-model="infoModel.hisExamID" maxlength="30" size="small"></el-input>
                            </el-form-item>
                            <span class="required-item"></span>
                            <span class="down-icon-btn pointer" @click="toCaseList"></span>

                            <el-button size="mini" @click="viewMedicalData()" class="my-submit-btn case-data-btn">病历资料</el-button>
                        </div>
                        <div class="input-row">
                            <span class="info-item-title">{{const_list.RemoteForm.IdCard}}</span>
                            <el-form-item prop="identityCardNo" class="info-item-input w-422">
                              <el-input v-model="infoModel.identityCardNo" size="small"></el-input>
                            </el-form-item>
                        </div>
                        <div class="input-row">
                            <span class="info-item-title">{{const_list.RemoteForm.Name}}</span>
                            <el-form-item prop="name" class="info-item-input w-150">
                              <el-input v-model="infoModel.name" maxlength="15" size="small"></el-input>
                            </el-form-item>
                            <span class="required-item"></span>
                            <span class="info-item-title ml-30">{{const_list.RemoteForm.Sex}}</span>
                            <el-form-item prop="sex" class="info-item-input w-150">
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
                            <span class="info-item-title ml-30">{{const_list.RemoteForm.Age}}</span>
                            <el-form-item prop="age" class="info-item-input w-60">
                              <el-input  v-model="infoModel.age" maxlength="3" size="small"></el-input>
                            </el-form-item>
                            <span class="required-item"></span>
                            <el-select v-model="infoModel.ageUnit" size="small" class="info-item-input w-80" placeholder="请选择">
                              <el-option
                                v-for="item in ageUnitOptList"
                                :key="item.key"
                                :label="item.value"
                                :value="item.value">
                              </el-option>
                            </el-select>
                        </div>
                        <div class="input-row" v-show="false">
                            <span>{{const_list.RemoteForm.ConstType}}</span>
                            <el-select clearable v-model="infoModel.insuranceTypeName" size="small" class="fixed-width left" placeholder="请选择">
                              <el-option
                                v-for="item in costTypeOptList"
                                :key="item.key"
                                :label="item.value"
                                :value="item.value">
                              </el-option>
                            </el-select>
                        </div>
                    </div>
                </div>
                <div class="dialog-info">
                    <div class="dialog-info-title">{{const_list.RemoteForm.OriginalStudyInfo}}</div>
                    <div class="dialog-info-content">
                        <div class="input-row">
                            <span class="info-item-title">{{const_list.RemoteForm.StudyType}}</span>
                            <el-form-item prop="examClassCode" class="info-item-input w-150">
                              <el-select clearable v-model="infoModel.examClassCode" size="small" placeholder="请选择">
                                <el-option
                                  v-for="item in studyTypeList"
                                  :key="item.examClassCode"
                                  :label="item.examClassName"
                                  :value="item.examClassCode">
                                </el-option>
                              </el-select>
                            </el-form-item>
                            <span class="required-item"></span>
                            <span class="info-item-title ml-30">{{const_list.RemoteForm.StudyProject}}</span>
                            <el-form-item prop="examItems" class="info-item-input w-150">
                              <el-input v-model="infoModel.examItems" maxlength="100" size="small"></el-input>
                            </el-form-item>
                            <span class="required-item"></span>
                        </div>
                        <div class="detail-row" v-show="false">
                            <span class="row-item-title">{{const_list.RemoteForm.StudyPurposes}}</span>
                            <el-input v-model="infoModel.examPurpose" class="fixed-width-large left" size="small"></el-input>
                        </div>
                        <div class="input-row">
                            <span class="info-item-title">{{const_list.RemoteForm.ClinicalDiagnosis}}</span>
                            <el-input v-model="infoModel.diagnosis" maxlength="250" class="info-item-input w-694" size="small"></el-input>
                        </div>
                        <div class="input-row">
                            <span class="info-item-title">{{const_list.RemoteForm.SymptomsAndSigns}}</span>
                            <el-input v-model="infoModel.syndromSigns" maxlength="500" class="info-item-input w-694" size="small"></el-input>
                        </div>
                        <div class="detail-row" v-show="false">
                            <span class="row-item-title">{{const_list.RemoteForm.CorrelationStudy}}</span>
                            <el-input v-model="infoModel.relevantExamResult" class="fixed-width-large left" size="small"></el-input>
                        </div>
                        <div class="input-row">
                            <span class="info-item-title">{{const_list.RemoteForm.OtherInfo}}</span>
                            <el-input v-model="infoModel.otherInfo" maxlength="250" class="info-item-input w-694" size="small"></el-input>
                        </div>
                        <div class="detail-row" v-show="false">
                            <span class="row-item-title">{{const_list.RemoteForm.ImageFile}}</span>
                            <el-button size="small">选择</el-button>
                        </div>
                    </div>
                </div>
                <div class="dialog-info">
                    <div class="dialog-info-title">{{const_list.RemoteForm.ApplyInfo}}</div>
                    <div class="dialog-info-content">
                        <div class="info-row">
                            <span class="info-item-title">{{const_list.RemoteForm.Urgency}}</span>
                            <el-select clearable v-model="infoModel.priority" size="small" class="info-item-input w-150" placeholder="请选择">
                              <el-option
                                v-for="item in priorityOptList"
                                :key="item.key"
                                :label="item.value"
                                :value="item.key">
                              </el-option>
                            </el-select>
                            <span class="info-item-title ml-40">{{const_list.RemoteForm.ReceiveOrg}}</span>
                            <el-form-item prop="diagOrgCode" class="info-item-input w-150">
                              <el-select clearable size="small"
                                        placeholder="请选择医院"
                                        @change="getDepartmentDict"
                                        v-model="infoModel.diagOrgCode">
                                <el-option
                                  v-for="item in rollOutHospitalOptList"
                                  :key="item.hCOCode"
                                  :label="item.hCOName"
                                  :value="item.hCOCode">
                                </el-option>
                              </el-select>
                            </el-form-item>
                            <span class="required-item"></span>
                            <span class="info-item-title ml-30">{{const_list.RemoteForm.ReceiveDept}}</span>
                            <el-select clearable v-model="infoModel.diagDeptCode"
                                       size="mini"
                                       class="info-item-input w-150"
                                       placeholder="科室">
                              <el-option
                                v-for="item in rollOutDepartmentOptList"
                                :key="item.HCODeptCode"
                                :label="item.HCODeptName"
                                :value="item.HCODeptCode">
                              </el-option>
                            </el-select>
                        </div>
                        <div class="input-row">
                            <span class="info-item-title">{{const_list.RemoteForm.ApplyPurpose}}</span>
                            <el-input v-model="infoModel.reqPurpose" maxlength="100" class="info-item-input w-694" size="small"></el-input>
                        </div>
                        <div class="input-row">
                            <span class="info-item-title">{{const_list.RemoteForm.ApplyHospital}}</span>
                            <el-input class="info-item-input w-150" disabled v-model="reqOrgName" size="small"></el-input>
                            <span class="info-item-title ml-40">{{const_list.RemoteForm.ApplyDepartment}}</span>
                            <el-input class="info-item-input w-150" disabled v-model="reqDeptName" size="small"></el-input>
                        </div>
                         <div class="input-row">
                            <span class="info-item-title">{{const_list.RemoteForm.ApplyDoctor}}</span>
                            <el-form-item prop="reqDoctorName" class="info-item-input w-150">
                              <el-input v-model="infoModel.reqDoctorName" maxlength="15" size="small"></el-input>
                            </el-form-item>
                            <span class="required-item"></span>
                            <span class="info-item-title ml-30">{{const_list.RemoteForm.ContactNumber}}</span>
                            <el-form-item prop="reqDoctorPhone" class="info-item-input w-150">
                              <el-input v-model="infoModel.reqDoctorPhone" maxlength="20"  size="small"></el-input>
                            </el-form-item>
                            <span class="required-item"></span>
                        </div>
                    </div>
                </div>
              </el-form>
            </div>
            <div class="dialog-btn-div">
              <el-button class="btn-cancel my-default-btn" @click="closeDialog()">取消</el-button>
              <el-button :disabled="subBtnDisabled"  class="btn-submit my-submit-btn" v-show="!isModifyData" @click="createRemoteImageDiagnosis()">提交</el-button>
              <el-button :disabled="subBtnDisabled"  class="btn-submit my-submit-btn" v-show="isModifyData" @click="modifyRemoteImageDiagnosis()">保存</el-button>
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
export default class CreateApplication extends Vue {
  dialogTitle: string = "影像诊断申请";
  const_list = ConstList.RemoteDiagnosis;
  subBtnDisabled: boolean = false;
  isModifyData: boolean = false;
  modifyFirstLoad: boolean = false;
  foc: boolean = true;

  @Prop() currecordid: string = "";
  @Prop() curcaseinfo: any = null;

  // 转诊信息结构体
  infoModel = {
    identityCardNo: "",
    name: "",
    sex: "",
    age: "",
    ageUnit: "",
    examID: "",
    hisExamID: "",
    examClassCode: "",
    examClassName: "",
    examItems: "",
    examPurpose: "",
    diagnosis: "",
    syndromSigns: "",
    relevantExamResult: "",
    otherInfo: "",
    priority: 0,
    diagOrgCode: "",
    diagOrgName: "",
    diagDeptCode: "",
    diagDeptName: "",
    reqPurpose: "",
    reqDoctorID: "",
    reqDoctorName: "",
    reqDoctorPhone: "",
    examDT: ""
  };

  rules = {
    hisExamID: { required: true, message: "请输入检查号", trigger: "blur" },
    name: { required: true, message: "请输入姓名", trigger: "blur" },
    sex: { required: true, message: "请选择性别", trigger: "change" },
    age: { validator: ValidateRules.age, trigger: "blur" },
    examClassCode: {
      required: true,
      message: "请选择检查类别",
      trigger: "change"
    },
    examItems: { required: true, message: "请输入检查名称", trigger: "blur" },
    diagOrgCode: {
      required: true,
      message: "请选择发往机构",
      trigger: "change"
    },
    reqDoctorName: {
      required: true,
      message: "请输入申请医生",
      trigger: "blur"
    },
    reqDoctorPhone: {
      required: true,
      message: "请输入联系电话",
      trigger: "blur"
    }
  };

  reqOrgName = store.state.user.hCOName;
  reqDeptName = store.state.user.hCODeptName;

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

  // 紧急程度字典
  priorityOptList: {}[] = [
    {
      key: 0,
      value: "一般"
    },
    {
      key: 1,
      value: "紧急"
    }
  ];

  //性别字典
  sexOptList: {}[] = [];
  //费用类型字典
  costTypeOptList: {}[] = [];
  //关系字典
  relationshipOptList: {}[] = [];

  //发往机构字典
  rollOutHospitalOptList = [];
  //发往科室字典
  rollOutDepartmentOptList = [];

  // 检查类别字典
  studyTypeList = [];

  //初始化表单内容,之后布局调整后可能不用
  Init() {
    var form = this.$refs["infoModel"] as any;
    if (form != null) {
      form.clearValidate();
    }

    this.getHealthCareOrganizationDict();

    this.curcaseinfo = null;

    this.infoModel = {
      identityCardNo: "",
      name: "",
      sex: "",
      age: "",
      ageUnit: "",
      examID: "",
      hisExamID: "",
      examClassCode: "",
      examClassName: "",
      examItems: "",
      examPurpose: "",
      diagnosis: "",
      syndromSigns: "",
      relevantExamResult: "",
      otherInfo: "",
      priority: 0,
      diagOrgCode: "",
      diagOrgName: "",
      diagDeptCode: "",
      diagDeptName: "",
      reqPurpose: "",
      reqDoctorID: "",
      reqDoctorName: "",
      reqDoctorPhone: "",
      examDT: ""
    };

    this.rollOutDepartmentOptList = [];

    // 默认显示登录用户信息

    this.reqOrgName = store.state.user.hCOName;
    this.reqDeptName = store.state.user.hCODeptName;
    this.infoModel.reqDoctorName = store.state.user.userName;
    this.infoModel.reqDoctorID = store.state.user.id;
    this.infoModel.reqDoctorPhone = store.state.user.phone;

    // 设置默认选中值
    this.infoModel.ageUnit = "岁";
    this.isModifyData = false;
    this.subBtnDisabled = false;

    if (this.currecordid !== "") {
      this.isModifyData = true;
      this.modifyFirstLoad = true;
      this.searchRemoteImageDiagnosis();
    } else {
      this.modifyFirstLoad = false;
    }
  }

  mounted() {
    this.getDict();
    this.getExamClassDict();
    this.Init();
  }

  //获取常用字典
  getDict() {
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

          store.commit(types.REFERRALDICT, {
            sex: data.sex,
            planVisit: data.planVisit,
            insuranceType: data.insuranceType,
            contactRelationship: data.contactRelationship
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

  // 获取检查类别字典
  getExamClassDict() {
    const _this = this;

    Vue.prototype.$http
      .post(apiConfig.API.getExamClassDict, {})
      .then(function(response: any) {
        if (response.data.code === 0) {
          _this.studyTypeList = response.data.data;
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
          console.log(response.data.message);
        }
      })
      .catch(function(error: any) {
        console.log(error);
      });
  }

  //获取发往医院字典
  getHealthCareOrganizationDict() {
    const _that = this;

    var requestValue = "0"; // 0:不包含当前机构,1:包含

    Vue.prototype.$http
      .post(apiConfig.API.getHealthCareOrganizationDict, requestValue)
      .then(function(response: any) {
        if (response.data.code === 0) {
          _that.rollOutHospitalOptList = response.data.data;
        } else if (response.data.code === apiConfig.MESSAGECODE.ERROR) {
          _that.alert(response.data.message, "error");
        } else if (response.data.code === apiConfig.MESSAGECODE.TIMEOUT) {
          store.commit(types.LOGOUT);
          _that.$router.push({ path: "/" });
        } else if (
          response.data.code === apiConfig.MESSAGECODE.LACKOFAUTHORITY
        ) {
          _that.alert(ValidateInfo.LackOfAuthority, "error");
        } else {
          _that.alert(ValidateInfo.GetDictError, "error");
          console.log(response.data.code + ":" + response.data.message);
        }
      })
      .catch(function(error: any) {
        _that.alert(ValidateInfo.GetDictError, "error");
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
          if (!_this.modifyFirstLoad) {
            _this.infoModel.diagDeptCode = "";
          } else {
            _this.modifyFirstLoad = false;
          }
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

  //提交申请单
  createRemoteImageDiagnosis() {
    var flag = false;
    (this.$refs["infoModel"] as any).validate((valid: boolean) => {
      flag = valid;
    });
    if (!flag) {
      return;
    }

    this.subBtnDisabled = true;
    const _this = this;
    // 根据发往机构code获取内容
    let objDiagOrg: any = this.rollOutHospitalOptList.find(item => {
      return (item as any).hCOCode === _this.infoModel.diagOrgCode;
    });
    if (objDiagOrg !== undefined) {
      _this.infoModel.diagOrgName = objDiagOrg.hCOName;
    } else {
      _this.infoModel.diagOrgName = "";
    }

    // 根据发往科室code获取内容
    let objDiagDept: any = this.rollOutDepartmentOptList.find(item => {
      return (item as any).HCODeptCode === _this.infoModel.diagDeptCode;
    });
    if (objDiagDept !== undefined) {
      _this.infoModel.diagDeptName = objDiagDept.HCODeptName;
    } else {
      _this.infoModel.diagDeptName = "";
    }

    // 根据检查类别code获取内容
    let objStudy: any = this.studyTypeList.find(item => {
      return (item as any).examClassCode === _this.infoModel.examClassCode;
    });
    if (objStudy !== undefined) {
      _this.infoModel.examClassName = objStudy.examClassName;
    } else {
      _this.infoModel.examClassName = "";
    }

    // 判断医生名字是否被更改
    if (this.infoModel.reqDoctorName !== store.state.user.userName) {
      this.infoModel.reqDoctorID = "";
    } else {
      this.infoModel.reqDoctorID = store.state.user.id;
    }

    Vue.prototype.$http
      .post(apiConfig.API.createRemoteImageDiagnosis, _this.infoModel)
      .then(function(response: any) {
        if (response.data.code === 0) {
          _this.alert(ValidateInfo.CreateSuccess, "success");
          _this.$emit("refresh-page", "");
          _this.closeDialog();
        } else if (
          response.data.code === apiConfig.MESSAGECODE.ERROR ||
          response.data.code === apiConfig.MESSAGECODE.CALLYFDERROR
        ) {
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

  // 获取申请单信息
  searchRemoteImageDiagnosis() {
    const _this = this;

    var requestModel = {
      id: _this.currecordid
    };

    Vue.prototype.$http
      .post(apiConfig.API.searchRemoteImageDiagnosis, requestModel)
      .then(function(response: any) {
        if (response.data.code === 0) {
          _this.infoModel = response.data.data;
          _this.getDepartmentDict(_this.infoModel.diagOrgCode);
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
        _this.closeDialog();
        console.log(error);
      });
  }

  // 修改申请单信息
  modifyRemoteImageDiagnosis() {
    var flag = false;
    (this.$refs["infoModel"] as any).validate((valid: boolean) => {
      flag = valid;
    });
    if (!flag) {
      return;
    }

    const _this = this;

    // 根据发往机构code获取内容
    let objDiagOrg: any = this.rollOutHospitalOptList.find(item => {
      return (item as any).hCOCode === _this.infoModel.diagOrgCode;
    });
    if (objDiagOrg !== undefined) {
      _this.infoModel.diagOrgName = objDiagOrg.hCOName;
    } else {
      _this.infoModel.diagOrgName = "";
    }

    // 根据发往科室code获取内容
    let objDiagDept: any = this.rollOutDepartmentOptList.find(item => {
      return (item as any).HCODeptCode === _this.infoModel.diagDeptCode;
    });
    if (objDiagDept !== undefined) {
      _this.infoModel.diagDeptName = objDiagDept.HCODeptName;
    } else {
      _this.infoModel.diagDeptName = "";
    }

    // 根据检查类别code获取内容
    let objStudy: any = this.studyTypeList.find(item => {
      return (item as any).examClassCode === _this.infoModel.examClassCode;
    });
    if (objStudy !== undefined) {
      _this.infoModel.examClassName = objStudy.examClassName;
    } else {
      _this.infoModel.examClassName = "";
    }

    // 判断医生名字是否被更改
    if (this.infoModel.reqDoctorName !== store.state.user.userName) {
      this.infoModel.reqDoctorID = "";
    } else {
      this.infoModel.reqDoctorID = store.state.user.id;
    }

    var requestModel = {
      filter: {
        id: _this.currecordid
      },
      record: {
        identityCardNo: _this.infoModel.identityCardNo,
        name: _this.infoModel.name,
        sex: _this.infoModel.sex,
        examID: _this.infoModel.examID,
        hisExamID: _this.infoModel.hisExamID,
        examClassCode: _this.infoModel.examClassCode,
        examClassName: _this.infoModel.examClassName,
        examItems: _this.infoModel.examItems,
        examPurpose: _this.infoModel.examPurpose,
        diagnosis: _this.infoModel.diagnosis,
        syndromSigns: _this.infoModel.syndromSigns,
        relevantExamResult: _this.infoModel.relevantExamResult,
        otherInfo: _this.infoModel.otherInfo,
        priority: _this.infoModel.priority,
        diagOrgCode: _this.infoModel.diagOrgCode,
        diagOrgName: _this.infoModel.diagOrgName,
        diagDeptCode: _this.infoModel.diagDeptCode,
        diagDeptName: _this.infoModel.diagDeptName,
        reqPurpose: _this.infoModel.reqPurpose,
        reqDoctorID: _this.infoModel.reqDoctorID,
        reqDoctorName: _this.infoModel.reqDoctorName,
        reqDoctorPhone: _this.infoModel.reqDoctorPhone
      }
    };

    Vue.prototype.$http
      .post(apiConfig.API.modifyRemoteImageDiagnosis, requestModel)
      .then(function(response: any) {
        if (response.data.code === 0) {
          _this.alert(ValidateInfo.ModifySuccess, "success");
          _this.$emit("refresh-page", "");
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
          console.log(response.data.code + ":" + response.data.message);
        }
      })
      .catch(function(error: any) {
        _this.closeDialog();
        console.log(error);
      });
  }

  // 打开检查列表
  toCaseList() {
    if (this.infoModel.hisExamID === "") {
      this.alert("请输入检查号！");
    } else {
      this.$emit("to-case-list", this.infoModel.hisExamID);
    }
  }

  //查看病历资料
  viewMedicalData() {
    // 确保是在网站的根目录下打开
    var rootPath = window.location.href.split("#")[0];
    if (this.isModifyData) {
      window.open(
        `${rootPath}#/medicaldata?identityCardNo=${
          this.infoModel.identityCardNo
        }`
      );
    } else {
      window.open(`${rootPath}#/medicaldata`);
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

  @Watch("curcaseinfo", { immediate: true })
  curCaseInfoChange(val: boolean) {
    if (this.curcaseinfo !== null) {
      this.infoModel.identityCardNo = this.curcaseinfo.identityCardNo;
      this.infoModel.name = this.curcaseinfo.name;
      this.infoModel.sex = this.curcaseinfo.sex;
      this.infoModel.age = this.curcaseinfo.age;
      this.infoModel.ageUnit = this.curcaseinfo.ageUnit;
      this.infoModel.hisExamID = this.curcaseinfo.exam.hisExamID;
      this.infoModel.examClassCode = this.curcaseinfo.exam.examClassCode;
      this.infoModel.examClassName = this.curcaseinfo.exam.examClassName;
      this.infoModel.examItems = this.curcaseinfo.exam.examItems;
      this.infoModel.examDT = this.curcaseinfo.exam.examDT;
      (this.infoModel.diagnosis = ""),
        (this.infoModel.syndromSigns = ""),
        (this.infoModel.otherInfo = "");
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "./../../../assets/style/dialog.scss";
.create-application {
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

  .create-application-content {
    width: 890px;
    margin: 100px auto;
    height: calc(100% - 200px);

    .down-icon-btn {
      display: inline-block;
      height: 40px;
      width: 20px;
      background: url("./../../../assets/image/common_icon_downinfo.png")
        no-repeat center;
      background-size: 20px 20px;
      margin-left: 6px;
    }

    .case-data-btn {
      float: right;
      margin-top: 3px;
      margin-right: 12px;
    }

    .btn-cancel {
      margin-left: 10px;
    }
  }
}
</style>
