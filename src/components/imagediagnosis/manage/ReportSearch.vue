<template>
  <div class="diagnosisapplication">
      <div class="diagnosisapplication-content">
        <div class="content-title"><span>|</span>{{pageTitle}}</div>
        <div class="content-nav">
          <div class="nav-list">
            患者姓名<el-input class="search-input" 
                             size="medium" 
                             v-model="searchModel.name" 
                             placeholder="请输入患者姓名">
            </el-input>
            申请时间<el-date-picker v-model="searchModel.submitDT"
                                   class="search-date"
                                   type="daterange"
                                   range-separator="至"
                                   start-placeholder="开始日期"
                                   end-placeholder="结束日期">
                    </el-date-picker>
             检查类别<el-select clearable class="study-type left" 
                           placeholder="请选择"
                           v-model="searchModel.examClassCode">
                    <el-option
                    v-for="item in studyTypeList"
                    :key="item.examClassCode"
                    :label="item.examClassName"
                    :value="item.examClassCode">
                    </el-option>
                </el-select>  
          </div>
          <div class="oper-btns">
            <el-button size="medium"
                      @click="searchRemoteImageDiagnosisByPage(true)"
                      class="my-btn my-submit-btn search-btn">
                      查询
            </el-button>
          </div>
        </div>
        <div class="content-list">
          <div class="list-detail">
            <el-table
              ref="table"
              :data="dataList"
              :height="tableHeight"
              class="list-detail"
              v-bind:class="[paginationShow===false?'none-data':'']"
              stripe>
              <el-table-column
                prop="icon"
                width="40">
                <template slot-scope="scope">
                  <span v-show="scope.row.priority===1?true:false" class="priority-text">急</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="submitDT"
                :label="const_list.ListTitle.ApplicationTime"
                min-width="110">
              </el-table-column>
              <el-table-column
                prop="name"
                :label="const_list.ListTitle.UserName"
                min-width="70">
              </el-table-column>
              <el-table-column
                prop="examClassName"
                :label="const_list.ListTitle.StudyCategory"
                min-width="100">
              </el-table-column>
              <el-table-column
                prop="examItems"
                :label="const_list.ListTitle.StudyProject"
                min-width="100">
              </el-table-column>
              <el-table-column
                prop="reqOrgName"
                :label="const_list.ListTitle.ApplyOrg"
                min-width="130">
              </el-table-column>
              <el-table-column
                prop="diagOrgName"
                :label="const_list.ListTitle.DiagnosesOrg"
                min-width="130">
              </el-table-column>
              <el-table-column
                prop="diagDoctorName"
                :label="const_list.ListTitle.ReportDoctor"
                min-width="70">
              </el-table-column>
              <el-table-column
                prop="reviewDoctorName"
                :label="const_list.ListTitle.AuditDoctor"
                min-width="70">
              </el-table-column>
              <el-table-column
                :label="const_list.ListTitle.Operation"
                min-width="70">
                <template slot-scope="scope">
                  <i class="iconfont icon-chakan oper-icon oper-icon-view" 
                     @click="viewReportForm(scope.row.id)" 
                     :title="const_list.ListTitle.View">
                  </i>
                  <i class="iconfont icon-print oper-icon oper-icon-printer" 
                     @click="printReport(scope.row.id)"
                     :title="const_list.ListTitle.Print">
                  </i>
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

      <!-- Print report start -->
      <printreport :show="dialogPrintShow" 
                   :currecordid="curRecordId"
                   @show-statue-change="printDialogChange">
      </printreport>
      <!-- Print report end -->

      <!-- View application form start -->
      <viewreport :show="viewReportShow"
                  :currecordid="curRecordId"
                  @show-statue-change="viewReportDialogChange"></viewreport>
      <!-- View application form end -->
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop, Watch } from "vue-property-decorator";
import store from "./../../../vuex/store";
import * as types from "./../../../vuex/types";
import * as apiConfig from "./../../../api/config";
import ConstList from "./../../../utils/ConstList";
import PrintReport from "@/components/imagediagnosis/manage/PrintReport.vue";
import ViewReport from "@/components/imagediagnosis/manage/ViewReport.vue";
import ValidateInfo from "./../../../utils/ValidateInfo";
// import ReferralRights from "./../../../utils/ReferralRights";
@Component({
  components: {
    printreport: PrintReport,
    viewreport: ViewReport
  }
})
export default class ReportSearch extends Vue {
  pageTitle: string = "报告查询";
  noneSearchKeyMsg: string = "请输入患者姓名";
  tableHeight: any = "";

