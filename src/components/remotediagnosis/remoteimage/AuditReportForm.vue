<template>
  <div class="create-application-dialog">
        <div class="dialog-content">
            <div class="dialog-content-title">
                {{dialogContentTitle}}
                <br>
                {{dialogContentSubTitle}}
            </div>
            <div class="dialog-detail">
                <div class="detail-row">
                    <span>{{const_list.RemoteForm.IdCard}}</span>
                    <span class="confirm-info user-idcard">{{infoModel.idCardNo}}</span>
                </div>
                <div class="detail-row">
                    <span>{{const_list.RemoteForm.Name}}</span>
                    <span class="confirm-info user-name">{{infoModel.name}}</span>
                    <span class="user-sex-title">{{const_list.RemoteForm.Sex}}</span>
                    <span class="confirm-info user-sex">{{infoModel.sextext}}</span>
                    <span class="user-age-title">{{const_list.RemoteForm.Age}}</span>
                    <span class="confirm-info user-age">{{infoModel.age}}{{infoModel.ageUnit}}</span>
                </div>
            </div>
            <hr>
            <div class="dialog-detail">
                <div class="detail-row">
                    <span>{{const_list.RemoteForm.StudyType}}</span>
                    <span class="confirm-info study-type">{{infoModel.examClass}}</span>
                </div>
                <div class="detail-row">
                    <span>{{const_list.RemoteForm.StudyProject}}</span>
                    <span class="confirm-info study-project">{{infoModel.examItems}}</span>
                </div>
                <div class="detail-row">
                    <span>{{const_list.RemoteForm.ImageFind}}</span>
                    <div class="confirm-info image-find">{{infoModel.examView}}</div>
                </div>
                <div class="detail-row">
                    <span>{{const_list.RemoteForm.DiagnosticOpinion}}</span>
                    <div class="confirm-info diagnostic-opinion">{{infoModel.examDiagnosis}}</div>
                </div>
            </div>
            <hr>
            <div class="dialog-detail">
                <div class="detail-row">
                    <span>{{const_list.RemoteForm.DiagnosisOrg}}</span>
                    <span class="confirm-info diagnosis-org">{{infoModel.diagOrgName}}</span>
                    <span class="confirm-info diagnosis-dept">{{infoModel.diagDeptName}}</span>
                </div>
                <div class="detail-row">
                    <span>{{const_list.RemoteForm.ReportDoctor}}</span>
                    <span class="confirm-info report-doctor">{{infoModel.diagDoctorName}}</span>
                    <span>{{const_list.RemoteForm.ReportTime}}</span>
                    <span class="confirm-info report-time">{{infoModel.diagDT}}</span>
                </div>
            </div>
            <div class="dialog-submit">
                <el-button type="success" class="btn-submit" @click="toModifyReport()">修改</el-button>
                <el-button type="success" class="btn-submit" @click="auditReport()">通过审核</el-button>
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

@Component
export default class AuditReportForm extends Vue {
  dialogContentTitle: string = "医联体云平台";
  dialogContentSubTitle: string = "远程影像诊断报告单";
  const_list = ConstList.RemoteDiagnosis;

  infoModel = {};

  Init() {
    this.getDiagReport();
  }

  mounted() {
    this.Init();
  }

  // 获取诊断报告信息
  getDiagReport() {
    const _this = this;
    if (store.state.remote.curRecordId !== "") {
      Vue.prototype.$http
        .post(
          apiConfig.API.remoteImageGetDiagReport,
          store.state.remote.curRecordId
        )
        .then(function(response: any) {
          if (response.data.code === 0) {
            _this.infoModel = response.data.data;
          } else if (response.data.code === apiConfig.MESSAGECODE.TIMEOUT) {
            store.commit(types.LOGOUT);
            _this.$router.push({ path: "/" });
          } else {
            console.log(response.data.code + ":" + response.data.message);
          }
        })
        .catch(function(error: any) {
          alert("获取信息出错！");
          console.log(error);
        });
    }
  }

  // 审核诊断报告
  auditReport() {
    const _this = this;

    if (store.state.remote.curRecordId !== "") {
      Vue.prototype.$http
        .post(
          apiConfig.API.remoteImageAcceptAudit,
          store.state.remote.curRecordId
        )
        .then(function(response: any) {
          if (response.data.code === 0) {
            _this.toPrint();
          } else if (response.data.code === apiConfig.MESSAGECODE.TIMEOUT) {
            store.commit(types.LOGOUT);
            _this.$router.push({ path: "/" });
          } else {
            console.log(response.data.code + ":" + response.data.message);
          }
        })
        .catch(function(error: any) {
          alert("获取信息出错！");
          console.log(error);
        });
    }
  }

  toModifyReport() {
    store.commit(types.CURREMOTERECORD, {
      curRecordId: store.state.remote.curRecordId,
      curRecordStatus: 32 // 表示修改诊断报告
    });
    this.$router.push({ name: "imagediagnosticreport" });
  }

  toPrint() {
    store.commit(types.CURREMOTERECORD, {
      curRecordId: store.state.remote.curRecordId,
      curRecordStatus: 4
    });
    this.$router.push({ name: "imageprintreportform" });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.create-application-dialog {
  width: 100%;
  padding: 2px;
  background: #fff;
  min-width: 1000px;

  .dialog-content {
    width: 920px;
    margin: 0 auto;
    padding: 50px 0;

    .dialog-content-title {
      line-height: 24px;
      font-size: 20px;
      text-align: center;
      color: #666;
    }

    hr {
      margin: 0 50px;
    }

    .dialog-detail {
      width: 100%;
      padding: 16px 90px 0 90px;

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

        .user-idcard {
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
        .report-doctor {
          width: 130px;
        }

        .user-sex-title,
        .user-age-title {
          margin-left: 60px;
        }

        .user-age {
          width: 60px;
        }

        .user-age-unit {
          width: 66px;
          margin-left: 4px;
        }

        .diagnosis-dept {
          margin-left: 10px;
        }

        .image-find,
        .diagnostic-opinion {
          width: 650px;
          margin-left: 70px;
          white-space: pre;
          word-wrap: break-word;
          white-space: pre-wrap;
        }
      }
    }

    .dialog-submit {
      width: 100%;
      padding: 30px 90px 0px 90px;
    }
  }
}
</style>