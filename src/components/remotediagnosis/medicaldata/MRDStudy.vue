<template>
    <div class="mrd-content">
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
export default class MRDStudy extends Vue {
  pageTitle: string = "检查     2017-04-07 [超声]心脏超声";

  Init() {}

  mounted() {
    this.Init();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.mrd-content {
  position: relative;
  width: 100%;

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
</style>
