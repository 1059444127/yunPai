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
                <div class="dialog-info">
                    <div class="dialog-info-title">{{const_list.RemoteForm.UserInfo}}</div>
                    <div class="dialog-info-content">
                        <div class="info-row">
                            <span class="info-item-title">{{const_list.RemoteForm.IdCard}}</span>
                            <span class="info-item-content w-422">{{infoModel.identityCardNo}}</span>
                            <el-button size="mini" @click="viewMedicalData()" class="my-submit-btn link-btn">病历资料</el-button>
                        </div>
                        <div class="info-row">
                            <span class="info-item-title">{{const_list.RemoteForm.Name}}</span>
                            <span class="info-item-content w-150">{{infoModel.name}}</span>
                            <span class="info-item-title ml-40">{{const_list.RemoteForm.Sex}}</span>
                            <span class="info-item-content w-150">{{infoModel.sexText}}</span>
                            <span class="info-item-title ml-40">{{const_list.RemoteForm.Age}}</span>
                            <span class="info-item-content w-150">{{infoModel.age}}{{infoModel.ageUnit}}</span>
                        </div>
                        <div class="info-row" v-show="false">
                            <span>{{const_list.RemoteForm.ConstType}}</span>
                            <span class="info-item-content w-150">{{infoModel.insuranceTypeName}}</span>
                        </div>
                    </div>
                </div>
                <div class="dialog-info">
                    <div class="dialog-info-title">{{const_list.RemoteForm.OriginalStudyInfo}}</div>
                    <div class="dialog-info-content">
                        <div class="info-row">
                            <span class="info-item-title">{{const_list.RemoteForm.ApplyHospital}}</span>
                            <span class="info-item-content w-150">{{infoModel.reqOrgName}}</span>
                            <span class="info-item-title ml-40">{{const_list.RemoteForm.ApplyDepartment}}</span>
                            <span class="info-item-content w-150">{{infoModel.reqDeptName}}</span>
                            <el-button size="mini" class="my-submit-btn link-btn" @click="openImageFile()">影像文件</el-button>
                        </div>
                        <div class="info-row">
                            <span class="info-item-title">{{const_list.RemoteForm.StudyType}}</span>
                            <span class="info-item-content w-150">{{infoModel.examClassName}}</span>
                            <span class="info-item-title ml-40">{{const_list.RemoteForm.StudyProject}}</span>
                            <span class="info-item-content w-150">{{infoModel.examItems}}</span>
                        </div>
                        <div class="detail-row" v-show="false">
                            <span class="row-item-title">{{const_list.RemoteForm.StudyPurposes}}</span>
                            <span class="info-item-content w-150">{{infoModel.examPurpose}}</span>
                        </div>
                        <div class="info-row">
                            <span class="info-item-title">{{const_list.RemoteForm.ClinicalDiagnosis}}</span>
                            <span class="info-item-content w-694">{{infoModel.diagnosis}}</span>
                        </div>
                        <div class="info-row">
                            <span class="info-item-title">{{const_list.RemoteForm.SymptomsAndSigns}}</span>
                            <span class="info-item-content w-694">{{infoModel.syndromSigns}}</span>
                        </div>
                        <div class="detail-row" v-show="false">
                            <span class="row-item-title">{{const_list.RemoteForm.CorrelationStudy}}</span>
                            <span class="info-item-content w-694">{{infoModel.relevantExamResult}}</span>
                        </div>
                        <div class="info-row">
                            <span class="info-item-title">{{const_list.RemoteForm.OtherInfo}}</span>
                            <span class="info-item-content w-694">{{infoModel.otherInfo}}</span>
                        </div>
                        <div class="info-row">
                            <span class="info-item-title">{{const_list.RemoteForm.ApplyPurpose}}</span>
                            <span class="info-item-content w-694">{{infoModel.reqPurpose}}</span>
                        </div>
                    </div>
                </div>
                <div class="dialog-info" v-show="showProcess">
                    <div class="dialog-info-title">{{const_list.RemoteForm.ProcessRecord}}</div>
                    <div class="dialog-info-content">
                        <div class="process-div">
                            <div class="process-item">
                                <span class="process-icon-default on"></span>
                                <span class="process-text-default on">提交申请</span>
                                <span class="process-line"></span>
                            </div>
                            <div class="process-item ml-90" v-show="infoModel.status===11">
                                <span class="process-icon-default error"></span>
                                <span class="process-text-default error">已撤回</span>
                            </div>
                            <div class="process-item ml-90" v-show="infoModel.status===3">
                                <span class="process-icon-default on"></span>
                                <span class="process-text-default on">已诊断</span>
                                <span class="process-line"></span>
                            </div>
                            <div class="process-item ml-90" v-show="infoModel.status===3">
                                <span class="process-icon-default"></span>
                                <span class="process-text-default">待审核</span>
                                <span class="process-line"></span>
                            </div>
                            <div class="process-item ml-90" v-show="infoModel.status===3">
                                <span class="process-icon-default"></span>
                            </div>
                        </div>
                        <div class="info-row"
                            v-for="item in infoModel.logs"
                            v-bind:key="item.index">
                            <span class="info-item-content">● {{item}}</span>
                        </div>
                    </div>
                </div>
                <div class="dialog-info" v-show="showReport">
                    <div class="dialog-info-title">{{const_list.RemoteForm.ImageReport}}</div>
                    <div class="dialog-info-content">
                        <div class="info-div">
                            <span class="info-item-title">{{const_list.RemoteForm.ImageFind}}</span>
                            <div class="info-item-content w-694 ml-80">{{infoModel.examView}}</div>
                        </div>
                        <div class="info-div">
                            <span class="info-item-title">{{const_list.RemoteForm.DiagnosticOpinion}}</span>
                            <div class="info-item-content w-694 ml-80">{{infoModel.examDiagnosis}}</div>
                        </div>
                        <div class="info-row">
                            <span class="info-item-title">{{const_list.RemoteForm.ReportDoctor}}</span>
                            <span class="info-item-content w-150">{{infoModel.diagDoctorName}}</span>
                            <span class="info-item-title ml-40">{{const_list.RemoteForm.AuditDoctor}}</span>
                            <span class="info-item-content w-150">{{infoModel.reviewDoctorName}}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="dialog-btn-div">
                <el-button class="btn-cancel my-default-btn" @click="closeDialog()">关闭</el-button>
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
export default class CreateApplication extends Vue {
  dialogTitle: string = "查看影像诊断";
  const_list = ConstList.RemoteDiagnosis;
  subBtnDisabled: boolean = false;
  curImageFileUrl: string = "";
  showProcess: boolean = false;
  showReport: boolean = false;

