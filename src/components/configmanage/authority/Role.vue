<template>
  <div class="mainpage" ref="mainpage">
    <div class="main-title"><span>|</span>{{pageTitle}}</div>
    <div class="main-content">
        <div class="content-detail">
            <div class="dialog-title">
                {{const_list.ListTitle.Role}}
                <el-button size="mini" class="my-btn on btn-add" @click="createRole(false)">新增</el-button>
            </div>
            <el-table
                :data="roleDataList"
                v-bind:class="[paginationShow===false?'none-data':'']"
                @row-click="selectAuthorityPoint"
                :height="tableHeight"
                stripe>
                <el-table-column
                prop="name"
                :label="const_list.ListTitle.Name"
                min-width="180">
                </el-table-column>
                <el-table-column
                prop="description"
                :label="const_list.ListTitle.Describe"
                min-width="200">
                </el-table-column>
                <el-table-column
                :label="const_list.ListTitle.Operation"
                width="80">
                <template slot-scope="scope">
                    <i class="iconfont icon-bianji oper-icon oper-icon-edit"
                      @click="roleModify(scope)"
                      :title="const_list.ListTitle.Edit">
                    </i>
                    <i class="iconfont icon-shanchu oper-icon oper-icon-delete"
                      @click="roleDelete(scope)"
                      :title="const_list.ListTitle.Delete">
                    </i>
                </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="content-detail" v-show="curRoleId">
            <div class="dialog-title">
                {{curRoleName + const_list.ListTitle.RolePoint}}
                <el-button size="mini" class="my-btn on btn-add" :disabled="saveBtnDisable" @click="saveSelectedRolePoint()">保存</el-button>
            </div>
            <div class="tree-list">
              <el-tree
                :data="pointNodeList"
                @check-change="checkedChangeEvent(child)"
                :props="defaultProps"
                show-checkbox
                node-key="id"
                ref="tree"
                default-expand-all
                highlight-current="true"
                :expand-on-click-node="false"
                :default-checked-keys="selectedPointList">
              </el-tree>
            </div>
        </div>
    </div>

    <!-- View Create Authority Type form start -->
    <createrole :show="createRoleShow"
                :currecordid="selectedRoleId" 
                @show-statue-change="createRoleDialogChange"></createrole>
    <!-- View Create Authority Type form end -->
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop, Watch } from "vue-property-decorator";
import store from "./../../../vuex/store";
import * as types from "./../../../vuex/types";
import * as apiConfig from "./../../../api/config";
import ConstList from "./../../../utils/ConstList";
import CreateRole from "@/components/configmanage/authority/CreateRole.vue";
import ValidateInfo from "./../../../utils/ValidateInfo";

@Component({
  components: {
    createrole: CreateRole
  }
})
export default class Role extends Vue {
  pageTitle: string = "角色";
  curRoleId: string = "";
  curRoleName: string = "";
  selectedRoleId: string = "";
  selectedPointList = [];
  rolePointList: { [key: string]: {} } = {};
  saveBtnDisable: boolean = true;
  constFunNodeID = "0001";
  constDataNodeID = "0002";
  tableHeight: any = "";

  const_list = ConstList.ConfigManage;

  // 角色数据
  roleDataList: {}[] = [];

  // 权限点数据
  pointNodeList: {}[] = [];

  // 权限类别数据
  authorityPointDataList = [
    {
      id: "",
      name: ""
    }
  ];

  // 功能权限点数据
  functionPointDataList: {}[] = [];

  // 数据权限点数据
  dataPointDataList: {}[] = [];

  mounted() {
    this.curRoleId = "";
    this.curRoleName = "";
    this.selectedPointList = [];
    this.funClassSearch();
    this.roleSearch();

    this.initTableHeight();

    //监听窗口大小改变事件
    var that = this;
    window.onresize = function temp() {
      that.initTableHeight();
    };
  }

  // 重置table高度
  initTableHeight() {
    this.tableHeight = (this.$refs.mainpage as any).clientHeight - 118;
  }