  //点击的记录ID
  curRecordId: string = "";
  //分页控件的显示状态
  paginationShow: boolean = true;

  const_list = ConstList.RemoteDiagnosis;

  // 翻页控件
  currentPage: number = 1;
  pageCount: number = 0;
  itemCount: number = 0;
  itemCountPerPage: number = 10;
  dataList: {}[] = [];

  studyTypeList = [];

  mounted() {
    this.getExamClassDict();
    this.searchRemoteImageDiagnosisByPage(true);

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
    this.tableHeight = document.documentElement.clientHeight - 390;
  }

  handleSizeChange(val: number) {
    this.itemCountPerPage = val;
    this.searchRemoteImageDiagnosisByPage();
  }

  handleCurrentChange(val: number) {
    this.currentPage = val;
    this.searchRemoteImageDiagnosisByPage();
  }

  // 查询关键字
  searchModel = {
    name: "",
    submitDT: "",
    examClassCode: ""
  };

  // 查询接口参数
  requestModel = {
    pageIndex: 0,
    itemCountPerPage: 0,
    args: {
      name: "",
      submitDTBegin: "",
      submitDTEnd: "",
      examClassCode: "",
      orgCode: window.localStorage.getItem("hCOCode"),
      statuses: [4]
    }
  };

  searchRemoteImageDiagnosisByPage(initialPage: boolean = false) {
    const _this = this;
    if (initialPage) {
      _this.currentPage = 1;

      _this.requestModel.args = {
        name: _this.searchModel.name,
        submitDTBegin:
          _this.searchModel.submitDT === null
            ? ""
            : (_this.searchModel.submitDT as any)[0],
        submitDTEnd:
          _this.searchModel.submitDT === null
            ? ""
            : (_this.searchModel.submitDT as any)[1],
        examClassCode: _this.searchModel.examClassCode,
        orgCode: window.localStorage.getItem("hCOCode"),
        statuses: [4]
      };
    }

    _this.requestModel.pageIndex = _this.currentPage;
    _this.requestModel.itemCountPerPage = _this.itemCountPerPage;

    Vue.prototype.$http
      .post(apiConfig.API.searchRemoteImageDiagnosisByPage, this.requestModel)
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

  // 获取检查类别字典
  getExamClassDict() {
    const _this = this;

    Vue.prototype.$http
      .post(apiConfig.API.getExamClassDict, {})
      .then(function(response: any) {
        if (response.data.code === 0) {
          _this.studyTypeList = response.data.data;
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
          _this.alert(ValidateInfo.GetDictError, "error");
          console.log(response.data.message);
        }
      })
      .catch(function(error: any) {
        console.log(error);
      });
  }

  // View report form start
  viewReportShow: boolean = false;

  viewReportForm(val: string) {
    this.curRecordId = val;
    this.viewReportShow = true;
  }

  viewReportDialogChange(val: boolean) {
    this.viewReportShow = val;
    this.searchRemoteImageDiagnosisByPage();
  }
  // View report form end

  // Create start
  dialogPrintShow: boolean = false;

  printReport(val: string) {
    this.curRecordId = val;
    this.dialogPrintShow = true;
  }

  printDialogChange(val: boolean) {
    this.dialogPrintShow = val;
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.diagnosisapplication {
  width: 100%;
  min-width: 1150px;
  background: #fff;
  overflow-x: auto;

  .diagnosisapplication-content {
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
        overflow: hidden;
        float: left;
        color: #999;
        font-size: 14px;
        margin-bottom: 10px;

        .search-input,
        .status-type {
          width: 160px;
          margin-left: 5px;
          margin-right: 10px;
        }

        .study-type {
          width: 160px;
          margin-left: 5px;
        }

        .search-date {
          margin-left: 5px;
          margin-right: 10px;
        }
      }

      .oper-btns {
        overflow: hidden;
        float: right;

        .create-btn {
          float: right;
          margin-left: 15px;
        }

        .search-btn {
          float: right;
        }
      }
    }

    .content-list {
      padding: 20px 30px;
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

      .priority-text {
        color: #f00;
        font-size: 14px;
      }
    }
  }
}
</style>
