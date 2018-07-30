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
            状态<el-select class="status-type left" 
                           placeholder="请选择"
                           v-model="searchModel.statuses">
                    <el-option
                    v-for="item in statusList"
                    :key="item.key"
                    :label="item.value"
                    :value="item.key">
                    </el-option>
                </el-select>
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
                      class="my-btn my-default-btn create-btn"
                      v-show="createApplicationRight"
                      @click="createApplication()">
                      新建申请
            </el-button>
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
              :row-class-name="tableRowClassName"
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
                min-width="120">
              </el-table-column>
              <el-table-column
                prop="name"
                :label="const_list.ListTitle.UserName"
                min-width="80">
              </el-table-column>
              <el-table-column
                prop="sexText"
                :label="const_list.ListTitle.Sex"
                min-width="40">
              </el-table-column>
              <el-table-column
                :label="const_list.ListTitle.Age"
                min-width="70">
                <template slot-scope="scope">
                  {{scope.row.age}}{{scope.row.ageUnit}}
                </template>
              </el-table-column>
              <el-table-column
                prop="examClassName"
                :label="const_list.ListTitle.StudyCategory"
                min-width="80">
              </el-table-column>
              <el-table-column
                prop="examItems"
                :label="const_list.ListTitle.StudyProject"
                min-width="120">
              </el-table-column>
              <el-table-column
                prop="diagOrgName"
                :label="const_list.ListTitle.DiagnosesOrg"
                min-width="120">
              </el-table-column>
              <el-table-column
                :label="const_list.ListTitle.Status"
                min-width="70">
                <template slot-scope="scope">
                  {{getStatusText(scope.row.status)}}
                </template>
              </el-table-column>
              <el-table-column
                :label="const_list.ListTitle.Operation"
                min-width="100">
                <template slot-scope="scope">
                  <!-- <i class="iconfont icon-bianji2 oper-icon oper-icon-edit"
                     @click="editReportForm(scope.row.id)"
                     v-show="editBtnStatus(scope.row.status)"
                     :title="const_list.ListTitle.Edit">
                  </i> -->
                  <i class="iconfont icon-bianji oper-icon oper-icon-edit"
                     @click="editReportForm(scope.row.id)"
                     v-show="editBtnStatus(scope.row.status) && editApplicationRight"
                     :title="const_list.ListTitle.Edit">
                  </i>
                  <i class="iconfont icon-chakan oper-icon oper-icon-view"
                     @click="viewReportForm(scope.row.id)"
                     v-show="viewBtnStatus(scope.row.status)"
                     :title="const_list.ListTitle.View">
                  </i>
                  <i class="iconfont icon-26chehui oper-icon oper-icon-recall"
                     @click="cancelRemoteImageDiagnosis(scope.row.id)"
                     v-show="cancelBtnStatus(scope.row.status) && cancelApplicationRight"
                     :title="const_list.ListTitle.Recall">
                  </i>
                  <i class="iconfont icon-22 oper-icon oper-icon-reminders"
                     :title="const_list.ListTitle.Reminders"
                     @click="remoteImageDiagnosisSMSRemind(scope.row.id)"
                     v-show="remindersBtnStatus(scope.row.status) && remindersApplicationRight">
                  </i>
                  <i class="iconfont icon-print oper-icon oper-icon-printer" 
                     @click="printReport(scope.row.id)"
                     :title="const_list.ListTitle.Print"
                     v-show="printBtnStatus(scope.row.status)">
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

      <!-- Create application start -->
      <createapplication :show="dialogCreateShow" 
                         :currecordid="curRecordId"
                         :curcaseinfo="curCaseInfo"
                         @to-case-list="viewCaseListForm"
                         @show-statue-change="createDialogChange" 
                         @refresh-page="refreshPage">
      </createapplication>
      <!-- Create application end -->

      <!-- View application form start -->
      <viewreport :show="viewReportShow"
                  :currecordid="curRecordId"
                  @show-statue-change="viewReportDialogChange"></viewreport>
      <!-- View application form end -->
      
      <!-- user case list form start -->
      <usercaselist :show="viewCaseListShow"
                    :hisexamid="hisExamID"
                    @set-case-info="setCaseInfo"
                    @show-statue-change="viewCaseListDialogChange"></usercaselist>
      <!-- user case list form end -->

      <!-- Print report start -->
      <printreport :show="dialogPrintShow" 
                   :currecordid="curRecordId"
                   @show-statue-change="printDialogChange">
      </printreport>
      <!-- Print report end -->
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop, Watch } from "vue-property-decorator";
import store from "./../../../vuex/store";
import * as types from "./../../../vuex/types";
import * as apiConfig from "./../../../api/config";
import ConstList from "./../../../utils/ConstList";
import CreateApplication from "@/components/imagediagnosis/manage/CreateApplication.vue";
import ViewReport from "@/components/imagediagnosis/manage/ViewReport.vue";
import UserCaseList from "@/components/imagediagnosis/manage/UserCaseList.vue";
import PrintReport from "@/components/imagediagnosis/manage/PrintReport.vue";
import ImageDiagnosisRights from "./../../../utils/ImageDiagnosisRights";
import ValidateInfo from "./../../../utils/ValidateInfo";

