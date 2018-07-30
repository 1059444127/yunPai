<template>
  <div class="mainpage">
    <div class="mainpage-menu">
        <div class="main-title"><span>|</span>{{pageMenuTitle}}</div>
        <ul class="mtps-list">
            <li v-for="item in mtpsList"
                v-bind:key="item.id"
                class="pointer"
                @click="selectMTPS(item)">
                {{item.MTPSName}}
            </li>
        </ul>
    </div>
    <div class="mainpage-content" v-show="showHCODetail">
        <div class="content-describe">
            <div class="describe-title"><span>|</span>{{curMTPSName}}</div>
            <div class="describe-content">{{curMTPSDescribe}}</div>
        </div>
        <div class="content-detail">
            <div class="detail-title">
                医联体包含的机构
                <el-button size="mini" class="my-btn on btn-add" v-show="createHCORight" @click="createHCO(false)">新增</el-button>
            </div>
            <el-table
                :data="hcoList"
                :height="tableHeight"
                v-bind:class="[paginationShow===false?'none-data':'']"
                :row-class-name="initTableHeight"
                stripe>
                <el-table-column
                prop="HCOName"
                :label="const_list.ListTitle.HCOTitle"
                min-width="100">
                </el-table-column>
                <el-table-column
                prop="hospitalClassText"
                :label="const_list.ListTitle.Level"
                min-width="100">
                </el-table-column>
                <el-table-column
                prop="address"
                :label="const_list.ListTitle.Address"
                min-width="160">
                </el-table-column>
                <el-table-column
                prop="contactPhone"
                :label="const_list.ListTitle.Tel"
                min-width="120">
                </el-table-column>
                <el-table-column
                prop="parentHCOName"
                :label="const_list.ListTitle.ParentHCO"
                min-width="120">
                </el-table-column>
                <el-table-column
                :label="const_list.ListTitle.Operation"
                width="120">
                <template slot-scope="scope">
                    <i class="iconfont icon-chakan oper-icon oper-icon-view"
                      @click="viewHCO(scope)"
                      :title="const_list.ListTitle.View">
                    </i>
                    <i class="iconfont icon-bianji oper-icon oper-icon-edit"
                       v-show="modifyHCORight?true:modifyOwnHCORight(scope.row.HCOCode)"
                      @click="modifyHCO(scope)"
                      :title="const_list.ListTitle.Edit">
                    </i>
                    <i class="iconfont icon-shanchu oper-icon oper-icon-delete"
                      v-show="deleteHCORight"
                      @click="deleteHealthCareOrganization(scope)"
                      :title="const_list.ListTitle.Delete">
                    </i>
                    <!-- <span class="my-link-btn pointer" @click="viewHCO(scope)">{{const_list.ListTitle.View}}</span>
                    <span class="my-separate-line" v-show="modifyHCORight?true:modifyOwnHCORight(scope.row.HCOCode)">|</span>
                    <span class="my-link-btn pointer" v-show="modifyHCORight?true:modifyOwnHCORight(scope.row.HCOCode)" @click="modifyHCO(scope)">{{const_list.ListTitle.Modify}}</span>
                    <span class="my-separate-line" v-show="deleteHCORight">|</span>
                    <span class="my-link-btn pointer" v-show="deleteHCORight" @click="deleteHealthCareOrganization(scope)">{{const_list.ListTitle.Delete}}</span> -->
                </template>
                </el-table-column>
            </el-table>
        </div>
    </div>

    <!-- Create HCO form start -->
    <createhco :show="createHCOShow"
               :currecordid="curHCOId" 
               :curmtpsid="curMTPSId"
               @show-statue-change="createHCODialogChange"></createhco>
    <!-- Create HCO form end -->

    <!-- View HCO form start -->
    <viewhco :show="viewHCOShow"
              :currecordid="curHCOId"
              @to-modify="createHCO(true)" 
              @show-statue-change="viewHCODialogChange"></viewhco>
    <!-- View HCO form end -->
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
import CreateHCO from "@/components/configmanage/mtps/CreateHCO.vue";
import ViewHCO from "@/components/configmanage/mtps/ViewHCO.vue";
import ValidateInfo from "./../../../utils/ValidateInfo";

@Component({
  components: {
    createhco: CreateHCO,
    viewhco: ViewHCO
  }
})
export default class HCO extends Vue {
  pageMenuTitle: string = "医联体";
  curMTPSName: string = "";
  curMTPSDescribe: string = "";
  curMTPSId: string = "";
  curHCOId: string = "";
  showHCODetail: boolean = false;
  tableHeight: any = "";

  // 功能权限点标记
  createHCORight: boolean = MTPSManageRights.CreateHCO();
  modifyHCORight: boolean = MTPSManageRights.ModifyHCO();
  deleteHCORight: boolean = MTPSManageRights.DeleteHCO();
  modifyOwnHCORight(code: string): boolean {
    return MTPSManageRights.ModifyOwnHCO(code);
  }

