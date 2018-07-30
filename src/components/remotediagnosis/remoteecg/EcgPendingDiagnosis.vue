<template>
  <div class="pending-diagnosis-list">
      <div class="list-title" v-show="false">{{const_list.TabTitle.PendingDiagnosis}}</div>
      <el-table
        :data="dataList"
        class="list-detail"
        stripe>
        <el-table-column
          prop="icon"
          width="50">
          <template>
            icon
          </template>
        </el-table-column>
        <el-table-column
          prop="applyTime"
          :label="const_list.ListTitle.ApplicationTime"
          min-width="130">
        </el-table-column>
        <el-table-column
          prop="studyType"
          :label="const_list.ListTitle.StudyProject"
          min-width="110">
        </el-table-column>
        <el-table-column
          prop="applyOrg"
          :label="const_list.ListTitle.ApplyOrg"
          min-width="180">
        </el-table-column>
        <el-table-column
          prop="diagnosisOrg"
          :label="const_list.ListTitle.DiagnosesOrg"
          min-width="180">
        </el-table-column>
        <el-table-column
          prop="status"
          :label="const_list.ListTitle.Status"
          min-width="90">
        </el-table-column>
        <el-table-column
          :label="const_list.ListTitle.Operation"
          min-width="160">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="viewDetail(scope.row.id)">{{const_list.ListTitle.View}}</el-button>
            <el-button type="text" size="small" @click="auditReferralForm(scope.row.id)">{{const_list.ListTitle.Diagnosis}}</el-button>
          </template>
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
      

      <!-- View detail start -->
      <viewdetail :show="viewDetailShow"
                  :recordId="curRecordId"
                  @show-statue-change="viewDetailDialogChange"></viewdetail>
      <!-- View detail end -->

      <!-- Audit referral form start -->
      <!-- <auditreferralform :show="auditReferralFormShow"
                         :recordId="curRecordId"
                         :isRollOut="true"
                        @show-statue-change="auditReferralFormDialogChange"></auditreferralform> -->
      <!-- Audit referral form end -->
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import ViewDetail from "@/components/remotediagnosis/remoteecg/ViewDetail.vue";
import RoleMenu from "./../../../utils/RoleMenu";
import ConstList from "./../../../utils/ConstList";
import * as types from "./../../../vuex/types";
import * as apiConfig from "./../../../api/config";
import store from "./../../../vuex/store";
import ReferralRights from "./../../../utils/ReferralRights";
import ValidateInfo from "./../../../utils/ValidateInfo";

@Component({
  components: {
    viewdetail: ViewDetail
    // auditreferralform: AuditReferralForm
  }
})
export default class EcgPendingDiagnosis extends Vue {
  // todo: 控制权限
  @Prop() admin: string;

  //记录点击的转诊ID
  curRecordId: string = "";

  const_list = ConstList.RemoteDiagnosis;

  // 翻页控件
  currentPage: number = 1;
  pageCount: number = 0;
  itemCount: number = 0;
  itemCountPerPage: number = 10;
  dataList: {}[] = [
    {
      applyTime: "2017-11-27 15:45 ",
      studyType: "常规心电图",
      diagnosisOrg: "南溪县中医院",
      applyOrg: "宜宾市第一人民医院",
      status: "待诊断"
    },
    {
      applyTime: "2017-11-27 15:45 ",
      studyType: "动态心电图",
      diagnosisOrg: "高县人民医院",
      applyOrg: "宜宾市第一人民医院",
      status: "待诊断"
    },
    {
      applyTime: "2017-11-27 15:45 ",
      studyType: "平板运动试验",
      diagnosisOrg: "长宁县中医院",
      applyOrg: "宜宾市第一人民医院",
      status: "已完成"
    }
  ];

  mounted() {
    this.$emit("cur-tab-index", "2-2");
    //this.getPendingAuditData();
  }

  // View referral form start
  viewDetailShow: boolean = false;

  viewDetail(val: string) {
    this.curRecordId = val;
    this.viewDetailShow = true;
  }

  viewDetailDialogChange(val: boolean) {
    this.viewDetailShow = val;
    //this.getPendingAuditData();
  }
  // View referral form end

  handleSizeChange(val: number) {
    this.itemCountPerPage = val;
    //this.getPendingAuditData();
  }

  handleCurrentChange(val: number) {
    this.currentPage = val;
    //this.getPendingAuditData();
  }

  getPendingAuditData() {
    const _this = this;
    var requestModel: {} = {
      pageIndex: _this.currentPage,
      itemCountPerPage: _this.itemCountPerPage,
      args: {
        status: 2
      }
    };

    Vue.prototype.$http
      .post(apiConfig.API.getReferralPatBasicInfo, requestModel)
      .then(function(response: any) {
        if (response.data.code === 0) {
          var data = response.data.data;
          _this.dataList = data.items;
          _this.itemCount = data.itemCount;
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
          console.log(response.data.message);
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
.pending-diagnosis-list {
  width: 100%;

  .list-title {
    font-size: 18px;
    padding-bottom: 7px;
    color: #42e0b7;
  }

  .page-control {
    margin: 30px 0;
    float: right;
  }
}
</style>
