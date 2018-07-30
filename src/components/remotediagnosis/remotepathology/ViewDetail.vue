<template>
  <div class="view-detail"
       v-show="show">

    <div class="view-detail-content">
        <div class="view-detail-dialog">
            <div class="dialog-title">
                {{dialogTitle}}
                <span class="close-dialog" @click="closeDialog()"></span>
            </div>
            <div class="dialog-content" id="dialog-content" @scroll.prevent>
                <div class="tab-list">
                    <el-button size="medium"
                               v-for="item in viewDetailMenu" 
                               v-bind:key="item.index"
                               @click="toRecordListByPath(item)"
                               v-bind:class="[item.index===curMenuIndex?'on':'']">
                              {{item.name}}
                    </el-button>
                </div>
                <div class="detail-content">
                  <router-view @page-redirect="pageRedirect"></router-view>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop, Watch } from "vue-property-decorator";
import ConstList from "./../../../utils/ConstList";
import store from "./../../../vuex/store";
import RemoteDiagnosisMenu from "./../../../utils/RemoteDiagnosisMenu";
import * as types from "./../../../vuex/types";
import * as apiConfig from "./../../../api/config";

@Component
export default class ViewDetail extends Vue {
  dialogTitle: string = "远程病理诊断";
  curMenuIndex: string = "1";

  //初始化表单内容
  Init() {
    this.toRecordListByPath(RemoteDiagnosisMenu[0].menus[2].viewmenus[0]);
  }

  mounted() {}

  // 设置tab高亮
  setCurTab(curTabIndex: string) {
    this.curMenuIndex = curTabIndex;
  }

  toRecordListByPath(obj: any) {
    this.setCurTab(obj.index);
    this.$router.push({ path: obj.path });
  }

  pageRedirect(pageUrl: string) {
    this.$router.push({ path: pageUrl });
  }

  //  获取菜单
  get viewDetailMenu() {
    return RemoteDiagnosisMenu[0].menus[2].viewmenus;
  }

  @Prop() show: boolean;
  showStatus: boolean = this.show;

  closeDialog(done: any) {
    this.show = false;
    this.scrollToTop();
  }

  // 滚动条回到顶部
  scrollToTop() {
    var scrollContainer = this.$el.querySelector("#dialog-content");
    if (scrollContainer !== null) {
      scrollContainer.scrollTop = 0;
    }
  }

  @Watch("show", { immediate: true })
  showChange(val: boolean) {
    this.showStatus = val;
    if (val) {
      this.Init();
    }
  }

  @Watch("showStatus", { immediate: true })
  showStatusChange(val: boolean) {
    this.$emit("show-statue-change", val);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.view-detail {
  position: fixed;
  z-index: 9;
  background: rgba(0, 0, 0, 0.5);
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  color: #5a5e66;
  line-height: 24px;
  font-size: 14px;

  .el-input__inner {
    padding: 0 !important;
  }

  .view-detail-content {
    width: calc(100% - 20px);
    margin: 10px auto;
    height: calc(100% - 20px);

    .view-detail-dialog {
      height: 100%;
      width: 100%;
      background: #f8f8f8;
      padding: 2px;
      border-radius: 2px;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);

      .dialog-title {
        position: relative;
        width: 100%;
        height: 60px;
        line-height: 60px;
        padding-left: 16px;
        color: #fff;
        font-size: 18px;
        background: #42e0b7;

        .close-dialog {
          position: absolute;
          right: 20px;
          top: 19px;
          display: block;
          height: 22px;
          width: 22px;
          background: url("./../../../assets/image/common_icon_close.png")
            no-repeat center;
          background-size: 60% 60%;

          &:hover {
            cursor: pointer;
          }
        }
      }

      .dialog-content {
        width: calc(100% - 20px);
        height: calc(100% - 100px);
        margin: 20px 10px;
        overflow: hidden;

        .tab-list {
          width: 100%;
          padding: 30px 50px;
          background: #fff;
        }

        .detail-content {
          width: 100%;
          height: calc(100% - 106px);
          margin-top: 10px;
          overflow-y: auto;

          &::-webkit-scrollbar-track {
            -webkit-box-shadow: inset 0 0 6px rgba(155, 155, 155, 0.3);
            border-radius: 10px;
            background-color: #f5f5f5;
          }

          &::-webkit-scrollbar {
            width: 8px;
            background-color: #f5f5f5;
          }

          &::-webkit-scrollbar-thumb {
            border-radius: 10px;
            -webkit-box-shadow: inset 0 0 6px rgba(155, 155, 155, 0.3);
            background-color: rgba(0, 0, 0, 0.4);
          }
        }
      }
    }
  }
}
</style>