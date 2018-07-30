<template>
  <div class="create-application-dialog">
        <div class="dialog-content" id="dialog-content" @scroll.prevent>
          <div class="dialog-content-detail">
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
                        <span class="confirm-info user-idcard">323021195405171556</span>
                    </div>
                    <div class="detail-row">
                        <span>{{const_list.RemoteForm.Name}}</span>
                        <span class="confirm-info user-name">金小文</span>
                        <span class="user-sex-title">{{const_list.RemoteForm.Sex}}</span>
                        <span class="confirm-info user-sex">男</span>
                        <span class="user-age-title">{{const_list.RemoteForm.Age}}</span>
                        <span class="confirm-info user-age">66岁</span>
                    </div>
                    <div class="detail-row">
                        <span>{{const_list.RemoteForm.ConstType}}</span>
                        <span class="confirm-info user-costtype">新农合</span>
                    </div>
                </div>
            </div>
            <div class="dialog-detail">
                <div class="dialog-detail-title">{{const_list.RemoteForm.OriginalStudyInfo}}</div>
                <div class="dialog-detail-content">
                    <div class="detail-row">
                        <span class="row-item-title">{{const_list.RemoteForm.StudyProject}}</span>
                        <span class="confirm-info study-project">常规病理检查</span>
                    </div>
                    <div class="detail-row">
                        <span class="row-item-title">{{const_list.RemoteForm.ClinicalData}}</span>
                        <span class="confirm-info study-purposes">患者右腿痣40年，于最近开始变大，临床考虑Spitz痣。</span>
                    </div>
                    <div class="detail-row">
                        <span class="row-item-title">{{const_list.RemoteForm.SpecimenInfo}}</span>
                        <span class="confirm-info clinical-diagnosis">右腿皮肤。</span>
                    </div>
                    <div class="detail-row">
                        <span class="row-item-title">{{const_list.RemoteForm.SeeByEye}}</span>
                        <span class="confirm-info symptoms-and-signs">皮肤组织大小1*1*0.8cm，表面可以见一1*0.6cm突起，切面实性灰白色。</span>
                    </div>
                    <div class="detail-row">
                        <span class="row-item-title">{{const_list.RemoteForm.DigitalSlice}}</span>
                        <span class="confirm-info correlation-study"></span>
                    </div>
                    <div class="detail-row">
                        <span class="row-item-title">{{const_list.RemoteForm.SeeUnderMirror}}</span>
                        <span class="confirm-info other-info">
                          切片示真皮内黑色素细胞增生，构成大的上皮样和梭形细胞巢团，这些细胞充满并扩展至真皮 纤维组织。黑色素细胞穿插于并包绕胶原束，至活检组织的底部。高倍观，黑色素细胞大，局 部见不典型黑色素细胞，核仁显著。核分裂像不明显。局部见浅表真皮疤痕。
                        </span>
                    </div>
                    <div class="detail-row">
                        <span class="row-item-title">{{const_list.RemoteForm.InitialDiagnosis}}</span>
                        <span class="confirm-info other-info">Spitz痣</span>
                    </div>
                </div>
            </div>
          </div>
        </div>
        <div class="report-assistant">
          <div class="title">
            诊断报告
          </div>
          <p>
            1、不典型皮内上皮样和梭形细胞增生， 符合真皮内Spitz痣，黑色素细胞局部扩 展至活检组织的基底部<br>
            2、局部真皮疤痕
          </p>
          <hr>
          <p>
            诊断机构 ：宜宾市第一人民医院 心内科<br>
            报告医生 ：刘金峰<br>
            报告时间 ：2017-11-28 15:23
          </p>
          <br>
          <el-button class="btn-save" type="success" size="small" @click="toModifyReport()">修改</el-button>
          <el-button class="btn-save" type="success" size="small" @click="toPrint()">通过审核</el-button>
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
  dialogContentSubTitle: string = "远程病理诊断报告单";
  const_list = ConstList.RemoteDiagnosis;

  //初始化表单内容,之后布局调整后可能不用
  Init() {}

  mounted() {
    this.Init();
  }

  toModifyReport() {
    this.$router.push({ name: "pathologydiagnosticreport" });
  }

  toPrint() {
    this.$router.push({ name: "pathologyprintreportform" });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.create-application-dialog {
  width: 100%;
  padding: 2px;
  clear: both;

  .dialog-content {
    width: 1000px;
    background: #7f7f7f;
    float: left;
    padding: 20px 0;

    .dialog-content-detail {
      width: 920px;
      margin: 0 auto;
      background: #fff;
      padding: 50px 0;

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
    }
  }

  .report-assistant {
    width: calc(100% - 1020px);
    height: 692px;
    float: right;
    background: #fff;
    padding: 5px;

    .title {
      background: #f0faf6;
      padding: 5px;
      margin-bottom: 10px;
    }

    .diagnosis-report {
      width: 100%;
      margin-bottom: 10px;
    }

    .btn-save {
      margin-bottom: 10px;
    }
  }
}
</style>