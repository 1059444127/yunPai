<template>
  <div class="dualreferral">
      <div class="dualreferral-content">
        <div class="content-title"><span>|</span>{{pageTitle}}</div>
        <div class="content-nav">
          <div class="nav-list">
            患者姓名<el-input class="search-input" 
                             size="medium" 
                             v-model="searchModel.name" 
                             placeholder="请输入患者姓名">
            </el-input>
            转诊时间<el-date-picker v-model="searchModel.submitDT"
                                   class="search-date"
                                   type="daterange"
                                   range-separator="至"
                                   start-placeholder="开始日期"
                                   end-placeholder="结束日期">
                    </el-date-picker>
            状态<el-select class="status-type left" 
                           placeholder="请选择"
                           v-model="searchModel.status">
                    <el-option
                    v-for="item in statusList"
                    :key="item.key"
                    :label="item.value"
                    :value="item.key">
                    </el-option>
                </el-select> 
          </div>
          <div class="nav-search" v-show="false">
            <div class="my-search-control">
              <input :placeholder="noneSearchKeyMsg" type="text"/>
              <div></div>
            </div>
          </div>
          <el-button size="medium"
                     @click="searchDualReferralIn(true)"
                     class="my-btn my-submit-btn search-btn">
                     查询
          </el-button>
        </div>
        <div class="content-list">
          <div class="list-detail">
            <el-table
              ref="table"
              :data="dataList"
              :height="tableHeight"
              class="list-detail"
              v-bind:class="[paginationShow===false?'none-data':'']"
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
                prop="statusText"
                :label="const_list.ListTitle.ReferralStatus"
                min-width="130">
              </el-table-column>
              <el-table-column
                :label="const_list.ListTitle.Operation"
                min-width="120">
                <template slot-scope="scope">
                  <i class="iconfont icon-chakan oper-icon oper-icon-view" 
                     @click="viewReferralForm(scope.row.id)" 
                     :title="const_list.ListTitle.View"
                     v-show="viewBtnStatus(scope.row.status)">
                  </i>
                  <i class="iconfont icon-shenhe oper-icon oper-icon-audit" 
                     @click="auditReferralForm(scope.row.id)" 
                     :title="const_list.ListTitle.Audit"
                     v-show="auditBtnStatus(scope.row.status) && acceptAuditRight">
                  </i>
                  <!-- <span class="my-link-btn pointer" @click="viewReferralForm(scope.row.id)">{{const_list.ListTitle.View}}</span>
                  <span class="my-separate-line" v-show="auditBtnStatus(scope.row.status)">|</span>
                  <span class="my-link-btn pointer" v-show="auditBtnStatus(scope.row.status)" @click="auditReferralForm(scope.row.id)">{{const_list.ListTitle.Audit}}</span>
                  <span class="my-separate-line" v-show="cancelBtnStatus(scope.row.status)">|</span>
                  <span class="my-link-btn pointer" v-show="cancelBtnStatus(scope.row.status)" @click="cancelReferral(scope.row.id)">{{const_list.ListTitle.Recall}}</span>
                  <span class="my-separate-line" v-show="rereferralBtnStatus(scope.row.status)">|</span>
                  <span class="my-link-btn pointer" v-show="rereferralBtnStatus(scope.row.status)" @click="reReferral(scope.row)">{{const_list.ListTitle.Rereferral}}</span>
                  <span class="my-separate-line" v-show="printBtnStatus(scope.row.status)">|</span>
                  <span class="my-link-btn pointer" v-show="printBtnStatus(scope.row.status)" @click="printReferralForm(scope.row.id)">{{const_list.ListTitle.Print}}</span> -->
                </template>
              </el-table-column>
            </el-table>
            <div v-show="!paginationShow" class="none-data-display">暂无数据</div>
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
          </div>
        </div>
      </div>

      <createreferral :show="dialogCreateShow" 
                      :paraminfo="createReferralInfo"
                      :appointment="appointmentSuccess"
                      @show-statue-change="createDialogChange" 
                      @appointment-statue-change="appointmentStatusChange"
                      @to-confirm="confirmReferral"
                      @to-hospitallist="hospitalList">
      </createreferral>
      <confirmreferral :show="dialogConfirmShow" 
                       @show-statue-change="confirmDialogChange"
                       @refresh-page="refreshPage">
      </confirmreferral>

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

      <!-- Print referral form start -->
      <printreferralform :show="printReferralFormShow"
                         :referralId="curReferralId"
                        @show-statue-change="printReferralFormDialogChange"></printreferralform>
      <!-- Print referral form end -->
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import store from "./../../../../vuex/store";
import * as types from "./../../../../vuex/types";
import * as apiConfig from "./../../../../api/config";
import ViewReferralForm from "@/components/dualreferral/manage/zy/ViewReferralForm.vue";
import AuditReferralForm from "@/components/dualreferral/manage/zy/AuditReferralForm.vue";
import PrintReferralForm from "@/components/dualreferral/manage/zy/PrintReferralForm.vue";
import RoleMenu from "./../../../../utils/RoleMenu";
import ConstList from "./../../../../utils/ConstList";
import CreateReferral from "@/components/dualreferral/manage/zy/CreateReferral.vue";
import ConfirmReferral from "@/components/dualreferral/manage/zy/ConfirmReferral.vue";
import ReferralRights from "./../../../../utils/ReferralRights";
import ValidateInfo from "./../../../../utils/ValidateInfo";
/*
import HospitalList from "@/components/dualreferral/manage/HospitalList.vue";
import DepartmentList from "@/components/dualreferral/manage/DepartmentList.vue";
import AppointmentList from "@/components/dualreferral/manage/AppointmentList.vue";
*/

