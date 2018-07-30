<template>
  <div class="patient-info">
      <div class="patient-info-content">
        <div class="content-title">{{pageTitle}}</div>

        <div class="content-detail">
            <div class="content-detail-title">基本信息</div>
            <div class="patient-info-detail">
                <div class="row-info">
                    <img :src="'data:image/png;base64,'+patientInfo.photo" class="patient-img"/>
                    <div class="patient-head-info">
                        {{patientInfo.name}}<br>
                        {{patientInfo.sexText}}<br>
                        {{patientInfo.dtBirth}}<br>
                        城镇职工基本医疗保险
                    </div>
                </div>
                <div class="row-info">
                    <div class="info-title">民族</div>
                    <div class="info-content">{{patientInfo.nation}}</div>
                </div>
                <div class="row-info">
                    <div class="info-title">籍贯</div>
                    <div class="info-content">{{patientInfo.nativePlace}}</div>
                </div>
                <div class="row-info">
                    <div class="info-title">职业</div>
                    <div class="info-content">{{patientInfo.jobTypeName}}</div>
                </div>
                <div class="row-info">
                    <div class="info-title">文化程度</div>
                    <div class="info-content">{{patientInfo.educationLevelName}}</div>
                </div>
                <div class="row-info">
                    <div class="info-title">联系电话</div>
                    <div class="info-content">{{patientInfo.patientPhone}}</div>
                </div>
                <div class="row-info">
                    <div class="info-title">联系地址</div>
                    <div class="info-content">{{patientInfo.patientAddress}} </div>
                </div>
                <div class="row-info">
                    <div class="info-title">联系人</div>
                    <div class="info-content">
                        {{patientInfo.contactName}}      {{patientInfo.contactRelationshipType}}         {{patientInfo.contactPhone}}   
                    </div>
                </div>
            </div>
            <div class="content-detail-title">过敏史</div>
            <div class="anaphylaxis-detail">
              <el-table
                :data="anaphylaxisDataList"
                class="list-detail"
                stripe>
                <el-table-column
                  prop="title"
                  label="过敏原名称"
                  min-width="220">
                </el-table-column>
                <el-table-column
                  prop="symptom"
                  label="过敏症状"
                  min-width="200">
                </el-table-column>
                <el-table-column
                  prop="infoSources"
                  label="信息来源"
                  min-width="150">
                </el-table-column>
                <el-table-column
                  prop="entryAgency"
                  label="录入机构"
                  min-width="200">
                </el-table-column>
                <el-table-column
                  prop="entryUser"
                  label="录入者"
                  min-width="120">
                </el-table-column>
                <el-table-column
                  prop="entryTime"
                  label="录入时间"
                  min-width="217">
                </el-table-column>
              </el-table>
            </div>
        </div>
      </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import store from "./../../../vuex/store";
import * as types from "./../../../vuex/types";
import * as apiConfig from "./../../../api/config";
import DualreferralMenu from "./../../../utils/DualreferralMenu";
import ReferralRights from "./../../../utils/ReferralRights";
import ValidateInfo from "./../../../utils/ValidateInfo";

@Component({
  components: {}
})
export default class PatientInfo extends Vue {
  pageTitle: string = "患者信息";
  baseInfoTitle: string = "基本信息";
  anaphylaxisTitle: string = "过敏史";

  anaphylaxisDataList: {}[] = [
    {
      title: "青霉素",
      symptom: "休克",
      infoSources: "颈部血管造影",
      entryAgency: "宜宾市第三人民医院",
      entryUser: "宋林品",
      entryTime: "2015-12-22"
    },
    {
      title: "注射用头孢呋辛钠",
      symptom: "皮疹、恶心呕吐",
      infoSources: "测试",
      entryAgency: "宜宾市第三人民医院",
      entryUser: "宋林品",
      entryTime: "2015-12-20"
    },
    {
      title: "螨虫",
      symptom: "打喷嚏、眼痒",
      infoSources: "询问",
      entryAgency: "珙县妇幼保健院",
      entryUser: "李想",
      entryTime: "2010-04-30"
    },
    {
      title: "注射用头孢呋辛钠",
      symptom: "皮疹、恶心呕吐",
      infoSources: "测试",
      entryAgency: "宜宾市第三人民医院",
      entryUser: "宋林品",
      entryTime: "2015-12-20"
    },
    {
      title: "螨虫",
      symptom: "打喷嚏、眼痒",
      infoSources: "询问",
      entryAgency: "珙县妇幼保健院",
      entryUser: "李想",
      entryTime: "2010-04-30"
    }
  ];

  patientInfo: any = null;

  mounted() {
    this.Init();
  }

  Init() {
    this.getHCOForReferral();
  }

  // 获取当前病人基本信息
  getHCOForReferral() {
    const _this = this;

    //目前先写死
    var idCard = "1234567890";

    Vue.prototype.$http
      .post(apiConfig.API.getPatientBasicInfo, idCard)
      .then(function(response: any) {
        if (response.data.code === 0) {
          _this.patientInfo = response.data.data;
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
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.patient-info {
  width: 100%;
  background: #fff;

  .patient-info-content {
    position: relative;
    width: 100%;
    height: 100%;

    .content-title {
      height: 40px;
      line-height: 40px;
      padding-left: 5px;
      font-size: 18px;
      color: #42e0b7;
      border-bottom: 1px solid #eee;
      width: 100%;
      font-weight: bold;
      margin-bottom: 10px;
    }

    .content-detail {
      width: 100%;

      .content-detail-title {
        width: 100%;
        background: #f0faf6;
        margin-bottom: 10px;
        padding: 5px 10px;
      }

      .patient-info-detail {
        margin-bottom: 20px;

        .row-info {
          overflow: hidden;

          .patient-img {
            width: 100px;
            height: 100px;
            float: left;
          }

          .patient-head-info {
            float: left;
            margin-left: 10px;
            color: #000;
          }

          .info-title {
            float: left;
            text-align: right;
            width: 100px;
            color: #888;
          }

          .info-content {
            float: left;
            margin-left: 10px;
            color: #000;
          }
        }
      }

      .anaphylaxis-detail {
      }
    }
  }
}
</style>