  // 获取角色数据
  roleSearch() {
    const _this = this;

    Vue.prototype.$http
      .post(apiConfig.API.roleSearch, {})
      .then(function(response: any) {
        if (response.data.code === 0) {
          if (response.data.data.length === 0) {
            _this.curRoleId = "";
            _this.curRoleName = "";
          }
          _this.roleDataList = response.data.data;
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
          _this.alert(ValidateInfo.GetInfoError, "success");
          console.log(response.data.message);
        }
      })
      .catch(function(error: any) {
        console.log(error);
      });
  }

  // 删除角色数据
  roleDelete(obj: any) {
    const _this = this;

    _this.confirm(ValidateInfo.DeleteConfirm).then(function() {
      var requestModel: {} = {
        id: obj.row.id
      };

      Vue.prototype.$http
        .post(apiConfig.API.roleDelete, requestModel)
        .then(function(response: any) {
          if (response.data.code === 0) {
            _this.alert(ValidateInfo.DeleteSuccess, "success");
            _this.curRoleId = "";
            _this.curRoleName = "";
            _this.roleSearch();
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

  // 修改角色数据
  roleModify(obj: any) {
    this.selectedRoleId = obj.row.id;
    this.createRole(true);
  }

  // 点击角色数据行事件
  selectAuthorityPoint(row: any, event: any, column: any) {
    this.curRoleId = row.id;
    this.curRoleName = row.name;
    this.setDefaultPointList();
  }

  // 获取默认的所有权限点
  getDefaultPointList() {
    //遍历权限类别
    for (var funClassItem of this.authorityPointDataList) {
      var funClassObj = {
        id: funClassItem.id,
        label: funClassItem.name,
        children: []
      };

      //遍历当前类别的功能权限点
      var funRightNodeList = {
        id: this.constFunNodeID,
        label: "功能权限",
        children: []
      };
      this.funRightSearch(funRightNodeList, funClassItem.id);
      (funClassObj.children as {}[]).push(funRightNodeList);

      //遍历当前类别的数据权限点
      var dataRightNodeList = {
        id: this.constDataNodeID,
        label: "数据权限",
        children: []
      };
      this.dataRightSearch(dataRightNodeList, funClassItem.id);
      (funClassObj.children as {}[]).push(dataRightNodeList);

      this.pointNodeList.push(funClassObj);

      var obj = {
        funRights: [],
        dataRights: []
      };

      this.rolePointList[funClassItem.id] = obj;
    }
  }

  // 设置默认的所有权限点
  setDefaultPointList() {
    //清空所有选中数据
    this.selectedPointList = [];
    (this.$refs.tree as any).setCheckedKeys(this.selectedPointList);

    //遍历权限类别
    for (var funClassItem of this.authorityPointDataList) {
      this.roleRightSearch(this.curRoleId, funClassItem.id);
    }
  }

  // 设置默认的所有权限点
  saveSelectedRolePoint() {
    var checkedNodeList = (this.$refs.tree as any).getCheckedKeys();

    //遍历默认全部角色权限
    for (var roleItemId in this.rolePointList) {
      var saveObj = {
        roleID: this.curRoleId,
        funClassID: roleItemId,
        funRights: [],
        dataRights: []
      };

      for (var initNode of (this.rolePointList[roleItemId] as any).funRights) {
        for (var checkedItem of checkedNodeList) {
          if (initNode === checkedItem) {
            (saveObj.funRights as {}[]).push(initNode);
            break;
          }
        }
      }

      for (var initNode of (this.rolePointList[roleItemId] as any).dataRights) {
        for (var checkedItem of checkedNodeList) {
          if (initNode === checkedItem) {
            (saveObj.dataRights as {}[]).push(initNode);
            break;
          }
        }
      }

      this.roleRightSet(saveObj);
    }
  }

  // 节点选择事件改变
  checkedChangeEvent(obj: any) {
    var checkedNodeList = (this.$refs.tree as any).getCheckedKeys();
    if (
      checkedNodeList.sort().toString() ===
      this.selectedPointList.sort().toString()
    ) {
      this.saveBtnDisable = true;
    } else {
      this.saveBtnDisable = false;
    }
  }

  //追加节点
  appendChildren(node: any, data: any) {
    for (var item of data) {
      var obj = {
        id: item.id,
        label: item.name
      };

      node.children.push(obj);
    }
  }

  // 更新初始权限点数据
  UpdateInitPointData(funData: boolean, funClassId: string, data: any) {
    if (funData) {
      for (var item of data) {
        (this.rolePointList[funClassId] as any).funRights.push(item.id);
      }
    } else {
      for (var item of data) {
        (this.rolePointList[funClassId] as any).dataRights.push(item.id);
      }
    }
  }

  //合并选中节点
  mergeSelectNode(funClassID: string, data: any) {
    for (var item of data.funRights) {
      (this.selectedPointList as any).push(item.id);
    }

    for (var item of data.dataRights) {
      (this.selectedPointList as any).push(item.id);
    }

    (this.$refs.tree as any).setCheckedKeys(this.selectedPointList);
  }

  // 获取类别数据
  funClassSearch() {
    const _this = this;
    Vue.prototype.$http
      .post(apiConfig.API.funClassSearch, {})
      .then(function(response: any) {
        if (response.data.code === 0) {
          _this.authorityPointDataList = response.data.data;
          _this.getDefaultPointList();
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

  // 获取功能权限点数据
  funRightSearch(obj: any, id: any): any {
    const _this = this;

    var requestModel: {} = {
      funClassID: id
    };

    Vue.prototype.$http
      .post(apiConfig.API.funRightSearch, requestModel)
      .then(function(response: any) {
        if (response.data.code === 0) {
          _this.appendChildren(obj, response.data.data);
          _this.UpdateInitPointData(true, id, response.data.data);
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

  // 获取数据权限点数据
  dataRightSearch(obj: any, id: any): any {
    const _this = this;

    var requestModel: {} = {
      funClassID: id
    };

    Vue.prototype.$http
      .post(apiConfig.API.dataRightSearch, requestModel)
      .then(function(response: any) {
        if (response.data.code === 0) {
          _this.appendChildren(obj, response.data.data);
          _this.UpdateInitPointData(false, id, response.data.data);
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

  // 获取角色权限数据
  roleRightSearch(roleID: any, funClassID: any) {
    const _this = this;

    var requestModel: {} = {
      roleID: roleID,
      funClassID: funClassID
    };
    Vue.prototype.$http
      .post(apiConfig.API.roleRightSearch, requestModel)
      .then(function(response: any) {
        if (response.data.code === 0) {
          _this.mergeSelectNode(funClassID, response.data.data);
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

  // 修改权限数据
  roleRightSet(obj: any) {
    const _this = this;

    Vue.prototype.$http
      .post(apiConfig.API.roleRightSet, obj)
      .then(function(response: any) {
        if (response.data.code === 0) {
          _this.saveBtnDisable = true;
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
          _this.alert(ValidateInfo.ModifyError, "error");
          console.log(response.data.message);
        }
      })
      .catch(function(error: any) {
        console.log(error);
      });
  }

  // 新增角色显示状态
  createRoleShow: boolean = false;

  createRole(isModify: boolean = false) {
    if (!isModify) {
      this.selectedRoleId = "";
    }
    this.createRoleShow = true;
  }

  createRoleDialogChange(val: boolean) {
    this.createRoleShow = val;
    if (!val) {
      this.roleSearch();
    }
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
    height: calc(100% - 50px);
    padding: 0 30px 30px 30px;
    overflow: hidden;

    .content-detail {
      width: calc(50% - 30px);
      height: 100%;
      float: left;
      margin-right: 30px;

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
    }

    .tree-list {
      margin-top: 10px;
      height: calc(100% - 50px);
      overflow-y: auto;
    }
  }
}
</style>
