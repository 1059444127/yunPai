<template>
  <div class="mainpage" ref="mainpage">
    <div class="main-title"><span>|</span>{{pageTitle}}</div>
    <div class="main-content">
        <div class="content-detail">
            <div class="dialog-title">
                {{const_list.ListTitle.AuthorityType}}
                <el-button size="mini" class="my-btn on btn-add" @click="createAuthorityType(false)">新增</el-button>
            </div>
            <el-table
                :data="authorityPointDataList"
                v-bind:class="[paginationShow===false?'none-data':'']"
                @row-click="selectAuthorityPoint"
                :height="tableHeight"
                stripe>
                <el-table-column
                prop="code"
                :label="const_list.ListTitle.Code"
                min-width="70">
                </el-table-column>
                <el-table-column
                prop="name"
                :label="const_list.ListTitle.Name"
                min-width="160">
                </el-table-column>
                <el-table-column
                prop="description"
                :label="const_list.ListTitle.Describe"
                min-width="150">
                </el-table-column>
                <el-table-column
                :label="const_list.ListTitle.Operation"
                width="80">
                <template slot-scope="scope">
                    <i class="iconfont icon-bianji oper-icon oper-icon-edit"
                      @click="funClassModify(scope)"
                      :title="const_list.ListTitle.Edit">
                    </i>
                    <i class="iconfont icon-shanchu oper-icon oper-icon-delete"
                      @click="funClassDelete(scope)"
                      :title="const_list.ListTitle.Delete">
                    </i>
                    <!-- <span class="my-link-btn pointer" @click="funClassModify(scope)">{{const_list.ListTitle.Modify}}</span>
                    <span class="my-separate-line">|</span>
                    <span class="my-link-btn pointer" @click="funClassDelete(scope)">{{const_list.ListTitle.Delete}}</span> -->
                </template>
                </el-table-column>
            </el-table>
        </div>
        <div class="content-detail" v-show="curAuthorityTypeId">
            <div class="dialog-title">
                {{curAuthorityTypeName + const_list.ListTitle.FunctionPoint}}
                <el-button size="mini" class="my-btn on btn-add" @click="createFunctionPoint(false)">新增</el-button>
            </div>
            <el-table
                :data="functionPointDataList"
                v-bind:class="[paginationShow===false?'none-data':'']"
                :height="harfTableHeight"
                stripe>
                <el-table-column
                prop="code"
                :label="const_list.ListTitle.Code"
                min-width="70">
                </el-table-column>
                <el-table-column
                prop="name"
                :label="const_list.ListTitle.Name"
                min-width="110">
                </el-table-column>
                <el-table-column
                prop="uri"
                :label="const_list.ListTitle.URI"
                min-width="100">
                </el-table-column>
                <el-table-column
                prop="description"
                :label="const_list.ListTitle.Describe"
                min-width="100">
                </el-table-column>
                <el-table-column
                :label="const_list.ListTitle.Operation"
                width="80">
                <template slot-scope="scope">
                    <i class="iconfont icon-bianji oper-icon oper-icon-edit"
                      @click="funRightModify(scope)"
                      :title="const_list.ListTitle.Edit">
                    </i>
                    <i class="iconfont icon-shanchu oper-icon oper-icon-delete"
                      @click="funRightDelete(scope)"
                      :title="const_list.ListTitle.Delete">
                    </i>
                    <!-- <span class="my-link-btn pointer" @click="funRightModify(scope)">{{const_list.ListTitle.Modify}}</span>
                    <span class="my-separate-line">|</span>
                    <span class="my-link-btn pointer" @click="funRightDelete(scope)">{{const_list.ListTitle.Delete}}</span> -->
                </template>
                </el-table-column>
            </el-table>
            <div class="dialog-title data-authority-point">
                {{curAuthorityTypeName + const_list.ListTitle.DataPoint}}
                <el-button size="mini" class="my-btn on btn-add" @click="createDataPoint(false)">新增</el-button>
            </div>
            <el-table
                :data="dataPointDataList"
                v-bind:class="[paginationShow===false?'none-data':'']"
                :height="harfTableHeight"
                stripe>
                <el-table-column
                prop="code"
                :label="const_list.ListTitle.Code"
                min-width="70">
                </el-table-column>
                <el-table-column
                prop="name"
                :label="const_list.ListTitle.Name"
                min-width="160">
                </el-table-column>
                <el-table-column
                prop="description"
                :label="const_list.ListTitle.Describe"
                min-width="150">
                </el-table-column>
                <el-table-column
                :label="const_list.ListTitle.Operation"
                width="80">
                <template slot-scope="scope">
                    <i class="iconfont icon-bianji oper-icon oper-icon-edit"
                      @click="dataRightModify(scope)"
                      :title="const_list.ListTitle.Edit">
                    </i>
                    <i class="iconfont icon-shanchu oper-icon oper-icon-delete"
                      @click="dataRightDelete(scope)"
                      :title="const_list.ListTitle.Delete">
                    </i>
                    <!-- <span class="my-link-btn pointer" @click="dataRightModify(scope)">{{const_list.ListTitle.Modify}}</span>
                    <span class="my-separate-line">|</span>
                    <span class="my-link-btn pointer"  @click="dataRightDelete(scope)">{{const_list.ListTitle.Delete}}</span> -->
                </template>
                </el-table-column>
            </el-table>
        </div>
    </div>

    <!-- View Create Authority Type form start -->
    <createauthoritytype :show="createAuthorityTypeShow"
                         :currecordid="selectedAuthorityTypeId" 
                         @show-statue-change="createAuthorityTypeDialogChange"></createauthoritytype>
    <!-- View Create Authority Type form end -->

    <!-- View Create Function Point form start -->
    <createfunctionpoint :show="createFunctionPointShow"
                         :curtypeid="curAuthorityTypeId"
                         :curtypename="curAuthorityTypeName"
                         :currecordid="selectedFunctionPointId" 
                         @show-statue-change="createFunctionPointDialogChange"></createfunctionpoint>
    <!-- View Create Function Point form end -->

    <!-- View Create Data Point form start -->
    <createdatapoint :show="createDataPointShow"
                     :curtypeid="curAuthorityTypeId"
                     :curtypename="curAuthorityTypeName"
                     :currecordid="selectedDataPointId" 
                     @show-statue-change="createDataPointDialogChange"></createdatapoint>
    <!-- View Create Data Point form end -->
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import store from "./../../../vuex/store";
import * as types from "./../../../vuex/types";
import * as apiConfig from "./../../../api/config";
import ConstList from "./../../../utils/ConstList";
import CreateAuthorityType from "@/components/configmanage/authority/CreateAuthorityType.vue";
import CreateFunctionPoint from "@/components/configmanage/authority/CreateFunctionPoint.vue";
import CreateDataPoint from "@/components/configmanage/authority/CreateDataPoint.vue";
import ValidateInfo from "./../../../utils/ValidateInfo";

