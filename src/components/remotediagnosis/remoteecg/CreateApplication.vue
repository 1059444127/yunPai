<template>
  <div class="create-application"
       v-show="show"
       @scroll.prevent>

    <div class="create-application-content">
        <div class="create-application-dialog">
            <div class="dialog-title">
                {{dialogTitle}}
                <span class="close-dialog" @click="closeDialog()"></span>
            </div>
            <div class="dialog-content" id="dialog-content" @scroll.prevent>
                <div class="dialog-content-title">
                    {{dialogContentTitle}}
                    <br>
                    {{dialogContentSubTitle}}
                </div>
                <div class="dialog-detail">
                    <div class="dialog-detail-title">{{const_list.RemoteForm.UserInfo}}</div>
                    <div class="dialog-detail-content">
                        <div class="detail-row">
                            <span>{{const_list.RemoteForm.IdCard}}</span>
                            <el-input class="user-idcard left" size="mini"></el-input>
                            <span class="down-userinfo pointer"></span>
                        </div>
                        <div class="detail-row">
                            <span>{{const_list.RemoteForm.Name}}</span>
                            <el-input class="user-name left" v-model="referralInfoModel.patientName" size="mini"></el-input>
                            <span class="user-sex-title">{{const_list.RemoteForm.Sex}}</span>
                            <el-select clearable v-model="referralInfoModel.sex" size="mini" class="user-sex left" placeholder="请选择">
                              <el-option
                                v-for="item in sexOptList"
                                :key="item.key"
                                :label="item.value"
                                :value="item.key">
                              </el-option>
                            </el-select>
                            <span class="user-age-title">{{const_list.RemoteForm.Age}}</span>
                            <el-input class="user-age left" v-model="referralInfoModel.age" size="mini"></el-input>
                            <el-select clearable v-model="referralInfoModel.ageUnit" size="mini" class="user-age-unit left" placeholder="请选择">
                              <el-option
                                v-for="item in ageUnitOptList"
                                :key="item.key"
                                :label="item.value"
                                :value="item.value">
                              </el-option>
                            </el-select>
                        </div>
                        <div class="detail-row">
                            <span>{{const_list.RemoteForm.ConstType}}</span>
                            <el-select clearable v-model="referralInfoModel.insuranceTypeCode" size="mini" class="user-costtype left" placeholder="请选择">
                              <el-option
                                v-for="item in costTypeOptList"
                                :key="item.key"
                                :label="item.value"
                                :value="item.key">
                              </el-option>
                            </el-select>
                        </div>
                    </div>
                </div>
                <div class="dialog-detail">
                    <div class="dialog-detail-title">{{const_list.RemoteForm.OriginalStudyInfo}}</div>
                    <div class="dialog-detail-content">
                        <div class="detail-row">
                            <span class="row-item-title">{{const_list.RemoteForm.StudyNumber}}</span>
                            <el-input class="study-number left" size="mini"></el-input>
                            <span class="down-userinfo pointer"></span>
                        </div>
                        <div class="detail-row">
                            <span class="row-item-title">{{const_list.RemoteForm.StudyProject}}</span>
                            <el-input class="study-project left" size="mini"></el-input>
                        </div>
                        <div class="detail-row">
                            <span class="row-item-title">{{const_list.RemoteForm.StudyPurposes}}</span>
                            <el-input class="study-purposes left" size="mini"></el-input>
                        </div>
                        <div class="detail-row">
                            <span class="row-item-title">{{const_list.RemoteForm.ClinicalDiagnosis}}</span>
                            <el-input class="clinical-diagnosis left" size="mini"></el-input>
                        </div>
                        <div class="detail-row">
                            <span class="row-item-title">{{const_list.RemoteForm.SymptomsAndSigns}}</span>
                            <el-input class="symptoms-and-signs left" size="mini"></el-input>
                        </div>
                        <div class="detail-row">
                            <span class="row-item-title">{{const_list.RemoteForm.CorrelationStudy}}</span>
                            <el-input class="correlation-study left" placeholder="选填" size="mini"></el-input>
                        </div>
                        <div class="detail-row">
                            <span class="row-item-title">{{const_list.RemoteForm.OtherInfo}}</span>
                            <el-input class="other-info left" placeholder="选填" size="mini"></el-input>
                        </div>
                    </div>
                </div>
                <div class="dialog-detail">
                    <div class="dialog-detail-title">{{const_list.RemoteForm.ApplyInfo}}</div>
                    <div class="dialog-detail-content">
                        <div class="detail-row">
                            <span>{{const_list.RemoteForm.Urgency}}</span>
                            <el-select clearable size="mini" class="urgency left" placeholder="请选择">
                            </el-select>
                        </div>
                        <div class="detail-row">
                            <span>{{const_list.RemoteForm.ReceiveOrg}}</span>
                            <el-select clearable size="mini" class="receive-org left" placeholder="请选择">
                            </el-select>
                            <el-select clearable size="mini" class="receive-dept left" placeholder="请选择">
                            </el-select>
                        </div>
                        <div class="detail-row">
                            <span class="row-item-title">{{const_list.RemoteForm.ApplyPurpose}}</span>
                            <el-input class="apply-purpose left" placeholder="选填" size="mini"></el-input>
                        </div>
                        <div class="detail-row">
                            <span>{{const_list.RemoteForm.ApplyHospital}}</span>
                            <el-input class="apply-hospital left" size="mini"></el-input>
                            <span class="apply-department-title">{{const_list.RemoteForm.ApplyDepartment}}</span>
                            <el-select clearable size="mini" class="apply-department left" placeholder="请选择">
                            </el-select>
                        </div>
                         <div class="detail-row">
                            <span>{{const_list.RemoteForm.ApplyDoctor}}</span>
                            <el-input class="apply-doctor left" size="mini"></el-input>
                            <span class="contact-number-title">{{const_list.RemoteForm.ContactNumber}}</span>
                            <el-input class="contact-number left" size="mini"></el-input>
                        </div>
                    </div>
                </div>
                <div class="dialog-submit">
                  <el-button type="success" class="btn-submit" @click="submitReferralInfo()">提交</el-button>
                  <el-button type="info" class="btn-cancel" @click="closeDialog()">取消</el-button>
                </div>
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
import ReferralRights from "./../../../utils/ReferralRights";
import ValidateInfo from "./../../../utils/ValidateInfo";

