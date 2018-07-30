<template>
  <div class="pending-audit-list">
      <div class="list-title" v-show="false">{{const_list.TabTitle.PendingAudit}}</div>
      <el-table
        :data="dataList"
        class="list-detail"
        stripe>
        <el-table-column
          prop="icon"
          width="50">
          <template slot-scope="scope">
            <span v-show="scope.row.priority===1?true:false" class="priority-text">急</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="dtSubmit"
          :label="const_list.ListTitle.ApplicationTime"
          min-width="150">
        </el-table-column>
        <el-table-column
          prop="examClass"
          :label="const_list.ListTitle.StudyCategory"
          min-width="90">
        </el-table-column>
        <el-table-column
          prop="examItems"
          :label="const_list.ListTitle.StudyProject"
          min-width="130">
        </el-table-column>
        <el-table-column
          prop="reqOrgName"
          :label="const_list.ListTitle.ApplyOrg"
          min-width="180">
        </el-table-column>
        <el-table-column
          prop="reqDoctorName"
          :label="const_list.ListTitle.Applicant"
          min-width="70">
        </el-table-column>
        <el-table-column
          prop="statusText"
          :label="const_list.ListTitle.Status"
          min-width="90">
        </el-table-column>
        <el-table-column
          :label="const_list.ListTitle.Operation"
          min-width="140">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="viewDetail(scope.row)">{{const_list.ListTitle.View}}</el-button>
            <el-button type="text" size="small" @click="auditRecordForm(scope.row)">{{const_list.ListTitle.Audit}}</el-button>
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
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import RoleMenu from "./../../../utils/RoleMenu";
import ConstList from "./../../../utils/ConstList";
import * as types from "./../../../vuex/types";
import * as apiConfig from "./../../../api/config";
import store from "./../../../vuex/store";

@Component
export default class ImagePendingAudit extends Vue {
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
  dataList: {}[] = [];

  mounted() {
    this.$emit("cur-tab-index", "1-3");
    this.getRemoteWaitAuditDiagReqRecord();
  }

  handleSizeChange(val: number) {
    this.itemCountPerPage = val;
    this.getRemoteWaitAuditDiagReqRecord();
  }

  handleCurrentChange(val: number) {
    this.currentPage = val;
    this.getRemoteWaitAuditDiagReqRecord();
  }

  //  获取待诊断列表
  getRemoteWaitAuditDiagReqRecord() {
    const _this = this;
    var requestModel: {} = {
      pageIndex: _this.currentPage,
      itemCountPerPage: _this.itemCountPerPage
    };

    Vue.prototype.$http
      .post(
        apiConfig.API.remoteImageGetRemoteWaitAuditDiagReqRecord,
        requestModel
      )
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

  // 查看
  viewDetail(obj: any) {
    store.commit(types.CURREMOTEDATASELECT, {
      curPathName: "imagependingaudit",
      curSubMenuIndex: 0 // 0 表示查看申请单
    });
    this.$emit("view-detail", { id: obj.id, status: obj.status });
  }

  // 审核
  auditRecordForm(obj: any) {
    store.commit(types.CURREMOTEDATASELECT, {
      curPathName: "imagependingaudit",
      curSubMenuIndex: 3 // 0 表示诊断报告
    });
    this.$emit("view-detail", { id: obj.id, status: obj.status });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.pending-audit-list {
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

  .priority-text {
    color: #f00;
    font-size: 14px;
  }
}
</style>
