<template>
  <div class="homepage">
    <div class="homepage-content">
      <el-row type="flex" class="row-bg"  :gutter="30">
        <el-col :span="8"><div class="grid-content">
          <el-card class="box-card" body-style="padding:10px !important;padding-right: 0px !important;">
            <span class="line"></span>
            <span class="card-title">医生统计</span>
            <div class="rang-content">
              <div class="rang-title" style="margin-top: 25px;">
                <el-button :class="[{'m-submit-btn':!isAll},'submit-btn']"  size="mini" round @click="getDoctorReferralRank(0)">全部</el-button>
                <el-button :class="[{'m-submit-btn':isAll},'submit-btn']"  size="mini" round @click="getDoctorReferralRank(30)">本月</el-button>
                <span>转诊数量</span>
              </div>
              <div class="rang-list" style="margin-top: 10px;">
                 <div class="rang-item" v-for="item in doctorInfoList"
                      :key="item.index">
                   <img v-if="item.photo==null" src="../../../assets/image/common_user_photo_none.png"/>
                   <img v-else :src="item.photo"/>
                   <div class="item-head">
                     <div class="item-head-name">{{item.name}}</div>
                     <div class="item-head-title">{{item.title}}</div>
                   </div>
                   <div class="item-end-count">{{item.currentCount}}</div>
                     <div class="item-end-icon">
                         <i  v-if="item.currentRanking>item.previousRanking" class="el-icon-caret-top"></i>
                         <i  v-else-if="item.currentRanking==item.previousRanking" class="el-icon-minus"></i>
                         <i  v-else-if="item.currentRanking<item.previousRanking" class="el-icon-caret-bottom"></i>
                     </div>


                 </div>
              </div>
            </div>
          </el-card>
        </div></el-col>
        <el-col :span="8"><div class="grid-content">
          <el-card class="box-card" body-style="height:100%;padding:10px !important;">
              <div><span class="line" ></span>
              <span class="card-title">转诊统计</span></div>
              <div style="padding-top:25px;">
                <el-row :gutter="0"  justify="center">
                  <el-col :span="12">
                    <div class="grid-content">
                      <div class="count-div" >
                        转诊总数
                    <span>{{dualreferralOutCount}}</span>
                  </div>
              </div>
                  </el-col>
                  <el-col :span="12" >
                    <div class="grid-content">
                        <div class="count-div">
                         接收总数
                        <span>{{dualreferralInCount}}</span>
                      </div>
                    </div>
                  </el-col>
                </el-row>
              </div>
              <div id="referralCountPieDiv" style="height: 100%"></div>
          </el-card>

        </div></el-col>
        <el-col :span="8"><div class="grid-content">
          <el-card class="box-card"  body-style="padding:10px !important;height:100%;">
            <div>
              <span class="line"></span>
              <span class="card-title">最近半月转诊</span>
            </div>
            <div class="count-div" style="text-align: center;margin-top: 25px;margin-left: 30%;width: 45%">
              转诊峰值
              <span>{{halfMonthMaxCount}}人/天</span>
            </div>

            <div id="referralCountBarDiv" style="height: 280px"></div>
          </el-card>

        </div></el-col>
      </el-row>
      <div class="content-list">
        <el-card class="box-card" body-style="padding:10px !important;">
          <div style="margin-bottom:10px;overflow:hidden;">
            <span class="line"></span>
            <span class="card-title">待办事项</span>
            <span class="list-more" title="查看更多"> <el-button type="text" @click="goMore"><i class="el-icon-more" ></i></el-button></span>
          </div>
          <el-table
            ref="table"
            :data="dataList"
            class="list-detail"
            :row-class-name="tableRowClassName"
            stripe>
            <el-table-column
              prop="submitDT"
              :label="const_list.ListTitle.ApplicationTime"
              min-width="150">
            </el-table-column>
            <el-table-column
              prop="name"
              :label="const_list.ListTitle.UserName"
              min-width="100">
            </el-table-column>
            <el-table-column
              prop="sexText"
              :label="const_list.ListTitle.Sex"
              min-width="60">
            </el-table-column>
            <el-table-column
              :label="const_list.ListTitle.Age"
              min-width="70">
              <template slot-scope="scope">
                {{scope.row.age}}{{scope.row.ageUnit}}
              </template>
            </el-table-column>
            <el-table-column
              prop="diagnosis"
              :label="const_list.ListTitle.InitialDiagnosis"
              min-width="110">
            </el-table-column>
            <el-table-column
              :label="const_list.ListTitle.Direction"
              min-width="260">
              <template slot-scope="scope">
                {{scope.row.reqOrgName}} → {{scope.row.targetOrgName}}
              </template>
            </el-table-column>
            <el-table-column
              prop="targetVisitTypeText"
              :label="const_list.ListTitle.PlanVisitType"
              min-width="60">
            </el-table-column>
            <el-table-column
              prop="statusText"
              :label="const_list.ListTitle.ReferralStatus"
              min-width="130">
            </el-table-column>
            <el-table-column
              :label="const_list.ListTitle.Operation"
              min-width="120">
              <template slot-scope="scope">
                <i class="iconfont icon-shenhe oper-icon oper-icon-audit"
                   @click="scope.row.targetVisitType===0?mzAuditReferralForm(scope.row.id):zyAuditReferralForm(scope.row.id)"
                   :title="const_list.ListTitle.Audit"
                   v-show="acceptAuditRight">
                </i>
              </template>
            </el-table-column>
          </el-table>
        </el-card >
      </div>
    </div>

    <!-- Audit referral form start -->
    <mzauditreferralform :show="mzAuditReferralFormShow"
                         :referralId="curReferralId"
                         :isRollOut="false"
                         @show-statue-change="mzAuditReferralFormDialogChange"></mzauditreferralform>
    <!-- Audit referral form start -->
    <zyauditreferralform :show="zyAuditReferralFormShow"
                         :referralId="curReferralId"
                         :isRollOut="false"
                         @show-statue-change="zyAuditReferralFormDialogChange"></zyauditreferralform>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import store from "../../../vuex/store";