@Component
export default class CreateApplication extends Vue {
  dialogTitle: string = "新建申请";
  dialogContentTitle: string = "医联体云平台";
  dialogContentSubTitle: string = "远程心电诊断申请单";
  rollInHospitalShow: boolean = false;
  const_list = ConstList.RemoteDiagnosis;

  // 转诊信息结构体
  referralInfoModel = {
    identityCardNo: "",
    patientName: "",
    sex: "",
    age: "",
    ageUnit: "",
    insuranceTypeCode: "",
    patientAddress: "",
    patientPhone: "",
    contactName: "",
    contactRelationshipType: "",
    contactPhone: "",
    dtVisit: null,
    diagnosis: "",
    diseaseSummary: "",
    attention: "",
    targetVisitType: "1",
    targetOrgCode: "",
    targetOrgName: "",
    targetDeptCode: "",
    targetDeptName: "",
    appointmentRegisterID: "",
    appointmentRegisterSummary: "",
    referralDirection: "",
    referralReasonCode: "",
    referralReasonName: "",
    reqOrgCode: "",
    reqOrgName: "",
    reqDeptCode: "",
    reqDeptName: "",
    reqDoctorID: "",
    reqDoctorName: "",
    reqDoctorPhone: ""
  };

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

  //性别字典
  sexOptList: {}[] = [];
  //费用类型字典
  costTypeOptList: {}[] = [];
  //关系字典
  relationshipOptList: {}[] = [];
  //就诊类型字典
  visitTypeOptList: {}[] = [];
  //转诊原因字典
  referralReasonOptList = [
    {
      inputcode: "",
      referralreasoncode: "",
      referralreasonname: "",
      type: ""
    }
  ];
  //转出科室字典
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
  //转出医院字典
  rollOutHospitalOptList = [
    {
      hcocode: "",
      hconame: "",
      inputcode: ""
    }
  ];

