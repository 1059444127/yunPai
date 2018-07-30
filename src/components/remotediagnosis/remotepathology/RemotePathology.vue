<template>
  <div class="diagnosis-pathology-content">
        <div class="content-title">{{pageTitle}}</div>
        <div class="content-nav">
          <div class="nav-list">
              <el-badge class="nav-item"
                        v-for="item in remoteDiagnosisMenu" 
                        v-bind:key="item.index"
                        :value="getDataCount(item.index)" >
                  <el-button size="medium"
                             class="my-btn"
                             @click="[item.index==='3-1'?createApplication():toRecordListByPath(item.path)]"
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
      </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import store from "./../../../vuex/store";
import * as types from "./../../../vuex/types";
import * as apiConfig from "./../../../api/config";
import RemoteDiagnosisMenu from "./../../../utils/RemoteDiagnosisMenu";

@Component({
  components: {}
})
export default class RemotePathology extends Vue {
  pageTitle: string = "远程病理诊断";
  curMenuIndex: string = "2";
  waitDiagnosisCount: number = 2;
  waitAuditCount: number = 2;

  mounted() {
    store.commit(types.CURREMOTETYPE, {
      curDataType: "pathology"
    });
  }

  getDataCount(val: string): any {
    if (val === "3-2") {
      if (this.waitDiagnosisCount > 99) {
        return "···";
      } else {
        return this.waitDiagnosisCount;
      }
    } else if (val === "3-3") {
      if (this.waitAuditCount > 99) {
        return "···";
      } else {
        return this.waitAuditCount;
      }
    } else {
      return 0;
    }
  }

  get remoteDiagnosisMenu() {
    return RemoteDiagnosisMenu[0].menus[2].submenus;
  }

  // 设置tab高亮
  setCurTab(curTabIndex: string) {
    this.curMenuIndex = curTabIndex;
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.diagnosis-pathology-content {
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
