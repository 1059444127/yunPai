<template>
  <div class="mainpage">
    <div class="main-title"><span>|</span>{{pageTitle}}</div>
    <div class="main-content">
        <div class="dialog-title">
            {{const_list.ListTitle.MTPS}}
            <el-button size="mini" class="my-btn on btn-add" v-show="createMTPSRight" @click="createMTPS(false)">新增</el-button>
        </div>
        <div class="content-detail">
            <el-table
                :data="dataList"
                :height="tableHeight"
                v-bind:class="[paginationShow===false?'none-data':'']"
                :row-class-name="initTableHeight"
                stripe>
                <el-table-column
                prop="MTPSName"
                :label="const_list.ListTitle.MTPSTitle"
                min-width="100">
                </el-table-column>
                <el-table-column
                prop="description"
                :label="const_list.ListTitle.Describe"
                min-width="220">
                </el-table-column>
                <el-table-column
                prop="createDT"
                :label="const_list.ListTitle.CreateTime"
                min-width="100">
                </el-table-column>
                <el-table-column
                :label="const_list.ListTitle.Operation"
                width="120">
                <template slot-scope="scope">
                    <i class="iconfont icon-chakan oper-icon oper-icon-view"
                      @click="viewMTPS(scope)"
                      :title="const_list.ListTitle.View">
                    </i>
                    <i class="iconfont icon-bianji oper-icon oper-icon-edit"
                      @click="modifyMTPS(scope)"
                      :title="const_list.ListTitle.Edit">
                    </i>
                    <i class="iconfont icon-shanchu oper-icon oper-icon-delete"
                      @click="deleteMTPS(scope)"
                      :title="const_list.ListTitle.Delete">
                    </i>
                    <!-- <span class="my-link-btn pointer" @click="viewMTPS(scope)">{{const_list.ListTitle.View}}</span>
                    <span class="my-separate-line" v-show="modifyMTPSRight">|</span>
                    <span class="my-link-btn pointer" v-show="modifyMTPSRight" @click="modifyMTPS(scope)">{{const_list.ListTitle.Modify}}</span>
                    <span class="my-separate-line" v-show="deleteMTPSRight">|</span>
                    <span class="my-link-btn pointer" v-show="deleteMTPSRight" @click="deleteMTPS(scope)">{{const_list.ListTitle.Delete}}</span> -->
                </template>
                </el-table-column>
            </el-table>
        </div>
    </div>

    <!-- Create MTPS form start -->
    <createmtps :show="createMTPSShow"
                :currecordid="curMTPSId" 
                @show-statue-change="createMTPSDialogChange"></createmtps>
    <!-- Create MTPS form end -->

    <!-- View MTPS form start -->
    <viewmtps :show="viewMTPSShow"
              :currecordid="curMTPSId"
              @to-modify="createMTPS(true)" 
              @show-statue-change="viewMTPSDialogChange"></viewmtps>
    <!-- View MTPS form end -->
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import store from "./../../../vuex/store";
import * as types from "./../../../vuex/types";
import * as apiConfig from "./../../../api/config";
import ConstList from "./../../../utils/ConstList";
import MTPSManageRights from "./../../../utils/MTPSManageRights";
import CreateMTPS from "@/components/configmanage/mtps/CreateMTPS.vue";
import ViewMTPS from "@/components/configmanage/mtps/ViewMTPS.vue";
import ValidateInfo from "./../../../utils/ValidateInfo";

@Component({
  components: {
    createmtps: CreateMTPS,
    viewmtps: ViewMTPS
  }
})
export default class MTPS extends Vue {
  pageTitle: string = "医联体管理";
  curMTPSId: string = "";
  tableHeight: any = "";

  // 功能权限点标记
  createMTPSRight: boolean = MTPSManageRights.CreateMTPS();
  modifyMTPSRight: boolean = MTPSManageRights.ModifyMTPS();
  deleteMTPSRight: boolean = MTPSManageRights.DeleteMTPS();

  // 医联体
  dataList: {}[] = [];

  const_list = ConstList.ConfigManage;

  mounted() {
    this.dataList = [];
    this.searchMTPS();
    this.initTableHeight();

    //监听窗口大小改变事件
    var that = this;
    window.onresize = function temp() {
      that.initTableHeight();
    };
  }

  // 重置table高度
  initTableHeight() {
    this.tableHeight = document.documentElement.clientHeight - 260;
  }

  // 获取医联体数据
  searchMTPS() {
    const _this = this;
    Vue.prototype.$http
      .post(apiConfig.API.searchMTPS, {})
      .then(function(response: any) {
        if (response.data.code === 0) {
          _this.dataList = response.data.data;
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

  // 删除医联体
  deleteMTPS(obj: any) {
    const _this = this;

    _this.confirm(ValidateInfo.DeleteConfirm).then(function() {
      var requestModel: {} = {
        id: obj.row.id
      };

      Vue.prototype.$http
        .post(apiConfig.API.deleteMTPS, requestModel)
        .then(function(response: any) {
          if (response.data.code === 0) {
            _this.alert(ValidateInfo.DeleteSuccess, "success");
            _this.curMTPSId = "";
            _this.searchMTPS();
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
            _this.alert(ValidateInfo.DeleteError, "error");
            console.log(response.data.message);
          }
        })
        .catch(function(error: any) {
          console.log(error);
        });
    });
  }

  // 修改医联体信息
  modifyMTPS(obj: any) {
    this.curMTPSId = obj.row.id;
    this.createMTPS(true);
  }

  // 新增/修改医联体显示状态
  createMTPSShow: boolean = false;

  createMTPS(isModify: boolean = false) {
    if (!isModify) {
      this.curMTPSId = "";
    }
    this.viewMTPSShow = false;
    this.createMTPSShow = true;
  }

  createMTPSDialogChange(val: boolean) {
    this.createMTPSShow = val;
    if (!val) {
      this.searchMTPS();
    }
  }

  // 查看医联体显示状态
  viewMTPSShow: boolean = false;

  viewMTPS(obj: any) {
    this.curMTPSId = obj.row.id;
    this.createMTPSShow = false;
    this.viewMTPSShow = true;
  }

  viewMTPSDialogChange(val: boolean) {
    this.viewMTPSShow = val;
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.mainpage {
  width: 100%;
  min-width: 925px;
  background: #fff;
  overflow-x: auto;
  height: 100%;
  overflow-y: auto;

  .main-title {
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

  .main-content {
    width: 100%;
    padding: 0 30px 30px 30px;
    overflow: hidden;

    .dialog-title {
      width: 100%;
      height: 38px;
      line-height: 38px;
      background: #effaf6;
      padding: 0 11px 0 16px;
      font-size: 16px;
      color: #1bd0a1;

      &.data-authority-point {
        margin-top: 60px;
      }

      .btn-add {
        float: right;
        margin: 1px;
      }
    }

    .content-detail {
      width: 100%;
      margin-top: 20px;
    }
  }
}
</style>