@Component({
  components: {
    viewreferralform: ViewReferralForm,
    auditreferralform: AuditReferralForm,
    createreferral: CreateReferral,
    confirmreferral: ConfirmReferral,
    printreferralform: PrintReferralForm
  }
})
export default class AcceptAudit extends Vue {
  pageTitle: string = "住院审核";
  tableHeight: any = "";
  // todo: 控制权限
  @Prop() admin: string;

  // 功能权限点标记
  acceptAuditRight: boolean = ReferralRights.AcceptAudit();

  //记录点击的转诊ID
  curReferralId: string = "";
  //分页控件的显示状态
  paginationShow: boolean = true;

  const_list = ConstList.Referral;

  statusList = [
    {
      key: null,
      value: "全部"
    },
    {
      key: "4",
      value: "审核通过"
    },
    {
      key: "11",
      value: "审核未通过"
    },
    {
      key: "2",
      value: "待审核"
    }
  ];

  // 翻页控件
  currentPage: number = 1;
  pageCount: number = 0;
  itemCount: number = 0;
  itemCountPerPage: number = 10;
  dataList: {}[] = [];

  mounted() {
    this.searchDualReferralIn(true);

    //监听窗口大小改变事件
    var that = this;
    window.onresize = function temp() {
      if (that.paginationShow) {
        that.initTableHeight();
      }
    };
  }

  // 重置table高度
  initTableHeight() {
    this.tableHeight = document.documentElement.clientHeight - 350;
  }

  // 审核按钮状态
  auditBtnStatus(val: any): boolean {
    var flag: boolean = false;

    // 2:待审核
    if (val === 2) {
      flag = true;
    }
    return flag;
  }

