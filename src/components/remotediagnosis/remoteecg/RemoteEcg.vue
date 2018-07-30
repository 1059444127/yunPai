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
                       @click="[item.index==='2-1'?createApplication():toRecordListByPath(item.path)]"
                       v-bind:class="[item.index===curMenuIndex?'on':'',getDataCount(item.index)===0?'':'my-menu-btn']">
                       {{item.name}}
            </el-button>
        </el-badge>
      </div>
    </div>
    <div class="content-list">
      <div class="list-detail">
        <router-view @cur-tab-index="setCurTab"></router-view>
      </div>
    </div>

    

    <!-- Create dialog start -->
    <createapplication :show="dialogCreateShow" 
                    @show-statue-change="createDialogChange">
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
import CreateApplication from "@/components/remotediagnosis/remoteecg/CreateApplication.vue";

@Component({
  components: {
    createapplication: CreateApplication
  }
})
export default class RemoteImage extends Vue {
  pageTitle: string = "远程心电诊断";
  curMenuIndex: string = "2-2";
  waitDiagnosisCount: number = 3;
  waitAuditCount: number = 1;

  mounted() {
    store.commit(types.CURREMOTETYPE, {
      curDataType: "ecg"
    });
  }

  //  获取等待信息数量
  getDataCount(val: string): any {
    if (val === "2-2") {
      if (this.waitDiagnosisCount > 99) {
        return "···";
      } else {
        return this.waitDiagnosisCount;
      }
    } else if (val === "2-3") {
      if (this.waitAuditCount > 99) {
        return "···";
      } else {
        return this.waitAuditCount;
      }
    } else {
      return 0;
    }
  }

  //  获取菜单
  get remoteDiagnosisMenu() {
    return RemoteDiagnosisMenu[0].menus[1].submenus;
  }

  toRecordListByPath(viewPath: string) {
    //this.getWaitAuditAcceptCount();
    this.$router.push({ path: viewPath });
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
