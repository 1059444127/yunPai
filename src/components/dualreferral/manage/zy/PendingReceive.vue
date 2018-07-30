<template>
  <div class="pending-receive-list">
      <div class="list-title">{{const_list.TabTitle.PendingReceive}}</div>
      <el-table
        :data="dataList"
        v-bind:class="[paginationShow===false?'none-data':'']"
        class="list-detail"
        stripe>
        <el-table-column
          prop="patientName"
          :label="const_list.ListTitle.UserName"
          min-width="110">
        </el-table-column>
        <el-table-column
          prop="sexText"
          :label="const_list.ListTitle.Sex"
          min-width="80">
        </el-table-column>
        <el-table-column
          :label="const_list.ListTitle.Age"
          min-width="90">
          <template slot-scope="scope">
            {{scope.row.age}}{{scope.row.ageUnit}}
          </template>
        </el-table-column>
        <el-table-column
          :label="const_list.ListTitle.Direction"
          min-width="300">
          <template slot-scope="scope">
            {{scope.row.reqOrgName}} → {{scope.row.targetOrgName}}
          </template>
        </el-table-column>
        <el-table-column
          prop="dtSubmit"
          :label="const_list.ListTitle.ApplicationTime"
          min-width="210">
        </el-table-column>
        <el-table-column
          :label="const_list.ListTitle.Operation"
          min-width="160">
          <template slot-scope="scope">
            <span class="my-link-btn pointer" @click="viewReferralForm(scope.row.id)">{{const_list.ListTitle.View}}</span>
            <span class="my-separate-line">|</span>
            <span class="my-link-btn pointer" @click="auditReferralForm(scope.row.id)">{{const_list.ListTitle.Receive}}</span>
            <span class="my-separate-line">|</span>
            <span class="my-link-btn pointer">{{const_list.ListTitle.Print}}</span>
          </template>
        </el-table-column>
      </el-table>
      <!-- <div v-show="!paginationShow" class="none-data-display">暂无数据</div> -->
      <el-pagination
        v-show="paginationShow"
        class="page-control"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="itemCountPerPage"
        layout="total, sizes, prev, pager, next, jumper"
        :total="itemCount">
      </el-pagination>
      

      <!-- View referral form start -->
      <viewreferralform :show="viewReferralFormShow"
                        :referralId="curReferralId"
                        @show-statue-change="viewReferralFormDialogChange"></viewreferralform>
      <!-- View referral form end -->

      <!-- Audit referral form start -->
      <auditreferralform :show="auditReferralFormShow"
                         :referralId="curReferralId"
                         :isRollOut="false"
                        @show-statue-change="auditReferralFormDialogChange"></auditreferralform>
      <!-- Audit referral form end -->
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import ViewReferralForm from "@/components/dualreferral/manage/zy/ViewReferralForm.vue";
import AuditReferralForm from "@/components/dualreferral/manage/zy/AuditReferralForm.vue";
import RoleMenu from "./../../../../utils/RoleMenu";
import ConstList from "./../../../../utils/ConstList";
import * as types from "./../../../../vuex/types";
import * as apiConfig from "./../../../../api/config";
import store from "./../../../../vuex/store";
import ReferralRights from "./../../../../utils/ReferralRights";
import ValidateInfo from "./../../../../utils/ValidateInfo";

@Component({
  components: {
    viewreferralform: ViewReferralForm,
    auditreferralform: AuditReferralForm
  }
})
export default class PendingReceive extends Vue {
  // todo: 控制权限
  @Prop() admin: string;

  //记录点击的转诊ID
  curReferralId: string = "";
  //分页控件的显示状态
  paginationShow: boolean = true;

  const_list = ConstList.Referral;

  // 翻页控件
  currentPage: number = 1;
  pageCount: number = 0;
  itemCount: number = 0;
  itemCountPerPage: number = 10;
  dataList: {}[] = [];

  mounted() {
    this.$emit("cur-tab-index", "3");
    this.getPendingAuditData();
  }

  // View referral form start
  viewReferralFormShow: boolean = false;

  viewReferralForm(val: string) {
    this.curReferralId = val;
    this.viewReferralFormShow = true;
  }

  viewReferralFormDialogChange(val: boolean) {
    this.viewReferralFormShow = val;
    this.getPendingAuditData();
  }
  // View referral form end

  // Audit referral form start
  auditReferralFormShow: boolean = false;

  auditReferralForm(val: string) {
    this.curReferralId = val;
    this.auditReferralFormShow = true;
  }

  auditReferralFormDialogChange(val: boolean) {
    this.auditReferralFormShow = val;
    this.getPendingAuditData();
    this.$emit("to-refresh-count", "");
  }
  // Audit referral form end

  handleSizeChange(val: number) {
    this.itemCountPerPage = val;
    this.getPendingAuditData();
  }

  handleCurrentChange(val: number) {
    this.currentPage = val;
    this.getPendingAuditData();
  }

  getPendingAuditData() {
    const _this = this;

    var requestModel: {} = {
      pageIndex: _this.currentPage,
      itemCountPerPage: _this.itemCountPerPage,
      args: {
        status: 3
      }
    };

    Vue.prototype.$http
      .post(apiConfig.API.getReferralPatBasicInfo, requestModel)
      .then(function(response: any) {
        if (response.data.code === 0) {
          var data = response.data.data;

          //控制分页控件的显示状态
          if (data.itemCount > 0) {
            _this.paginationShow = true;
          } else {
            _this.paginationShow = false;
          }

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
.pending-receive-list {
  width: 100%;

  .list-title {
    height: 38px;
    line-height: 38px;
    font-size: 16px;
    color: #1bd0a1;
    background: #effaf6;
    padding-left: 20px;
    margin-bottom: 10px;
  }

  .none-data-display {
    width: 100%;
    padding-top: 360px;
    background: url("./../../../../assets/image/common_none_table_data.png")
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
</style>
