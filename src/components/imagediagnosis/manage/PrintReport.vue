<template>
  <div class="view-referral"
      v-show="show">
    <div class="view-referral-content">
        <div class="view-referral-dialog">
            <div class="dialog-title noprint">
                <span class="line"></span>{{dialogTitle}}
                <span class="close-dialog" @click="closeDialog()"></span>
            </div>
            <div id="zzdprint" class="print-container">
              <div  class="print-content not-print">
                  <div  class="dialog-content-title">
                    <span>{{`${infoModel.diagOrgName}+${infoModel.reqOrgName}`}}</span>

                  </div>
                  <div  class="dialog-content-title">
                    <span>影像报告单</span>
                  </div>

                <div class="h-line"></div>
                <div class="userinfo-row">
                  <span class="info-title">{{const_list.RemoteForm.UserName}}</span>
                  <span class="info-content w-120">{{infoModel.name}}</span>
                  <span class="info-title ml-20">{{const_list.RemoteForm.Sex}}</span>
                  <span class="info-content w-120">{{infoModel.sexText}}</span>
                  <span class="info-title ml-20">{{const_list.RemoteForm.Age}}</span>
                  <span class="info-content w-120">{{infoModel.age}}{{infoModel.ageUnit}}</span>
                </div>
                <div class="userinfo-row">

                  <span class="info-title">{{const_list.RemoteForm.StudyDate}}</span>
                  <span class="info-content w-120" >{{infoModel.submitDT|formatDate}}</span>
                  <!--<span class="info-title">{{const_list.RemoteForm.ApplyDepartment}}</span>
                  <span class="info-content w-330">{{infoModel.reqDeptName}}</span>-->
                  <span class="info-title ml-20">{{const_list.RemoteForm.StudyType}}</span>
                  <span class="info-content w-120">{{infoModel.examClassName}}</span>

                  <span class="info-title ml-20">{{const_list.RemoteForm.StudyNumber}}</span>
                  <span class="info-content w-120">{{infoModel.hisExamID}}</span>
                </div>
                <div class="h-line"></div>
                <div class="userinfo-row">

                  <span class="info-title">{{const_list.RemoteForm.StudyProject}}</span>
                  <span class="info-content w-560">{{infoModel.examItems}}</span>
                </div>
                <div class="userinfo-row" >
                  <span class="info-title">{{const_list.RemoteForm.ImageFind}}</span>
                  <span class="info-content info-div w-560">{{infoModel.examView}}</span>
                </div>
                <div class="userinfo-row" >
                  <span class="info-title">{{const_list.RemoteForm.DiagnosticOpinion}}</span>
                  <span class="info-content info-div w-560">{{infoModel.examDiagnosis}}</span>
                </div>

                <div class="userinfo-row" v-show="false">
                  <span class="info-title">{{const_list.RemoteForm.DiagnosisOrg}}</span>
                  <span class="info-content w-560">{{`${infoModel.diagOrgName} ${infoModel.diagDeptName}`}}</span>
                </div>

              </div>
            </div>
            <div class="print-bottom">
              <div class="h-line"></div>
              <div class="userinfo-row">
                <span class="info-title">{{const_list.RemoteForm.ReportDoctor}}</span>
                <!-- <span style="width:30mm">{{infoModel.diagDoctorName}}</span> -->
                <span class="info-content w-120">{{diagDoctorNameShow?infoModel.diagDoctorName:''}}<img v-show="diagDoctorSignatureShow" class="signature" :src="infoModel.diagDoctorSignature" /></span>
                <span class="info-title ml-20">{{const_list.RemoteForm.AuditDoctor}}</span>
                <!-- <span style="width:30mm">{{infoModel.reviewDoctorName}}</span> -->
                <span class="info-content w-120">{{reviewDoctorNameShow?infoModel.reviewDoctorName:''}}<img v-show="reviewDoctorSignatureShow" class="signature" :src="infoModel.reviewDoctorSignature" /></span>
                <span class="info-title ml-20">{{const_list.RemoteForm.ReportTime}}</span>
                <span class="info-content w-120">{{infoModel.diagDT|formatDate}}</span>
              </div>
              <div class="userinfo-row note-msg">*注：本报告仅供临床医师参考，具体请结合临床。</div>
            </div>
            <div class="dialog-submit noprint">
                  <el-button class="my-default-btn" @click="printReport()">打印</el-button>
                  <el-button class="my-default-btn" @click="closeDialog()">关闭</el-button>
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
export default class PrintReport extends Vue {
  dialogTitle: string = "报告打印";
  const_list = ConstList.RemoteDiagnosis;
  diagDoctorNameShow: boolean = false;
  diagDoctorSignatureShow: boolean = false;
  reviewDoctorNameShow: boolean = false;
  reviewDoctorSignatureShow: boolean = false;

