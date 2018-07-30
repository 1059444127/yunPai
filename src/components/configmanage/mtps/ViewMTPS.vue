<template>
  <div class="dialog-page"
      v-show="show"
      @scroll.prevent>

    <div class="main-content">
        <div class="view-dialog">
            <div class="dialog-title">
                <span class="line"></span>{{dialogTitle}}
                <span class="close-dialog" @click="closeDialog()"><i class="el-icon-close"></i></span>
            </div>
            <div class="dialog-content" id="dialog-content">
              <div class="dialog-info">
                <div class="info-row">
                  <span class="info-item-title">{{const_list.FormTitle.Name}}</span>
                  <span class="info-item-content w-375">{{infoModel.MTPSName}}</span>
                </div>
                <div class="info-div">
                  <span class="info-item-title">{{const_list.FormTitle.Describe}}</span>
                  <div class="info-item-content w-375 ml-80">{{infoModel.description}}</div>
                </div>
              </div>
            </div>
            <div class="dialog-btn-div">
              <el-button class="my-default-btn cancel-btn" @click="closeDialog()">取消</el-button>
              <el-button class="my-submit-btn submit-btn" v-show="modifyMTPSRight" @click="modifyMTPS()">修改</el-button>
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
import * as types from "./../../../vuex/types";
import * as apiConfig from "./../../../api/config";
import MTPSManageRights from "./../../../utils/MTPSManageRights";
import ValidateInfo from "./../../../utils/ValidateInfo";

@Component
export default class ViewMTPS extends Vue {
  dialogTitle: string = "查看";
  const_list = ConstList.ConfigManage;
  isModifyData: boolean = false;

  // 功能权限点标记
  modifyMTPSRight: boolean = MTPSManageRights.ModifyMTPS();

  @Prop() currecordid: string = "";
  @Prop() show: boolean;
  showStatus: boolean = this.show;

  // 信息结构体
  infoModel = {};

  // 初次创建初始化
  Init() {
    this.infoModel = {};
    this.searchMTPS();
  }

  // 获取医联体信息
  searchMTPS() {
    const _this = this;

    var requestModel: {} = {
      id: _this.currecordid
    };

    Vue.prototype.$http
      .post(apiConfig.API.searchMTPS, requestModel)
      .then(function(response: any) {
        if (response.data.code === 0) {
          _this.infoModel = response.data.data[0];
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
        }
      })
      .catch(function(error: any) {
        console.log(error);
      });
  }

  // 滚动条回到顶部
  scrollToTop() {
    var scrollContainer = this.$el.querySelector("#dialog-content");
    if (scrollContainer !== null) {
      scrollContainer.scrollTop = 0;
    }
  }

  closeDialog() {
    this.show = false;
    this.scrollToTop();
  }

  //跳转到修改窗口
  modifyMTPS() {
    this.$emit("to-modify", "");
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
@import "./../../../assets/style/dialog.scss";
.dialog-page {
  position: fixed;
  z-index: 9;
  background: rgba(0, 0, 0, 0.5);
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  color: #999;
  line-height: 24px;
  font-size: 14px;

  .main-content {
    width: 550px;
    height: 300px;
    position: absolute;
    top: 50%;
    margin-top: -160px;
    left: 50%;
    margin-left: -275px;
  }
}
</style>