  //初始化表单内容,之后布局调整后可能不用
  Init() {
    this.referralInfoModel = {
      identityCardNo: "",
      patientName: "",
      sex: "",
      age: "",
      ageUnit: "",
      insuranceTypeCode: "",
      patientAddress: "",
      patientPhone: "",
      contactName: "",
      contactRelationshipType: "",
      contactPhone: "",
      dtVisit: null,
      diagnosis: "",
      diseaseSummary: "",
      attention: "",
      targetVisitType: "",
      targetOrgCode: "",
      targetOrgName: "",
      targetDeptCode: "",
      targetDeptName: "",
      appointmentRegisterID: "",
      appointmentRegisterSummary: "",
      referralDirection: "",
      referralReasonCode: "",
      referralReasonName: "",
      reqOrgCode: "",
      reqOrgName: "",
      reqDeptCode: "",
      reqDeptName: "",
      reqDoctorID: "",
      reqDoctorName: "",
      reqDoctorPhone: ""
    };

    // 默认显示登录用户信息
    this.rollOutHospitalOptList = [
      {
        hcocode: store.state.user.hCOCode,
        hconame: store.state.user.hCOName,
        inputcode: ""
      }
    ];
    this.referralInfoModel.reqOrgCode = store.state.user.hCOCode;
    this.referralInfoModel.reqOrgName = store.state.user.hCOName;
    this.referralInfoModel.reqDoctorName = store.state.user.userName;
    this.referralInfoModel.reqDoctorID = store.state.user.id;
    this.referralInfoModel.reqDoctorPhone = store.state.user.phone;

    // 设置默认选中值
    this.referralInfoModel.ageUnit = "岁";
  }

