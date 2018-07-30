<template>
    <div class="mrd-content">
        <div class="content-title">
            {{pageTitle}}
            <span class="refresh-info">- 最后更新：2017-11-30 13:33 <el-button type="text">刷新</el-button></span>
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
export default class MRDCase extends Vue {
  pageTitle: string = "病历      2017-04-07 入院记录";

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

  .content-detail {
    width: 100%;

    .pdf-content {
      width: 100%;
      height: 1000px;
    }
  }
}
</style>