  @Prop() currecordid: string = "";

  // 信息结构体
  infoModel = {};

  logList = [];

  //初始化表单内容,之后布局调整后可能不用
  Init() {
    this.showProcess = false;
    this.showReport = false;
    this.curImageFileUrl = "";
    this.infoModel = {};
    this.logList = [];
    this.searchRemoteImageDiagnosis();
  }

  // 打开影像文件
  openImageFile() {
    this.getRemoteImageQueryImageFileUrl();
  }

  @Prop() show: boolean;
  showStatus: boolean = this.show;

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
          debugger;
          if ((_this.infoModel as any).status === 4) {
            _this.showReport = true;
          } else if ((_this.infoModel as any).status === 11) {
            _this.showProcess = true;
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
          _this.alert(ValidateInfo.GetInfoError, "error");
          console.log(response.data.code + ":" + response.data.message);
        }
      })
      .catch(function(error: any) {
        _this.closeDialog();
        console.log(error);
      });
  }

  // 获取英飞达影像文件地址接口
  getRemoteImageQueryImageFileUrl() {
    const _this = this;

    var requestModel = {
      id: (_this.infoModel as any).id
    };

    Vue.prototype.$http
      .post(apiConfig.API.getRemoteImageQueryImageFileUrl, requestModel)
      .then(function(response: any) {
        if (response.data.code === 0) {
          if (response.data.data === "") {
            _this.alert("没有影像文件！");
          } else {
            window.open(response.data.data);
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
          _this.alert(ValidateInfo.GetInfoError, "error");
          console.log(response.data.code + ":" + response.data.message);
        }
      })
      .catch(function(error: any) {
        _this.closeDialog();
        console.log(error);
      });
  }

  //打开地址
  viewMedicalData() {
    // 判断当前用户是否存在病历信息
    if ((this.infoModel as any).identityCardNo === "") {
      this.alert("暂无病历资料！");
      return;
    }

    // 确保是在网站的根目录下打开
    var rootPath = window.location.href.split("#")[0];
    window.open(
      `${rootPath}#/medicaldata?identityCardNo=${(this.infoModel as any).identityCardNo}`
    );
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

    .btn-cancel {
      margin-left: 10px;
    }
  }
}
</style>