  mounted() {
    this.getRefferralDict();
    this.Init();
  }

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
          console.log(response.data.code + ":" + response.data.message);
        }
      })
      .catch(function(error: any) {
        console.log(error);
      });
  }

  //获取转诊原因字典
  getReferralReasonByTypeDict(value: any) {
    const _this = this;

    Vue.prototype.$http
      .post(apiConfig.API.getReferralReasonByType, value)
      .then(function(response: any) {
        if (response.data.code === 0) {
          _this.referralReasonOptList = response.data.data;
          _this.referralInfoModel.referralReasonCode = "";
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

  //获取转出医院字典
  hcodLoading: boolean = false;
  getHCODict(query: string) {
    const _that = this;

    if (query !== "") {
      this.hcodLoading = true;
      setTimeout(() => {
        this.hcodLoading = false;
        Vue.prototype.$http
          .post(apiConfig.API.getHCODict, query)
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
              console.log(response.data.code + ":" + response.data.message);
            }
          })
          .catch(function(error: any) {
            console.log(error);
          });
      }, 200);
    } else {
      this.rollOutHospitalOptList = [];
    }
  }

  //提交转诊单
  submitReferralInfo() {
    const _this = this;

    // 根据选中的转诊原因code获取内容
    let objReason: any = this.referralReasonOptList.find(item => {
      return (
        item.referralreasoncode === _this.referralInfoModel.referralReasonCode
      );
    });
    _this.referralInfoModel.referralReasonName = objReason.referralreasonname;

    // 根据转出医院code获取内容
    let objReqOrg: any = this.rollOutHospitalOptList.find(item => {
      return item.hcocode === _this.referralInfoModel.reqOrgCode;
    });
    _this.referralInfoModel.reqOrgName = objReqOrg.hconame;

    // 根据选中的科室code获取内容
    let objReqDept: any = this.rollOutDepartmentOptList.find(item => {
      return item.hcodeptcode === _this.referralInfoModel.reqDeptCode;
    });
    _this.referralInfoModel.reqDeptName = objReqDept.hcodeptname;

    // 判断医生名字是否被更改
    if (this.referralInfoModel.reqDoctorName !== store.state.user.userName) {
      this.referralInfoModel.reqDoctorID = "";
    } else {
      this.referralInfoModel.reqDoctorID = store.state.user.id;
    }

    Vue.prototype.$http
      .post(apiConfig.API.submitReferralInfo, _this.referralInfoModel)
      .then(function(response: any) {
        if (response.data.code === 0) {
          store.commit(types.REFERRALSUBMIT, {
            userInfo: _this.referralInfoModel,
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
      })
      .catch(function(error: any) {
        console.log(error);
      });
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

  closeDialog(done: any) {
    this.show = false;
    this.scrollToTop();
  }

  toConfirmReferral() {
    this.show = false;
    this.$emit("to-confirm", "");
    this.scrollToTop();
  }

  toHospitalList() {
    //this.show = false;
    this.$emit("to-hospitallist", "");
    //this.scrollToTop();
  }

  @Watch("show", { immediate: true })
  showChange(val: boolean) {
    this.showStatus = val;
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
.create-application {
  position: fixed;
  z-index: 9;
  background: rgba(0, 0, 0, 0.5);
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  color: #5a5e66;
  line-height: 24px;
  font-size: 14px;

  .el-input__inner {
    padding: 0 !important;
  }

  .create-application-content {
    width: 920px;
    margin: 50px auto;
    height: calc(100% - 100px);

    .create-application-dialog {
      height: 100%;
      width: 100%;
      background: #fff;
      padding: 2px;
      padding-right: 20px;
      border-radius: 2px;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);

      .dialog-title {
        position: relative;
        width: 100%;
        height: 60px;
        line-height: 60px;
        padding-left: 16px;
        color: #000;
        font-size: 18px;

        .close-dialog {
          position: absolute;
          right: 0;
          top: 19px;
          display: block;
          height: 22px;
          width: 22px;
          background: url("./../../../assets/image/common_icon_close.png")
            no-repeat center;
          background-size: 60% 60%;

          &:hover {
            cursor: pointer;
          }
        }
      }

      .dialog-content {
        width: 100%;
        height: calc(100% - 100px);
        overflow-y: auto;
        margin: 20px 0;

        &::-webkit-scrollbar-track {
          -webkit-box-shadow: inset 0 0 6px rgba(155, 155, 155, 0.3);
          border-radius: 10px;
          background-color: #f5f5f5;
        }

        &::-webkit-scrollbar {
          width: 8px;
          background-color: #f5f5f5;
        }

        &::-webkit-scrollbar-thumb {
          border-radius: 10px;
          -webkit-box-shadow: inset 0 0 6px rgba(155, 155, 155, 0.3);
          background-color: rgba(0, 0, 0, 0.4);
        }

        .dialog-content-title {
          line-height: 24px;
          font-size: 20px;
          text-align: center;
          color: #666;
        }

        .dialog-detail {
          width: 100%;
          padding: 16px 50px 0 70px;

          .dialog-detail-title {
            font-size: 12px;
            color: #a7a7a7;
            margin-bottom: 8px;
          }

          .dialog-detail-content {
            width: 100%;
            padding-left: 20px;
            overflow: hidden;

            .detail-row {
              min-height: 26px;
              line-height: 26px;
              font-size: 14px;
              margin-bottom: 20px;
              overflow: hidden;

              input,
              select,
              textarea {
                height: 24px;
                line-height: 24px;
                border: 1px solid #a6c3dd;
                padding: 0 6px;
              }

              input,
              span,
              select,
              .left {
                float: left;
              }

              .user-idcard,
              .user-address,
              .initial-diagnosis,
              .apply-hospital {
                width: 390px;
              }

              .down-userinfo {
                display: inline-block;
                height: 26px;
                width: 20px;
                background: url("./../../../assets/image/common_icon_downinfo.png")
                  no-repeat center 2px;
                background-size: 20px 20px;
                margin-left: 6px;
              }

              .row-item-title {
                width: 70px;
              }

              .user-name,
              .user-sex,
              .user-costtype,
              .study-number,
              .study-type,
              .urgency,
              .receive-org,
              .receive-dept,
              .apply-department,
              .apply-doctor,
              .contact-number {
                width: 130px;
              }

              .receive-dept {
                margin-left: 4px;
              }

              .user-sex-title,
              .user-age-title,
              .apply-department-title,
              .contact-number-title {
                margin-left: 60px;
              }

              .user-age {
                width: 60px;
              }

              .user-age-unit {
                width: 66px;
                margin-left: 4px;
              }

              .study-project,
              .study-purposes,
              .clinical-diagnosis,
              .symptoms-and-signs,
              .correlation-study,
              .other-info,
              .apply-purpose {
                width: 650px;
              }
            }
          }
        }

        .dialog-submit {
          width: 100%;
          padding: 16px 50px 50px 90px;
        }
      }
    }
  }
}
</style>