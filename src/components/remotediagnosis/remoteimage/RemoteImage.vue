<template>
  <div class="diagnosis-image-content">
    <div class="content-title">{{pageTitle}}</div>
    <div class="content-nav">
      <div class="nav-list">
        <el-badge class="nav-item"
                  v-for="item in remoteDiagnosisMenu" 
                  v-bind:key="item.index"
                  :value="getDataCount(item.index)" >
            <el-button size="medium"
                       class="my-btn"
                       @click="[item.index==='1-1'?createApplication():toRecordListByPath(item)]"
                       v-bind:class="[item.index===curMenuIndex?'on':'',getDataCount(item.index)===0?'':'my-menu-btn']">
                       {{item.name}}
            </el-button>
        </el-badge>
      </div>
    </div>
    <div class="content-list">
      <div class="list-detail">
        <router-view @cur-tab-index="setCurTab"
                     @view-detail="viewDetailById">
        </router-view>
      </div>
    </div>

    <!-- View detail start -->
    <viewdetail :show="viewDetailShow"
                :cursubmenuindex="curSubMenuIndex"
                @show-statue-change="viewDetailDialogChange"></viewdetail>
    <!-- View detail end -->

    <!-- Create dialog start -->
    <createapplication :show="dialogCreateShow" 
                       @show-statue-change="createDialogChange"
                       @refresh-page="refreshPage">
    </createapplication>
    <!-- Create dialog end -->
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import store from "./../../../vuex/store";
import * as types from "./../../../vuex/types";
import * as apiConfig from "./../../../api/config";
import RemoteDiagnosisMenu from "./../../../utils/RemoteDiagnosisMenu";
import CreateApplication from "@/components/remotediagnosis/remoteimage/CreateApplication.vue";
import ViewDetail from "@/components/remotediagnosis/remoteimage/ViewDetail.vue";
import ReferralRights from "./../../../utils/ReferralRights";
import ValidateInfo from "./../../../utils/ValidateInfo";

@Component({
  components: {
    createapplication: CreateApplication,
    viewdetail: ViewDetail
  }
})
export default class RemoteImage extends Vue {
  pageTitle: string = "远程影像诊断";
  curMenuIndex: string = "1-2";
  waitDiagReqCount: number = 0;
  waitAuditDiagReqCount: number = 0;

  created() {
    this.getRemoteWaitAuditWaitDiagCount();

    store.commit(types.CURREMOTETYPE, {
      curDataType: "image"
    });

    store.commit(types.CURREMOTEDATASELECT, {
      curPathName: "",
      curSubMenuIndex: null
    });
  }

  //  获取等待信息数量
  getDataCount(val: string): any {
    if (val === "1-2") {
      if (this.waitDiagReqCount > 99) {
        return "···";
      } else {
        return this.waitDiagReqCount;
      }
    } else if (val === "1-3") {
      if (this.waitAuditDiagReqCount > 99) {
        return "···";
      } else {
        return this.waitAuditDiagReqCount;
      }
    } else {
      return 0;
    }
  }

  //  获取菜单
  get remoteDiagnosisMenu() {
    return RemoteDiagnosisMenu[0].menus[0].submenus;
  }

  toRecordListByPath(obj: any) {
    this.getRemoteWaitAuditWaitDiagCount();

    if (this.curMenuIndex === obj.index) {
      this.$router.go(0);
    } else {
      this.$router.push({ path: obj.path });
    }
  }

  getRemoteWaitAuditWaitDiagCount() {
    const _this = this;
    Vue.prototype.$http
      .post(apiConfig.API.remoteImageGetRemoteWaitAuditWaitDiagCount)
      .then(function(response: any) {
        if (response.data.code === 0) {
          var data = response.data.data;
          _this.waitDiagReqCount = data.waitDiagReqCount;
          _this.waitAuditDiagReqCount = data.waitAuditDiagReqCount;
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
          console.log(response.data.message);
        }
      })
      .catch(function(error: any) {
        console.log(error);
      });
  }

  // 设置tab高亮
  setCurTab(curTabIndex: string) {
    this.curMenuIndex = curTabIndex;
  }

  // dialog setting
  dialogCreateShow: boolean = false;

  createApplication() {
    this.dialogCreateShow = true;
  }

  createDialogChange(val: boolean) {
    this.dialogCreateShow = val;
  }

  // View detail form start
  viewDetailShow: boolean = false;
  //子菜单的index
  curSubMenuIndex: number = 0;

  viewDetailById(obj: any) {
    // 记录当前选中的记录ID
    store.commit(types.CURREMOTERECORD, {
      curRecordId: obj.id,
      curRecordStatus: obj.status
    });
    this.viewDetailShow = true;
    this.curSubMenuIndex = store.state.remote.curSubMenuIndex;
  }

  viewDetailDialogChange(val: boolean) {
    this.viewDetailShow = val;

    if (store.state.remote.curPathName === "") {
      this.$router.push({ name: "imagependingdiagnosis" });
    }

    if (!val) {
      this.$router.push({ name: store.state.remote.curPathName });
    } else {
      this.curSubMenuIndex = store.state.remote.curSubMenuIndex;
    }
    this.getRemoteWaitAuditWaitDiagCount();
  }
  // View detail form end

  refreshPage() {
    this.$router.go(0);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.diagnosis-image-content {
  position: relative;
  width: 100%;
  height: 100%;

  .content-title {
    height: 40px;
    line-height: 40px;
    padding-left: 5px;
    font-size: 18px;
    color: #42e0b7;
    width: 100%;
    border-bottom: 1px solid #eee;
    font-weight: bold;
  }

  .content-nav {
    width: 100%;
    padding: 20px 10px 40px 0;
    overflow: hidden;

    .nav-list {
      float: left;
      clear: both;

      .nav-item {
        float: left;
        margin-right: 26px;
      }
    }
  }

  .content-list {
    .list-detail {
      width: 100%;
    }
  }
}
</style>
