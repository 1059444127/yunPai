<template>
  <div class="user-caselist"
       v-show="show"
       @scroll.prevent>

    <div class="user-caselist-content" ref="maincontent">
        <div class="view-dialog">
            <div class="dialog-title">
                <span class="line"></span>{{dialogTitle}}
                <span class="close-dialog" @click="closeDialog()"><i class="el-icon-close"></i></span>
            </div>
            <div class="dialog-content" id="dialog-content" @scroll.prevent>
              <div class="dialog-info">
                <div class="info-row">
                    <span class="info-item-title">{{const_list.RemoteForm.IdCard}}</span>
                    <span class="info-item-content w-200">{{infoModel.identityCardNo}}</span>
                </div>
                <div class="info-row">
                    <span class="info-item-title">{{const_list.RemoteForm.Name}}</span>
                    <span class="info-item-content w-90">{{infoModel.name}}</span>
                    <span class="info-item-title ml-40">{{const_list.RemoteForm.Sex}}</span>
                    <span class="info-item-content w-90">{{infoModel.sexText}}</span>
                    <span class="info-item-title ml-40">{{const_list.RemoteForm.Age}}</span>
                    <span class="info-item-content w-90">{{infoModel.age}}{{infoModel.ageUnit}}</span>
                </div>
              </div>
              <div class="dialog-info">
                <el-table
                  ref="table"
                  :data="infoModel.exams"
                  :height="tableHeight"
                  class="list-detail"
                  v-bind:class="[paginationShow===false?'none-data':'']"
                  :row-class-name="tableRowClassName"
                  stripe>
                  <el-table-column
                    prop="examDT"
                    :label="const_list.ListTitle.StudyTime"
                    min-width="60">
                  </el-table-column>
                  <el-table-column
                    prop="hisExamID"
                    :label="const_list.ListTitle.StudyNo"
                    min-width="160">
                  </el-table-column>
                  <el-table-column
                    prop="examClassName"
                    :label="const_list.ListTitle.StudyCategory"
                    min-width="60">
                  </el-table-column>
                  <el-table-column
                    prop="examItems"
                    :label="const_list.ListTitle.StudyProject"
                    min-width="80">
                  </el-table-column>
                  <el-table-column
                    prop="examDoctorName"
                    :label="const_list.ListTitle.Doctor"
                    min-width="50">
                  </el-table-column>
                  <el-table-column
                    :label="const_list.ListTitle.Operation"
                    min-width="40">
                    <template slot-scope="scope">
                      <i class="iconfont icon-chakan oper-icon oper-icon-edit"
                        @click="setCaseInfo(scope.row)"
                        :title="const_list.ListTitle.Select">
                      </i>
                    </template>
                  </el-table-column>
                </el-table>
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
import * as types from "./../../../vuex/types";
import * as apiConfig from "./../../../api/config";
import ValidateInfo from "./../../../utils/ValidateInfo";

@Component
export default class CreateApplication extends Vue {
  dialogTitle: string = "选择检查";
  const_list = ConstList.RemoteDiagnosis;
  subBtnDisabled: boolean = false;
  tableHeight: any = "";

  @Prop() hisexamid: string = "";

  // 信息结构体
  infoModel = {};

  logList = [];

  // 重置table高度
  initTableHeight() {
    this.tableHeight = (this.$refs.maincontent as any).clientHeight - 180;
  }

  //初始化表单内容,之后布局调整后可能不用
  Init() {
    this.infoModel = {};
    this.logList = [];
    this.searchPatientremoteImageDiagnosis();

    //监听窗口大小改变事件
    var that = this;
    window.onresize = function temp() {
      that.initTableHeight();
    };
  }

  @Prop() show: boolean;
  showStatus: boolean = this.show;

  searchPatientremoteImageDiagnosis() {
    const _this = this;

    var requestModel = {
      hisExamID: _this.hisexamid
    };

    Vue.prototype.$http
      .post(apiConfig.API.searchPatientremoteImageDiagnosis, requestModel)
      .then(function(response: any) {
        if (response.data.code === 0) {
          if (response.data.data !== null) {
            _this.infoModel = response.data.data;
          }
          _this.initTableHeight();
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
          console.log(response.data.code + ":" + response.data.message);
        }
      })
      .catch(function(error: any) {
        _this.closeDialog();
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

  setCaseInfo(obj: any) {
    var model = this.infoModel as any;
    var caseModel = {
      identityCardNo: model.identityCardNo,
      name: model.name,
      sex: model.sex,
      sexText: model.sexText,
      age: model.age,
      ageUnit: model.ageUnit,
      insuranceTypeName: model.insuranceTypeName,
      patientAddress: model.patientAddress,
      patientPhone: model.patientPhone,
      contactName: model.contactName,
      contactRelationshipType: model.contactRelationshipType,
      contactRelationshipTypeText: model.contactRelationshipTypeText,
      contactPhone: model.contactPhone,
      visitDT: model.visitDT,
      diagnosis: model.diagnosis,
      exam: obj
    };
    this.$emit("set-case-info", caseModel);
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
.user-caselist {
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

  .user-caselist-content {
    width: 700px;
    margin: 150px auto;
    height: calc(100% - 300px);

    .list-detail {
      width: 100%;

      .none-data-display {
        width: 100%;
        padding-top: 360px;
        background: url("./../../../assets/image/common_none_table_data.png")
          no-repeat center 130px;
        color: #333333;
        font-size: 20px;
        text-align: center;
      }

      .page-control {
        margin: 30px 0;
        float: right;
      }
    }
  }
}
</style>