  // 医联体列表
  mtpsList: {}[] = [];

  // 获取当前医院列表
  hcoList: {}[] = [];

  const_list = ConstList.ConfigManage;

  mounted() {
    this.mtpsList = [];
    this.searchMTPS();

    //监听窗口大小改变事件
    var that = this;
    window.onresize = function temp() {
      that.initTableHeight();
    };
  }

  // 重置table高度
  initTableHeight() {
    this.tableHeight = document.documentElement.clientHeight - 310;
  }

  // 获取医联体数据
  searchMTPS() {
    const _this = this;
    Vue.prototype.$http
      .post(apiConfig.API.searchMTPS, {})
      .then(function(response: any) {
        if (response.data.code === 0) {
          _this.mtpsList = response.data.data;
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

  // 获取医联体机构数据
  searchHealthCareOrganization(id: string) {
    const _this = this;
    _this.hcoList = [];

    var requestModel: {} = {
      MTPSID: id
    };

    Vue.prototype.$http
      .post(apiConfig.API.searchHealthCareOrganization, requestModel)
      .then(function(response: any) {
        if (response.data.code === 0) {
          _this.hcoList = response.data.data;
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

  // 删除机构
  deleteHealthCareOrganization(obj: any) {
    const _this = this;

    _this.confirm(ValidateInfo.DeleteConfirm).then(function() {
      var requestModel: {} = {
        id: obj.row.id
      };

      Vue.prototype.$http
        .post(apiConfig.API.deleteHealthCareOrganization, requestModel)
        .then(function(response: any) {
          if (response.data.code === 0) {
            _this.alert(ValidateInfo.DeleteSuccess, "success");
            _this.curHCOId = "";
            _this.searchHealthCareOrganization(_this.curMTPSId);
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

  // 修改医联体机构信息
  modifyHCO(obj: any) {
    this.curHCOId = obj.row.id;
    this.createHCO(true);
  }

  // 医联体选择事件
  selectMTPS(obj: any) {
    this.curMTPSId = obj.id;
    this.curMTPSName = obj.MTPSName;
    this.curMTPSDescribe = obj.description;
    this.showHCODetail = true;
    this.hcoList = [];
    this.searchHealthCareOrganization(obj.id);
  }

  // 新增/修改用户显示状态
  createHCOShow: boolean = false;

  createHCO(isModify: boolean = false) {
    if (!isModify) {
      this.curHCOId = "";
    }
    this.viewHCOShow = false;
    this.createHCOShow = true;
  }

  createHCODialogChange(val: boolean) {
    this.createHCOShow = val;
    if (!val) {
      this.searchHealthCareOrganization(this.curMTPSId);
    }
  }

  // 查看用户显示状态
  viewHCOShow: boolean = false;

  viewHCO(obj: any) {
    this.curHCOId = obj.row.id;
    this.createHCOShow = false;
    this.viewHCOShow = true;
  }

  viewHCODialogChange(val: boolean) {
    this.viewHCOShow = val;
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.mainpage {
  width: 100%;
  height: 100%;
  min-width: 1000px;
  background: #fff;
  color: #999999;
  font-size: 14px;

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

  .mainpage-menu {
    float: left;
    width: 220px;
    height: 100%;
    overflow-y: auto;
    overflow-x: auto;
    border-right: 1px solid #d8dde3;

    .mtps-list {
      margin: 0;
      padding: 0;

      li {
        padding: 0 20px;
        color: #939393;
        font-size: 14px;
        line-height: 46px;
        white-space: nowrap;

        &:hover {
          background: #eee;
        }
      }
    }
  }

  .mainpage-content {
    float: left;
    width: calc(100% - 220px);
    min-width: 780px;
    height: 100%;
    overflow-y: auto;
    padding: 0 20px;

    .content-describe {
      width: 100%;
      margin-bottom: 10px;

      .describe-title {
        height: 50px;
        line-height: 50px;
        font-size: 16px;
        color: #1bd0a1;
        width: 100%;

        span {
          font-weight: bold;
          margin-right: 8px;
        }
      }

      .describe-content {
        padding: 0 15px;
        height: 60px;
        white-space: pre;
        word-wrap: break-word;
        white-space: pre-wrap;
        overflow-y: auto;
      }
    }

    .content-detail {
      width: 100%;

      .detail-title {
        width: 100%;
        height: 38px;
        line-height: 38px;
        background: #effaf6;
        padding: 0 11px 0 16px;
        font-size: 16px;
        color: #1bd0a1;

        .btn-add {
          float: right;
          margin: 1px;
        }
      }
    }
  }
}
</style>