  @Prop() show: boolean;
  showStatus: boolean = this.show;

  // 当前记录ID
  @Prop() currecordid: string;

  // model信息
  infoModel: any = {};

  init() {
    this.diagDoctorNameShow = false;
    this.diagDoctorSignatureShow = false;
    this.reviewDoctorNameShow = false;
    this.reviewDoctorSignatureShow = false;
    this.infoModel = {};
    this.searchRemoteImageDiagnosis();
  }

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

          if (_this.infoModel.diagDoctorSignature !== null) {
            _this.diagDoctorSignatureShow = true;
          } else {
            _this.diagDoctorNameShow = true;
          }

          if (_this.infoModel.reviewDoctorSignature !== null) {
            _this.reviewDoctorSignatureShow = true;
          } else {
            _this.reviewDoctorNameShow = true;
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

  // 滚动条回到顶部
  scrollToTop() {
    var scrollContainer = this.$el.querySelector("#zzdprint");
    if (scrollContainer !== null) {
      scrollContainer.scrollTop = 0;
    }
  }

  closeDialog() {
    this.show = false;
    this.scrollToTop();
  }

  printReport() {
    this.$nextTick(function() {
      let printDiv : any = document.getElementById("zzdprint");
      var oldHeight = printDiv.offsetHeight;
      printDiv.style.height = "910px";
      window.print();
      printDiv.style.height = oldHeight +"px";
    });
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
@media print {
  .noprint {
    display: none;
  }
}
.view-referral {
  position: fixed;
  z-index: 9;
  background: rgba(0, 0, 0, 0.5);
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  line-height: 24px;
  font-size: 14px;

  .view-referral-content {
    width: 190mm;
    margin: 50px auto;
    height: calc(100% - 100px);

    .view-referral-dialog {
      height: 100%;
      width: 100%;
      background: #fff;
      padding: 2px;
      padding-right: 20px;
      border-radius: 2px;

      .dialog-title {
        position: relative;
        width: 100%;
        height: 50px;
        line-height: 50px;
        padding-left: 20px;
        font-size: 16px;
        color: #1bd0a1;

        .line {
          font-weight: bold;
          margin-right: 8px;
          display: inline-block;
          width: 2px;
          height: 11px;
          background: #30e0b2;
        }

        .close-dialog {
          position: absolute;
          right: 0;
          top: 15px;
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
      .userinfo-row {
        min-height: 35px;
        line-height: 35px;
        font-size: 14px;
        overflow: hidden;
        span {
          display: inline-block;
          float:left;
        }

        .info-title {
          width: 70px;
          min-height:1px;
          text-align: right;
          margin-right: 6px;
        }
        .info-content{
          min-height: 35px;
          line-height: 35px;
          white-space: pre;
          word-wrap: break-word;
          white-space: pre-wrap;
        }

        .info-div{
          min-height: 80px;
          white-space: pre;
          word-wrap: break-word;
          white-space: pre-wrap;
        }
        .signature {
          margin-top: 5px;
          height: 30px;
          width: 100px;
        }
        .w-120{
          width:120px;
        }
        .w-330{
          width:330px;
        }
        .w-560{
          width:560px;
        }
        .ml-20{
          margin-left: 20px;
        }

        &.note-msg {
          font-weight: bold;
        }

        .textarea-content {
          white-space: pre;
          word-wrap: break-word;
          white-space: pre-wrap;
        }

        &.signature-row {
          height: 30px !important;
          line-height: 30px !important;

          span {
            float: left;
          }

          .signature {
            height: 35px;
            width: 100px;
          }
        }
      }
      .h-line {
        border: 0.5px solid black;
      }
      .print-container {
        height: calc(100% - 180px);
        overflow-y: auto;
      }
      .print-content {
        background: white;
        width: 180mm;
        padding-left: 10mm;

        .dialog-content-title {
          height: 24px;
          line-height: 24px;
          font-size: 18px;
          font-weight: bold;
          text-align: center;
        }
      }
      .print-bottom{
        padding-left:10mm;
      }
      .dialog-submit {
        float: right;
        margin: 0px 20px 20px 20px;
      }
    }
  }
}
</style>
