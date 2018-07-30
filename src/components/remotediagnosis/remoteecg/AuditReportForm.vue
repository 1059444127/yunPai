<template>
  <div class="create-application-dialog">
        <div class="dialog-content" id="dialog-content" @scroll.prevent>

        </div>
        <div class="report-assistant">
          <div class="title">
            诊断报告
          </div>
          <p>
            1、窦性+异位心律。<br>2、偶发房早。<br>3、部分导联ST-T改变
          </p>
          <hr>
          <p>
            诊断机构 ：宜宾市第一人民医院 心内科<br>
            报告医生 ：刘金峰<br>
            报告时间 ：2017-11-28 15:23
          </p>
          <br>
          <el-button class="btn-save" type="success" size="small" @click="toModifyReport()">修改</el-button>
          <el-button class="btn-save" type="success" size="small" @click="toPrint()">通过审核</el-button>
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

@Component
export default class AuditReportForm extends Vue {
  dialogContentSubTitle: string = "远程心电诊断报告单";
  const_list = ConstList.RemoteDiagnosis;

  //初始化表单内容,之后布局调整后可能不用
  Init() {}

  mounted() {
    this.Init();
  }

  toModifyReport() {
    this.$router.push({ name: "ecgdiagnosticreport" });
  }

  toPrint() {
    this.$router.push({ name: "ecgprintreportform" });
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.create-application-dialog {
  width: 100%;
  padding: 2px;
  clear: both;

  .dialog-content {
    width: 1000px;
    background: #fff;
    float: left;
    padding: 50px 0;
  }

  .report-assistant {
    width: calc(100% - 1020px);
    height: 692px;
    float: right;
    background: #fff;
    padding: 5px;

    .title {
      background: #f0faf6;
      padding: 5px;
      margin-bottom: 10px;
    }

    .diagnosis-report {
      width: 100%;
      margin-bottom: 10px;
    }

    .btn-save {
      margin-bottom: 10px;
    }
  }
}
</style>