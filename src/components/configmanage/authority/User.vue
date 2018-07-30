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
    <div class="mainpage-content">
        <div class="main-title"><span>|</span>{{pageTitle}}</div>
        <div class="main-content">
            <div class="content-nav">
                <div class="nav-row-item">
                    用户ID<el-input class="input" size="mini"></el-input>
                </div>
                <div class="nav-row-item">
                    登录名<el-input class="input" size="mini"></el-input>
                </div>
                <div class="nav-row-item">
                    用户姓名<el-input class="input" size="mini"></el-input>
                </div>
                <div class="nav-row-item">
                    用户角色
                    <el-select clearable size="mini" class="input" placeholder="请选择">
                        <el-option
                        v-for="item in ageUnitOptList"
                        :key="item.key"
                        :label="item.value"
                        :value="item.value">
                        </el-option>
                    </el-select>
                </div>
            </div>
            <div class="content-nav">
                <el-button size="mini"  class="my-btn btn-cancel my-default-btn btn" @click="createUser()">新增</el-button>
                <el-button size="mini" class="my-btn btn-submit my-submit-btn btn">查找</el-button>
            </div>
            <div class="content-detail">
                <el-table
                    :data="userList"
                    v-bind:class="[paginationShow===false?'none-data':'']"
                    @row-click="selectAuthorityPoint"
                    stripe>
                    <el-table-column
                    prop="loginName"
                    :label="const_list.ListTitle.LoginName"
                    min-width="100">
                    </el-table-column>
                    <el-table-column
                    prop="userName"
                    :label="const_list.ListTitle.UserName"
                    min-width="100">
                    </el-table-column>
                    <el-table-column
                    prop="HCOName"
                    :label="const_list.ListTitle.HCOName"
                    min-width="160">
                    </el-table-column>
                    <el-table-column
                    prop="deptName"
                    :label="const_list.ListTitle.DeptName"
                    min-width="120">
                    </el-table-column>
                    <el-table-column
                    prop="rolesText"
                    :label="const_list.ListTitle.Role"
                    min-width="120">
                    </el-table-column>
                    <el-table-column
                    :label="const_list.ListTitle.Operation"
                    width="100">
                    <template slot-scope="scope">
                        <i class="iconfont icon-chakan oper-icon oper-icon-view"
                          @click="viewUser(scope)"
                          :title="const_list.ListTitle.View">
                        </i>
                    </template>
                    </el-table-column>
                </el-table>
            </div>
        </div>
    </div>

    <!-- Create user form start -->
    <createuser :show="createUserShow"
                :curhcoinfo="curHCOInfo"
                :currecordid="selectedUserId"
                @show-statue-change="createUserDialogChange"></createuser>
    <!-- Create user form end -->

    <!-- View user form start -->
    <viewuser :show="viewUserShow"
              :currecordid="selectedUserId"
              @to-modify="createUser(true)"
              @show-statue-change="viewUserDialogChange"></viewuser>
    <!-- View user form end -->
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import store from "./../../../vuex/store";
import * as types from "./../../../vuex/types";
import * as apiConfig from "./../../../api/config";
import ConstList from "./../../../utils/ConstList";
import CreateUser from "@/components/configmanage/authority/CreateUser.vue";
import ViewUser from "@/components/configmanage/authority/ViewUser.vue";
import ValidateInfo from "./../../../utils/ValidateInfo";

@Component({
  components: {
    createuser: CreateUser,
    viewuser: ViewUser
  }
})
export default class User extends Vue {
  pageMenuTitle: string = "机构选择";
  pageTitle: string = "用户管理";
  selectedUserId: string = "";
  createUserDisable: boolean = true;
  tableHeight: any = "";

  curHCOInfo = {
    hcocode: "",
    hconame: ""
  };

  // 医联体树结构
  mtpsCoopHCOList: {}[] = [];

  // 获取当前医院的用户
  userList: {}[] = [];

  const_list = ConstList.ConfigManage;

  mounted() {
    this.curHCOInfo = {
      hcocode: "",
      hconame: ""
    };
    this.mtpsCoopHCOList = [];
    this.searchMTPS();
  }

  // 医联体树节点选择事件改变
  checkedChangeEvent(obj: any) {
    this.userList = [];
    this.curHCOInfo.hcocode = obj.id;
    this.curHCOInfo.hconame = obj.label;
    this.mtpsUserSearch(obj.id);

    if (obj.id === "" || obj.id === "001") {
      this.createUserDisable = true;
    } else {
      this.createUserDisable = false;
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

  // 获取当前医院用户数据
  mtpsUserSearch(id: string) {
    if (id === "") return;

    const _this = this;

    var requestModel: {} = {
      HCOCode: id
    };

    Vue.prototype.$http
      .post(apiConfig.API.mtpsUserSearch, requestModel)
      .then(function(response: any) {
        if (response.data.code === 0) {
          _this.userList = response.data.data;
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

  // 新增/修改用户显示状态
  createUserShow: boolean = false;

  createUser(isModify: boolean = false) {
    if (this.createUserDisable) {
      this.alert("请先选择机构", "info");
      return;
    }
    if (!isModify) {
      this.selectedUserId = "";
    }
    this.viewUserShow = false;
    this.createUserShow = true;
  }

  createUserDialogChange(val: boolean) {
    this.createUserShow = val;
    if (!val) {
      this.mtpsUserSearch(this.curHCOInfo.hcocode);
    }
  }

  // 查看用户显示状态
  viewUserShow: boolean = false;

  viewUser(obj: any) {
    this.selectedUserId = obj.row.id;
    this.createUserShow = false;
    this.viewUserShow = true;
  }

  viewUserDialogChange(val: boolean) {
    this.viewUserShow = val;
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

    .main-content {
      width: 100%;
      padding: 0 30px 30px 30px;
      overflow: hidden;

      .content-nav {
        width: 100%;
        margin-bottom: 10px;
        overflow: hidden;

        .nav-row-item {
          float: left;
          width: 25%;

          .input {
            margin-left: 5px;
            width: calc(100% - 70px);
          }
        }

        .btn {
          float: right;
          margin-left: 20px;
        }
      }

      .content-detail {
        width: 100%;
      }
    }
  }
}
</style>
