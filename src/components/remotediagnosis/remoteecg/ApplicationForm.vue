<template>
  <div class="create-application-dialog">
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
                        <span class="confirm-info study-project">常规心电图</span>
                    </div>
                    <div class="detail-row">
                        <span class="row-item-title">{{const_list.RemoteForm.StudyPurposes}}</span>
                        <span class="confirm-info study-purposes">心律失常原因确定</span>
                    </div>
                    <div class="detail-row">
                        <span class="row-item-title">{{const_list.RemoteForm.ClinicalDiagnosis}}</span>
                        <span class="confirm-info clinical-diagnosis">心律失常</span>
                    </div>
                    <div class="detail-row">
                        <span class="row-item-title">{{const_list.RemoteForm.SymptomsAndSigns}}</span>
                        <span class="confirm-info symptoms-and-signs">患者自诉头晕、胸闷、多汗、心悸、不规则心跳，血压115/70mmHg，体温37.6</span>
                    </div>
                    <div class="detail-row">
                        <span class="row-item-title">{{const_list.RemoteForm.CorrelationStudy}}</span>
                        <span class="confirm-info correlation-study">肌酸激酶311.5U/L，乳酸脱氢酶455.36U/L</span>
                    </div>
                    <div class="detail-row">
                        <span class="row-item-title">{{const_list.RemoteForm.OtherInfo}}</span>
                        <span class="confirm-info other-info">近期无服用过洋地黄类药物</span>
                    </div>
                </div>
            </div>
            <div class="dialog-detail">
                <div class="dialog-detail-title">{{const_list.RemoteForm.ApplyInfo}}</div>
                <div class="dialog-detail-content">
                    <div class="detail-row">
                        <span>{{const_list.RemoteForm.Urgency}}</span>
                        <span class="confirm-info urgency">一般</span>
                    </div>
                    <div class="detail-row">
                        <span>{{const_list.RemoteForm.ReceiveOrg}}</span>
                        <span class="confirm-info receive-org">宜宾市第一人民医院</span>
                        <span class="confirm-info receive-dept">影像科</span>
                    </div>
                    <div class="detail-row">
                        <span class="row-item-title">{{const_list.RemoteForm.ApplyPurpose}}</span>
                        <span class="confirm-info apply-purpose">明确诊断</span>
                    </div>
                    <div class="detail-row">
                        <span>{{const_list.RemoteForm.ApplyHospital}}</span>
                        <span class="confirm-info apply-hospital">梁山县人民医院</span>
                        <span class="apply-department-title">{{const_list.RemoteForm.ApplyDepartment}}</span>
                        <span class="confirm-info apply-department">放射科</span>
                    </div>
                        <div class="detail-row">
                        <span>{{const_list.RemoteForm.ApplyDoctor}}</span>
                        <span class="confirm-info apply-doctor">张开华</span>
                        <span class="contact-number-title">{{const_list.RemoteForm.ContactNumber}}</span>
                        <span class="confirm-info contact-number">15389026901</span>
                    </div>
                </div>
            </div>
            <div class="dialog-submit" v-show="false">
                <el-button type="success" class="btn-submit" @click="submitReferralInfo()">提交</el-button>
                <el-button type="info" class="btn-cancel" @click="closeDialog()">取消</el-button>
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
export default class ApplicationForm extends Vue {
  dialogContentTitle: string = "医联体云平台";
  dialogContentSubTitle: string = "远程心电诊断申请单";
  const_list = ConstList.RemoteDiagnosis;

  //初始化表单内容,之后布局调整后可能不用
  Init() {}

  mounted() {
    this.Init();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.create-application-dialog {
  width: 100%;
  background: #7f7f7f;
  padding: 2px;
  border-radius: 2px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);

  .dialog-content {
    width: 920px;
    background: #fff;
    margin: 20px auto;
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

    .dialog-submit {
      width: 100%;
      padding: 16px 50px 0px 90px;
    }
  }
}
</style>