<template>
  <div class="referralin-record-list">
      <div class="list-title">{{const_list.TabTitle.ReferralIn}}</div>
      <el-table
        :data="dataList"
        class="list-detail"
        v-bind:class="[paginationShow===false?'none-data':'']"
        :row-class-name="tableRowClassName" 
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
          min-width="170">
        </el-table-column>
        <el-table-column
          prop="statusText"
          :label="const_list.ListTitle.ReferralStatus"
          min-width="130">
        </el-table-column>
        <el-table-column
          :label="const_list.ListTitle.Operation"
          min-width="200">
          <template slot-scope="scope">
            <span class="my-link-btn pointer" @click="viewReferralForm(scope.row.id)">{{const_list.ListTitle.View}}</span>
            <span class="my-separate-line" v-show="receiveBtnStatus(scope.row.status)">|</span>
            <span class="my-link-btn pointer" v-show="receiveBtnStatus(scope.row.status)" @click="auditReferralForm(scope.row.id)">{{const_list.ListTitle.Receive}}</span>
            <span class="my-separate-line" v-show="cancelBtnStatus(scope.row.status)">|</span>
            <span class="my-link-btn pointer" v-show="cancelBtnStatus(scope.row.status)" @click="cancelReferral(scope.row.id)">{{const_list.ListTitle.Cancel}}</span>
            <span class="my-separate-line" v-show="rereferralBtnStatus(scope.row.status)">|</span>
            <span class="my-link-btn pointer" v-show="rereferralBtnStatus(scope.row.status)" @click="reReferral(scope.row)">{{const_list.ListTitle.Rereferral}}</span>
            <span class="my-separate-line" v-show="printBtnStatus(scope.row.status)">|</span>
            <span class="my-link-btn pointer" v-show="printBtnStatus(scope.row.status)">{{const_list.ListTitle.Print}}</span>
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
export default class ReferralInRecord extends Vue {
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
    this.$emit("cur-tab-index", "5");
    this.getPendingAuditData();
  }

  //取消转诊单
  cancelReferral(referralId: string) {
    const _this = this;
    Vue.prototype.$http
      .post(apiConfig.API.cancelReferralByID, referralId)
      .then(function(response: any) {
        if (response.data.code === 0) {
          alert("取消成功！");
          _this.getPendingAuditData();
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

  // 再次转诊
  reReferral(obj: any) {
    this.$emit("to-create-referral", { id: obj.id, status: obj.status });
  }

  // 接收按钮状态
  receiveBtnStatus(val: any): boolean {
    var flag: boolean = false;
    if (val === 3) {
      // 3:待接收
      flag = true;
    }
    return flag;
  }

  // 取消按钮状态
  cancelBtnStatus(val: any): boolean {
    var flag: boolean = false;
    if (val === 3) {
      // 3:待接收
      flag = true;
    }
    return flag;
  }

  // 再次转诊按钮状态
  rereferralBtnStatus(val: any): boolean {
    var flag: boolean = false;
    if (val === 4) {
      // 4:已接收
      flag = true;
    }
    return flag;
  }

  // 打印按钮状态
  printBtnStatus(val: any): boolean {
    var flag: boolean = true;
    if (val === 10 || val === 11) {
      // 10:转出医院退回,11:转入医院退回
      flag = false;
    }
    return flag;
  }

  // 判断每行记录样式
  tableRowClassName(row: any, rowIndex: any) {
    if (row.row.status === 10 || row.row.status === 11) {
      return "font-red";
    }

    return "";
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
      itemCountPerPage: _this.itemCountPerPage
    };

    Vue.prototype.$http
      .post(apiConfig.API.getReferralInRecordInfo, requestModel)
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
.referralin-record-list {
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