  // 查看按钮状态
  viewBtnStatus(val: any): boolean {
    var flag: boolean = false;
    if (val === 4 || val === 11) {
      // 4:审核通过，5:审核未通过
      flag = true;
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
    this.searchDualReferralIn();
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
    this.searchDualReferralIn();
    this.$emit("to-refresh-count", "");
  }
  // Audit referral form end

  printReferralFormShow: boolean = false;
  printReferralForm(val: string) {
    this.curReferralId = val;
    this.printReferralFormShow = true;
  }
  printReferralFormDialogChange(val: boolean) {
    this.printReferralFormShow = val;
    this.searchDualReferralIn();
  }

  handleSizeChange(val: number) {
    this.itemCountPerPage = val;
    this.searchDualReferralIn();
  }

  handleCurrentChange(val: number) {
    this.currentPage = val;
    this.searchDualReferralIn();
  }

  // 查询关键字
  searchModel = {
    name: "",
    submitDT: "",
    status: null
  };

  // 查询接口参数
  requestModel = {
    pageIndex: 0,
    itemCountPerPage: 0,
    args: {
      name: "",
      submitDTBegin: "",
      submitDTEnd: "",
      status: null,
      targetVisitType: 1
    }
  };

  searchDualReferralIn(initialPage: boolean = false) {
    const _this = this;
    if (initialPage) {
      _this.currentPage = 1;

      _this.requestModel.args = {
        name: _this.searchModel.name,
        submitDTBegin: (_this.searchModel.submitDT as any)[0],
        submitDTEnd: (_this.searchModel.submitDT as any)[1],
        status: _this.searchModel.status,
        targetVisitType: 1
      };
    }

    _this.requestModel.pageIndex = _this.currentPage;
    _this.requestModel.itemCountPerPage = _this.itemCountPerPage;

    Vue.prototype.$http
      .post(apiConfig.API.searchDualReferralIn, _this.requestModel)
      .then(function(response: any) {
        if (response.data.code === 0) {
          var data = response.data.data;

          //控制分页控件的显示状态
          if (data.itemCount > 0) {
            _this.initTableHeight();
            _this.paginationShow = true;
          } else {
            _this.tableHeight = "";
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
          _this.alert(ValidateInfo.GetListError, "error");
          console.log(response.data.message);
        }
      })
      .catch(function(error: any) {
        console.log(error);
      });
  }

  // Create referral start
  dialogCreateShow: boolean = false;
  dialogConfirmShow: boolean = false;
  dialogHospitalListShow: boolean = false;
  dialogDepartmentListShow: boolean = false;
  dialogAppointmentListShow: boolean = false;
  appointmentSuccess: boolean = false;
  createReferralInfo: any = null;

  createReferral() {
    this.dialogCreateShow = true;
    this.appointmentSuccess = false;
    this.dialogConfirmShow = false;
    this.dialogHospitalListShow = false;
    this.dialogDepartmentListShow = false;
    this.dialogAppointmentListShow = false;
  }

  CreateReferralById(obj: any) {
    this.dialogCreateShow = true;
    this.appointmentSuccess = false;
    this.dialogConfirmShow = false;
    /*
    this.dialogHospitalListShow = false;
    this.dialogDepartmentListShow = false;
    this.dialogAppointmentListShow = false;
    */
    this.createReferralInfo = obj;
  }

  confirmReferral() {
    this.dialogCreateShow = false;
    this.appointmentSuccess = false;
    this.dialogConfirmShow = true;
    /*
    this.dialogHospitalListShow = false;
    this.dialogDepartmentListShow = false;
    this.dialogAppointmentListShow = false;
    */
  }

  createDialogChange(val: boolean) {
    this.dialogCreateShow = val;
    if (!val) {
      this.createReferralInfo = null;
    }
  }

  confirmDialogChange(val: boolean) {
    this.dialogConfirmShow = val;
  }

  /*
  hospitalList() {
    this.appointmentSuccess = false;
    this.dialogHospitalListShow = true;
    this.dialogDepartmentListShow = false;
    this.dialogAppointmentListShow = false;
  }

  departmentlist() {
    this.appointmentSuccess = false;
    this.dialogHospitalListShow = false;
    this.dialogDepartmentListShow = true;
    this.dialogAppointmentListShow = false;
  }

  appointmentlist() {
    this.appointmentSuccess = false;
    this.dialogHospitalListShow = false;
    this.dialogDepartmentListShow = false;
    this.dialogAppointmentListShow = true;
  }

  afterAppointment() {
    this.appointmentSuccess = true;
    this.dialogHospitalListShow = false;
    this.dialogDepartmentListShow = false;
    this.dialogAppointmentListShow = false;
  }

  appointmentStatusChange(val: boolean) {
    this.appointmentSuccess = val;
  }

  hospitalListDialogChange(val: boolean) {
    this.dialogHospitalListShow = val;
  }

  departmentListDialogChange(val: boolean) {
    this.dialogDepartmentListShow = val;
  }

  appointmentListDialogChange(val: boolean) {
    this.dialogAppointmentListShow = val;
  }
  // Create referral end
  */
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.dualreferral {
  width: 100%;
  min-width: 1150px;
  background: #fff;
  overflow-x: auto;

  .dualreferral-content {
    position: relative;
    width: 100%;
    height: 100%;

    .content-title {
      height: 50px;
      line-height: 50px;
      padding-left: 20px;
      font-size: 16px;
      color: #1bd0a1;
      width: 100%;

      span {
        font-weight: bold;
        margin-right: 8px;
      }
    }

    .content-nav {
      width: 100%;
      padding: 10px 30px;
      overflow: hidden;

      .nav-list {
        float: left;
        clear: both;
        color: #999;
        font-size: 14px;

        .search-input {
          width: 150px;
          margin-left: 5px;
          margin-right: 10px;
        }
        .search-date {
          margin-left: 5px;
          margin-right: 10px;
        }
        .status-type {
          margin-left: 5px;
        }
      }

      .create-btn {
        float: right;
        margin-right: 15px;
      }

      .search-btn {
        float: right;
      }

      .nav-search {
        float: right;
      }
    }

    .content-list {
      padding: 20px 30px;
      .list-detail {
        width: 100%;

        .none-data-display {
          width: 100%;
          padding-top: 310px;
          padding-bottom: 100px;
          background: url("./../../../../assets/image/common_none_table_data.png")
            no-repeat center 80px;
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
