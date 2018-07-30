<template>
  <div class="view-referral"
      v-show="show">
    <div class="view-referral-content">
        <div class="view-referral-dialog">
            <div class="dialog-title noprint">
                <span class="line"></span>{{dialogTitle}}
                <span class="close-dialog" @click="closeDialog()"><i class="el-icon-close"></i></span>
            </div>
            <div id="zzdprint" class="print-container">
              <div  class="print-content not-print">
                  <div  class="dialog-content-title">
                    <span>医联体云平台</span>

                  </div>
                  <div  class="dialog-content-title">
                    <span>转诊申请单</span>
                  </div>
                  <div class="userinfo-row">
                      <span  class="info-title">{{const_list.ReferralForm.IdCard}}</span>
                      <span  class="info-content w-330">{{referralInfoModel.identityCardNo}}</span>
                  </div>
                  <div class="userinfo-row">
                      <span class="info-title">{{const_list.ReferralForm.Name}}</span>
                      <span class="info-content w-120">{{referralInfoModel.patientName}}</span>
                      <span class="info-title ml-20">{{const_list.ReferralForm.Sex}}</span>
                      <span class="info-content w-120">{{referralInfoModel.sexText}}</span>
                      <span class="info-title ml-20">{{const_list.ReferralForm.Age}}</span>
                      <span class="info-content w-120">{{referralInfoModel.age}}{{referralInfoModel.ageUnit}}</span>
                  </div>
                  <div class="userinfo-row">
                      <span class="info-title">联系电话：</span>
                      <span class="info-content w-120">{{referralInfoModel.patientPhone}}</span>
                      <span class="info-title ml-20">联系地址：</span>
                      <span class="info-content w-330">{{referralInfoModel.patientAddress}}</span>
                  </div>
                  <div class="userinfo-row">
                      <span class="info-title">{{const_list.ReferralForm.VisitType}}</span>
                      <span class="info-content w-120">{{referralInfoModel.targetVisitText}}</span>
                      <span class="info-title ml-20">转入机构：</span>
                      <span class="info-content w-330">{{referralInfoModel.targetOrgName}} {{referralInfoModel.targetDeptName}}</span>
                  </div>
                  <div class="h-line"></div>
                  <div class="userinfo-row">
                    <span class="info-title">{{const_list.ReferralForm.InitialDiagnosis}}</span>
                    <span class="info-content w-560">{{referralInfoModel.diagnosis}}</span>
                  </div>
                  <div class="userinfo-row">
                    <span class="info-title">{{const_list.ReferralForm.SummaryAndDiagnosis}}</span>
                    <span class="info-content info-div w-560">{{referralInfoModel.diseaseSummary}}</span>
                  </div>
                  <div class="userinfo-row">
                    <span class="info-title">{{const_list.ReferralForm.Attention}}</span>
                    <span class="info-content info-div w-560">{{referralInfoModel.attention}}</span>
                  </div>
                  <div class="userinfo-row">
                    <span class="info-title">{{const_list.ReferralForm.ReferralReason}}</span>
                    <span class="info-content info-div w-560">{{referralInfoModel.referralReasonName}}</span>
                  </div>

            </div>
            </div>
            <div class="print-bottom">
              <div class="h-line"></div>
              <div class="userinfo-row">
                <span class="info-title">转出机构：</span>
                <span class="info-content w-330">{{referralInfoModel.reqOrgName}} {{referralInfoModel.reqDeptName}}</span>

                <span class="info-title ml-20">手机号码：</span>
                <span class="info-content w-120">{{referralInfoModel.reqDoctorPhone}}</span>
              </div>
              <div class="userinfo-row">
                <span class="info-title">转诊医生：</span>
                <span class="info-content w-330">{{showLoadSignature?'':referralInfoModel.reqDoctorName}}<img class="signature" v-show="showLoadSignature" :src="referralInfoModel.reqDoctorSignature" /></span>
                <!--  <span style="width:90mm">{{referralInfoModel.reqDoctorName}} {{referralInfoModel.reqDoctorPhone}}</span>-->
                <span class="info-title ml-20">转诊日期：</span>
                <span class="info-content w-120">{{referralInfoModel.dtSubmit|formatDate}}</span>
              </div>
            </div>
            <div class="dialog-submit noprint">
              <el-button class="my-default-btn" @click="showMsg()">打印</el-button>
              <el-button class="my-default-btn" @click="closeDialog()">关闭</el-button>
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
export default class PrintReferralForm extends Vue {
  dialogTitle: string = "转诊单打印";
  const_list = ConstList.Referral;
  showLoadSignature: boolean = false;
  @Prop() show: boolean;
  showStatus: boolean = this.show;

  //转诊单ID
  @Prop() referralId: string;

  //转诊单信息
  referralInfoModel: any = {};

  init() {
    this.referralInfoModel = {};
    this.showLoadSignature = false;
    this.getReferralInfoByID();
  }

  getReferralInfoByID() {
    const _this = this;
    Vue.prototype.$http
      .post(apiConfig.API.getReferralInfoByID, _this.referralId)
      .then(function(response: any) {
        if (response.data.code === 0) {
          _this.referralInfoModel = response.data.data;
          if (response.data.data.reqDoctorSignature === null) {
            _this.showLoadSignature = false;
          } else {
            _this.showLoadSignature = true;
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
          console.log(response.data.code + ":" + response.data.message);
        }
      })
      .catch(function(error: any) {
        alert("获取信息出错！");
        _this.closeDialog();
        console.log(error);
      });
  }

  //取消转诊单
  cancelReferral() {
    const _this = this;
    Vue.prototype.$http
      .post(apiConfig.API.cancelReferralByID, _this.referralId)
      .then(function(response: any) {
        if (response.data.code === 0) {
          alert("取消成功！");
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
          console.log(response.data.code + ":" + response.data.message);
        }
      })
      .catch(function(error: any) {
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

  showMsg() {
    // let codestr = <HTMLDivElement>document.getElementById("zzdprint");   //获取需要生成pdf页面的div代码
    // if(codestr!=null)
    // {
    //let oldstr=document.body.innerHTML;
    //let newstr=codestr.innerHTML;

    this.$nextTick(function() {
     /* var content:any = document.getElementById("zzdprint");
      var printStr = "<html><head><meta http-equiv='Content-Type' content='text/html; charset=utf-8'></head><body >";
      printStr = printStr+content.innerHTML+"</body></html>";
      var pwin:any=window.open("Print.htm","print");
      pwin.document.write(printStr);
      pwin.document.close();
      pwin.print();*/
      let printDiv : any = document.getElementById("zzdprint");
      var oldHeight = printDiv.offsetHeight;
      printDiv.style.height = "910px";
      window.print();
      printDiv.style.height = oldHeight +"px";
    });

    //}
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
      padding-right: 0;
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
          right: 15px;
          top: 0px;
          display: block;
          font-size: 23px;
          color: #30e0b2;
          cursor: pointer;
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

        .textarea-content {
          white-space: pre;
          word-wrap: break-word;
          white-space: pre-wrap;
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

        .signature-row {
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
      .print-bottom{
        padding: 0 10mm;
      }
      .dialog-submit {
        float: right;
        margin: 0px 20px 20px 20px;
      }
    }
  }
}
</style>
