<template>
  <div class="mainpage">
    <div class="mainpage-menu">
        <div class="main-title"><span>|</span>{{pageMenuTitle}}</div>
        <el-tree :data="mtpsCoopHCOList" 
                 @node-click="checkedChangeEvent"
                 :props="defaultProps"
                 default-expand-all
                 highlight-current="true"
                 :expand-on-click-node="false"
                 node-key="id"
                 ref="tree">
        </el-tree>
    </div>
    <div class="mainpage-content" v-show="hcoDetailShow">
        <div class="content-describe">
            <div class="describe-title"><span>|</span>{{curHCOInfo.name}}</div>
            <div class="describe-content">{{curHCOInfo.describe}}</div>
        </div>
        <div class="content-detail">
            <div class="detail-title">
              科室设置
              <el-button size="mini" class="my-btn on btn-add" v-show="createDeptRight" @click="createDept(false)">新增</el-button>
            </div>
            <el-table
                :data="deptList"
                :height="tableHeight"
                v-bind:class="[paginationShow===false?'none-data':'']"
                @row-click="selectAuthorityPoint"
                stripe>
                <el-table-column
                prop="HCODeptName"
                :label="const_list.ListTitle.DeptTitle"
                min-width="90">
                </el-table-column>
                <el-table-column
                prop="HCODeptAllas"
                :label="const_list.ListTitle.DeptAlias"
                min-width="90">
                </el-table-column>
                <el-table-column
                prop="deptClassText"
                :label="const_list.ListTitle.DeptType"
                min-width="90">
                </el-table-column>
                <el-table-column
                :label="const_list.ListTitle.Operation"
                width="120">
                <template slot-scope="scope">
                    <i class="iconfont icon-chakan oper-icon oper-icon-view"
                      @click="viewDept(scope)"
                      :title="const_list.ListTitle.View">
                    </i>
                    <i class="iconfont icon-bianji oper-icon oper-icon-edit"
                       v-show="modifyDeptRight?true:modifyOwnDeptRight(scope.row.HCOCode)"
                      @click="modifyDept(scope)"
                      :title="const_list.ListTitle.Edit">
                    </i>
                    <i class="iconfont icon-shanchu oper-icon oper-icon-delete"
                      v-show="deleteDeptRight"
                      @click="deleteDepartment(scope)"
                      :title="const_list.ListTitle.Delete">
                    </i>
                    <!-- <span class="my-link-btn pointer" @click="viewDept(scope)">{{const_list.ListTitle.View}}</span>
                    <span class="my-separate-line" v-show="modifyDeptRight?true:modifyOwnDeptRight(scope.row.HCOCode)">|</span>
                    <span class="my-link-btn pointer" v-show="modifyDeptRight?true:modifyOwnDeptRight(scope.row.HCOCode)" @click="modifyDept(scope)">{{const_list.ListTitle.Modify}}</span>
                    <span class="my-separate-line" v-show="deleteDeptRight">|</span>
                    <span class="my-link-btn pointer" v-show="deleteDeptRight" @click="deleteDepartment(scope)">{{const_list.ListTitle.Delete}}</span> -->
                </template>
                </el-table-column>
            </el-table>
        </div>
    </div>

    <!-- Create Dept form start -->
    <createdept :show="createDeptShow"
                :currecordid="curDeptId" 
                :curhcoinfo="curHCOInfo"
                @show-statue-change="createDeptDialogChange"></createdept>
    <!-- Create Dept form end -->

    <!-- View Dept form start -->
    <viewdept :show="viewDeptShow"
              :currecordid="curDeptId"
              @to-modify="createDept(true)" 
              @show-statue-change="viewDeptDialogChange"></viewdept>
    <!-- View Dept form end -->
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
import CreateDept from "@/components/configmanage/mtps/CreateDept.vue";
import ViewDept from "@/components/configmanage/mtps/ViewDept.vue";
import ValidateInfo from "./../../../utils/ValidateInfo";

@Component({
  components: {
    createdept: CreateDept,
    viewdept: ViewDept
  }
})
export default class Dept extends Vue {
  pageMenuTitle: string = "机构";
  curDeptId: string = "";
  hcoDetailShow: boolean = false;
  tableHeight: any = "";

  // 功能权限点标记
  createDeptRight: boolean = MTPSManageRights.CreateDept();
  modifyDeptRight: boolean = MTPSManageRights.ModifyDept();
  deleteDeptRight: boolean = MTPSManageRights.DeleteDept();
  modifyOwnDeptRight(code: string): boolean {
    return MTPSManageRights.ModifyOwnDept(code);
  }