@Component({
  components: {
    createauthoritytype: CreateAuthorityType,
    createfunctionpoint: CreateFunctionPoint,
    createdatapoint: CreateDataPoint
  }
})
export default class Point extends Vue {
  pageTitle: string = "权限点管理";
  curAuthorityTypeId: string = "";
  curAuthorityTypeName: string = "";
  selectedAuthorityTypeId: string = "";
  selectedFunctionPointId: string = "";
  selectedDataPointId: string = "";
  tableHeight: any = "";
  harfTableHeight: any = "";

  const_list = ConstList.ConfigManage;

  // 权限类别数据
  authorityPointDataList: {}[] = [];

  // 功能权限点数据
  functionPointDataList: {}[] = [];

  // 数据权限点数据
  dataPointDataList: {}[] = [];

  mounted() {
    this.curAuthorityTypeId = "";
    this.curAuthorityTypeName = "";
    this.funClassSearch();
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
    this.harfTableHeight = (this.tableHeight - 80) / 2;
  }

  // 获取类别数据
  funClassSearch() {
    const _this = this;

    Vue.prototype.$http
      .post(apiConfig.API.funClassSearch, {})
      .then(function(response: any) {
        if (response.data.code === 0) {
          if (response.data.data.length === 0) {
            _this.curAuthorityTypeId = "";
            _this.curAuthorityTypeName = "";
          }
          _this.authorityPointDataList = response.data.data;
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

  // 删除类别数据
  funClassDelete(obj: any) {
    const _this = this;

    _this.confirm(ValidateInfo.DeleteConfirm).then(function() {
      var requestModel: {} = {
        id: obj.row.id
      };

      Vue.prototype.$http
        .post(apiConfig.API.funClassDelete, requestModel)
        .then(function(response: any) {
          if (response.data.code === 0) {
            _this.alert(ValidateInfo.DeleteSuccess, "success");
            _this.curAuthorityTypeId = "";
            _this.curAuthorityTypeName = "";
            _this.funClassSearch();
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

  // 修改类别数据
  funClassModify(obj: any) {
    this.selectedAuthorityTypeId = obj.row.id;
    this.createAuthorityType(true);
  }

  // 点击类别数据行事件
  selectAuthorityPoint(row: any, event: any, column: any) {
    this.curAuthorityTypeId = row.id;
    this.curAuthorityTypeName = row.name;
    this.funRightSearch(row.id);
    this.dataRightSearch(row.id);
  }

  // 获取功能权限点数据
  funRightSearch(id: string) {
    if (id === "") return;

    const _this = this;

    var requestModel: {} = {
      funClassID: id
    };

    Vue.prototype.$http
      .post(apiConfig.API.funRightSearch, requestModel)
      .then(function(response: any) {
        if (response.data.code === 0) {
          _this.functionPointDataList = response.data.data;
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

  // 删除功能权限点数据
  funRightDelete(obj: any) {
    const _this = this;

    _this.confirm(ValidateInfo.DeleteConfirm).then(function() {
      var requestModel: {} = {
        id: obj.row.id
      };

      Vue.prototype.$http
        .post(apiConfig.API.funRightDelete, requestModel)
        .then(function(response: any) {
          if (response.data.code === 0) {
            _this.alert(ValidateInfo.DeleteSuccess, "success");
            _this.funRightSearch(_this.curAuthorityTypeId);
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

  // 修改功能权限点数据
  funRightModify(obj: any) {
    this.selectedFunctionPointId = obj.row.id;
    this.createFunctionPoint(true);
  }

  // 获取数据权限点数据
  dataRightSearch(id: string) {
    if (id === "") return;

    const _this = this;

    var requestModel: {} = {
      funClassID: id
    };

    Vue.prototype.$http
      .post(apiConfig.API.dataRightSearch, requestModel)
      .then(function(response: any) {
        if (response.data.code === 0) {
          _this.dataPointDataList = response.data.data;
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

  // 删除数据权限点数据
  dataRightDelete(obj: any) {
    const _this = this;
    _this.confirm(ValidateInfo.DeleteConfirm).then(function() {
      var requestModel: {} = {
        id: obj.row.id
      };

      Vue.prototype.$http
        .post(apiConfig.API.dataRightDelete, requestModel)
        .then(function(response: any) {
          if (response.data.code === 0) {
            _this.alert(ValidateInfo.DeleteSuccess, "success");
            _this.dataRightSearch(_this.curAuthorityTypeId);
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

  // 修改数据权限点数据
  dataRightModify(obj: any) {
    this.selectedDataPointId = obj.row.id;
    this.createDataPoint(true);
  }

  // 新增权限类别显示状态
  createAuthorityTypeShow: boolean = false;

  createAuthorityType(isModify: boolean = false) {
    if (!isModify) {
      this.selectedAuthorityTypeId = "";
    }
    this.createAuthorityTypeShow = true;
  }

  createAuthorityTypeDialogChange(val: boolean) {
    this.createAuthorityTypeShow = val;
    if (!val) {
      this.funClassSearch();
    }
  }

  // 新增功能权限点显示状态
  createFunctionPointShow: boolean = false;

  createFunctionPoint(isModify: boolean = false) {
    if (!isModify) {
      this.selectedFunctionPointId = "";
    }
    if (this.curAuthorityTypeId !== "") {
      this.createFunctionPointShow = true;
    }
  }

  createFunctionPointDialogChange(val: boolean) {
    this.createFunctionPointShow = val;
    if (!val) {
      this.funRightSearch(this.curAuthorityTypeId);
    }
  }

  // 新增数据权限点显示状态
  createDataPointShow: boolean = false;

  createDataPoint(isModify: boolean = false) {
    if (!isModify) {
      this.selectedDataPointId = "";
    }
    if (this.curAuthorityTypeId !== "") {
      this.createDataPointShow = true;
    }
  }

  createDataPointDialogChange(val: boolean) {
    this.createDataPointShow = val;
    if (!val) {
      this.dataRightSearch(this.curAuthorityTypeId);
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
    padding: 0 30px 30px 30px;
    overflow: hidden;

    .content-detail {
      width: calc(50% - 30px);
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
          margin-top: 40px;
        }

        .btn-add {
          float: right;
          margin: 1px;
        }
      }
    }
  }
}
</style>
