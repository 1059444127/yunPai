<template>
  <div class="create-medical"
       v-show="show"
       @scroll.prevent>

    <div class="create-medical-content" >
      <div class="view-dialog">
        <div class="dialog-title">
          <span class="line"></span>检查{{recordTypeName}}
          <span class="close-dialog" @click="closeDialog()"><i class="el-icon-close"></i></span>
        </div>
        <div class="dialog-content" id="dialog-content" @scroll.prevent>
            <div class="menu-tree">
                <el-tree :data="recordListTree" 
                         @node-click="checkedChangeEvent"
                         :props="defaultProps"
                         default-expand-all
                         highlight-current="true"
                         :expand-on-click-node="false"
                         node-key="id"
                         ref="tree">
                </el-tree>
            </div>
            <div class="content-detail">
                <div class="record-info" v-show="showInfo"><span v-show="description===''?false:true">描述：{{description}}</span><span v-show="examDiagnosis===''?false:true">诊断建议：{{examDiagnosis}}</span></div>
                <div class="record-detail" :class="showInfo?'':'no-info'">
                    <div v-for="item in fileList"
                        v-bind:key="item">
                        <img class="img-content" v-show="item.dataType==='application/pdf'?false:true" :src="item.src"/>
                        <iframe class="pdf-content" 
                                scrolling="no" 
                                frameborder="0"
                                :style="item.dataType==='application/pdf'?'display:block':'display:none'"
                                :src="item.src">
                        </iframe>
                    </div>
                </div>
            </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop, Watch } from "vue-property-decorator";
import ConstList from "../../utils/ConstList";
import store from "../../vuex/store";
import * as types from "../../vuex/types";
import * as apiConfig from "../../api/config";
import ValidateInfo from "../../utils/ValidateInfo";

@Component
export default class ViewRecordDetail extends Vue {
  @Prop() curVisitMasterInfo: any;
  @Prop() curRecordID: any;
  description: string = "";
  examDiagnosis: string = "";
  showInfo: boolean = false;

  mounted() {}

  fileList = [];
  defaultCheckedKeys = [];

  InitTreeData() {
    this.fileList = [];
    this.defaultCheckedKeys = [];
    this.recordListTree = [];

    var root = {
      id: this.curVisitMasterInfo.id,
      label: this.curVisitMasterInfo.visitStartDT,
      isLeaf: false,
      children: []
    };

    for (var recordType of this.curVisitMasterInfo.recordTypes) {
      var obj = {
        id: recordType.id,
        label: recordType.name,
        isLeaf: false,
        children: []
      };

      for (var record of recordType.records) {
        var recordObj = {
          id: record.id,
          label: record.medicalRecordsName,
          isLeaf: true,
          detail: record
        };

        (obj.children as any).push(recordObj);

        if (record.id === this.curRecordID) {
          debugger;
          (this.$refs.tree as any).setCurrentKey(record.id);
          //(this.defaultCheckedKeys as any).push(record.id);
          this.getFileList(record);
        }
      }

      (root.children as any).push(obj);
    }

    this.recordListTree.push(root);
  }

  // 树结构
  recordListTree: {}[] = [];

  // 树节点选择事件改变
  checkedChangeEvent(obj: any) {
    if (obj.isLeaf) {
      this.getFileList(obj.detail);
    }
  }

  getFileList(obj: any) {
    this.fileList = [];

    for (var item of obj.recordAttachments) {
      var src = `${localStorage.getItem(
        "serviceBaseUrl"
      )}/medicalRecord/medicalRecordsAttachment/view?id=${
        item.id
      }&token=${localStorage.getItem("token")}`;
      (this.fileList as any).push({ src: src, dataType: item.dataType });
    }

    this.description =
      obj.description === undefined || obj.description === null
        ? ""
        : obj.description;
    this.examDiagnosis =
      obj.examDiagnosis === undefined || obj.examDiagnosis === null
        ? ""
        : obj.examDiagnosis;

    if ((this.description === "" && this.examDiagnosis) === "") {
      this.showInfo = false;
    } else {
      this.showInfo = true;
    }
  }

  //查看病历资料附件
  viewMedicalRecordsAttachment(id: string) {
    const _this = this;

    Vue.prototype.$http
      .post(apiConfig.API.viewMedicalRecordsAttachment, id)
      .then(function(response: any) {
        if (response.data.code === 0) {
          (_this.fileList as any).push(response.data.data);
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
          _this.alert(ValidateInfo.CreateError, "error");
        }
      })
      .catch(function(error: any) {
        console.log(error);
      });
  }

  @Prop() show: boolean = false;

  @Watch("show", { immediate: true })
  showStatusChange(val: boolean) {
    this.$emit("update:show", val);
    if (this.show) {
      this.InitTreeData();
    }
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
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "../../assets/style/dialog.scss";
.create-medical {
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

  .dialog-content {
    height: calc(100% - 40px) !important;
  }

  .create-medical-content {
    width: 890px;
    margin: 80px auto;
    height: calc(100% - 160px);

    .info-item-title {
      width: 110px;
    }

    .el-input__inner {
      padding: 0 !important;
    }

    .input-div {
      .el-form-item {
        margin-left: 82px !important;
      }
    }

    .menu-tree {
      float: left;
      width: 200px;
      height: 100%;
      overflow-x: auto;
      overflow-y: auto;
    }

    .content-detail {
      float: left;
      width: calc(100% - 200px);
      height: 100%;

      .record-info {
        width: 100%;
        padding: 5px 15px;
        height: 60px;
        white-space: pre;
        word-wrap: break-word;
        white-space: pre-wrap;
        overflow-y: auto;
        border: 1px solid #666;

        span {
          display: inline-block;
          width: 100%;
        }
      }

      .record-detail {
        height: calc(100% - 60px);
        background: #666;
        padding: 5px;
        width: 100%;
        overflow-y: auto;

        &.no-info {
          height: 100%;
        }

        .pdf-content {
          width: 100%;
          min-height: 600px;
        }

        .img-content {
          width: 100%;
          height: auto;
        }
      }
    }
  }
}
</style>