import * as types from "../../../vuex/types";
import * as apiConfig from "../../../api/config";
import ConstList from "./../../../utils/ConstList";
import ReferralRights from "./../../../utils/ReferralRights";
import echarts from "echarts";
import MZAuditReferralForm from "@/components/dualreferral/manage/mz/AuditReferralForm.vue";
import ZYAuditReferralForm from "@/components/dualreferral/manage/zy/AuditReferralForm.vue";
import ValidateInfo from "./../../../utils/ValidateInfo";

@Component({
  components: {
    zyauditreferralform: ZYAuditReferralForm,
    mzauditreferralform: MZAuditReferralForm
  }
})
export default class Index extends Vue {
  const_list = ConstList.Referral;
  dataList: {}[] = [];
  // 功能权限点标记
  acceptAuditRight: boolean = ReferralRights.AcceptAudit();

  //记录点击的转诊ID
  curReferralId: string = "";

  searchDualReferralIn() {
    const _this = this;

    var requestModel = {
      pageIndex: 1,
      itemCountPerPage: 4,
      args: {
        //待审核
        status: 2
      }
    };

    Vue.prototype.$http
      .post(apiConfig.API.searchDualReferralIn, requestModel)
      .then(function(response: any) {
        if (response.data.code === 0) {
          var data = response.data.data;

          _this.dataList = data.items;
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
          console.log(response.data.message);
        }
      })
      .catch(function(error: any) {
        console.log(error);
      });
  }

  tableRowClassName(row: any, rowIndex: any) {
    if (row.row.status === 10 || row.row.status === 11) {
      return "font-red";
    }

    return "";
  }

  // Audit referral form start
  mzAuditReferralFormShow: boolean = false;

  mzAuditReferralForm(val: string) {
    this.curReferralId = val;
    this.mzAuditReferralFormShow = true;
  }

  mzAuditReferralFormDialogChange(val: boolean) {
    this.mzAuditReferralFormShow = val;
    this.searchDualReferralIn();
    this.$emit("to-refresh-count", "");
  }

  zyAuditReferralFormShow: boolean = false;

  zyAuditReferralForm(val: string) {
    this.curReferralId = val;
    this.zyAuditReferralFormShow = true;
  }

