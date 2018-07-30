<template>
  <div class="medical-record">
      <div class="medical-record-content">
        <div class="content-title">{{pageTitle}}</div>
        <div class="content-nav">
            就诊类型：
            <el-select clearable size="mini" placeholder="请选择">
                <el-option
                v-for="item in ageUnitOptList"
                :key="item.key"
                :label="item.value"
                :value="item.value">
                </el-option>
            </el-select>
            <span class="margin-span"></span>
            就诊日期：
            <el-select clearable size="mini" placeholder="请选择">
                <el-option
                v-for="item in ageUnitOptList"
                :key="item.key"
                :label="item.value"
                :value="item.value">
                </el-option>
            </el-select>
            <el-date-picker
                v-model="dateVal"
                size="mini"
                type="datetimerange"
                :picker-options="pickerOptions2"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                align="right">
            </el-date-picker>
            <br><br>
            就诊医院：
            <el-input class="input" size="mini"></el-input>
            <span class="margin-span"></span>
            医生姓名：
            <el-input class="input" size="mini"></el-input>
            <span class="margin-span"></span>
            <el-button size="mini">查找</el-button>
        </div>
        <div class="content-list">
            <el-table
                :data="dataList"
                class="list-detail"
                @row-click="toDetail()"
                fit="false"
                stripe>
                <el-table-column
                    min-width="57">
                    <template slot-scope="scope">
                        <span :class="getVisitTypeIcon(scope.row.visitType)"></span>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="dtVisitStart"
                    label="就诊日期"
                    min-width="130">
                </el-table-column>
                <el-table-column
                    prop="visitType"
                    label="类型"
                    min-width="100">
                </el-table-column>
                <el-table-column
                    prop="diagnosis"
                    label="诊断"
                    min-width="250">
                </el-table-column>
                <el-table-column
                    prop="hCOName"
                    label="就诊医院"
                    min-width="250">
                </el-table-column>
                <el-table-column
                    prop="hCODeptName"
                    label="就诊科室"
                    min-width="180">
                </el-table-column>
                <el-table-column
                    prop="doctorName"
                    label="医生"
                    min-width="140">
                </el-table-column>
            </el-table>
            <el-pagination
                class="page-control"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-sizes="[10, 20, 30, 40]"
                :page-size="itemCountPerPage"
                layout="total, sizes, prev, pager, next, jumper"
                :total="itemCount">
            </el-pagination>
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
import ReferralRights from "./../../../utils/ReferralRights";
import ValidateInfo from "./../../../utils/ValidateInfo";

@Component({
  components: {}
})
export default class MedicalRecord extends Vue {
  pageTitle: string = "就诊记录";
  dateVal: any = null;

  // 翻页控件
  currentPage: number = 1;
  pageCount: number = 0;
  itemCount: number = 0;
  itemCountPerPage: number = 10;

  // 就诊记录数据
  dataList: {}[] = [
    {
      hCODeptName: "",
      hCOName: "",
      id: "",
      patientId: "",
      dtVisitStart: "",
      visitType: "",
      doctorName: "",
      diagnosis: ""
    }
  ];

  Init() {
    this.getPendingAuditData();
  }

  mounted() {
    this.Init();
  }

  getPendingAuditData() {
    const _this = this;
    var requestModel: {} = {
      pageIndex: _this.currentPage,
      itemCountPerPage: _this.itemCountPerPage,
      args: {
        patientId: "1"
      }
    };

    Vue.prototype.$http
      .post(apiConfig.API.getVisitInfoByPatientId, requestModel)
      .then(function(response: any) {
        if (response.data.code === 0) {
          var data = response.data.data;
          _this.dataList = data.items;
          _this.itemCount = data.itemCount;
        } else if (response.data.code === apiConfig.MESSAGECODE.TIMEOUT) {
          store.commit(types.LOGOUT);
          _this.$router.push({ path: "/" });
        } else {
          console.log(response.data.message);
        }
      })
      .catch(function(error: any) {
        console.log(error);
      });
  }

  toDetail() {
    this.$emit(
      "page-redirect",
      "/remotediagnosis/remoteimage/medicalrecorddetail"
    );
  }

  //根据就诊类型获取图标
  getVisitTypeIcon(val: any) {
    switch (val) {
      case 0:
        return "outpatients";
      case 1:
        return "hospital";
      case 2:
        return "test";
      default:
        break;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.medical-record {
  width: 100%;
  background: #fff;

  .medical-record-content {
    position: relative;
    width: 100%;
    height: 100%;

    .content-title {
      height: 40px;
      line-height: 40px;
      padding-left: 5px;
      font-size: 18px;
      color: #42e0b7;
      width: 100%;
      border-bottom: 1px solid #eee;
      font-weight: bold;
    }

    .content-nav {
      width: 100%;
      padding: 20px 10px 40px 0;
      overflow: hidden;

      .input {
        width: 183px;
      }

      .margin-span {
        margin-left: 30px;
      }
    }

    .content-list {
      width: 100%;

      .page-control {
        margin: 30px 0;
        float: right;
      }

      .outpatients {
        display: block;
        width: 24px;
        height: 24px;
        background: url(./../../../assets/image/case_icon_outpatients.png)
          no-repeat center;
        background-size: 100% 100%;
      }

      .hospital {
        display: block;
        width: 24px;
        height: 24px;
        background: url(./../../../assets/image/case_icon_hospital.png)
          no-repeat center;
        background-size: 100% 100%;
      }

      .test {
        display: block;
        width: 24px;
        height: 24px;
        background: url(./../../../assets/image/case_icon_test.png) no-repeat
          center;
        background-size: 100% 100%;
      }
    }
  }
}
</style>
