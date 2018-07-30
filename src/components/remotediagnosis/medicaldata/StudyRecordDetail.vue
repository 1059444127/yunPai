<template>
  <div class="medicaldata">
      <div class="data-menu">
        <div class="user-name">
          赵自林
        </div>
        <div class="return-btn" @click="returnRecord">
          < 返回检查记录列表
        </div>
      </div>
      <div class="data-content">
            <div class="content-title">
              {{pageTitle}}
              <span class="refresh-info">- 最后更新：2017-11-30 13:33 <el-button type="text">刷新</el-button></span>
            </div>
            <div class="tab-list">
                <el-button size="medium" class="on">检查报告</el-button>
                <a target="_blank" href="http://120.26.212.233:8002/EXTERNALINTERFACE/VIEWEXI?MODE=UL&TYPE=V&LID=1&LPW=1&AN=10242358">
                    <el-button size="medium">原始数据</el-button>
                </a>
            </div>
            <div class="content-detail">
                <iframe class="pdf-content" 
                        scrolling="no" 
                        frameborder="0"
                        src="https://mtps.vico-lab.com/case.pdf">
                </iframe>
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

@Component({
  components: {}
})
export default class StudyRecordDetail extends Vue {
  pageTitle: string = "检查     2017-04-07 [超声]心脏超声";

  Init() {}

  mounted() {
    this.Init();
  }

  returnRecord() {
    this.$emit(
      "page-redirect",
      "/remotediagnosis/remoteimage/medicaldata/studyrecord"
    );
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.medicaldata {
  width: 100%;
  background: #fff;
  overflow: hidden;
  padding: 10px;

  .data-menu {
    float: left;
    width: 200px;

    .user-name {
      text-align: center;
      font-size: 20px;
      height: 40px;
      line-height: 40px;
    }

    .return-btn {
      color: #fff;
      background: #42e0b7;
      padding: 10px 20px;
      cursor: pointer;
    }
  }

  .data-content {
    position: relative;
    padding: 20px 30px 30px 30px;
    width: calc(100% - 220px);
    height: 100%;
    float: right;

    .content-title {
      height: 40px;
      line-height: 40px;
      padding-left: 5px;
      font-size: 18px;
      color: #42e0b7;
      width: 100%;
      border-bottom: 1px solid #eee;
      font-weight: bold;

      .refresh-info {
        margin-left: 20px;
        color: #bbb;
        font-weight: normal;
        font-size: 14px;
      }
    }

    .tab-list {
      margin: 20px 0;
    }

    .content-detail {
      width: 100%;

      .pdf-content {
        width: 100%;
        height: 1000px;
      }
    }
  }
}
</style>