  zyAuditReferralFormDialogChange(val: boolean) {
    this.zyAuditReferralFormShow = val;
    this.searchDualReferralIn();
    this.$emit("to-refresh-count", "");
  }
  // Audit referral form end

  goMore() {
    if (this.dataList.length > 0) {
      let firstItem = this.dataList[0] as any;
      if (firstItem.targetVisitType == 1) {
        this.$router.push({ path: "/dualreferral/manage/zyaudit" });
      } else {
        this.$router.push({ path: "/dualreferral/manage/mzaudit" });
      }
    } else {
      this.$router.push({ path: "/dualreferral/manage/zyaudit" });
    }
  }

  halfMonthMaxCount: number = 0;
  doctorInfoList: {}[] = [];
  isAll: boolean = false;

  getDoctorReferralRank(days: number) {
    const _this = this;
    _this.isAll = days == 30;

    var requestModel: any = {
      days: days
    };
    Vue.prototype.$http
      .post(apiConfig.API.getDoctorReferralCountRank, requestModel)
      .then(function(response: any) {
        if (response.data.code === 0) {
          _this.doctorInfoList = response.data.data;
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
        }
      })
      .catch(function(error: any) {
        console.log(error);
      });
  }

  dualreferralOutCount: number = 0;
  dualreferralInCount: number = 0;

  getfReferralAllCount() {
    const _this = this;
    Vue.prototype.$http
      .post(apiConfig.API.getReferralTotal, {})
      .then(function(response: any) {
        if (response.data.code === 0) {
          _this.renderReferralPie(response.data.data);
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
        }
      })
      .catch(function(error: any) {
        console.log(error);
      });
  }

  //转诊统计饼图生成
  myPieChart: any;
  renderReferralPie(obj: any) {
    this.dualreferralOutCount = obj.outCount;
    this.dualreferralInCount = obj.inCount;
    let option = {
      tooltip: {
        trigger: "item",
        formatter: "{a} <br/>{b}:{c} ({d}%)"
      },
      color: ["#c23531", "#2f4554"],
      series: [
        {
          type: "pie",
          radius: "45%",
          center: ["50%", "45%"],
          data: [
            { value: obj.inCount, name: "接收总数" },
            { value: obj.outCount, name: "转诊总数" }
          ]
        }
      ]
    };
    this.myPieChart = echarts.init(<HTMLDivElement>document.getElementById(
      "referralCountPieDiv"
    ));
    this.myPieChart.setOption(option);
  }
  getHalfReferralCount() {
    const _this = this;
    var requestModel: any = {
      days: 15
    };
    Vue.prototype.$http
      .post(apiConfig.API.getHalfMonthReferralCount, requestModel)
      .then(function(response: any) {
        if (response.data.code === 0) {
          _this.renderReferralBarData(response.data.data);
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
        }
      })
      .catch(function(error: any) {
        console.log(error);
      });
  }

  renderReferralBarData(list: any[]) {
    let obj: any = {
      dateArr: [],
      inCountArr: [],
      outCountArr: []
    };
    var max = list[0].inCount + list[0].outCount;
    for (let i = 0; i < list.length; i++) {
      let item = list[i];
      var tempMax = item.inCount + item.outCount;
      if (tempMax > max) {
        max = tempMax;
      }
      obj.dateArr.push(item.date);
      obj.inCountArr.push(item.inCount);
      obj.outCountArr.push(item.outCount);
    }
    this.halfMonthMaxCount = max;
    this.renderReferralBar(obj);
  }
  //创建半月转诊柱状图

