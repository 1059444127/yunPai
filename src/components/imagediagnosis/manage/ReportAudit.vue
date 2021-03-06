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
                min-width="100">
              </el-table-column>
              <el-table-column
                prop="name"
                :label="const_list.ListTitle.UserName"
                min-width="70">
              </el-table-column>
              <el-table-column
                prop="sexText"
                :label="const_list.ListTitle.Sex"
                min-width="60">
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
                prop="diagDoctorName"
                :label="const_list.ListTitle.ReportDoctor"
                min-width="70">
              </el-table-column>
              <el-table-column
                :label="const_list.ListTitle.Operation"
                min-width="50">
                <template slot-scope="scope">
                  <i class="iconfont icon-shenhe oper-icon oper-icon-audit" 
                     @click="getremoteImageQueryWriteReportUrl(scope.row)" 
                     :title="const_list.ListTitle.Audit">
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
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop, Watch } from "vue-property-decorator";
import store from "./../../../vuex/store";
import * as types from "./../../../vuex/types";
import * as apiConfig from "./../../../api/config";
import ConstList from "./../../../utils/ConstList";
import ImageDiagnosisRights from "./../../../utils/ImageDiagnosisRights";
import ValidateInfo from "./../../../utils/ValidateInfo";

@Component
export default class ReportSearch extends Vue {
  pageTitle: string = "报告审核";
  noneSearchKeyMsg: string = "请输入患者姓名";
  tableHeight: any = "";

  // 功能权限点标记
  auditImageDiagnosis: boolean = ImageDiagnosisRights.AuditImageDiagnosis();

  //分页控件的显示状态
  paginationShow: boolean = true;

  const_list = ConstList.RemoteDiagnosis;

  // 翻页控件
  currentPage: number = 1;
  pageCount: number = 0;
  itemCount: number = 0;
  itemCountPerPage: number = 10;
  dataList: {}[] = [];

  mounted() {
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
    submitDT: ""
  };

  // 查询接口参数
  requestModel = {
    pageIndex: 0,
    itemCountPerPage: 0,
    args: {
      name: "",
      submitDTBegin: "",
      submitDTEnd: "",
      diagOrgCode: window.localStorage.getItem("hCOCode"),
      statuses: [3]
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
        diagOrgCode: window.localStorage.getItem("hCOCode"),
        statuses: [3]
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

  // 诊断远程影像
  getremoteImageQueryWriteReportUrl(obj: any) {
    const _this = this;
    var diagnoseResquestModel = {
      examId: obj.examID,
      examClassName: obj.examClassName,
      canAudit: _this.auditImageDiagnosis ? "1" : "0"
    };

    Vue.prototype.$http
      .post(
        apiConfig.API.getremoteImageQueryWriteReportUrl,
        diagnoseResquestModel
      )
      .then(function(response: any) {
        if (response.data.code === 0) {
          if (response.data.data !== "") {
            window.open(response.data.data);
          } else {
            _this.alert("无法获取审核地址", "error");
          }
        } else if (response.data.code === apiConfig.MESSAGECODE.TIMEOUT) {
          store.commit(types.LOGOUT);
          _this.$router.push({ path: "/" });
        } else {
          _this.alert(ValidateInfo.GetInfoError, "error");
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
