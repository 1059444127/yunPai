<template>
  <div class="mainpage">
    <div class="main-title"><span>|</span>{{const_list.ListTitle.MediaDict}}</div>
    <div class="main-content">
        <div class="dialog-title">
            {{const_list.ListTitle.MediaStore}}
            <el-button size="mini" class="my-btn on btn-add"  @click="createMedia(false)">新增</el-button>
        </div> 
        <div class="content-detail">
            <el-table
                :data="dataList"
                :height="tableHeight"
                v-bind:class="[paginationShow===false?'none-data':'']"
                :row-class-name="initTableHeight"
                stripe>
                <el-table-column
                prop="mediaName"
                :label="const_list.ListTitle.MediaName"
                :show-overflow-tooltip="true"
                min-width="200">
                </el-table-column>
                <el-table-column
                prop="mediaType"
                :label="const_list.ListTitle.MediaType"
                :formatter="optionFormat" 
                :show-overflow-tooltip="true"
                min-width="100">
                </el-table-column>
                <el-table-column
                prop="hostAddress"
                :label="const_list.ListTitle.MediaHostAddress"
                :show-overflow-tooltip="true"
                min-width="100">
                </el-table-column>
                <el-table-column
                prop="port"
                :label="const_list.ListTitle.MediaPort"
                min-width="100">
                 </el-table-column>
                <el-table-column
                prop="userName"
                :label="const_list.ListTitle.MediaUserName"
                :show-overflow-tooltip="true"
                min-width="100">
                 </el-table-column>
                <el-table-column
                prop="userPWD"
                :label="const_list.ListTitle.MediaPassword"
                :show-overflow-tooltip="true"
                min-width="100">
                 </el-table-column>
                 <el-table-column :label="const_list.ListTitle.Operation"
                width="120">
                <template slot-scope="scope">
                    <i class="iconfont icon-bianji oper-icon oper-icon-edit"
                      @click="modifyMedia(scope)"
                      :title="const_list.ListTitle.Edit">
                    </i>
                    <i class="iconfont icon-shanchu oper-icon oper-icon-delete"
                      @click="deleteMedia(scope)"
                      :title="const_list.ListTitle.Delete">
                    </i>
                </template>
                </el-table-column>
            </el-table>
        </div>
    </div>

    <!-- Create Media form start -->
    <createmedia :show="createMediaShow"
                :currecordid="curMediaId" 
                :options="options"
                @show-statue-change="createMediaDialogChange"></createmedia>
    <!-- Create Media form end -->
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import store from "./../../../vuex/store";
import * as types from "./../../../vuex/types";
import * as apiConfig from "./../../../api/config";
import ConstList from "./../../../utils/ConstList";
import MediaManageRights from "./../../../utils/MediaManageRights";
import CreateMedia from "@/components/configmanage/basedict/CreateMedia.vue";
import ValidateInfo from "./../../../utils/ValidateInfo";

@Component({
  components: {
    createmedia: CreateMedia
  }
})
export default class Media extends Vue {
  pageTitle: string = "存储媒质字典";
  curMediaId: string = "";
  tableHeight: any = "";
  options: {}[] = [
    { value: 0, label: "FTP" },
    { value: 1, label: "共享目录" },
    { value: 2, label: "HTTP" }
  ];

  // 医联体
  dataList: {}[] = [];

  const_list = ConstList.ConfigManage;

  mounted() {
    this.dataList = [];
    this.searchMedia();

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
  searchMedia() {
    const _this = this;
    Vue.prototype.$http
      .post(apiConfig.API.searchMedia, {})
      .then(function(response: any) {
        if (response.data.code === 0) {
          _this.initTableHeight();
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
  deleteMedia(obj: any) {
    const _this = this;
    _this.confirm(ValidateInfo.DeleteConfirm).then(function() {
      var requestModel: {} = {
        id: obj.row.id
      };

      Vue.prototype.$http
        .post(apiConfig.API.deleteMedia, requestModel)
        .then(function(response: any) {
          if (response.data.code === 0) {
            _this.alert(ValidateInfo.DeleteSuccess, "success");
            _this.curMediaId = "";
            _this.searchMedia();
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
  modifyMedia(obj: any) {
    this.curMediaId = obj.row.id;
    this.createMedia(true);
  }

  // 新增/修改医联体显示状态
  createMediaShow: boolean = false;

  createMedia(isModify: boolean = false) {
    if (!isModify) {
      this.curMediaId = "";
    }
    this.viewMediaShow = false;
    this.createMediaShow = true;
  }

  createMediaDialogChange(val: boolean) {
    this.createMediaShow = val;
    if (!val) {
      this.searchMedia();
    }
  }

  // 查看医联体显示状态
  viewMediaShow: boolean = false;

  viewMedia(obj: any) {
    this.curMediaId = obj.row.id;
    this.createMediaShow = false;
    this.viewMediaShow = true;
  }

  viewMediaDialogChange(val: boolean) {
    this.viewMediaShow = val;
  }

  optionFormat(row: any, column: any) {
    var option = row[column.property];
    var item: any;
    for (item of this.options) {
      if (item.value == option) {
        return item.label;
      }
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