  myBarChart: any;
  renderReferralBar(obj: any) {
    let option = {
      tooltip: {
        trigger: "axis",
        axisPointer: {
          type: "shadow"
        }
      },
      legend: {
        height: "150px"
      },
      grid: {
        left: "1%",
        bottom: "5%",
        right: "1%",
        top: "5%",
        containLabel: true
      },
      calculable: true,
      xAxis: [
        {
          type: "category",
          splitLine: {
            show: false
          },
          data: obj.dateArr
        }
      ],
      yAxis: [
        {
          type: "value"
        }
      ],
      series: [
        {
          name: "转入人数 ",
          type: "bar",
          stack: "count",
          data: obj.inCountArr,
          itemStyle: {
            normal: {
              color: "#54a2d5"
            }
          }
        },
        {
          name: "转出人数 ",
          type: "bar",
          stack: "count",
          data: obj.outCountArr,
          itemStyle: {
            normal: {
              color: "#4575D8"
            }
          }
        }
      ]
    };
    this.myBarChart = echarts.init(<HTMLDivElement>document.getElementById(
      "referralCountBarDiv"
    ));
    this.myBarChart.setOption(option);
  }

  mounted() {
    this.getDoctorReferralRank(0);
    this.getfReferralAllCount();
    this.getHalfReferralCount();
    this.searchDualReferralIn();
    let _this = this;
    window.onresize = function() {
      _this.myPieChart.resize();
      _this.myBarChart.resize();
    };
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.homepage {
  width: 100%;
  min-width: 625px;
  height: calc(100% - 20px);

  .homepage-content {
    position: relative;
    margin-top: 20px;
    width: 100%;
    .m-submit-btn {
      border: 1px solid #1bd0a1;
      color: #fff;
      background: #1bd0a1;
      width: 57px;
      padding: 7px 0;
    }
    .row-bg {
      margin-left: 0 !important;
      margin-right: 0 !important;

      .box-card {
        height: 400px;
        .line {
          font-weight: bold;
          margin-right: 4px;
          display: inline-block;
          width: 2px;
          height: 16px;
          margin-bottom: -1px;
          background: #30e0b2;
        }

        .rang-content {
          .rang-title {
            margin-right: 20px;
            span {
              float: right;
              font-size: 15px;
              color: #67ceaf;
            }
          }
          .rang-list {
            height: 300px;
            overflow-y: auto;
            .rang-item:nth-of-type(even) {
              background: #fafafa;
            }
            .rang-item {
              overflow: hidden;
              padding-left: 10px;
              padding-top: 6px;
              padding-bottom: 6px;
              padding-right: 10px;
              margin-right: 10px;

              img {
                float: left;
                width: 45px;
                height: 45px;
                border-radius: 50%;
              }
              .item-head {
                display: inline-block;
                float: left;
                margin-left: 10px;
                .item-head-name {
                  margin-top: 3px;
                  font-size: 15px;
                }
                .item-head-title {
                  margin-top: 6px;
                  font-size: 12px;
                  color: #999;
                }
              }

              .item-end-icon {
                float: right;
                display: inline-block;
                line-height: 1;
                margin-top: 9px;
                margin-right: 10px;
                i {
                  font-size: xx-large;
                  color: #67ceaf;
                }
                .el-icon-caret-bottom {
                  color: #d5f8f1;
                }
              }

              .item-end-count {
                float: right;
                display: inline-block;
                width: 50px;
                text-align: right;
                margin-top: 19px;
                font-size: 14px;
                line-height: 1;
              }
            }
          }
        }

        .card-title {
          font-size: 18px;
        }
        .count-div {
          background-color: #d5f8f1;
          padding: 5px 10px;
          color: #67ceaf;
          border-radius: 10px;
          font-size: 0.8rem;
          text-align: center;
          margin-left: 18%;
          width: 130px;
          span {
            margin-left: 3px;
          }
        }
      }
    }
    .content-list {
      padding: 10px 15px;

      .line {
        font-weight: bold;
        margin-right: 4px;
        display: inline-block;
        width: 2px;
        height: 16px;
        margin-bottom: -1px;
        background: #30e0b2;
      }
      .list-more {
        float: right;
        margin-right: 10px;
        color: #30e0b2;
        .el-button {
          padding: 0;
        }
      }
      .list-detail {
        width: 100%;
        .none-data-display {
          width: 100%;
          padding-top: 360px;
          background: url("./../../../assets/image/common_none_table_data.png")
            no-repeat center 130px;
          color: #333333;
          font-size: 20px;
          text-align: center;
        }

        .page-control {
          margin: 30px 0;
          float: right;
        }
      }
    }
  }
}
</style>