  curHCOInfo = {
    id: "",
    name: "",
    describe: ""
  };

  // 医联体树结构
  mtpsCoopHCOList: {}[] = [];

  // 获取机构的科室列表
  deptList: {}[] = [];

  const_list = ConstList.ConfigManage;

  created() {
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
    this.tableHeight = document.documentElement.clientHeight - 310;
  }

  // 医联体树结构添加医联体节点
  addMTPSToTree(data: any) {
    for (var item of data) {
      var obj = {
        id: item.id,
        label: item.MTPSName,
        isLeaf: false,
        detail: "",
        children: []
      };

      this.mtpsCoopHCOList.push(obj);
      this.searchHealthCareOrganization(obj);
    }
  }

  // 生成医联体树结构
  createMTPSCoopHCOTree(node: any, data: any) {
    var mtpsDict: any = [];
    mtpsDict["root"] = [];

    for (var item of data) {
      var key = item.parentHCOCode;

      if (key === null || key === "") {
        mtpsDict["root"].push(item);
      } else if (mtpsDict[key]) {
        mtpsDict[key].push(item);
      } else {
        mtpsDict[key] = [];
        mtpsDict[key].push(item);
      }
    }

    node.children = this.formatTree(mtpsDict, "root");
  }

  // 格式化每个节点
  formatTree(arr: any, parentId: string) {
    var result: any = [];
    if (!arr[parentId]) {
      return result;
    }
    for (var item of arr[parentId]) {
      var obj = {
        id: item.HCOCode,
        label: item.HCOName,
        isLeaf: true,
        detail: item.remarks,
        children: this.formatTree(arr, item.HCOCode)
      };
      result.push(obj);
    }
    return result;
  }

  // 医联体树节点选择事件改变
  checkedChangeEvent(obj: any) {
    if (obj.isLeaf) {
      this.hcoDetailShow = true;
      this.curHCOInfo.id = obj.id;
      this.curHCOInfo.name = obj.label;
      this.curHCOInfo.describe = obj.detail;
      this.searchDepartment(this.curHCOInfo);
    }
  }

  // 获取医联体数据
  searchMTPS() {
    const _this = this;
    Vue.prototype.$http
      .post(apiConfig.API.searchMTPS, {})
      .then(function(response: any) {
        if (response.data.code === 0) {
          _this.addMTPSToTree(response.data.data);
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
  searchHealthCareOrganization(obj: any) {
    const _this = this;

    var requestModel: {} = {
      MTPSID: obj.id
    };

    Vue.prototype.$http
      .post(apiConfig.API.searchHealthCareOrganization, requestModel)
      .then(function(response: any) {
        if (response.data.code === 0) {
          _this.createMTPSCoopHCOTree(obj, response.data.data);
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

  // 获取科室数据
  searchDepartment(obj: any) {
    const _this = this;

    var requestModel: {} = {
      HCOCode: obj.id
    };

    Vue.prototype.$http
      .post(apiConfig.API.searchDepartment, requestModel)
      .then(function(response: any) {
        if (response.data.code === 0) {
          _this.deptList = response.data.data;
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
  deleteDepartment(obj: any) {
    const _this = this;
    _this.confirm(ValidateInfo.DeleteConfirm).then(function() {
      var requestModel: {} = {
        id: obj.row.id
      };

      Vue.prototype.$http
        .post(apiConfig.API.deleteDepartment, requestModel)
        .then(function(response: any) {
          if (response.data.code === 0) {
            _this.alert(ValidateInfo.DeleteSuccess, "success");
            _this.searchDepartment(_this.curHCOInfo);
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
  modifyDept(obj: any) {
    this.curDeptId = obj.row.id;
    this.createDept(true);
  }

  // 新增/修改科室显示状态
  createDeptShow: boolean = false;

  createDept(isModify: boolean = false) {
    if (!isModify) {
      this.curDeptId = "";
    }
    this.viewDeptShow = false;
    this.createDeptShow = true;
  }

  createDeptDialogChange(val: boolean) {
    this.createDeptShow = val;
    if (!val) {
      this.searchDepartment(this.curHCOInfo);
    }
  }

  // 查看用户显示状态
  viewDeptShow: boolean = false;

  viewDept(obj: any) {
    this.curDeptId = obj.row.id;
    this.createDeptShow = false;
    this.viewDeptShow = true;
  }

  viewDeptDialogChange(val: boolean) {
    this.viewDeptShow = val;
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
    border-right: 1px solid #d8dde3;
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
