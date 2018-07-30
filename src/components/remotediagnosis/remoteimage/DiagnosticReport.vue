<template>
  <div class="create-application-dialog">
        <div class="dialog-content">
            <div class="dialog-content-detail">
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
                      <el-input type="textarea" 
                                class="image-find left" 
                                size="mini"
                                resize="none"
                                rows="6"
                                v-model="infoModel.examView">
                      </el-input>
                  </div>
                  <div class="detail-row">
                      <span>{{const_list.RemoteForm.DiagnosticOpinion}}</span>
                      <el-input type="textarea" 
                                class="diagnostic-opinion left" 
                                size="mini"
                                resize="none"
                                rows="6"
                                v-model="infoModel.examDiagnosis">
                      </el-input>
                  </div>
              </div>
              <hr>
              <div class="dialog-submit">
                  <el-button type="success" class="btn-submit" @click="saveaveDiagReportReport()">保存</el-button>
              </div>
            </div>
        </div>
        <div class="report-assistant">
          <div class="title">
            报告助手
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
export default class DiagnosticReport extends Vue {
  dialogContentTitle: string = "医联体云平台";
  dialogContentSubTitle: string = "远程影像诊断报告单";
  const_list = ConstList.RemoteDiagnosis;
  saveType: number = 0;

  infoModel = {
    examView: "",
    examDiagnosis: ""
  };

  Init() {
    // 3:待审核,4:完成
    if (store.state.remote.curRecordStatus === 3) {
      this.toAudit();
    } else if (store.state.remote.curRecordStatus === 4) {
      this.toPrint();
    } else {
      if (store.state.remote.curRecordStatus === 32) {
        this.saveType = 1;
      } else {
        this.saveType = 0;
      }

      this.getDiagReport();
    }
  }

  created() {
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

  // 保存诊断报告（0:新建,1:修改）
  saveaveDiagReportReport() {
    const _this = this;
    if (store.state.remote.curRecordId !== "") {
      var requestModel: {} = {
        diagReqId: store.state.remote.curRecordId,
        examView: _this.infoModel.examView,
        examDiagnosis: _this.infoModel.examDiagnosis,
        saveType: _this.saveType
      };

      Vue.prototype.$http
        .post(apiConfig.API.remoteImageSaveDiagReport, requestModel)
        .then(function(response: any) {
          if (response.data.code === 0) {
            _this.toAudit();
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
          console.log(error);
        });
    }
  }

  // 跳转到审核界面
  toAudit() {
    store.commit(types.CURREMOTERECORD, {
      curRecordId: store.state.remote.curRecordId,
      curRecordStatus: 3
    });
    this.$router.push({ name: "imageauditreportform" });
  }

  // 跳转到打印界面
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
  overflow: hidden;
  background: #f8f8f8;
  min-width: 1200px;

  .dialog-content {
    width: calc(80% - 20px);
    float: left;
    background: #fff;

    .dialog-content-detail {
      width: 920px;
      background: #fff;
      padding: 50px 0;
      margin: 0 auto;

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
          .user-sex {
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

          .image-find,
          .diagnostic-opinion {
            width: 650px;
          }
        }
      }

      .dialog-submit {
        width: 100%;
        padding: 16px 90px 0px 90px;
      }
    }
  }

  .report-assistant {
    width: 20%;
    height: 692px;
    float: right;
    background: #fff;
    padding: 5px;

    .title {
      background: #f0faf6;
      padding: 5px;
    }
  }
}
</style>