@Component({
  components: {
    createapplication: CreateApplication,
    viewreport: ViewReport,
    usercaselist: UserCaseList,
    printreport: PrintReport
  }
})
export default class DiagnosisApplication extends Vue {
  pageTitle: string = "诊断申请";
  noneSearchKeyMsg: string = "请输入患者姓名";
  tableHeight: any = "";

  // 功能权限点标记
  createApplicationRight: boolean = ImageDiagnosisRights.CreateApplication();
  cancelApplicationRight: boolean = ImageDiagnosisRights.CancelApplication();
  editApplicationRight: boolean = ImageDiagnosisRights.ModifyApplication();
  remindersApplicationRight: boolean = ImageDiagnosisRights.RemindersApplication();

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

  statusList = [
    {
      key: null,
      value: "全部"
    },
    {
      key: [2, 3],
      value: "未出报告"
    },
    {
      key: [4],
      value: "已出报告"
    },
    {
      key: [11],
      value: "已撤回"
    }
  ];

  // 获取状态文本
  getStatusText(status: number) {
    switch (status) {
      case 2:
      case 3:
        return "未出报告";
      case 4:
        return "已出报告";
      case 11:
        return "已撤回";
    }
  }

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

  // 撤回远程影像诊断申请
  cancelRemoteImageDiagnosis(id: string) {
    const _this = this;
    _this.confirm(ValidateInfo.CancelConfirm).then(function() {
      var auditResquestModel = {
        id: id
      };

      Vue.prototype.$http
        .post(apiConfig.API.cancelRemoteImageDiagnosis, auditResquestModel)
        .then(function(response: any) {
          if (response.data.code === 0) {
            _this.alert(ValidateInfo.CancelSuccess, "success");
            _this.searchRemoteImageDiagnosisByPage();
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
            _this.alert(ValidateInfo.CancelError, "error");
            console.log(response.data.message);
          }
        })
        .catch(function(error: any) {
          console.log(error);
        });
    });
  }

  // 编辑按钮状态
  editBtnStatus(val: any): boolean {
    var flag: boolean = false;

    // 2:待诊断,3:待审核
    if (val === 2 || val === 3) {
      flag = true;
    }
    return flag;
  }

  // 查看按钮状态
  viewBtnStatus(val: any): boolean {
    var flag: boolean = false;

    // 4:已审核,11:已撤回
    if (val === 4 || val === 11) {
      flag = true;
    }
    return flag;
  }

  // 取消按钮状态
  cancelBtnStatus(val: any): boolean {
    var flag: boolean = false;

    // 2:待诊断,3:待审核
    if (val === 2 || val === 3) {
      flag = true;
    }
    return flag;
  }

  // 催办按钮状态
  remindersBtnStatus(val: any): boolean {
    var flag: boolean = false;

    // 2:待诊断，3:待审核
    if (val === 2 || val === 3) {
      flag = true;
    }
    return flag;
  }

  // 打印按钮状态
  printBtnStatus(val: any): boolean {
    var flag: boolean = false;

    // 4:已审核
    if (val === 4) {
      flag = true;
    }
    return flag;
  }

  // 判断每行记录样式
  tableRowClassName(row: any, rowIndex: any) {
    if (row.row.status === 11) {
      return "font-red";
    }

    return "";
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

  // User case list form start
  viewCaseListShow: boolean = false;
  hisExamID: string = "";
  curCaseInfo: any = null;

  viewCaseListForm(val: string) {
    this.hisExamID = val;
    this.viewCaseListShow = true;
  }

  viewCaseListDialogChange(val: boolean) {
    this.viewCaseListShow = val;
    this.searchRemoteImageDiagnosisByPage();
  }

  setCaseInfo(obj: any) {
    this.viewCaseListShow = false;
    this.curCaseInfo = obj;
  }
  // View report form end

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
    examClassCode: "",
    statuses: null
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
      reqOrgCode: window.localStorage.getItem("hCOCode"),
      statuses: []
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
        reqOrgCode: window.localStorage.getItem("hCOCode"),
        statuses:
          _this.searchModel.statuses === null
            ? [2, 3, 4, 11]
            : (_this.searchModel.statuses as any)
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

  // 催办
  remoteImageDiagnosisSMSRemind(referralId: string) {
    const _this = this;

    var requestModel = {
      id: referralId
    };

    Vue.prototype.$http
      .post(apiConfig.API.remoteImageDiagnosisSMSRemind, requestModel)
      .then(function(response: any) {
        if (response.data.code === 0) {
          _this.alert(ValidateInfo.RemindersSuccess, "success");
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
          _this.alert(ValidateInfo.RemindersError, "error");
          console.log(response.data.code + ":" + response.data.message);
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

  // Create Application start
  dialogCreateShow: boolean = false;
  dialogConfirmShow: boolean = false;

  createApplication(isModify: boolean = false) {
    if (!isModify) {
      this.curRecordId = "";
    }

    this.dialogCreateShow = true;
  }

  createDialogChange(val: boolean) {
    this.dialogCreateShow = val;
  }

  // Print start
  dialogPrintShow: boolean = false;

  printReport(val: string) {
    this.curRecordId = val;
    this.dialogPrintShow = true;
  }

  printDialogChange(val: boolean) {
    this.dialogPrintShow = val;
  }

  // 修改申请单信息
  editReportForm(id: string) {
    this.curRecordId = id;
    this.createApplication(true);
  }

  refreshPage() {
    this.searchRemoteImageDiagnosisByPage();
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
